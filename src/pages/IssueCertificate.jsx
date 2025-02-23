import React, { useState } from 'react';
import axios from 'axios';

const IssueCertificate = () => {
  const [formData, setFormData] = useState({
    abcID: '',
    course: '',
    semester_grades: [
      {
        sem_no: '',
        subjects: [
          {
            name: '',
            final_marks: '',
            credits: ''
          }
        ]
      }
    ]
  });
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  const headers = {
    'username': 'SPIT',
    'organization': 'Org2',
    'identity': 'e5858d0503cc9fbef80ff51c2fcfd5567a127f9d01b7a50ea6b8f0bc3a8419ac'
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSemesterChange = (e) => {
    const { value } = e.target;
    const semesterNumber = Math.max(1, Math.min(8, parseInt(value) || ''));
    setFormData(prev => ({
      ...prev,
      semester_grades: [
        {
          ...prev.semester_grades[0],
          sem_no: semesterNumber
        }
      ]
    }));
  };

  const handleSubjectChange = (e, index) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      semester_grades: prev.semester_grades.map((sem) => ({
        ...sem,
        subjects: sem.subjects.map((sub, subIdx) => {
          if (subIdx === index) {
            return {
              ...sub,
              [name]: name === 'name' ? value : Number(value)
            };
          }
          return sub;
        })
      }))
    }));
  };

  const addSubject = () => {
    setFormData(prev => ({
      ...prev,
      semester_grades: prev.semester_grades.map(sem => ({
        ...sem,
        subjects: [...sem.subjects, { name: '', final_marks: '', credits: '' }]
      }))
    }));
  };

  const removeSubject = (index) => {
    if (formData.semester_grades[0].subjects.length > 1) {
      setFormData(prev => ({
        ...prev,
        semester_grades: prev.semester_grades.map(sem => ({
          ...sem,
          subjects: sem.subjects.filter((_, subIdx) => subIdx !== index)
        }))
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.semester_grades[0].sem_no) {
      setError('Please enter a semester number between 1 and 8');
      return;
    }

    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      const response = await axios.post(
        'http://localhost:3000/certificate/college/issue',
        formData,
        { headers }
      );

      if (response.status === 200) {
        setResponse(response.data);
        setFormData({
          abcID: '',
          course: '',
          semester_grades: [
            {
              sem_no: '',
              subjects: [
                {
                  name: '',
                  final_marks: '',
                  credits: ''
                }
              ]
            }
          ]
        });
      }
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="px-8 py-6 bg-gradient-to-r from-blue-600 to-indigo-600">
            <h2 className="text-3xl font-bold text-white">Issue Certificate</h2>
            <p className="mt-2 text-blue-100">Enter student details and semester grades</p>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="space-y-2">
                <label htmlFor="abcID" className="block text-sm font-semibold text-gray-700">
                  ABC ID
                </label>
                <input
                  type="text"
                  id="abcID"
                  name="abcID"
                  value={formData.abcID}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                  placeholder="Enter ABC ID"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="course" className="block text-sm font-semibold text-gray-700">
                  Course
                </label>
                <input
                  type="text"
                  id="course"
                  name="course"
                  value={formData.course}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                  placeholder="Enter course name"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="semester" className="block text-sm font-semibold text-gray-700">
                  Semester (1-8)
                </label>
                <input
                  type="number"
                  id="semester"
                  min="1"
                  max="8"
                  value={formData.semester_grades[0].sem_no}
                  onChange={handleSemesterChange}
                  required
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                  placeholder="Enter semester"
                />
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-gray-800">Subjects</h3>
                <button
                  type="button"
                  onClick={addSubject}
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-200"
                >
                  Add Subject
                </button>
              </div>

              <div className="space-y-4">
                {formData.semester_grades[0].subjects.map((subject, index) => (
                  <div key={index} className="bg-gray-50 rounded-xl p-6 border border-gray-100 hover:border-blue-200 transition duration-200">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700">
                          Subject Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={subject.name}
                          onChange={(e) => handleSubjectChange(e, index)}
                          required
                          className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                          placeholder="Enter subject name"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700">
                          Final Marks
                        </label>
                        <input
                          type="number"
                          name="final_marks"
                          value={subject.final_marks}
                          onChange={(e) => handleSubjectChange(e, index)}
                          required
                          min="0"
                          max="100"
                          className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                          placeholder="Enter marks"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700">
                          Credits
                        </label>
                        <input
                          type="number"
                          name="credits"
                          value={subject.credits}
                          onChange={(e) => handleSubjectChange(e, index)}
                          required
                          min="1"
                          className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                          placeholder="Enter credits"
                        />
                      </div>
                    </div>
                    {formData.semester_grades[0].subjects.length > 1 && (
                      <button 
                        type="button"
                        onClick={() => removeSubject(index)}
                        className="mt-4 text-red-600 hover:text-red-800 text-sm font-medium transition duration-200"
                      >
                        Remove Subject
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-end pt-6">
              <button
                type="submit"
                disabled={loading}
                className={`px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-medium rounded-lg hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-200 ${
                  loading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {loading ? 'Issuing Certificate...' : 'Issue Certificate'}
              </button>
            </div>
          </form>

          {error && (
            <div className="mx-8 mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          {response && (
            <div className="mx-8 mb-6 p-4 bg-green-50 border border-green-200 rounded-xl">
              <p className="text-green-600 text-sm">Certificate issued successfully!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default IssueCertificate;