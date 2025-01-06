import { useState } from 'react';

const AdditionalCreditsPage = () => {
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

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white p-6">
        <h2 className="text-2xl font-semibold mb-6">Dashboard</h2>
        <nav>
          <ul className="space-y-2">
            <li className="p-2 bg-gray-700 rounded">Additional Credits</li>
            <li className="p-2 hover:bg-gray-700 rounded">Other Menu Item</li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
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
      </div>
    </div>
  );
};

export default AdditionalCreditsPage;