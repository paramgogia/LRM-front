import React, { useState, useEffect } from 'react';

const DUMMY_DATA = {
  total_credits: 120,
  semester_grades: [
    {
      sem_no: 1,
      subjects: [
        { name: "Mathematics I", credits: 4, final_marks: 85 },
        { name: "Physics", credits: 4, final_marks: 78 },
        { name: "Computer Programming", credits: 3, final_marks: 92 },
        { name: "Engineering Drawing", credits: 2, final_marks: 88 },
        { name: "English Communication", credits: 2, final_marks: 90 }
      ]
    },
    {
      sem_no: 2,
      subjects: [
        { name: "Mathematics II", credits: 4, final_marks: 82 },
        { name: "Chemistry", credits: 4, final_marks: 75 },
        { name: "Data Structures", credits: 3, final_marks: 88 },
        { name: "Digital Electronics", credits: 3, final_marks: 85 },
        { name: "Professional Ethics", credits: 2, final_marks: 92 }
      ]
    }
  ]
};

const Credits = () => {
  const [selectedSemester, setSelectedSemester] = useState(1);
  const [certificateData, setCertificateData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const headers = {
    'username': 'SPIT',
    'organization': 'Org2',
    'identity': 'e5858d0503cc9fbef80ff51c2fcfd5567a127f9d01b7a50ea6b8f0bc3a8419ac'
  };

  useEffect(() => {
    const fetchCertificateData = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:3000/view/certificate', {
          method: 'POST',
          headers: {
            ...headers,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            abcID: "24298Fj0db8U",
            college: "SPIT"
          })
        });

        if (!response.ok) {
          throw new Error('Failed to fetch certificate data');
        }

        const data = await response.json();
        setCertificateData(data);
      } catch (err) {
        console.warn('Using dummy data due to fetch error:', err.message);
        setCertificateData(DUMMY_DATA);
        setError(null); // Clear error since we're using dummy data
      } finally {
        setLoading(false);
      }
    };

    fetchCertificateData();
  }, []);

  const handleRedeemCredits = async (minCredits) => {
    try {
      const response = await fetch('http://localhost:3000/certificate/college/redeem-credits', {
        method: 'POST',
        headers: {
          ...headers,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          abcID: "24298Fj0db8U",
          min_credits: minCredits
        })
      });

      if (!response.ok) {
        throw new Error('Failed to redeem credits');
      }

      window.location.reload();
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return (
      <div className="p-6 text-center">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-48 mx-auto mb-8"></div>
          <div className="h-40 bg-gray-200 rounded-lg mb-8"></div>
          <div className="h-64 bg-gray-200 rounded-lg"></div>
        </div>
      </div>
    );
  }

  const data = certificateData || DUMMY_DATA;
  const totalCredits = data.total_credits;
  const completedCredits = data.semester_grades?.reduce(
    (acc, sem) => acc + sem.subjects.reduce((sum, sub) => sum + sub.credits, 0),
    0
  ) || 0;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
          {error}
        </div>
      )}
      
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-4">Credits Overview</h1>
        <div className="bg-white rounded-lg shadow-lg">
          <div className="p-6">
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-gray-600">Total Credits Required</p>
                <p className="text-2xl font-bold text-blue-600">{totalCredits}</p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <p className="text-sm text-gray-600">Credits Completed</p>
                <p className="text-2xl font-bold text-green-600">{completedCredits}</p>
              </div>
            </div>
            
            <div className="mb-6">
              <p className="text-sm text-gray-600 mb-2">Progress</p>
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div 
                  className="bg-blue-600 h-4 rounded-full transition-all duration-300"
                  style={{ width: `${(completedCredits / totalCredits) * 100}%` }}
                ></div>
              </div>
            </div>

            <button
              onClick={() => handleRedeemCredits(10)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              Redeem Credits
            </button>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">Semester Credits</h2>
        <div className="flex gap-2 mb-4 flex-wrap">
          {data.semester_grades?.map((sem) => (
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

        <div className="bg-white rounded-lg shadow-lg">
          <div className="p-6 overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Subject</th>
                  <th className="text-left py-3 px-4">Credits</th>
                  <th className="text-left py-3 px-4">Marks</th>
                </tr>
              </thead>
              <tbody>
                {data.semester_grades
                  ?.find(sem => sem.sem_no === selectedSemester)
                  ?.subjects.map((subject, index) => (
                    <tr key={index} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">{subject.name}</td>
                      <td className="py-3 px-4">{subject.credits}</td>
                      <td className="py-3 px-4">{subject.final_marks}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Credits;