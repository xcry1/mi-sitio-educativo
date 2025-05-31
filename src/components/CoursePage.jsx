import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PrimerosPasos } from '../data/courseDetails/PrimerosPasos';
import { Excel } from '../data/courseDetails/Excel';
import { PowerPoint } from '../data/courseDetails/PowerPoint';
import { useAuth } from '../context/AuthContext'; // NUEVO
import '../styles/CoursePage.css';

const courses = {
  'primeros-pasos': PrimerosPasos,
  'excel': Excel,
  'powerpoint': PowerPoint,
};

function getTotalMinutes(course) {
  if (!course || !course.contents) return null;
  let total = 0;
  course.contents.forEach(module => {
    module.lessons.forEach(lesson => {
      const min = parseInt(lesson.duration, 10);
      if (!isNaN(min)) total += min;
    });
  });
  return total;
}

function CoursePage() {
  const { slug } = useParams();
  const { user } = useAuth(); // NUEVO
  const course = courses[slug];
  const [activeModules, setActiveModules] = useState({});
  const [progress, setProgress] = useState(() => {
    const savedProgress = localStorage.getItem(`progress-${slug}`);
    return savedProgress ? JSON.parse(savedProgress) : {};
  });
  const moduleRefs = useRef([]);
  const [showcase, setShowcase] = useState({ open: false, image: '', text: '' });

  useEffect(() => {
    localStorage.setItem(`progress-${slug}`, JSON.stringify(progress));
  }, [progress, slug]);

  useEffect(() => {
    if (course) {
      let totalInstructions = 0;
      course.contents.forEach(module => {
        module.lessons.forEach(lesson => {
          if (lesson.instructions) {
            totalInstructions += lesson.instructions.length;
          }
        });
      });
      localStorage.setItem(`total-instructions-${slug}`, totalInstructions);
    }
  }, [course, slug]);

  if (!course) {
    return <div className="course-page">Curso no encontrado</div>;
  }

  // NUEVO: Si no está autenticado, mostrar mensaje divertido y visual
  if (!user) {
    return (
      <div className="course-locked-container">
        <div className="course-locked-card course-locked-fancy">
          <div className="course-locked-svg">
            {/* SVG divertido */}
            <svg width="120" height="120" viewBox="0 0 120 120" fill="none" aria-hidden="true">
              <circle cx="60" cy="60" r="58" fill="#fef3c7" stroke="#fbbf24" strokeWidth="4"/>
              <ellipse cx="60" cy="80" rx="32" ry="12" fill="#fde68a"/>
              <ellipse cx="60" cy="60" rx="36" ry="36" fill="#fbbf24"/>
              <ellipse cx="45" cy="55" rx="6" ry="8" fill="#fff"/>
              <ellipse cx="75" cy="55" rx="6" ry="8" fill="#fff"/>
              <ellipse cx="45" cy="57" rx="2.5" ry="3" fill="#222"/>
              <ellipse cx="75" cy="57" rx="2.5" ry="3" fill="#222"/>
              <path d="M50 72 Q60 80 70 72" stroke="#222" strokeWidth="3" fill="none" strokeLinecap="round"/>
              <ellipse cx="60" cy="60" rx="36" ry="36" fill="none" stroke="#f59e42" strokeWidth="2"/>
              <text x="60" y="110" textAnchor="middle" fontSize="1.2em" fill="#fbbf24" fontWeight="bold">¡Oops!</text>
            </svg>
          </div>
          <h2 className="course-locked-title">¡Ups! Zona exclusiva</h2>
          <p className="course-locked-text">
            <span style={{ fontWeight: 600, color: '#f59e42', fontSize: '1.1em' }}>¡Detente, explorador digital!</span><br />
            Para acceder a este curso necesitas <span style={{ color: '#2563eb', fontWeight: 700 }}>iniciar sesión</span>.<br />
            <span style={{ color: '#22c55e', fontWeight: 600 }}>¡Es gratis y rápido!</span>
          </p>
          <Link to="/login" className="course-locked-bigbtn">
            🚀 Iniciar sesión y aprender
          </Link>
          <div className="course-locked-fun">
            <span role="img" aria-label="divertido">🤖</span>
            <span style={{ color: '#2563eb', fontWeight: 600 }}>¡Tu aventura digital comienza aquí!</span>
          </div>
        </div>
      </div>
    );
  }

  const toggleModule = (index) => {
    setActiveModules(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const handleLessonComplete = (moduleIndex, lessonIndex, instructionIndex) => {
    const key = `${moduleIndex}-${lessonIndex}-${instructionIndex}`;
    setProgress(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const calculateProgress = () => {
    let totalInstructions = 0;
    let completedInstructions = 0;

    course.contents.forEach((module, moduleIndex) => {
      module.lessons.forEach((lesson, lessonIndex) => {
        if (lesson.instructions) {
          totalInstructions += lesson.instructions.length;
          lesson.instructions.forEach((_, instructionIndex) => {
            const key = `${moduleIndex}-${lessonIndex}-${instructionIndex}`;
            if (progress[key]) {
              completedInstructions++;
            }
          });
        }
      });
    });

    return totalInstructions > 0 
      ? Math.min(100, Math.round((completedInstructions / totalInstructions) * 100))
      : 0;
  };

  const calculateModuleProgress = (moduleIndex) => {
    const module = course.contents[moduleIndex];
    let totalInstructions = 0;
    let completedInstructions = 0;

    module.lessons.forEach((lesson, lessonIndex) => {
      if (lesson.instructions) {
        totalInstructions += lesson.instructions.length;
        lesson.instructions.forEach((_, instructionIndex) => {
          const key = `${moduleIndex}-${lessonIndex}-${instructionIndex}`;
          if (progress[key]) {
            completedInstructions++;
          }
        });
      }
    });

    return totalInstructions > 0 
      ? Math.min(100, Math.round((completedInstructions / totalInstructions) * 100))
      : 0;
  };

  // Scroll a módulo al hacer clic en el tema
  const handleTopicClick = (moduleIndex) => {
    if (moduleRefs.current[moduleIndex]) {
      moduleRefs.current[moduleIndex].scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const totalMinutes = getTotalMinutes(course);

  return (
    <div className="course-page">
      <div 
        className="hero course-hero" 
        style={{ 
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.5)), url(${course.image})`
        }}
      >
        <div className="hero-content">
          <h1>{course.title}</h1>
          <div className="course-meta">
            <span>
              {totalMinutes ? `${totalMinutes} min` : course.duration}
            </span>
            <span>{course.level}</span>
          </div>
        </div>
      </div>

      <div className="course-content">
        <div className="course-progress">
          <div className="progress-label">
            <span>Progreso del curso</span>
            <span>{calculateProgress()}%</span>
          </div>
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${calculateProgress()}%` }}
            />
          </div>
        </div>

        <p>{course.fullDescription}</p>

        <div className="program-content">
          <h2>Contenido del Programa</h2>
          <div className="topics-grid">
            {course.contents.map((module, index) => (
              <button
                key={index}
                className="topic-item"
                style={{ cursor: 'pointer', border: 'none', background: 'none', textAlign: 'left' }}
                onClick={() => handleTopicClick(index)}
                tabIndex={0}
                aria-label={`Ir al módulo: ${module.title}`}
              >
                <span className="topic-number">{index + 1}</span>
                <p style={{ margin: 0, color: 'var(--primary)', textDecoration: 'underline' }}>{module.title}</p>
              </button>
            ))}
          </div>
        </div>

        <div className="modules">
          {course.contents.map((module, moduleIndex) => (
            <div
              key={moduleIndex}
              className="module"
              ref={el => (moduleRefs.current[moduleIndex] = el)}
            >
              <div 
                className="module-header"
                onClick={() => toggleModule(moduleIndex)}
              >
                <div className="module-header-content">
                  <div className="module-title">
                    <h3>{module.title}</h3>
                    <span className="module-duration">
                      {module.lessons.reduce((total, lesson) => {
                        const duration = parseInt(lesson.duration) || 0;
                        return total + duration;
                      }, 0)} minutos
                    </span>
                  </div>
                  <span>{activeModules[moduleIndex] ? '▼' : '▶'}</span>
                </div>
                <div className="module-progress-container">
                  <div 
                    className="module-progress-fill"
                    style={{ width: `${calculateModuleProgress(moduleIndex)}%` }}
                  />
                </div>
              </div>
              
              <div className={`module-content ${activeModules[moduleIndex] ? 'active' : ''}`}>
                {module.lessons.map((lesson, lessonIndex) => (
                  <div key={lessonIndex} className="lesson-container">
                    <div className="lesson-header-info">
                      <div className="lesson-title-main">
                        <h3>{lesson.title}</h3>
                        <div className="lesson-duration">⏱️ {lesson.duration}</div>
                      </div>
                      <p className="lesson-description">{lesson.description}</p>
                    </div>
                    <div className="lesson-content-grid">
                      <div className="lesson-instructions">
                        <h5>Instrucciones:</h5>
                        {lesson.instructions?.map((instruction, i) => (
                          <div key={i} className="instruction-item">
                            <span className="instruction-number">{i + 1}.</span>
                            <p className="instruction-text">
                              <span dangerouslySetInnerHTML={{ __html: (typeof instruction === 'string' ? instruction : instruction.text).replace(/^\d+\.\s*/, '') }} />
                            </p>
                            {/* Botón para mostrar imagen si existe */}
                            {instruction.image && (
                              <button
                                className="show-image-btn"
                                type="button"
                                onClick={() => setShowcase({ open: true, image: instruction.image, text: (typeof instruction === 'string' ? instruction : instruction.text) })}
                              >
                                Mostrar imagen
                              </button>
                            )}
                            <div className="instruction-checkbox">
                              <input
                                type="checkbox"
                                className="complete-checkbox"
                                checked={!!progress[`${moduleIndex}-${lessonIndex}-${i}`]}
                                onChange={() => handleLessonComplete(moduleIndex, lessonIndex, i)}
                              />
                              <span>Completado</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Modal/Showcase de imagen */}
      {showcase.open && (
        <div className="image-showcase-overlay" onClick={() => setShowcase({ open: false, image: '', text: '' })}>
          <div className="image-showcase-modal" onClick={e => e.stopPropagation()}>
            <button className="image-showcase-close" onClick={() => setShowcase({ open: false, image: '', text: '' })} aria-label="Cerrar imagen">×</button>
            <img src={showcase.image} alt="Paso" className="image-showcase-img" />
            <div className="image-showcase-caption">{showcase.text}</div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CoursePage;