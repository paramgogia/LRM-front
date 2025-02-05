import React, { useState, useEffect } from 'react';

const History = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [error, setError] = useState(null);

  // Fetch and combine data from different endpoints
  const fetchActivities = async () => {
    try {
      setLoading(true);
      // Example endpoints based on the Postman collection
      const endpoints = [
        'http://localhost:3000/view/certificate',
        'http://localhost:3000/certificate/college/transfer-credits',
        'http://localhost:3000/permission/add'
      ];

      // If no data is fetched, use dummy data
      const dummyData = [
        {
          type: 'Certificate',
          action: 'Issued',
          date: '2024-02-05',
          details: 'B.Tech Semester 4 Certificate',
          status: 'completed',
          college: 'SPIT'
        },
        {
          type: 'Permission',
          action: 'Granted',
          date: '2024-02-03',
          details: 'Access granted to VJTI for transcript viewing',
          status: 'active',
          college: 'VJTI'
        },
        {
          type: 'Credits',
          action: 'Transferred',
          date: '2024-02-01',
          details: 'Transferred 3 credits from external course',
          status: 'completed',
          college: 'SPIT'
        }
      ];

      setActivities(dummyData);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch activity data');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActivities();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'active':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredActivities = activities.filter(activity => {
    if (filter === 'all') return true;
    return activity.type.toLowerCase() === filter.toLowerCase();
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500 text-center">
          <p className="text-xl font-semibold">{error}</p>
          <button 
            onClick={fetchActivities}
            className="mt-4 px-4 py-2 bg-red-100 text-red-600 rounded-md hover:bg-red-200 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Activity History</h1>
        <div className="flex space-x-2">
          {['all', 'certificate', 'credits', 'permission'].map((filterType) => (
            <button
              key={filterType}
              onClick={() => setFilter(filterType)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                filter === filterType
                  ? 'bg-blue-500 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-50 border'
              }`}
            >
              {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {filteredActivities.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow-md">
          <p className="text-gray-500 text-lg">No activities found</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md divide-y divide-gray-200">
          {filteredActivities.map((activity, index) => (
            <div key={index} className="p-4 hover:bg-gray-50 transition-colors">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-lg">
                    {activity.type} {activity.action}
                  </h3>
                  <p className="text-gray-600 mt-1">{activity.details}</p>
                  <div className="flex items-center mt-2 space-x-4">
                    <p className="text-sm text-gray-500">
                      {new Date(activity.date).toLocaleDateString()}
                    </p>
                    <p className="text-sm text-gray-500">
                      College: {activity.college}
                    </p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(activity.status)}`}>
                  {activity.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default History;