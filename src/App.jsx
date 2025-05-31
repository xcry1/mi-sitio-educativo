import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Widget from './components/Widget';
import CoursePage from './components/CoursePage';
import CourseList from './components/CourseList';
import Home from './components/Home';
import AboutUs from './components/AboutUs';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';
import { AuthProvider, useAuth } from './context/AuthContext';
import './styles/styles.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app">
          <Navbar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/sobre-nosotros" element={<AboutUs />} />
              <Route path="/cursos" element={<CourseList />} />
              <Route path="/curso/:slug" element={<CoursePage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/registro" element={<Register />} />
              <Route path="/perfil" element={<RequireAuth><Profile /></RequireAuth>} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </main>
          <Widget text="¿Necesitas ayuda? Estamos aquí para apoyarte en tu aprendizaje." />
        </div>
      </Router>
    </AuthProvider>
  );
}

// Protección de ruta
function RequireAuth({ children }) {
  const { user, loading } = useAuth();
  if (loading) return null; // O un loader/spinner si prefieres
  if (!user) return <Navigate to="/login" />;
  return children;
}

export default App;