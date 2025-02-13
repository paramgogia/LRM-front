import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Credits = () => {
  const [abcID, setAbcID] = useState('');
  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedSemester, setSelectedSemester] = useState(1);
  const [activeTab, setActiveTab] = useState('semester'); // New state for tab control
  const [redeemSuccess, setRedeemSuccess] = useState(false);
  const headers = {
    'username': 'SPIT',
    'organization': 'Org2',
    'identity': 'e5858d0503cc9fbef80ff51c2fcfd5567a127f9d01b7a50ea6b8f0bc3a8419ac'
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setRedeemSuccess(false);
    try {
      const response = await axios.post('http://localhost:3000/view/certificate', {
        abcID,
        college: "SPIT"
      }, { headers });

      setStudentData(response.data.data);
    } catch (err) {
      setError(err.message || 'Failed to fetch student data');
    } finally {
      setLoading(false);
    }
  };

  const handleRedeemCredits = async () => {
    try {
      const response = await axios.post('http://localhost:3000/certificate/college/redeem-credits', {
        abcID,
        min_credits: 10
      }, { headers });
      setRedeemSuccess(true);
      // Refresh data after redeeming credits
      handleSubmit(new Event('submit'));
      console.log(response);
    } catch (err) {
      setError(err.message || 'Failed to redeem credits');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse space-y-4">
            <div className="h-12 bg-gray-200 rounded-lg w-1/3"></div>
            <div className="h-64 bg-gray-200 rounded-lg"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Search Form */}
        <form onSubmit={handleSubmit} className="mb-8">
          <div className="flex gap-4">
            <input
              type="text"
              value={abcID}
              onChange={(e) => setAbcID(e.target.value)}
              placeholder="Enter ABC ID"
              className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              Search
            </button>
          </div>
        </form>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
            {error}
          </div>
        )}

        {studentData && (
          <div className="space-y-8">
            {/* Student Info Card */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h3 className="text-sm font-medium text-gray-500">Name</h3>
                  <p className="text-lg font-semibold text-gray-900">{studentData.name}</p>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg">
                  <h3 className="text-sm font-medium text-gray-500">Course</h3>
                  <p className="text-lg font-semibold text-gray-900">{studentData.course}</p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <h3 className="text-sm font-medium text-gray-500">Specialization</h3>
                  <p className="text-lg font-semibold text-gray-900">{studentData.specialization}</p>
                </div>
                <div className="p-4 bg-yellow-50 rounded-lg">
                  <h3 className="text-sm font-medium text-gray-500">Course Code</h3>
                  <p className="text-lg font-semibold text-gray-900">{studentData.course_code}</p>
                </div>
              </div>
            </div>

            {/* Credits Overview */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold mb-6">Credits Overview</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-gray-600">Total Credits Required</p>
                  <p className="text-3xl font-bold text-blue-600">{studentData.total_credits}</p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <p className="text-sm text-gray-600">Additional Credits</p>
                  <p className="text-3xl font-bold text-green-600">
                    {studentData.additional_credits?.length || 0}
                  </p>
                </div>
              </div>

              <button
                onClick={handleRedeemCredits}
                className="w-full md:w-auto px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                Redeem Credits
              </button>
              {redeemSuccess && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-600">
            Credits Redeemed Successfully
          </div>
        )}

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
            {error}
          </div>
        )}
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex gap-4 mb-6">
                <button
                  onClick={() => setActiveTab('semester')}
                  className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
                    activeTab === 'semester'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Semester Grades
                </button>
                <button
                  onClick={() => setActiveTab('additional')}
                  className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
                    activeTab === 'additional'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Additional Credits
                </button>
              </div>

              {/* Semester Grades Content */}
              {activeTab === 'semester' && studentData.semester_grades?.length > 0 && (
                <div>
                  <div className="flex gap-2 mb-6 flex-wrap">
                    {studentData.semester_grades.map((sem) => (
                      <button
                        key={sem.sem_no}
                        onClick={() => setSelectedSemester(sem.sem_no)}
                        className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
                          selectedSemester === sem.sem_no
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        Semester {sem.sem_no}
                      </button>
                    ))}
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Subject
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Credits
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Marks
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {studentData.semester_grades
                          .find(sem => sem.sem_no === selectedSemester)
                          ?.subjects.map((subject, index) => (
                            <tr key={index} className="hover:bg-gray-50">
                              <td className="px-6 py-4 whitespace-nowrap">{subject.name}</td>
                              <td className="px-6 py-4 whitespace-nowrap">{subject.credits}</td>
                              <td className="px-6 py-4 whitespace-nowrap">{subject.final_marks}</td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Additional Credits Content */}
              {activeTab === 'additional' && studentData.additional_credits?.length > 0 && (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Course Name
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Type
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Credits
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Marks
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          College
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {studentData.additional_credits.map((credit, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">{credit.course_name}</td>
                          <td className="px-6 py-4 whitespace-nowrap">{credit.type}</td>
                          <td className="px-6 py-4 whitespace-nowrap">{credit.credits}</td>
                          <td className="px-6 py-4 whitespace-nowrap">{credit.marks}</td>
                          <td className="px-6 py-4 whitespace-nowrap">{credit.college_name}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Credits;