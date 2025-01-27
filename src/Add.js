import { useState } from 'react';

const AdditionalCreditsPage = () => {
  const [activeTab, setActiveTab] = useState('student-info');
  const [formData, setFormData] = useState({
    abcID: '',
    college: '',
    additional_credits: {
      type: 'NPTEL/MOOCs',
      credits: '',
      course_name: '',
      marks: '',
      college_name: ''
    }
  });

  const studentData = {
    abcID: "2511BVuf9Uy8",
    name: "Atharva Patil",
    dob: "1997-04-23",
    course: "Electronics Engineering",
    specialization: "VLSI Design",
    course_code: "ECE101",
    admission_date: "2025-01-11",
    total_credits: 9,
    semester_grades: [
      {
        sem_no: 1,
        subjects: [
          {
            name: "Engineering Calculus",
            final_marks: 88,
            credits: 3,
            attempts: 2
          },
          {
            name: "Engineering Physics",
            final_marks: 88,
            credits: 3,
            attempts: 1
          },
          {
            name: "Engineering Chemistry",
            final_marks: 92,
            credits: 3,
            attempts: 1
          }
        ]
      }
    ]
  };

 
  const [errors, setErrors] = useState({});
  const creditTypes = ['NPTEL/MOOCs', 'Internship', 'Other College'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('additional_credits.')) {
      const field = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        additional_credits: {
          ...prev.additional_credits,
          [field]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    
    // Validation
    if (!formData.additional_credits.type) {
      newErrors.type = 'Type is required';
    }
    if (!formData.additional_credits.credits) {
      newErrors.credits = 'Credits are required';
    }
    if (!formData.additional_credits.course_name) {
      newErrors.course_name = 'Course name is required';
    }
    if (!formData.additional_credits.marks) {
      newErrors.marks = 'Marks are required';
    }
    if (formData.additional_credits.type === 'Other College' && !formData.additional_credits.college_name) {
      newErrors.college_name = 'College name is required for Other College type';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log('Form submitted:', formData);
      // Add your API call here
    }
  };
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-80 bg-gradient-to-b from-gray-800 to-gray-900 text-white p-6">
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-2">Student Dashboard</h2>
          <div className="text-gray-400 text-sm">ABC ID: {studentData.abcID}</div>
        </div>

        <div className="mb-8 border-b border-gray-700 pb-6">
          <div className="bg-gray-700/50 rounded-lg p-4 mb-4">
            <h3 className="text-lg font-semibold mb-4">{studentData.name}</h3>
            <div className="space-y-2 text-sm text-gray-300">
              <p>DOB: {formatDate(studentData.dob)}</p>
              <p>Course: {studentData.course}</p>
              <p>Specialization: {studentData.specialization}</p>
              <p>Total Credits: {studentData.total_credits}</p>
            </div>
          </div>
        </div>

        <nav>
          <ul className="space-y-2">
            <li 
              className={`p-3 rounded-lg cursor-pointer transition-all ${
                activeTab === 'student-info' 
                  ? 'bg-blue-600 text-white' 
                  : 'hover:bg-gray-700'
              }`}
              onClick={() => setActiveTab('student-info')}
            >
              Student Information
            </li>
            <li 
              className={`p-3 rounded-lg cursor-pointer transition-all ${
                activeTab === 'additional-credits' 
                  ? 'bg-blue-600 text-white' 
                  : 'hover:bg-gray-700'
              }`}
              onClick={() => setActiveTab('additional-credits')}
            >
              Additional Credits
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6">
          {activeTab === 'student-info' ? (
            <div>
              <h1 className="text-2xl font-bold mb-6">Academic Information</h1>
              <div className="space-y-6">
                <div className="border rounded-lg p-4">
                  <h2 className="text-lg font-semibold mb-4">Semester 1 Grades</h2>
                  <div className="space-y-4">
                    {studentData.semester_grades[0].subjects.map((subject, index) => (
                      <div key={index} className="flex justify-between items-center border-b pb-2">
                        <div>
                          <p className="font-medium">{subject.name}</p>
                          <p className="text-sm text-gray-600">Credits: {subject.credits} | Attempts: {subject.attempts}</p>
                        </div>
                        <div className="text-lg font-semibold">{subject.final_marks}%</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            // Additional Credits Form (existing form structure remains the same)
            <div>
              <h1 className="text-2xl font-bold mb-6">Add Additional Credits</h1>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium">ABC ID</label>
              <input
                type="text"
                name="abcID"
                value={formData.abcID}
                onChange={handleChange}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium">College</label>
              <input
                type="text"
                name="college"
                value={formData.college}
                onChange={handleChange}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium">Credit Type</label>
              <select
                name="additional_credits.type"
                value={formData.additional_credits.type}
                onChange={handleChange}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
              >
                {creditTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
              {errors.type && <p className="text-red-500 text-sm">{errors.type}</p>}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium">Credits</label>
              <input
                type="number"
                name="additional_credits.credits"
                value={formData.additional_credits.credits}
                onChange={handleChange}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
              />
              {errors.credits && <p className="text-red-500 text-sm">{errors.credits}</p>}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium">Course Name</label>
              <input
                type="text"
                name="additional_credits.course_name"
                value={formData.additional_credits.course_name}
                onChange={handleChange}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
              />
              {errors.course_name && <p className="text-red-500 text-sm">{errors.course_name}</p>}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium">Marks</label>
              <input
                type="number"
                name="additional_credits.marks"
                value={formData.additional_credits.marks}
                onChange={handleChange}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
              />
              {errors.marks && <p className="text-red-500 text-sm">{errors.marks}</p>}
            </div>

            {formData.additional_credits.type === 'Other College' && (
              <div className="space-y-2">
                <label className="block text-sm font-medium">College Name</label>
                <input
                  type="text"
                  name="additional_credits.college_name"
                  value={formData.additional_credits.college_name}
                  onChange={handleChange}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                />
                {errors.college_name && <p className="text-red-500 text-sm">{errors.college_name}</p>}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors"
            >
              Submit
            </button>
          </form>
          </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdditionalCreditsPage;