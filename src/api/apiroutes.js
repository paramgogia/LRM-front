// apiRoutes.js
import axios from 'react';

const BASE_URL = 'http://localhost:3000';

// IPFS Routes
export const ipfsRoutes = {
  naacAdd: async (data) => {
    return axios.post('http://127.0.0.100:9094/add', data, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  },
  naacGet: async (hash) => {
    return axios.get(`http://127.0.0.100:8080/ipfs/${hash}`);
  },
  spitAdd: async (data) => {
    return axios.post('http://127.0.0.101:9094/add', data, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  },
  spitGet: async (hash) => {
    return axios.get(`http://127.0.0.101:8080/ipfs/${hash}`);
  },
  vjtiAdd: async (data) => {
    return axios.post('http://127.0.0.102:9094/add', data, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  },
  vjtiGet: async (hash) => {
    return axios.get(`http://127.0.0.102:8080/ipfs/${hash}`);
  }
};

// Authentication & Registration Routes
export const authRoutes = {
  collegeRegister: async (data, headers) => {
    return axios.post(`${BASE_URL}/college/register`, data, { headers });
  },
  nadRegister: async (data, headers) => {
    return axios.post(`${BASE_URL}/nad/register`, data, { headers });
  },
  login: async (data) => {
    return axios.post(`${BASE_URL}/login`, data);
  },
  nadStudentAdmission: async (data, headers) => {
    return axios.post(`${BASE_URL}/admission`, data, { headers });
  },
  collegeStudentAdmission: async (data, headers) => {
    return axios.post(`${BASE_URL}/college-admission`, data, { headers });
  }
};

// Update Routes
export const updateRoutes = {
  updateNadStudentData: async (data, headers) => {
    return axios.post(`${BASE_URL}/update-nad-student-data`, data, { headers });
  },
  updateCollegeStudentData: async (data, headers) => {
    return axios.post(`${BASE_URL}/update-college-student-data`, data, { headers });
  },
  updateAccessUrls: async (data, headers) => {
    return axios.post(`${BASE_URL}/update-access-urls`, data, { headers });
  }
};

// Certificate Routes
export const certificateRoutes = {
  issueCertificate: async (data, headers) => {
    return axios.post(`${BASE_URL}/certificate/college/issue`, data, { headers });
  },
  revokeCertificate: async (data, headers) => {
    return axios.post(`${BASE_URL}/certificate/college/revoke`, data, { headers });
  },
  amendCertificate: async (data, headers) => {
    return axios.post(`${BASE_URL}/certificate/college/amend`, data, { headers });
  },
  addAchievement: async (data, headers) => {
    return axios.post(`${BASE_URL}/certificate/achievements`, data, { headers });
  },
  transferCredits: async (data, headers) => {
    return axios.post(`${BASE_URL}/certificate/college/transfer-credits`, data, { headers });
  },
  redeemCredits: async (data, headers) => {
    return axios.post(`${BASE_URL}/certificate/college/redeem-credits`, data, { headers });
  },
  nadIssue: async (data, headers) => {
    return axios.post(`${BASE_URL}/certificate/NAD/issue`, data, { headers });
  }
};

// Permission Routes
export const permissionRoutes = {
  amendPermission: async (data, headers) => {
    return axios.post(`${BASE_URL}/permission/amend`, data, { headers });
  },
  removePermission: async (data, headers) => {
    return axios.post(`${BASE_URL}/permission/remove`, data, { headers });
  },
  addPermission: async (data, headers) => {
    return axios.post(`${BASE_URL}/permission/add`, data, { headers });
  }
};

// View Routes
export const viewRoutes = {
  viewCertificate: async (data, headers) => {
    return axios.post(`${BASE_URL}/view/certificate`, data, { headers });
  },
  viewSuper: async (data, headers) => {
    return axios.post(`${BASE_URL}/view/super`, data, { headers });
  }
};

// Student Routes
export const studentRoutes = {
  dropout: async (data, headers) => {
    return axios.post(`${BASE_URL}/student/dropout`, data, { headers });
  },
  amendDropout: async (data, headers) => {
    return axios.post(`${BASE_URL}/student/dropout`, data, { headers });
  }
};

// Helper function to create headers
export const createHeaders = (username, organization, identity) => {
  return {
    username,
    organization,
    identity
  };
};