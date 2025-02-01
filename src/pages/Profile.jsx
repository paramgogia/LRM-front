import React from 'react';

const Profile = () => {
  const profileData = {
    name: "Atharva Patil",
    abcID: "2406dWhqNcre",
    dob: "1997-04-23",
    course: "Electronics Engineering",
    specialization: "VLSI Design",
    courseCode: "ECE101",
    college: "SPIT",
    enrollmentYear: "2023"
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-6">Profile Information</h1>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h2 className="font-semibold mb-4">Personal Details</h2>
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-gray-600">Full Name</label>
                  <p className="font-medium">{profileData.name}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-600">ABC ID</label>
                  <p className="font-medium">{profileData.abcID}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-600">Date of Birth</label>
                  <p className="font-medium">{profileData.dob}</p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="font-semibold mb-4">Academic Details</h2>
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-gray-600">Course</label>
                  <p className="font-medium">{profileData.course}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-600">Specialization</label>
                  <p className="font-medium">{profileData.specialization}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-600">Course Code</label>
                  <p className="font-medium">{profileData.courseCode}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t">
            <h2 className="font-semibold mb-4">Institution Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm text-gray-600">College</label>
                <p className="font-medium">{profileData.college}</p>
              </div>
              <div>
                <label className="text-sm text-gray-600">Enrollment Year</label>
                <p className="font-medium">{profileData.enrollmentYear}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-4">
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          Edit Profile
        </button>
        <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
          Change Password
        </button>
      </div>
    </div>
  );
};

export default Profile;