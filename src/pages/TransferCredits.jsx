import React, { useState } from 'react';
import axios from 'axios';

const TransferCredits = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    abcID: '',
    college: '',
    additional_credits: {
      type: 'Other College',
      credits: '',
      course_name: '',
      marks: '',
      college_name: ''
    }
  });
  const headers = {
    'username': 'SPIT',
    'organization': 'Org2',
    'identity': 'e5858d0503cc9fbef80ff51c2fcfd5567a127f9d01b7a50ea6b8f0bc3a8419ac'
  };
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    // Validate form data
    if (!formData.abcID || !formData.college || 
        !formData.additional_credits.credits || 
        !formData.additional_credits.course_name || 
        !formData.additional_credits.marks || 
        !formData.additional_credits.college_name) {
      setError('Please fill in all required fields');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:3000/certificate/college/transfer-credits',
        formData,
        
          { headers }
        
      );

      if (response.status === 200) {
        setSuccess(true);
        // Reset form after successful submission
        setFormData({
          abcID: '',
          college: '',
          additional_credits: {
            type: 'Other College',
            credits: '',
            course_name: '',
            marks: '',
            college_name: ''
          }
        });
      }
    } catch (err) {
      setError(err.message || 'An error occurred while transferring credits');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-md p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Credit Transfer Form
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              ABC ID
            </label>
            <input
              type="text"
              name="abcID"
              value={formData.abcID}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Current College
            </label>
            <input
              type="text"
              name="college"
              value={formData.college}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="border-t pt-4 mt-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Transfer Credits Form
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Course Name
                </label>
                <input
                  type="text"
                  name="additional_credits.course_name"
                  value={formData.additional_credits.course_name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Credits
                </label>
                <input
                  type="number"
                  name="additional_credits.credits"
                  value={formData.additional_credits.credits}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Marks
                </label>
                <input
                  type="number"
                  name="additional_credits.marks"
                  value={formData.additional_credits.marks}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  College Name (Form where the course was done)
                </label>
                <input
                  type="text"
                  name="additional_credits.college_name"
                  value={formData.additional_credits.college_name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 px-4 rounded-md text-white font-medium transition-colors mt-6
              ${loading 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-700'
              }`}
          >
            {loading ? 'Processing...' : 'Transfer Credits'}
          </button>
        </form>

        {success && (
          <div className="mt-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-md">
            Credits transferred successfully!
          </div>
        )}

        {error && (
          <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md">
            {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default TransferCredits;