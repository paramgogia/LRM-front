import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Credits = () => {
  const [abcID, setAbcID] = useState('');
  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedSemester, setSelectedSemester] = useState(1);
  const [activeTab, setActiveTab] = useState('semester');
  const [redeemSuccess, setRedeemSuccess] = useState(false);
  const headers = {
    'username': 'SPIT',
    'organization': 'Org2',
    'identity': 'e5858d0503cc9fbef80ff51c2fcfd5567a127f9d01b7a50ea6b8f0bc3a8419ac'
  };

  // Calculate total credits
  const calculateTotalCredits = (data) => {
    if (!data) return 0;
    
    // Sum semester credits
    const semesterCredits = data.semester_grades?.reduce((total, semester) => {
      const semTotal = semester.subjects.reduce((sum, subject) => {
        // Convert each credit value to string and sum its digits
        const creditDigits = String(subject.credits).split('').reduce((a, b) => Number(a) + Number(b), 0);
        return sum + creditDigits;
      }, 0);
      return total + semTotal;
    }, 0) || 0;

    // Sum additional credits
    const additionalCredits = data.additional_credits?.reduce((total, credit) => {
      // Convert each credit value to string and sum its digits
      const creditDigits = String(credit.credits).split('').reduce((a, b) => Number(a) + Number(b), 0);
      return total + creditDigits;
    }, 0) || 0;

    return semesterCredits + additionalCredits;
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
      handleSubmit(new Event('submit'));
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
        {/* Header Section */}
        {studentData && (
          <div className="mb-8 flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center">
                <svg className="w-12 h-12 text-red-500" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-bold">{studentData.name}</h1>
                <div className="flex items-center gap-2">
                  <span className="text-3xl font-bold">{calculateTotalCredits(studentData)}</span>
                  <span className="text-gray-600">Total Academic Credits</span>
                </div>
              </div>
            </div>
            <div className="bg-red-100 p-4 rounded-lg">
              <div className="text-red-500 font-medium">Academic Bank of Credits</div>
              <div className="text-lg font-bold">2042-1020-5697</div>
            </div>
          </div>
        )}

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
            {/* Student Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {studentData.semester_grades?.map((semester) => (
                <div key={semester.sem_no} className="bg-white rounded-xl shadow-lg p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                      <span className="text-blue-600 font-bold">{semester.sem_no}</span>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Semester {semester.sem_no}</h3>
                      <p className="text-lg font-semibold text-gray-900">
                        {semester.subjects.reduce((sum, subject) => sum + subject.credits, 0)} Credits
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Tabs Section */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="border-b">
                <div className="flex">
                  <button
                    onClick={() => setActiveTab('semester')}
                    className={`px-6 py-3 font-medium ${
                      activeTab === 'semester'
                        ? 'text-blue-600 border-b-2 border-blue-600'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    Semester Grades
                  </button>
                  <button
                    onClick={() => setActiveTab('additional')}
                    className={`px-6 py-3 font-medium ${
                      activeTab === 'additional'
                        ? 'text-blue-600 border-b-2 border-blue-600'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    Other Credits
                  </button>
                </div>
              </div>

              <div className="p-6">
                {activeTab === 'semester' && (
                  <div className="space-y-6">
                    <div className="flex gap-2 flex-wrap">
                      {studentData.semester_grades?.map((sem) => (
                        <button
                          key={sem.sem_no}
                          onClick={() => setSelectedSemester(sem.sem_no)}
                          className={`px-4 py-2 rounded-lg ${
                            selectedSemester === sem.sem_no
                              ? 'bg-blue-600 text-white'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          Semester {sem.sem_no}
                        </button>
                      ))}
                    </div>

                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Subject</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Subject Code</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Credits</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Year</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Marks</th>
                        </tr>
                      </thead>
                      <tbody>
                        {studentData.semester_grades
                          .find(sem => sem.sem_no === selectedSemester)
                          ?.subjects.map((subject, index) => (
                            <tr key={index} className="border-b">
                              <td className="px-6 py-4">{subject.name}</td>
                              <td className="px-6 py-4">{subject.code || '-'}</td>
                              <td className="px-6 py-4">{subject.credits}</td>
                              <td className="px-6 py-4">{subject.year || '-'}</td>
                              <td className="px-6 py-4">{subject.final_marks}</td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {activeTab === 'additional' && (
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Course Name</th>
                        {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th> */}
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Credits</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Marks</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">College</th>
                      </tr>
                    </thead>
                    <tbody>
                      {studentData.additional_credits?.map((credit, index) => (
                        <tr key={index} className="border-b">
                          <td className="px-6 py-4">{credit.course_name}</td>
                          {/* <td className="px-6 py-4">{credit.type}</td> */}
                          <td className="px-6 py-4">{credit.credits}</td>
                          <td className="px-6 py-4">{credit.marks}</td>
                          <td className="px-6 py-4">{credit.college_name}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>

            {/* Credit Management */}
            {/* <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold mb-6">Credit Management</h2>
              <div className="flex gap-4">
                <button
                  onClick={handleRedeemCredits}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                  Redeem Credits
                </button>
                
              </div>
              {redeemSuccess && (
                <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg text-green-600">
                  Credits Redeemed Successfully
                </div>
              )}
            </div> */}
          </div>
        )}
      </div>
    </div>
  );
};

export default Credits;