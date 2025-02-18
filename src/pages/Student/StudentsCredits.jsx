import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Search, Clock, Award, BookOpen, ChevronDown, ChevronUp } from 'lucide-react';

const AcademicDashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [expandedCollege, setExpandedCollege] = useState(null);
  const [abcId, setAbcId] = useState('');
  const [page, setPage] = useState(1);

  const fetchData = async (id) => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:3000/view/super', {
        abcID: id
      });
      setData(response.data.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch data');
      setData(null);
    }
    setLoading(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (abcId.trim()) {
      fetchData(abcId);
    }
  };

  // Modified function to calculate total credits by summing all semester and additional credits
  const calculateTotalCredits = (data) => {
    if (!data) return 0;
    let total = 0;
    
    Object.entries(data).forEach(([key, college]) => {
      if (key !== 'NAD') {
        // Calculate college credits
        const collegeCredits = calculateCollegeCredits(college);
        total += collegeCredits;
      }
    });
    
    return total;
  };

  // New function to calculate credits for a specific college
  const calculateCollegeCredits = (college) => {
    let total = 0;
    
    // Sum semester credits
    if (college.semester_grades && college.semester_grades.length > 0) {
      college.semester_grades.forEach(semester => {
        if (semester.subjects && semester.subjects.length > 0) {
          semester.subjects.forEach(subject => {
            total += parseInt(subject.credits) || 0;
          });
        }
      });
    }
    
    // Sum additional credits
    if (college.additional_credits && college.additional_credits.length > 0) {
      college.additional_credits.forEach(credit => {
        total += parseInt(credit.credits) || 0;
      });
    }
    
    return total;
  };

  const handlePrevious = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNext = () => {
    setPage(page + 1);
  };

  const handleExpandCollege = (college) => {
    if (expandedCollege === college) {
      setExpandedCollege(null);
    } else {
      setExpandedCollege(college);
    }
  };

  // Calculate total credits using the modified function
  const totalCredits = calculateTotalCredits(data);

  // Get all colleges except NAD for display
  const getColleges = () => {
    if (!data) return [];
    
    // Map colleges with calculated credits
    return Object.entries(data)
      .filter(([key]) => key !== 'NAD')
      .map(([key, college]) => {
        // Calculate credits for this college
        const calculatedCredits = calculateCollegeCredits(college);
        
        // Create a new college object with calculated credits
        return [key, {
          ...college,
          total_credits: calculatedCredits
        }];
      });
  };

  // Get student name and ABC ID from NAD data
  const getStudentInfo = () => {
    if (!data || !data.NAD) return { name: '', abcId: '' };
    return {
      name: data.NAD.name,
      abcId: data.NAD.abcID
    };
  };

  const studentInfo = getStudentInfo();
  const colleges = getColleges();

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 py-2 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/api/placeholder/50/50" alt="Logo" className="h-12" />
            <span className="text-lg font-semibold text-blue-700">ACADEMIC BANK OF CREDITS</span>
            <span className="text-xs text-gray-500">Ministry of Education, Government of India</span>
          </div>
          <button className="px-4 py-1 border border-gray-300 rounded text-sm">Logout</button>
        </div>
      </div>

      {/* Search Section - Only show if no data */}
      {!data && (
        <div className="max-w-6xl mx-auto px-4 py-8">
          <form onSubmit={handleSubmit} className="max-w-xl mx-auto mb-8">
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">Enter ABC ID</h2>
              <div className="flex gap-3">
                <input
                  type="text"
                  value={abcId}
                  onChange={(e) => setAbcId(e.target.value)}
                  placeholder="Enter your ABC ID"
                  className="flex-1 px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
                />
                <button
                  type="submit"
                  className="px-8 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                >
                  <Search className="w-5 h-5" />
                </button>
              </div>
            </div>
          </form>
        </div>
      )}

      {loading && (
        <div className="flex justify-center py-12">
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {error && (
        <div className="bg-red-50 text-red-600 p-6 rounded-xl text-center font-medium max-w-6xl mx-auto mt-8">
          {error}
        </div>
      )}

      {data && (
        <div className="max-w-6xl mx-auto px-4 py-6">
          {/* Student Info Card */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
            <div className="flex p-4">
              {/* Left section with image and student info */}
              <div className="flex items-start gap-6 flex-1">
                <img 
                  src="/api/placeholder/150/150" 
                  alt="Student" 
                  className="w-28 h-28 rounded-sm object-cover" 
                />
                <div>
                  <h1 className="text-2xl font-semibold text-gray-800">
                    Hello<br />
                    {studentInfo.name} ! <span className="text-gray-400 text-sm">*</span>
                  </h1>
                  <div className="text-4xl font-bold mt-2">
                    {totalCredits}
                  </div>
                  <div className="text-sm text-gray-600">Total Academic Credit Points</div>
                </div>
              </div>
              
              {/* Right section with ABC card */}
              <div className="bg-red-400 text-white rounded-md p-4 w-[20rem]">
                <div className="text-lg font-semibold mb-2">ACADEMIC BANK OF CREDITS</div>
                <div className="text-sm mb-1">ABC ID</div>
                <div className="font-medium">{studentInfo.abcId}</div>
                <div className="text-sm mb-1 mt-2">{studentInfo.name}</div>
                <div className="flex items-center mt-2">
                  <img 
                    src="/api/placeholder/40/40" 
                    alt="Student" 
                    className="w-10 h-10 rounded-sm object-cover mr-2" 
                  />
                  <div className="text-xs">
                    We use basic information from your DigiLocker account to help you and allow access to our platform.
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Credit Points Accumulation */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Credit Points Accumulation</h2>
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 text-left">
                    <th className="py-2 px-4 text-sm text-gray-600 font-medium w-16">S.No.</th>
                    <th className="py-2 px-4 text-sm text-gray-600 font-medium">Academic Institution</th>
                    <th className="py-2 px-4 text-sm text-gray-600 font-medium">Course</th>
                    <th className="py-2 px-4 text-sm text-gray-600 font-medium">Session</th>
                    <th className="py-2 px-4 text-sm text-gray-600 font-medium">Credit Points</th>
                    <th className="py-2 px-4 text-sm text-gray-600 font-medium w-16">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {colleges.length > 0 ? colleges.map(([college, collegeData], index) => {
                    const admissionYear = new Date(collegeData.admission_date).getFullYear();
                    const sessionYears = `${admissionYear}-${admissionYear + 4}`;
                    return (
                      <React.Fragment key={college}>
                        <tr className="border-t">
                          <td className="py-3 px-4">{index + 1}</td>
                          <td className="py-3 px-4">{college}</td>
                          <td className="py-3 px-4">{collegeData.course} - {collegeData.specialization}</td>
                          <td className="py-3 px-4">{sessionYears}</td>
                          <td className="py-3 px-4">{collegeData.total_credits}</td>
                          <td className="py-3 px-4 text-center">
                            <button 
                              onClick={() => handleExpandCollege(college)}
                              className="text-gray-500 hover:text-blue-600"
                            >
                              {expandedCollege === college ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                            </button>
                          </td>
                        </tr>
                        {expandedCollege === college && (
                          <tr>
                            <td colSpan="6" className="p-0 border-t">
                              <div className="bg-gray-50 p-4 divide-y">
                                {/* Semester Grades */}
                                <div className="py-4">
                                  <h3 className="text-lg font-semibold mb-4">Semester Grades</h3>
                                  {collegeData.semester_grades && collegeData.semester_grades.length > 0 ? (
                                    <div className="space-y-6">
                                      {collegeData.semester_grades.map((semester, semIdx) => (
                                        <div key={semIdx} className="bg-white p-4 rounded-lg shadow-sm">
                                          <h4 className="text-md font-medium mb-3">Semester {semester.sem_no}</h4>
                                          <table className="w-full text-sm">
                                            <thead>
                                              <tr className="bg-gray-100">
                                                <th className="py-2 px-3 text-left">Subject</th>
                                                <th className="py-2 px-3 text-right">Marks</th>
                                                <th className="py-2 px-3 text-right">Credits</th>
                                                <th className="py-2 px-3 text-right">Attempts</th>
                                              </tr>
                                            </thead>
                                            <tbody className="divide-y">
                                              {semester.subjects.map((subject, subIdx) => (
                                                <tr key={subIdx}>
                                                  <td className="py-2 px-3">{subject.name}</td>
                                                  <td className="py-2 px-3 text-right">{subject.final_marks}</td>
                                                  <td className="py-2 px-3 text-right">{subject.credits}</td>
                                                  <td className="py-2 px-3 text-right">{subject.attempts}</td>
                                                </tr>
                                              ))}
                                            </tbody>
                                          </table>
                                        </div>
                                      ))}
                                    </div>
                                  ) : (
                                    <div className="text-gray-500 italic">No semester data available</div>
                                  )}
                                </div>
                                
                                {/* Additional Credits */}
                                {collegeData.additional_credits && collegeData.additional_credits.length > 0 && (
                                  <div className="py-4">
                                    <h3 className="text-lg font-semibold mb-4">Additional Credits</h3>
                                    <div className="bg-white p-4 rounded-lg shadow-sm">
                                      <table className="w-full text-sm">
                                        <thead>
                                          <tr className="bg-gray-100">
                                            <th className="py-2 px-3 text-left">Course</th>
                                            <th className="py-2 px-3 text-left">College</th>
                                            <th className="py-2 px-3 text-right">Marks</th>
                                            <th className="py-2 px-3 text-right">Credits</th>
                                          </tr>
                                        </thead>
                                        <tbody className="divide-y">
                                          {collegeData.additional_credits.map((credit, idx) => (
                                            <tr key={idx}>
                                              <td className="py-2 px-3">{credit.course_name}</td>
                                              <td className="py-2 px-3">{credit.college_name}</td>
                                              <td className="py-2 px-3 text-right">{credit.marks}</td>
                                              <td className="py-2 px-3 text-right">{credit.credits}</td>
                                            </tr>
                                          ))}
                                        </tbody>
                                      </table>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    );
                  }) : (
                    <tr className="border-t">
                      <td colSpan="6" className="py-3 px-4 text-center">No Records Found</td>
                    </tr>
                  )}
                </tbody>
              </table>
              <div className="flex justify-between items-center p-4 border-t">
                <div className="text-sm text-gray-600">
                  Showing {colleges.length > 0 ? 1 : 0} to {colleges.length} of {colleges.length} entries
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={handlePrevious}
                    className="px-3 py-1 text-sm border rounded text-gray-500 hover:bg-gray-50"
                  >
                    Previous
                  </button>
                  <span className="px-3 py-1 text-sm bg-blue-50 border border-blue-200 rounded">1</span>
                  <button 
                    onClick={handleNext}
                    className="px-3 py-1 text-sm border rounded text-gray-500 hover:bg-gray-50"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Credit Points Transfer History */}
          <div>
            <h2 className="text-lg font-semibold mb-2">Credit Points Transfer History</h2>
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 text-left">
                    <th className="py-2 px-4 text-sm text-gray-600 font-medium w-16">S.No.</th>
                    <th className="py-2 px-4 text-sm text-gray-600 font-medium">Request Date</th>
                    <th className="py-2 px-4 text-sm text-gray-600 font-medium">Transfer Date</th>
                    <th className="py-2 px-4 text-sm text-gray-600 font-medium">Beneficiary Institution</th>
                    <th className="py-2 px-4 text-sm text-gray-600 font-medium">Redeemer Institution</th>
                    <th className="py-2 px-4 text-sm text-gray-600 font-medium">Credit Points</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t">
                    <td colSpan="6" className="py-3 px-4 text-center">No Records Found</td>
                  </tr>
                </tbody>
              </table>
              <div className="flex justify-between items-center p-4 border-t">
                <div className="text-sm text-gray-600">Showing 0 to 0 of 0 entries</div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={handlePrevious}
                    className="px-3 py-1 text-sm border rounded text-gray-500 hover:bg-gray-50"
                  >
                    Previous
                  </button>
                  <button 
                    onClick={handleNext}
                    className="px-3 py-1 text-sm border rounded text-gray-500 hover:bg-gray-50"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AcademicDashboard;