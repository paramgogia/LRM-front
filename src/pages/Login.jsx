import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AuthPage = () => {
  const navigate = useNavigate();
  const [loginType, setLoginType] = useState('college');
  const [showRegistration, setShowRegistration] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Login data state for different user types
  const [collegeLogin, setCollegeLogin] = useState({
    username: '',
    password: '',
    organization: 'Org2'
  });

  const [nadLogin, setNadLogin] = useState({
    username: '',
    password: ''
  });

  const [studentLogin, setStudentLogin] = useState({
    username: '',
    password: ''
  });

  const [registerData, setRegisterData] = useState({
    username: '',
    password: '',
    readUrl: '',
    writeUrl: ''
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      let loginData;
      switch (loginType) {
        case 'college':
          loginData = collegeLogin;
          break;
        case 'nad':
          loginData = nadLogin;
          break;
        case 'student':
          loginData = studentLogin;
          break;
        default:
          loginData = collegeLogin;
      }

      const response = await axios.post('http://127.0.0.1:3000/login', loginData, {
        headers: { 'Content-Type': 'application/json' }
      });
      
      setSuccess('Login successful!');
      setError('');
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/college/register', registerData, {
        headers: {
          'Content-Type': 'application/json',
          'username': 'super user',
          'organization': 'Org1',
          'identity': '8179913b0d17f65e284ec857f8bec028e779095d39ea8c4035fdba3e42e5da72'
        }
      });
      
      setSuccess('Registration successful!');
      setError('');
      setShowRegistration(false);
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl flex gap-8">
        {/* Login Section */}
        <div className="flex-1 bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-2xl font-bold text-center text-gray-900 mb-8">
            Academic Bank of Credits - Login
          </h1>

          {/* Login Tabs */}
          <div className="flex space-x-2 mb-6">
            <button
              onClick={() => setLoginType('college')}
              className={`flex-1 py-2 rounded-lg font-medium transition-colors ${
                loginType === 'college'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              College
            </button>
            <button
              onClick={() => setLoginType('nad')}
              className={`flex-1 py-2 rounded-lg font-medium transition-colors ${
                loginType === 'nad'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              NAD
            </button>
            <button
              onClick={() => setLoginType('student')}
              className={`flex-1 py-2 rounded-lg font-medium transition-colors ${
                loginType === 'student'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Student
            </button>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg">
              {success}
            </div>
          )}

          {/* Login Forms */}
          {loginType === 'college' && (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Organization
                </label>
                <input
                  type="text"
                  value={collegeLogin.organization}
                  onChange={(e) =>
                    setCollegeLogin({ ...collegeLogin, organization: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Username
                </label>
                <input
                  type="text"
                  value={collegeLogin.username}
                  onChange={(e) =>
                    setCollegeLogin({ ...collegeLogin, username: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={collegeLogin.password}
                  onChange={(e) =>
                    setCollegeLogin({ ...collegeLogin, password: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Sign In
              </button>
            </form>
          )}

          {loginType === 'nad' && (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Username
                </label>
                <input
                  type="text"
                  value={nadLogin.username}
                  onChange={(e) =>
                    setNadLogin({ ...nadLogin, username: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={nadLogin.password}
                  onChange={(e) =>
                    setNadLogin({ ...nadLogin, password: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Sign In
              </button>
            </form>
          )}

          {loginType === 'student' && (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Username
                </label>
                <input
                  type="text"
                  value={studentLogin.username}
                  onChange={(e) =>
                    setStudentLogin({ ...studentLogin, username: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={studentLogin.password}
                  onChange={(e) =>
                    setStudentLogin({ ...studentLogin, password: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Sign In
              </button>
            </form>
          )}
        </div>

        {/* Registration Section */}
        <div className="flex-1 bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-2xl font-bold text-center text-gray-900 mb-8">
            New College Registration
          </h1>

          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Username
              </label>
              <input
                type="text"
                value={registerData.username}
                onChange={(e) =>
                  setRegisterData({ ...registerData, username: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                value={registerData.password}
                onChange={(e) =>
                  setRegisterData({ ...registerData, password: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Read URL
              </label>
              <input
                type="text"
                value={registerData.readUrl}
                onChange={(e) =>
                  setRegisterData({ ...registerData, readUrl: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Write URL
              </label>
              <input
                type="text"
                value={registerData.writeUrl}
                onChange={(e) =>
                  setRegisterData({ ...registerData, writeUrl: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;