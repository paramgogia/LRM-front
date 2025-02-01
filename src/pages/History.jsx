import React from 'react';

const History = () => {
  const activities = [
    {
      type: 'Certificate Issued',
      date: '2024-01-15',
      details: 'Semester 1 completion certificate issued',
      status: 'completed'
    },
    {
      type: 'Credits Transfer',
      date: '2024-01-10',
      details: 'Transferred 4 credits from external course',
      status: 'completed'
    },
    {
      type: 'Permission Granted',
      date: '2024-01-05',
      details: 'Access granted to VJTI for semester 1 records',
      status: 'active'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'active':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Activity History</h1>

      <div className="bg-white rounded-lg shadow-md">
        {activities.map((activity, index) => (
          <div 
            key={index}
            className={`p-4 flex items-center justify-between ${
              index !== activities.length - 1 ? 'border-b' : ''
            }`}
          >
            <div className="flex-1">
              <h3 className="font-semibold text-lg">{activity.type}</h3>
              <p className="text-gray-600">{activity.details}</p>
              <p className="text-sm text-gray-500">{activity.date}</p>
            </div>
            <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(activity.status)}`}>
              {activity.status}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Filters</h2>
        <div className="flex gap-4">
          <button className="px-4 py-2 bg-white rounded-lg shadow-sm border hover:bg-gray-50">
            All Activities
          </button>
          <button className="px-4 py-2 bg-white rounded-lg shadow-sm border hover:bg-gray-50">
            Certificates
          </button>
          <button className="px-4 py-2 bg-white rounded-lg shadow-sm border hover:bg-gray-50">
            Credits
          </button>
          <button className="px-4 py-2 bg-white rounded-lg shadow-sm border hover:bg-gray-50">
            Permissions
          </button>
        </div>
      </div>
    </div>
  );
};

export default History;