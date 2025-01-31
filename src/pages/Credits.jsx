import React, { useState } from 'react';
import { ExternalLink, ChevronLeft } from 'lucide-react';

const Credits = () => {
  const [expandedInstitution, setExpandedInstitution] = useState(null);
  
  const creditData = {
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
    ]
  };

  if (expandedInstitution) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <button 
          onClick={() => setExpandedInstitution(null)}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6"
        >
          <ChevronLeft size={20} />
          <span className="font-medium">Back to Credit Accumulation</span>
        </button>

        <div className="flex items-center gap-6 mb-8 bg-blue-50 p-6 rounded-xl">
          <div className={`w-16 h-16 ${expandedInstitution.logoColor} rounded-xl flex items-center justify-center text-white text-xl font-bold`}>
            {expandedInstitution.logo}
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">{expandedInstitution.institution}</h2>
            <p className="text-gray-600">Total Credits: {expandedInstitution.credit}</p>
            <p className="text-gray-600">Batch: {expandedInstitution.batch}</p>
          </div>
        </div>

        {expandedInstitution.subjects && (
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Subject Credit Distribution</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Subject</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Course</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Code</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Year</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Credits</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {expandedInstitution.subjects.map((subject, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 text-sm text-gray-900">{subject.subject}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{subject.course}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{subject.code}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{subject.year}</td>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">{subject.credit}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Credit Accumulation</h1>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          Transfer Credits
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Institution</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Batch</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Course</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Credits</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {creditData.creditAccumulation.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 ${item.logoColor} rounded-lg flex items-center justify-center text-white text-sm font-medium`}>
                      {item.logo}
                    </div>
                    <span className="font-medium text-gray-900">{item.institution}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">{item.batch}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{item.course}</td>
                <td className="px-6 py-4 text-sm font-medium text-gray-900">{item.credit}</td>
                <td className="px-6 py-4 text-right">
                  <button
                    onClick={() => setExpandedInstitution(item)}
                    className="text-blue-600 hover:text-blue-700"
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
  );
};

export default Credits;