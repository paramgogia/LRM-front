import React, { useState } from 'react';
import axios from 'axios';
import { AlertCircle, CheckCircle, Copy, Clipboard, Award } from 'lucide-react';

const RedeemCreditsComponent = () => {
  const [abcID, setAbcID] = useState('');
  const [minCredits, setMinCredits] = useState(3);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);

  const handleRedeemCredits = async () => {
    setLoading(true);
    setError(null);
    setResponse(null);

    const headers = {
      'username': 'SPIT',
      'organization': 'Org2',
      'identity': 'e5858d0503cc9fbef80ff51c2fcfd5567a127f9d01b7a50ea6b8f0bc3a8419ac'
    };

    try {
      const res = await axios.post('http://localhost:3000/certificate/college/redeem-credits', {
        abcID,
        min_credits: minCredits
      }, { headers });
      setResponse(res.data);
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred while redeeming credits');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (response) {
      navigator.clipboard.writeText(JSON.stringify(response, null, 2));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="flex flex-col p-6 max-w-4xl mx-auto bg-white shadow-xl rounded-xl">
      <div className="flex items-center mb-6">
        <Award className="w-8 h-8 text-indigo-600 mr-3" />
        <h1 className="text-2xl font-bold text-gray-800">Redeem Credits System</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <h2 className="text-lg font-semibold mb-4 text-gray-700">Request Parameters</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="abcID">
                ABC ID
              </label>
              <input
                id="abcID"
                type="text"
                value={abcID}
                onChange={(e) => setAbcID(e.target.value)}
                placeholder="Enter ABC ID"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="minCredits">
                Minimum Credits
              </label>
              <input
                id="minCredits"
                type="number"
                value={minCredits}
                onChange={(e) => setMinCredits(parseInt(e.target.value) || 0)}
                min="0"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <button
              onClick={handleRedeemCredits}
              disabled={loading || !abcID}
              className={`w-full py-2 px-4 rounded-md text-white font-medium transition duration-200 ${
                loading || !abcID
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-indigo-600 hover:bg-indigo-700'
              }`}
            >
              {loading ? 'Processing...' : 'Redeem Credits'}
            </button>
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-4 text-gray-700">Response</h2>
          <div className="border border-gray-200 rounded-lg p-4 h-full bg-gray-50 relative">
            {error && (
              <div className="flex items-center p-3 text-red-600 bg-red-50 rounded-md mb-4">
                <AlertCircle className="w-5 h-5 mr-2" />
                <span>{error}</span>
              </div>
            )}
            {response ? (
              <>
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center text-green-600">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    <span className="font-medium">Success</span>
                  </div>
                  <button
                    onClick={copyToClipboard}
                    className="text-gray-500 hover:text-indigo-600 focus:outline-none"
                    title="Copy to clipboard"
                  >
                    {copied ? (
                      <div className="flex items-center text-green-600">
                        <Clipboard className="w-5 h-5 mr-1" />
                        <span className="text-xs">Copied!</span>
                      </div>
                    ) : (
                      <Copy className="w-5 h-5" />
                    )}
                  </button>
                </div>
                <div className="overflow-y-auto max-h-72">
                  <div className="mb-3">
                    <p className="text-sm font-semibold text-green-600">{response.message}</p>
                  </div>
                  {response.studentData && (
                    <div className="space-y-3">
                      <div className="flex flex-col md:flex-row md:gap-4">
                        <div className="flex-1">
                          <h3 className="text-sm font-semibold text-gray-700">Student Details</h3>
                          <div className="mt-1 text-xs text-gray-600 space-y-1">
                            <p><span className="font-medium">Name:</span> {response.studentData.name}</p>
                            <p><span className="font-medium">ABC ID:</span> {response.studentData.abcID}</p>
                            <p><span className="font-medium">Course:</span> {response.studentData.course} - {response.studentData.specialization}</p>
                            <p><span className="font-medium">Course Code:</span> {response.studentData.course_code}</p>
                            <p><span className="font-medium">Admission Date:</span> {new Date(response.studentData.admission_date).toLocaleDateString()}</p>
                          </div>
                        </div>
                        <div className="flex-1 mt-3 md:mt-0">
                          <h3 className="text-sm font-semibold text-gray-700">Credit Information</h3>
                          <div className="mt-1 text-xs text-gray-600 space-y-1">
                            <p><span className="font-medium">Total Credits:</span> {response.studentData.total_credits}</p>
                            <p><span className="font-medium">Frozen Credits:</span> {response.studentData.credits_frozen}</p>
                            <p><span className="font-medium">Graduation Status:</span> {response.studentData.is_graduated ? 'Graduated' : 'Not Graduated'}</p>
                            <p><span className="font-medium">Dropout Status:</span> {response.studentData.is_dropout ? 'Dropped Out' : 'Active'}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="text-center text-gray-500 h-full flex flex-col justify-center items-center">
                <p className="mb-2">No data to display</p>
                <p className="text-xs">Submit the form to see results</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {response && response.studentData && (
        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-4 text-gray-700">Student Details</h2>
          <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-2">Semester Grades</h3>
                {response.studentData.semester_grades.length > 0 ? (
                  <div className="space-y-3">
                    {response.studentData.semester_grades.map((sem, idx) => (
                      <div key={idx} className="bg-white p-3 rounded-md shadow-sm">
                        <p className="text-xs font-semibold mb-2">Semester {sem.sem_no}</p>
                        {sem.subjects.map((subject, subIdx) => (
                          <div key={subIdx} className="text-xs text-gray-600 mb-1">
                            <div className="flex justify-between">
                              <span>{subject.name}</span>
                              <span className="font-medium">{subject.final_marks}</span>
                            </div>
                            <div className="flex justify-between text-gray-500">
                              <span>Credits: {subject.credits}</span>
                              <span>Attempts: {subject.attempts}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-gray-500">No semester grades available</p>
                )}
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-2">Additional Credits</h3>
                {response.studentData.additional_credits.length > 0 ? (
                  <div className="space-y-3">
                    {response.studentData.additional_credits.map((credit, idx) => (
                      <div key={idx} className="bg-white p-3 rounded-md shadow-sm">
                        <p className="text-xs font-semibold">{credit.type}</p>
                        <div className="text-xs text-gray-600 mt-1">
                          <p><span className="font-medium">Course:</span> {credit.course_name}</p>
                          <p><span className="font-medium">Credits:</span> {credit.credits}</p>
                          <p><span className="font-medium">Marks:</span> {credit.marks}</p>
                          <p><span className="font-medium">College:</span> {credit.college_name}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-gray-500">No additional credits available</p>
                )}
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-2">Permissions</h3>
                {response.studentData.permission.length > 0 ? (
                  <div className="space-y-3">
                    {response.studentData.permission.map((perm, idx) => (
                      <div key={idx} className="bg-white p-3 rounded-md shadow-sm">
                        <p className="text-xs font-semibold">{perm.org}</p>
                        <div className="text-xs text-gray-600 mt-1">
                          <p><span className="font-medium">Access:</span> {perm.access.join(', ')}</p>
                          <p><span className="font-medium">One-time access:</span> {perm.one_time_access ? 'Yes' : 'No'}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-gray-500">No permissions available</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RedeemCreditsComponent;