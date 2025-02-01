import React, { useState } from 'react';

const Credits = () => {
  const [selectedSemester, setSelectedSemester] = useState(1);
  const [credits] = useState({
    totalCredits: 120,
    completedCredits: 85,
    semesterData: [
      {
        sem_no: 1,
        subjects: [
          {
            name: "Engineering Calculus",
            final_marks: 88,
            credits: 3
          },
          {
            name: "Physics",
            final_marks: 92,
            credits: 4
          }
        ]
      },
      {
        sem_no: 2,
        subjects: [
          {
            name: "Digital Logic",
            final_marks: 85,
            credits: 4
          }
        ]
      }
    ]
  });

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-4">Credits Overview</h1>
        <div className="bg-white rounded-lg p-6 shadow-md">
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-gray-600">Total Credits Required</p>
              <p className="text-2xl font-bold text-blue-600">{credits.totalCredits}</p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <p className="text-sm text-gray-600">Credits Completed</p>
              <p className="text-2xl font-bold text-green-600">{credits.completedCredits}</p>
            </div>
          </div>
          
          <div className="mb-6">
            <p className="text-sm text-gray-600 mb-2">Progress</p>
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div 
                className="bg-blue-600 h-4 rounded-full"
                style={{ width: `${(credits.completedCredits / credits.totalCredits) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">Semester Credits</h2>
        <div className="flex gap-2 mb-4">
          {credits.semesterData.map((sem) => (
            <button
              key={sem.sem_no}
              onClick={() => setSelectedSemester(sem.sem_no)}
              className={`px-4 py-2 rounded-lg ${
                selectedSemester === sem.sem_no
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700'
              }`}
            >
              Semester {sem.sem_no}
            </button>
          ))}
        </div>

        <div className="bg-white rounded-lg p-6 shadow-md">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3">Subject</th>
                <th className="text-left py-3">Credits</th>
                <th className="text-left py-3">Marks</th>
              </tr>
            </thead>
            <tbody>
              {credits.semesterData
                .find(sem => sem.sem_no === selectedSemester)
                ?.subjects.map((subject, index) => (
                  <tr key={index} className="border-b">
                    <td className="py-3">{subject.name}</td>
                    <td className="py-3">{subject.credits}</td>
                    <td className="py-3">{subject.final_marks}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Credits;