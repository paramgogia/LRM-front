import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AuthPage = () => {
  const navigate = useNavigate();
  const [authType, setAuthType] = useState('login');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Form data state for different auth types
  const [loginData, setLoginData] = useState({
    organization: 'Org2',
    username: '',
    password: ''
  });

  const [registerData, setRegisterData] = useState({
    username: '',
    password: '',
    readUrl: '',
    writeUrl: ''
  });

  const [updateData, setUpdateData] = useState({
    college: '',
    readUrl: '',
    writeUrl: ''
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
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
      setAuthType('login');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/update-access-urls', updateData, {
        headers: {
          'Content-Type': 'application/json',
          'username': 'SPIT',
          'organization': 'Org2',
          'identity': 'e5858d0503cc9fbef80ff51c2fcfd5567a127f9d01b7a50ea6b8f0bc3a8419ac'
        }
      });
      
      setSuccess('Update successful!');
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Update failed');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-2xl font-bold text-center text-gray-900 mb-8">
            Academic Bank of Credits
          </h1>

          <div className="flex space-x-2 mb-6">
            <button
              onClick={() => setAuthType('login')}
              className={`flex-1 py-2 rounded-lg font-medium transition-colors ${
                authType === 'login'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setAuthType('register')}
              className={`flex-1 py-2 rounded-lg font-medium transition-colors ${
                authType === 'register'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Register
            </button>
            <button
              onClick={() => setAuthType('update')}
              className={`flex-1 py-2 rounded-lg font-medium transition-colors ${
                authType === 'update'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Update
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

          {authType === 'login' && (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Organization
                </label>
                <input
                  type="text"
                  value={loginData.organization}
                  onChange={(e) =>
                    setLoginData({ ...loginData, organization: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Username
                </label>
                <input
                  type="text"
                  value={loginData.username}
                  onChange={(e) =>
                    setLoginData({ ...loginData, username: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={loginData.password}
                  onChange={(e) =>
                    setLoginData({ ...loginData, password: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
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

          {authType === 'register' && (
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
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
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
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
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
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
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
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Register
              </button>
            </form>
          )}

          {authType === 'update' && (
            <form onSubmit={handleUpdate} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  College
                </label>
                <input
                  type="text"
                  value={updateData.college}
                  onChange={(e) =>
                    setUpdateData({ ...updateData, college: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Read URL
                </label>
                <input
                  type="text"
                  value={updateData.readUrl}
                  onChange={(e) =>
                    setUpdateData({ ...updateData, readUrl: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Write URL
                </label>
                <input
                  type="text"
                  value={updateData.writeUrl}
                  onChange={(e) =>
                    setUpdateData({ ...updateData, writeUrl: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Update
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthPage;