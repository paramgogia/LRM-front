import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Overview = () => {
  const [creditData, setCreditData] = useState([]);
  const [totalCredits, setTotalCredits] = useState(0);
  const [institutions, setInstitutions] = useState(0);
  const [latestAddition, setLatestAddition] = useState({ credits: 0, institution: '' });
  const [recentActivity, setRecentActivity] = useState([]);
  const [loading, setLoading] = useState(true);

  // Dummy data for fallback
  const dummyCreditData = [
    { institution: 'VJTI Mumbai', credits: 94 },
    { institution: 'SPIT Mumbai', credits: 54 },
    { institution: 'IIT Bombay', credits: 54 }
  ];

  const dummyActivity = [
    { date: '10/05/2023', action: 'Credits Added', details: '8 credits from VJTI Mumbai' },
    { date: '08/03/2019', action: 'Credits Added', details: '12 credits from VJTI Mumbai' },
    { date: '30/06/2018', action: 'Credits Added', details: '36 credits from SPIT Mumbai' },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Example API call using the routes from your Postman collection
        const response = await fetch('http://localhost:3000/view/super', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'username': 'SPIT',
            'organization': 'Org2',
            'identity': 'e5858d0503cc9fbef80ff51c2fcfd5567a127f9d01b7a50ea6b8f0bc3a8419ac'
          },
          body: JSON.stringify({
            abcID: '24186vjlelen'
          })
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        
        // If we have data, process it
        if (data) {
          // Process your data here
          // For now, we'll use dummy data
          setCreditData(dummyCreditData);
          setTotalCredits(178);
          setInstitutions(3);
          setLatestAddition({ credits: 8, institution: 'VJTI Mumbai' });
          setRecentActivity(dummyActivity);
        } else {
          // Fallback to dummy data if no data is received
          setCreditData(dummyCreditData);
          setTotalCredits(178);
          setInstitutions(3);
          setLatestAddition({ credits: 8, institution: 'VJTI Mumbai' });
          setRecentActivity(dummyActivity);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        // Fallback to dummy data on error
        setCreditData(dummyCreditData);
        setTotalCredits(178);
        setInstitutions(3);
        setLatestAddition({ credits: 8, institution: 'VJTI Mumbai' });
        setRecentActivity(dummyActivity);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8 p-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
          <div className="text-sm text-gray-500 mb-2">Total Credits</div>
          <div className="text-3xl font-bold text-gray-900">{totalCredits}</div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
          <div className="text-sm text-gray-500 mb-2">Institutions</div>
          <div className="text-3xl font-bold text-gray-900">{institutions}</div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
          <div className="text-sm text-gray-500 mb-2">Latest Addition</div>
          <div className="text-3xl font-bold text-gray-900">{latestAddition.credits}</div>
          <div className="text-sm text-gray-500 mt-1">{latestAddition.institution}</div>
        </div>
      </div>

      {/* Credit Distribution Chart */}
      <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">Credit Distribution</h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={creditData}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-50" />
              <XAxis dataKey="institution" className="text-sm" />
              <YAxis className="text-sm" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '0.5rem'
                }}
              />
              <Bar dataKey="credits" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
        <div className="space-y-4">
          {recentActivity.map((activity, index) => (
            <div 
              key={index} 
              className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors duration-200"
            >
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