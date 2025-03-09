import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SignUp from './auth/SignUp';
import Login from './auth/Login';
import PlayerManagement from './components/PlayerManagement';

function App() {
  return (
    <Router>
      <Routes>
        
        <Route path="/signup" element={<SignUp />} />
        <Route path="/playerManagement" element={<PlayerManagement />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;