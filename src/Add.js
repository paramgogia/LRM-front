import React, { useState } from 'react';
import { ChevronLeft, ExternalLink, LogOut } from 'lucide-react';

const AcademicDashboard = () => {
  const [expandedInstitution, setExpandedInstitution] = useState(null);
  
  const dummyData = {
    studentName: "Simran Singh",
    totalCredits: 178,
    creditAccumulation: [
      {
        id: 1,
        institution: "VJTI Mumbai",
        logo: "VJTI",
        logoColor: "bg-blue-600",
        batch: "2015-2019",
        course: "B.Tech",
        credit: 94,
        subjects: [
          { subject: "Advanced Data Structures", course: "B.Tech", code: "CS301", year: 2019, credit: 6 },
          { subject: "Computer Networks", course: "B.Tech", code: "CS302", year: 2019, credit: 4 },
          { subject: "Operating Systems", course: "B.Tech", code: "CS303", year: 2019, credit: 6 },
        ]
      },
      {
        id: 2,
        institution: "SPIT Mumbai",
        logo: "SPIT",
        logoColor: "bg-emerald-600",
        batch: "2019-2022",
        course: "M.Tech",
        credit: 54
      },
      {
        id: 3,
        institution: "IIT Bombay",
        logo: "IITB",
        logoColor: "bg-violet-600",
        batch: "2019-2022",
        course: "Ph.D",
        credit: 54
      }
    ],
    creditHistory: [
      { date: "10/05/2023", institution: "VJTI Mumbai", credit: 8 },
      { date: "08/03/2019", institution: "VJTI Mumbai", credit: 12 },
      { date: "30/06/2018", institution: "SPIT Mumbai", credit: 36 },
      { date: "25/05/2017", institution: "IIT Bombay", credit: 8 }
    ]
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Navbar */}
      <nav className="w-full bg-gradient-to-r from-blue-700 to-blue-900 text-white">
        <div className="max-w-[1400px] mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img src="/api/placeholder/40/40" alt="Indian emblem" className="h-10 brightness-0 invert" />
            <div>
              <div className="font-semibold tracking-wide">ACADEMIC BANK OF CREDITS</div>
              <div className="text-xs text-blue-100">Ministry of Education, Government of India</div>
            </div>
          </div>
          <button className="flex items-center gap-2 text-blue-100 hover:text-white transition-colors">
            <span>Log out</span>
            <LogOut size={18} />
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-[1400px] mx-auto px-4 py-8">
        {!expandedInstitution ? (
          <>
            {/* Header Section */}
            <div className="flex justify-between items-start mb-12">
              <div className="flex items-center gap-6">
                <div className="relative">
                  <div className="w-20 h-20 rounded-lg bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white text-2xl font-bold">
                    {dummyData.studentName.split(' ').map(n => n[0]).join('')}
                  </div>
                </div>
                <div>
                  <p className="text-gray-600 mb-1">Hello {dummyData.studentName}!</p>
                  <div className="flex items-baseline gap-3">
                    <span className="text-4xl font-bold text-blue-900">{dummyData.totalCredits}</span>
                    <span className="text-gray-500">Total Academic Credit</span>
                  </div>
                  <button className="mt-3 px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-md hover:shadow-lg">
                    Transfer Credits
                  </button>
                </div>
              </div>
              <div className="w-48 h-28 bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl shadow-lg flex items-center justify-center text-white">
                <span className="text-sm font-medium">2024-1020-5497</span>
              </div>
            </div>

            {/* Two Column Layout */}
            <div className="grid grid-cols-2 gap-8">
              {/* Credit Accumulation Section */}
              <div>
                <h2 className="text-xl font-semibold text-blue-900 mb-4">Credit Accumulation</h2>
                <div className="bg-white rounded-xl border border-blue-100 shadow-sm overflow-hidden">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-blue-50 text-sm text-blue-900">
                        <th className="text-left py-3 px-4 font-semibold">Academic Institution</th>
                        <th className="text-left py-3 px-4 font-semibold">Batch</th>
                        <th className="text-left py-3 px-4 font-semibold">Course</th>
                        <th className="text-left py-3 px-4 font-semibold">Credit</th>
                        <th className="w-10"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {dummyData.creditAccumulation.map((item) => (
                        <tr key={item.id} className="border-b border-blue-50 last:border-0 hover:bg-blue-50/30 transition-colors">
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-3">
                              <div className={`w-8 h-8 ${item.logoColor} rounded-lg flex items-center justify-center text-white text-sm font-medium shadow-sm`}>
                                {item.logo}
                              </div>
                              <span className="font-medium text-blue-900">{item.institution}</span>
                            </div>
                          </td>
                          <td className="py-3 px-4 text-gray-600">{item.batch}</td>
                          <td className="py-3 px-4 text-gray-600">{item.course}</td>
                          <td className="py-3 px-4 font-medium text-blue-900">{item.credit}</td>
                          <td className="py-3 px-4">
                            <button 
                              onClick={() => setExpandedInstitution(item)}
                              className="text-blue-400 hover:text-blue-600 transition-colors"
                            >
                              <ExternalLink size={18} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Credit History Section */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold text-blue-900">Credit History</h2>
                  <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">view all</button>
                </div>
                <div className="bg-white rounded-xl border border-blue-100 shadow-sm overflow-hidden">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-blue-50 text-sm text-blue-900">
                        <th className="text-left py-3 px-4 font-semibold">Date</th>
                        <th className="text-left py-3 px-4 font-semibold">Academic Institution</th>
                        <th className="text-left py-3 px-4 font-semibold">Credit</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dummyData.creditHistory.map((item, index) => (
                        <tr key={index} className="border-b border-blue-50 last:border-0 hover:bg-blue-50/30 transition-colors">
                          <td className="py-3 px-4 text-gray-600">{item.date}</td>
                          <td className="py-3 px-4 text-gray-600">{item.institution}</td>
                          <td className="py-3 px-4 font-medium text-blue-900">{item.credit}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </>
        ) : (
          /* Expanded View */
          <div className="bg-white rounded-xl border border-blue-100 shadow-sm p-6">
            <button 
              onClick={() => setExpandedInstitution(null)}
              className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6"
            >
              <ChevronLeft size={20} />
              <span className="font-medium">Credit Accumulation for {expandedInstitution.institution}</span>
            </button>

            <div className="flex items-center gap-6 mb-8 bg-blue-50 p-6 rounded-xl">
              <div className={`w-16 h-16 ${expandedInstitution.logoColor} rounded-xl flex items-center justify-center text-white text-xl font-bold shadow-md`}>
                {expandedInstitution.logo}
              </div>
              <div>
                <span className="text-3xl font-bold text-blue-900">{expandedInstitution.credit}</span>
                <p className="text-gray-600">Total Academic Credit for {expandedInstitution.institution}</p>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-blue-900 mb-4">Subject Credit Distribution</h2>
              <table className="w-full">
                <thead>
                  <tr className="bg-blue-50 text-sm text-blue-900">
                    <th className="text-left py-3 px-4 font-semibold rounded-tl-lg">Subject</th>
                    <th className="text-left py-3 px-4 font-semibold">Course</th>
                    <th className="text-left py-3 px-4 font-semibold">Subject Code</th>
                    <th className="text-left py-3 px-4 font-semibold">Year</th>
                    <th className="text-left py-3 px-4 font-semibold rounded-tr-lg">Credit</th>
                  </tr>
                </thead>
                <tbody>
                  {expandedInstitution.subjects?.map((subject, index) => (
                    <tr key={index} className="border-b border-blue-50 last:border-0 hover:bg-blue-50/30 transition-colors">
                      <td className="py-3 px-4 text-gray-600">{subject.subject}</td>
                      <td className="py-3 px-4 text-gray-600">{subject.course}</td>
                      <td className="py-3 px-4 text-gray-600">{subject.code}</td>
                      <td className="py-3 px-4 text-gray-600">{subject.year}</td>
                      <td className="py-3 px-4 font-medium text-blue-900">{subject.credit}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AcademicDashboard;