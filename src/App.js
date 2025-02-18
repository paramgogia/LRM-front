import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import DashboardLayout from './pages/dash';
import Overview from './pages/Overview';
import Credits from './pages/Credits';
import History from './pages/History';
import Profile from './pages/Profile';
// import Settings from './pages/Settings'
import CollegeAdmissionForm from './pages/Collegeadmission';
import TransferCredits from './pages/TransferCredits';
import NADStudentAdmission from './pages/NADadmission';
import IssueCertificate from './pages/IssueCertificate';
import AuthPage from './pages/Login';
import Nad_Dash from './pages/NAD/Nad_dash';
import AcademicDashboard from './pages/Student/StudentsCredits';
import Studentdash from './pages/Student/StudentDash';
import RedeemCreditsComponent from './pages/Redeem';
import CollegeRegistration from './pages/NAD/CollegeRegistration';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<AuthPage />} />
        <Route element={<DashboardLayout><Outlet /></DashboardLayout>}>
          <Route index element={<Overview />} />
          <Route path="credits" element={<Credits />} />
          <Route path="history" element={<History />} />
          <Route path="profile" element={<Profile />} />
          <Route path="college-admission" element={<CollegeAdmissionForm />} />
          <Route path="academic-dashboard" element={<AcademicDashboard />} />
          <Route path="issue-certificate" element={<IssueCertificate />} />
          <Route path="transfer-credits" element={<TransferCredits />} />
        <Route path= "redeem-credits" element={<RedeemCreditsComponent />} />
          {/* <Route path="settings" element={<Settings />} />  */}
        </Route>
        <Route path="nad" element={<Nad_Dash ><Outlet /></Nad_Dash>} >
        <Route path="nad-admission" element={<NADStudentAdmission />} />
        <Route path="college-registration" element={<CollegeRegistration />} />
        </Route>
        
        <Route path="student" element={<Studentdash ><Outlet /></Studentdash>} >
        <Route path="academic-dashboard" element={<AcademicDashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;