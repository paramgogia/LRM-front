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
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Issue Certificate</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label htmlFor="abcID" className="block text-sm font-medium text-gray-700">
                  ABC ID
                </label>
                <input
                  type="text"
                  id="abcID"
                  name="abcID"
                  value={formData.abcID}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
                />
              </div>

              <div>
                <label htmlFor="course" className="block text-sm font-medium text-gray-700">
                  Course
                </label>
                <input
                  type="text"
                  id="course"
                  name="course"
                  value={formData.course}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
                />
              </div>

              <div>
                <label htmlFor="semester" className="block text-sm font-medium text-gray-700">
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
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
                  placeholder="Enter semester (1-8)"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900">Subjects</h3>
                <button
                  type="button"
                  onClick={addSubject}
                  className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Add Subject
                </button>
              </div>

              {formData.semester_grades[0].subjects.map((subject, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Subject Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={subject.name}
                        onChange={(e) => handleSubjectChange(e, index)}
                        required
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
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
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Credits
                      </label>
                      <input
                        type="number"
                        name="credits"
                        value={subject.credits}
                        onChange={(e) => handleSubjectChange(e, index)}
                        required
                        min="1"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
                      />
                    </div>
                  </div>
                  {formData.semester_grades[0].subjects.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeSubject(index)}
                      className="text-red-600 hover:text-red-800 text-sm font-medium"
                    >
                      Remove Subject
                    </button>
                  )}
                </div>
              ))}
            </div>

            <div className="flex items-center justify-end">
              <button
                type="submit"
                disabled={loading}
                className={`px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                  loading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {loading ? 'Issuing...' : 'Issue Certificate'}
              </button>
            </div>
          </form>

          {error && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600">{error}</p>
            </div>
          )}

          {response && (
            <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-green-600">Certificate issued successfully!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default IssueCertificate;