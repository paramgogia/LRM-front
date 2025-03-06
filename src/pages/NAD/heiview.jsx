import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Search, Clock, Award, BookOpen, ChevronDown, ChevronUp } from 'lucide-react';
import nad from '../../assets/nad.png';
import stu from '../../assets/stud.png';

const AcademicDashboardhei = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [expandedCollege, setExpandedCollege] = useState(null);
  const [abcId, setAbcId] = useState('');
  const [page, setPage] = useState(1);
  const [accessLevel, setAccessLevel] = useState('Basic Credit Summary');
  const [verificationResult, setVerificationResult] = useState(null);

  const fetchData = async (id) => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:3000/view/super', {
        abcID: id
      });
      setData(response.data.data);
      
      // Verify credits after data is loaded based on the selected access level
      verifyCredits(response.data.data, accessLevel);
      
      setError(null);
    } catch (err) {
      setError('Failed to fetch data');
      setData(null);
    }
    setLoading(false);
  };

  const verifyCredits = (studentData, accessLevel) => {
    // Implementation of the VERIFYCREDITS algorithm from the images
    const result = {};
    
    // Calculate total credits regardless of access level
    const totalCredits = calculateTotalCredits(studentData);
    result.totalCredits = totalCredits;
    
    // Only include degree eligibility for higher access levels
    if (accessLevel !== "Basic Credit Summary") {
      result.degreeEligible = checkDegreeEligibility(totalCredits);
    }
    
    if (accessLevel === "Annual Credit Distribution") {
      result.yearlyCredits = getYearlyDistribution(studentData);
    } 
    else if (accessLevel === "Semester Credit Breakdown" || accessLevel === "Comprehensive Credit Analysis") {
      result.semesterCredits = getSemesterDistribution(studentData);
      
      if (accessLevel === "Comprehensive Credit Analysis") {
        result.courseCompletion = getCourseCompletionRecords(studentData);
        result.attemptDetails = getAttemptDetails(studentData);
      }
    }
    
    setVerificationResult(result);
  };
  
  const getAttemptDetails = (studentData) => {
    // Gather attempt details for all courses
    const attemptDetails = [];
    
    if (!studentData) return attemptDetails;
    
    Object.entries(studentData).forEach(([college, collegeData]) => {
      if (college !== 'NAD' && collegeData.semester_grades) {
        collegeData.semester_grades.forEach(semester => {
          if (semester.subjects) {
            semester.subjects.forEach(subject => {
              if (parseInt(subject.attempts) > 1) {
                attemptDetails.push({
                  college: college,
                  semester: semester.sem_no,
                  subject: subject.name,
                  attempts: subject.attempts,
                  finalMarks: subject.final_marks,
                  credits: subject.credits
                });
              }
            });
          }
        });
      }
    });
    
    return attemptDetails;
  };
  
  const checkDegreeEligibility = (totalCredits) => {
    // Implementation of CHECKDEGREEELIGIBILITY algorithm
    if (totalCredits >= 160) {
      return "Eligible for Bachelor's Degree (Honors)";
    } else if (totalCredits >= 120) {
      return "Eligible for Bachelor's Degree";
    } else if (totalCredits >= 80) {
      return "Eligible for Undergraduate Diploma";
    } else if (totalCredits >= 40) {
      return "Eligible for Undergraduate Certificate";
    } else {
      return "Not Eligible for Any Degree";
    }
  };
  
  const getYearlyDistribution = (studentData) => {
    // This would calculate yearly distribution of credits
    // Simplified implementation for demo
    const yearlyCredits = {};
    
    if (!studentData) return yearlyCredits;
    
    Object.entries(studentData).forEach(([college, collegeData]) => {
      if (college !== 'NAD' && collegeData.semester_grades) {
        // Group semesters by year
        collegeData.semester_grades.forEach(semester => {
          // Assuming each year has 2 semesters
          const year = Math.ceil(semester.sem_no / 2);
          if (!yearlyCredits[year]) yearlyCredits[year] = 0;
          
          if (semester.subjects) {
            semester.subjects.forEach(subject => {
              yearlyCredits[year] += parseInt(subject.credits) || 0;
            });
          }
        });
      }
    });
    
    return yearlyCredits;
  };
  
  const getSemesterDistribution = (studentData) => {
    // This would calculate semester distribution of credits
    // Simplified implementation for demo
    const semesterCredits = {};
    
    if (!studentData) return semesterCredits;
    
    Object.entries(studentData).forEach(([college, collegeData]) => {
      if (college !== 'NAD' && collegeData.semester_grades) {
        collegeData.semester_grades.forEach(semester => {
          const semKey = `Semester ${semester.sem_no}`;
          if (!semesterCredits[semKey]) semesterCredits[semKey] = 0;
          
          if (semester.subjects) {
            semester.subjects.forEach(subject => {
              semesterCredits[semKey] += parseInt(subject.credits) || 0;
            });
          }
        });
      }
    });
    
    return semesterCredits;
  };
  
  const getCourseCompletionRecords = (studentData) => {
    // This would gather course completion information
    // Simplified implementation for demo
    const completedCourses = [];
    
    if (!studentData) return completedCourses;
    
    Object.entries(studentData).forEach(([college, collegeData]) => {
      if (college !== 'NAD' && collegeData.semester_grades) {
        collegeData.semester_grades.forEach(semester => {
          if (semester.subjects) {
            semester.subjects.forEach(subject => {
              completedCourses.push({
                name: subject.name,
                college: college,
                credits: subject.credits,
                marks: subject.final_marks,
                attempts: subject.attempts
              });
            });
          }
        });
      }
    });
    
    return completedCourses;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (abcId.trim()) {
      fetchData(abcId);
    }
  };

  const calculateTotalCredits = (data) => {
    if (!data) return 0;
    let total = 0;
    
    Object.entries(data).forEach(([key, college]) => {
      if (key !== 'NAD') {
        const collegeCredits = calculateCollegeCredits(college);
        total += collegeCredits;
      }
    });
    
    return total;
  };

  const calculateCollegeCredits = (college) => {
    let total = 0;
    
    if (college.semester_grades && college.semester_grades.length > 0) {
      college.semester_grades.forEach(semester => {
        if (semester.subjects && semester.subjects.length > 0) {
          semester.subjects.forEach(subject => {
            total += parseInt(subject.credits) || 0;
          });
        }
      });
    }
    
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

  const totalCredits = calculateTotalCredits(data);

  const getColleges = () => {
    if (!data) return [];
    
    return Object.entries(data)
      .filter(([key]) => key !== 'NAD')
      .map(([key, college]) => {
        const calculatedCredits = calculateCollegeCredits(college);
        
        return [key, {
          ...college,
          total_credits: calculatedCredits
        }];
      });
  };

  const getStudentInfo = () => {
    if (!data || !data.NAD) return { name: '', abcId: '' };
    return {
      name: data.NAD.name,
      abcId: data.NAD.abcID
    };
  };

  const studentInfo = getStudentInfo();
  const colleges = getColleges();

  // Update verification results if access level changes after data is loaded
  useEffect(() => {
    if (data) {
      verifyCredits(data, accessLevel);
    }
  }, [accessLevel]);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 py-2 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={nad} alt="Logo" className="h-12" />
            <span className="text-lg font-semibold text-blue-700">Credit Verification</span>
            <span className="text-xs text-gray-500">Academic Board of Credits - Ministry of Education, Government of India</span>
          </div>
          <button className="px-4 py-1 border border-gray-300 rounded text-sm">Logout</button>
        </div>
      </div>

      {!data && (
        <div className="max-w-6xl mx-auto px-4 py-8">
          <form onSubmit={handleSubmit} className="max-w-xl mx-auto mb-8">
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">Enter ABC ID</h2>
              <div className="flex gap-3 mb-4">
                <input
                  type="text"
                  value={abcId}
                  onChange={(e) => setAbcId(e.target.value)}
                  placeholder="Enter your ABC ID"
                  className="flex-1 px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
                />
              </div>
              
              <h3 className="text-lg font-medium mb-2 text-gray-800">Select Access Level</h3>
              <div className="space-y-2 mb-6">
                <div className="flex items-center">
                  <input
                    id="basic"
                    type="radio"
                    name="accessLevel"
                    value="Basic Credit Summary"
                    checked={accessLevel === "Basic Credit Summary"}
                    onChange={(e) => setAccessLevel(e.target.value)}
                    className="mr-2"
                  />
                  <label htmlFor="basic" className="text-gray-700">Basic Credit Summary</label>
                </div>
                <div className="flex items-center">
                  <input
                    id="annual"
                    type="radio"
                    name="accessLevel"
                    value="Annual Credit Distribution"
                    checked={accessLevel === "Annual Credit Distribution"}
                    onChange={(e) => setAccessLevel(e.target.value)}
                    className="mr-2"
                  />
                  <label htmlFor="annual" className="text-gray-700">Annual Credit Distribution</label>
                </div>
                <div className="flex items-center">
                  <input
                    id="semester"
                    type="radio"
                    name="accessLevel"
                    value="Semester Credit Breakdown"
                    checked={accessLevel === "Semester Credit Breakdown"}
                    onChange={(e) => setAccessLevel(e.target.value)}
                    className="mr-2"
                  />
                  <label htmlFor="semester" className="text-gray-700">Semester Credit Breakdown</label>
                </div>
                <div className="flex items-center">
                  <input
                    id="comprehensive"
                    type="radio"
                    name="accessLevel"
                    value="Comprehensive Credit Analysis"
                    checked={accessLevel === "Comprehensive Credit Analysis"}
                    onChange={(e) => setAccessLevel(e.target.value)}
                    className="mr-2"
                  />
                  <label htmlFor="comprehensive" className="text-gray-700">Comprehensive Credit Analysis</label>
                </div>
              </div>
              
              <button
                type="submit"
                className="w-full px-8 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
              >
                <Search className="w-5 h-5 inline-block mr-2" /> Verify Credits
              </button>
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
          <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
            <div className="flex p-4">
              <div className="flex items-start gap-6 flex-1">
                <img 
                  src={stu} 
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
              
              <div className="bg-red-400 text-white rounded-md p-4 w-80">
                <div className="text-lg font-semibold mb-2">ACADEMIC BANK OF CREDITS</div>
                <div className="text-sm mb-1">ABC ID</div>
                <div className="font-medium">{studentInfo.abcId}</div>
                <div className="text-sm mb-1 mt-2">{studentInfo.name}</div>
                <div className="flex items-center mt-2">
                  <img 
                    src={stu}
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
          
          {/* Access Level Selector for after data is loaded */}
          <div className="mb-6 bg-white rounded-lg shadow-sm p-4">
            <h3 className="text-lg font-medium mb-2">Access Level</h3>
            <div className="flex flex-wrap gap-2">
              <button 
                onClick={() => setAccessLevel("Basic Credit Summary")}
                className={`px-4 py-2 rounded-md text-sm ${accessLevel === "Basic Credit Summary" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700"}`}
              >
                Basic Credit Summary
              </button>
              <button 
                onClick={() => setAccessLevel("Annual Credit Distribution")}
                className={`px-4 py-2 rounded-md text-sm ${accessLevel === "Annual Credit Distribution" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700"}`}
              >
                Annual Credit Distribution
              </button>
              <button 
                onClick={() => setAccessLevel("Semester Credit Breakdown")}
                className={`px-4 py-2 rounded-md text-sm ${accessLevel === "Semester Credit Breakdown" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700"}`}
              >
                Semester Credit Breakdown
              </button>
              <button 
                onClick={() => setAccessLevel("Comprehensive Credit Analysis")}
                className={`px-4 py-2 rounded-md text-sm ${accessLevel === "Comprehensive Credit Analysis" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700"}`}
              >
                Comprehensive Credit Analysis
              </button>
            </div>
          </div>
          
          {/* Credit Verification Panel */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Credit Verification</h2>
            <div className="bg-white rounded-lg shadow-sm overflow-hidden p-4">
              <div className="mb-4">
                <div className="text-sm text-gray-600 mb-1">Current Access Level</div>
                <div className="font-medium text-blue-700">{accessLevel}</div>
              </div>
              
              {verificationResult && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Basic Credit Summary - Always shown */}
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h3 className="font-medium mb-2 flex items-center">
                      <Clock className="w-5 h-5 mr-2 text-blue-600" />
                      Credit Summary
                    </h3>
                    <div className="text-sm bg-white p-3 rounded border">
                      <div className="mb-1">Total Credits: <span className="font-semibold">{verificationResult.totalCredits}</span></div>
                    </div>
                  </div>
                  
                  {/* Degree Eligibility - Only for non-basic levels */}
                  {/* {verificationResult.degreeEligible && (
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h3 className="font-medium mb-2 flex items-center">
                        <Award className="w-5 h-5 mr-2 text-blue-600" />
                        Degree Eligibility
                      </h3>
                      <div className="text-sm bg-white p-3 rounded border">
                        {verificationResult.degreeEligible}
                      </div>
                    </div>
                  )} */}
                  
                  {/* Yearly Credit Distribution */}
                  {verificationResult.yearlyCredits && (
                    <div className="bg-blue-50 p-4 rounded-lg md:col-span-2">
                      <h3 className="font-medium mb-2 flex items-center">
                        <BookOpen className="w-5 h-5 mr-2 text-blue-600" />
                        Yearly Credit Distribution
                      </h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                        {Object.entries(verificationResult.yearlyCredits).map(([year, credits]) => (
                          <div key={year} className="text-sm bg-white p-3 rounded border">
                            <div className="text-gray-600">Year {year}</div>
                            <div className="font-semibold">{credits} credits</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Semester Credit Distribution */}
                  {verificationResult.semesterCredits && (
                    <div className="bg-blue-50 p-4 rounded-lg md:col-span-2">
                      <h3 className="font-medium mb-2 flex items-center">
                        <BookOpen className="w-5 h-5 mr-2 text-blue-600" />
                        Semester Credit Distribution
                      </h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                        {Object.entries(verificationResult.semesterCredits).map(([sem, credits]) => (
                          <div key={sem} className="text-sm bg-white p-3 rounded border">
                            <div className="text-gray-600">{sem}</div>
                            <div className="font-semibold">{credits} credits</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Multiple Attempts Detail - Only for Comprehensive Analysis */}
                  {verificationResult.attemptDetails && verificationResult.attemptDetails.length > 0 && (
                    <div className="bg-blue-50 p-4 rounded-lg md:col-span-2">
                      <h3 className="font-medium mb-2 flex items-center">
                        <Clock className="w-5 h-5 mr-2 text-blue-600" />
                        Subjects with Multiple Attempts
                      </h3>
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm bg-white rounded border">
                          <thead>
                            <tr className="bg-gray-50">
                              <th className="py-2 px-3 text-left">Subject</th>
                              <th className="py-2 px-3 text-left">College</th>
                              <th className="py-2 px-3 text-center">Semester</th>
                              <th className="py-2 px-3 text-center">Attempts</th>
                              <th className="py-2 px-3 text-center">Final Marks</th>
                              <th className="py-2 px-3 text-center">Credits</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y">
                            {verificationResult.attemptDetails.map((item, idx) => (
                              <tr key={idx}>
                                <td className="py-2 px-3">{item.subject}</td>
                                <td className="py-2 px-3">{item.college}</td>
                                <td className="py-2 px-3 text-center">{item.semester}</td>
                                <td className="py-2 px-3 text-center font-medium text-amber-600">{item.attempts}</td>
                                <td className="py-2 px-3 text-center">{item.finalMarks}</td>
                                <td className="py-2 px-3 text-center">{item.credits}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
          
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Credit Points Accumulation</h2>
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 text-left">
                    <th className="py-2 px-4 text-sm text-gray-600 font-medium w-16">S.No.</th>
                    <th className="py-2 px-4 text-sm text-gray-600 font-medium">Academic Institution</th>
                    <th className="py-2 px-4 text-sm text-gray-600 font-medium">Course</th>
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
                                                {accessLevel === "Comprehensive Credit Analysis" && (
                                                  <th className="py-2 px-3 text-right">Attempts</th>
                                                )}
                                              </tr>
                                            </thead>
                                            <tbody className="divide-y">
                                              {semester.subjects.map((subject, subIdx) => (
                                                <tr key={subIdx}>
                                                  <td className="py-2 px-3">
                                                    {accessLevel !== "Comprehensive Credit Analysis" && subject.attempts > 1 ? (
                                                      <span className="group relative">
                                                        {subject.name}*
                                                        <span className="invisible group-hover:visible absolute -top-8 left-0 bg-gray-600 text-white text-xs rounded px-2 py-1">
                                                          Attempts: {subject.attempts}
                                                        </span>
                                                      </span>
                                                    ) : (
                                                      <span>{subject.name}</span>
                                                    )}
                                                  </td>
                                                  <td className="py-2 px-3 text-right">{subject.final_marks}</td>
                                                  <td className="py-2 px-3 text-right">{subject.credits}</td>
                                                  {accessLevel === "Comprehensive Credit Analysis" && (
                                                    <td className="py-2 px-3 text-right">
                                                      <span className={subject.attempts > 1 ? "text-amber-600 font-medium" : ""}>
                                                        {subject.attempts}
                                                      </span>
                                                    </td>
                                                  )}
                                                </tr>
                                              ))}
                                            </tbody>
                                          </table>
                                          {accessLevel !== "Comprehensive Credit Analysis" && (
                                            <div className="text-xs text-gray-500 mt-2">
                                              * Hover over subject name to view number of attempts
                                            </div>
                                          )}
                                        </div>
                                      ))}
                                    </div>
                                  ) : (
                                    <div className="text-gray-500 italic">No semester data available</div>
                                  )}
                                </div>
                                
                                {collegeData.additional_credits && collegeData.additional_credits.length > 0 && (
                                  <div className="py-4">
                                    <div className="bg-white p-4 rounded-lg shadow-sm">
                                      <table className="w-full text-sm">
                                        <thead>
                                          <tr className="bg-gray-100">
                                            <th className="py-2 px-3 text-left">Course</th>
                                            <th className="py-2 px-3 text-left">Type</th>
                                            <th className="py-2 px-3 text-left">College</th>
                                            <th className="py-2 px-3 text-right">Marks</th>
                                            <th className="py-2 px-3 text-right">Credits</th>
                                            </tr>
                                          </thead>
                                          <tbody className="divide-y">
                                            {collegeData.additional_credits.map((credit, idx) => (
                                              <tr key={idx}>
                                                <td className="py-2 px-3">{credit.name}</td>
                                                <td className="py-2 px-3">{credit.type}</td>
                                                <td className="py-2 px-3">{credit.source}</td>
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
                      <tr>
                        <td colSpan="5" className="py-4 px-4 text-center text-gray-500">No college data available</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Navigation buttons */}
            <div className="flex justify-between mt-8">
              <button
                onClick={handlePrevious}
                disabled={page === 1}
                className={`px-6 py-2 rounded-md ${
                  page === 1 ? 'bg-gray-200 text-gray-500' : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                Previous
              </button>
              <button
                onClick={() => setData(null)}
                className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Back to Search
              </button>
              <button
                onClick={handleNext}
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Next
              </button>
            </div>
          </div>
        )}

        <div className="text-center text-xs text-gray-500 mt-8 pb-4">
          &copy; 2023 Academic Bank of Credits (ABC). All rights reserved.
        </div>
      </div>
    );
  };

  export default AcademicDashboardhei;