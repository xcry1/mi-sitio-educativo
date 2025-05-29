import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Widget from './components/Widget';
import CoursePage from './components/CoursePage';
import CourseList from './components/CourseList';
import Home from './components/Home';
import AboutUs from './components/AboutUs';
import './styles/styles.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sobre-nosotros" element={<AboutUs />} />
            <Route path="/cursos" element={<CourseList />} />
            <Route path="/curso/:slug" element={<CoursePage />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
        <Widget text="¿Necesitas ayuda? Estamos aquí para apoyarte en tu aprendizaje." />
      </div>
    </Router>
  );
}

export default App;