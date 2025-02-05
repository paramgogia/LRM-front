import React, { useState, useEffect } from 'react';
import { AlertCircle, Edit, Key } from 'lucide-react';

const Profile = () => {
  const [profileData, setProfileData] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const dummyData = {
      name: "John Doe",
      abcID: "2406dWhqNcre",
      dob: "2000-01-01",
      course: "Computer Science",
      specialization: "Data Science",
      course_code: "CS101",
      college: "Sample College",
      enrollment_year: "2023"
    };

    setProfileData(dummyData);
    setError(true);
  }, []);

  if (!profileData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      {error && (
        <div className="flex items-center p-4 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700">
          <AlertCircle className="h-5 w-5 mr-2" />
          <p>Unable to fetch profile data. Showing placeholder information.</p>
        </div>
      )}

      <div className="bg-white shadow-md rounded-lg p-6 space-y-6">
        <h2 className="text-2xl font-bold text-center text-gray-800">Profile Information</h2>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold border-b pb-2">Personal Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Full Name</p>
              <p className="font-medium">{profileData.name}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">ABC ID</p>
              <p className="font-medium">{profileData.abcID}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Date of Birth</p>
              <p className="font-medium">{profileData.dob}</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold border-b pb-2">Academic Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Course</p>
              <p className="font-medium">{profileData.course}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Specialization</p>
              <p className="font-medium">{profileData.specialization}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Course Code</p>
              <p className="font-medium">{profileData.course_code}</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold border-b pb-2">Institution Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">College</p>
              <p className="font-medium">{profileData.college}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Enrollment Year</p>
              <p className="font-medium">{profileData.enrollment_year}</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 pt-6">
          <button className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Edit className="h-4 w-4" />
            Edit Profile
          </button>
          <button className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
            <Key className="h-4 w-4" />
            Change Password
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
