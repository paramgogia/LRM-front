import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Overview = () => {
  const creditData = [
    { institution: 'VJTI Mumbai', credits: 94 },
    { institution: 'SPIT Mumbai', credits: 54 },
    { institution: 'IIT Bombay', credits: 54 }
  ];

  return (
    <div className="space-y-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="text-sm text-gray-500 mb-2">Total Credits</div>
          <div className="text-3xl font-bold text-gray-900">178</div>
        </div>
        
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="text-sm text-gray-500 mb-2">Institutions</div>
          <div className="text-3xl font-bold text-gray-900">3</div>
        </div>
        
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="text-sm text-gray-500 mb-2">Latest Addition</div>
          <div className="text-3xl font-bold text-gray-900">8</div>
          <div className="text-sm text-gray-500 mt-1">VJTI Mumbai</div>
        </div>
      </div>

      {/* Credit Distribution Chart */}
      <div className="bg-white p-6 rounded-xl border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">Credit Distribution</h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={creditData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="institution" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="credits" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white p-6 rounded-xl border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
        <div className="space-y-4">
          {[
            { date: '10/05/2023', action: 'Credits Added', details: '8 credits from VJTI Mumbai' },
            { date: '08/03/2019', action: 'Credits Added', details: '12 credits from VJTI Mumbai' },
            { date: '30/06/2018', action: 'Credits Added', details: '36 credits from SPIT Mumbai' },
          ].map((activity, index) => (
            <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
              <div>
                <div className="text-sm font-medium text-gray-900">{activity.action}</div>
                <div className="text-sm text-gray-500">{activity.details}</div>
              </div>
              <div className="text-sm text-gray-500">{activity.date}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Overview;