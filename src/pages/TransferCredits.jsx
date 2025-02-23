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

  const creditTypes = ["NPTEL/MOOCs", "Internship", "Other College"];

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
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-blue-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-6">
            <h2 className="text-3xl font-bold text-white text-center">
              Credit Transfer Form
            </h2>
            <p className="text-blue-100 text-center mt-2">
              Transfer your academic credits seamlessly
            </p>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-8">
            {/* Basic Info Section */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ABC ID
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <input
                  type="text"
                  name="abcID"
                  value={formData.abcID}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 shadow-sm"
                  placeholder="Enter your ABC ID"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Current College
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <input
                  type="text"
                  name="college"
                  value={formData.college}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 shadow-sm"
                  placeholder="Enter your current college name"
                  required
                />
              </div>
            </div>

            {/* Transfer Credits Section */}
            <div className="border-t border-gray-200 pt-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-6">
                Transfer Credits Details
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Credit Type
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <select
                    name="additional_credits.type"
                    value={formData.additional_credits.type}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 shadow-sm bg-white"
                    required
                  >
                    {creditTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Course Name
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <input
                    type="text"
                    name="additional_credits.course_name"
                    value={formData.additional_credits.course_name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 shadow-sm"
                    placeholder="Enter course name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Credits
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <input
                    type="number"
                    name="additional_credits.credits"
                    value={formData.additional_credits.credits}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 shadow-sm"
                    placeholder="Enter credits"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Marks
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <input
                    type="number"
                    name="additional_credits.marks"
                    value={formData.additional_credits.marks}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 shadow-sm"
                    placeholder="Enter marks"
                    required
                  />
                </div>

                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    College Name
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <input
                    type="text"
                    name="additional_credits.college_name"
                    value={formData.additional_credits.college_name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 shadow-sm"
                    placeholder="Enter college name"
                    required
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-4 px-6 rounded-lg text-white font-semibold text-lg transition-all duration-200 transform hover:scale-[1.02] ${
                loading
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 active:scale-[0.98] shadow-lg'
              }`}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Processing...
                </span>
              ) : (
                'Transfer Credits'
              )}
            </button>
          </form>

          {/* Success Message */}
          {success && (
            <div className="mx-8 mb-8 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center">
              <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
              </svg>
              <span className="text-green-700 font-medium">Credits transferred successfully!</span>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mx-8 mb-8 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center">
              <svg className="w-5 h-5 text-red-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"/>
              </svg>
              <span className="text-red-700 font-medium">{error}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TransferCredits;