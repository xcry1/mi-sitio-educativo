import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PrimerosPasos } from '../data/courseDetails/PrimerosPasos';
import { Excel } from '../data/courseDetails/Excel';
import { PowerPoint } from '../data/courseDetails/PowerPoint';
import { useAuth } from '../context/AuthContext';
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
  const { user } = useAuth();
  const course = courses[slug];
  const [activeModules, setActiveModules] = useState({});
  const [progress, setProgress] = useState(() => {
    const savedProgress = localStorage.getItem(`progress-${slug}`);
    return savedProgress ? JSON.parse(savedProgress) : {};
  });
  const [feedback, setFeedback] = useState({});
  const [activeTab, setActiveTab] = useState({});
  const moduleRefs = useRef([]);
  const [showcase, setShowcase] = useState({ open: false, image: '', text: '' });

  useEffect(() => {
    localStorage.setItem(`progress-${slug}`, JSON.stringify(progress));
  }, [progress, slug]);

  useEffect(() => {
    if (course) {
      let totalItems = 0;
      course.contents.forEach(module => {
        module.lessons.forEach(lesson => {
          if (lesson.instructions) totalItems += lesson.instructions.length;
          if (lesson.quiz) totalItems += lesson.quiz.length;
          if (lesson.exercise) totalItems += 1;
        });
      });
      localStorage.setItem(`total-items-${slug}`, totalItems);
    }
  }, [course, slug]);

  if (!course) {
    return <div className="course-page">Curso no encontrado</div>;
  }

  if (!user) {
    return (
      <div className="course-locked-container">
        <div className="course-locked-card course-locked-fancy">
          <div className="course-locked-svg">
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
    if (!progress[key]) {
      setProgress(prev => ({
        ...prev,
        [key]: true
      }));
    }
  };

  const handleQuizAnswer = (moduleIndex, lessonIndex, quizIndex, selectedOption) => {
    const lesson = course.contents[moduleIndex].lessons[lessonIndex];
    const quiz = lesson.quiz[quizIndex];
    const isCorrect = selectedOption === quiz.correctAnswer;
    const feedbackKey = `quiz-${moduleIndex}-${lessonIndex}-${quizIndex}`;

    if (!progress[feedbackKey] && isCorrect) {
      setProgress(prev => ({
        ...prev,
        [feedbackKey]: true
      }));
      setFeedback(prev => ({
        ...prev,
        [feedbackKey]: 'correct'
      }));
    } else if (!progress[feedbackKey]) {
      setFeedback(prev => ({
        ...prev,
        [feedbackKey]: 'incorrect'
      }));
    }
  };

  const handleImageSelection = (moduleIndex, lessonIndex, selectedIndex) => {
    const lesson = course.contents[moduleIndex].lessons[lessonIndex];
    const correctOption = lesson.exercise.options?.findIndex(option => option.isCorrect) ?? -1;
    const isCorrect = selectedIndex === correctOption;
    const feedbackKey = `exercise-${moduleIndex}-${lessonIndex}`;

    if (!progress[feedbackKey] && isCorrect) {
      setProgress(prev => ({
        ...prev,
        [feedbackKey]: true
      }));
      setFeedback(prev => ({
        ...prev,
        [feedbackKey]: 'correct'
      }));
    } else if (!progress[feedbackKey]) {
      setFeedback(prev => ({
        ...prev,
        [feedbackKey]: 'incorrect'
      }));
    }
  };

  const calculateProgress = () => {
    let totalItems = 0;
    let completedItems = 0;

    course.contents.forEach((module, moduleIndex) => {
      module.lessons.forEach((lesson, lessonIndex) => {
        if (lesson.instructions) {
          totalItems += lesson.instructions.length;
          lesson.instructions.forEach((_, instructionIndex) => {
            const key = `${moduleIndex}-${lessonIndex}-${instructionIndex}`;
            if (progress[key]) completedItems++;
          });
        }
        if (lesson.quiz) {
          totalItems += lesson.quiz.length;
          lesson.quiz.forEach((_, quizIndex) => {
            const key = `quiz-${moduleIndex}-${lessonIndex}-${quizIndex}`;
            if (progress[key]) completedItems++;
          });
        }
        if (lesson.exercise) {
          totalItems += 1;
          const key = `exercise-${moduleIndex}-${lessonIndex}`;
          if (progress[key]) completedItems++;
        }
      });
    });

    return totalItems > 0 
      ? Math.min(100, Math.round((completedItems / totalItems) * 100))
      : 0;
  };

  const calculateModuleProgress = (moduleIndex) => {
    const module = course.contents[moduleIndex];
    let totalItems = 0;
    let completedItems = 0;

    module.lessons.forEach((lesson, lessonIndex) => {
      if (lesson.instructions) {
        totalItems += lesson.instructions.length;
        lesson.instructions.forEach((_, instructionIndex) => {
          const key = `${moduleIndex}-${lessonIndex}-${instructionIndex}`;
          if (progress[key]) completedItems++;
        });
      }
      if (lesson.quiz) {
        totalItems += lesson.quiz.length;
        lesson.quiz.forEach((_, quizIndex) => {
          const key = `quiz-${moduleIndex}-${lessonIndex}-${quizIndex}`;
          if (progress[key]) completedItems++;
        });
      }
      if (lesson.exercise) {
        totalItems += 1;
        const key = `exercise-${moduleIndex}-${lessonIndex}`;
        if (progress[key]) completedItems++;
      }
    });

    return totalItems > 0 
      ? Math.min(100, Math.round((completedItems / totalItems) * 100))
      : 0;
  };

  const handleTopicClick = (moduleIndex) => {
    if (moduleRefs.current[moduleIndex]) {
      moduleRefs.current[moduleIndex].scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const resetLessonProgress = (moduleIndex, lessonIndex) => {
    const updatedProgress = { ...progress };
    const updatedFeedback = { ...feedback };

    // Eliminar claves de instrucciones
    const instructionKeys = Object.keys(progress).filter(key => key.startsWith(`${moduleIndex}-${lessonIndex}-`));
    instructionKeys.forEach(key => {
      delete updatedProgress[key];
      delete updatedFeedback[key];
    });

    // Eliminar claves de quizzes
    const quizKeys = Object.keys(progress).filter(key => key.startsWith(`quiz-${moduleIndex}-${lessonIndex}-`));
    quizKeys.forEach(key => {
      delete updatedProgress[key];
      delete updatedFeedback[key];
    });

    // Eliminar claves de ejercicios
    const exerciseKey = `exercise-${moduleIndex}-${lessonIndex}`;
    delete updatedProgress[exerciseKey];
    delete updatedFeedback[exerciseKey];

    setProgress(updatedProgress);
    setFeedback(updatedFeedback);
  };

  const totalMinutes = getTotalMinutes(course);

  const toggleTab = (moduleIndex, lessonIndex, tabName) => {
    setActiveTab(prev => {
      const currentTab = prev[`${moduleIndex}-${lessonIndex}`];
      return {
        ...prev,
        [`${moduleIndex}-${lessonIndex}`]: currentTab === tabName ? null : tabName
      };
    });
  };

  return (
    <div className="course-page">
      <div 
        className="course-hero" 
        style={{ 
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.5)), url(${course.image})`
        }}
      >
        <div className="hero-content">
          <h1>{course.title}</h1>
          <div className="course-meta">
            <span>{totalMinutes ? `${totalMinutes} min` : course.duration}</span>
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
            <div className="progress-fill" style={{ width: `${calculateProgress()}%` }} />
          </div>
        </div>

        <p className="course-description">{course.fullDescription}</p>

        <div className="program-content">
          <h2>Contenido del Programa</h2>
          <div className="topics-grid">
            {course.contents.map((module, index) => (
              <button
                key={index}
                className="topic-item"
                onClick={() => handleTopicClick(index)}
                style={{ cursor: 'pointer', border: 'none', background: 'none', textAlign: 'left' }}
              >
                <span className="topic-number">{index + 1}</span>
                <p>{module.title}</p>
              </button>
            ))}
          </div>
        </div>

        <div className="modules">
          {course.contents.map((module, moduleIndex) => (
            <div key={moduleIndex} className="module" ref={el => (moduleRefs.current[moduleIndex] = el)}>
              <div className="module-header" onClick={() => toggleModule(moduleIndex)}>
                <div className="module-header-content">
                  <div className="module-title">
                    <h3>{module.title}</h3>
                    <span className="module-duration">
                      {module.lessons.reduce((total, lesson) => total + (parseInt(lesson.duration) || 0), 0)} minutos
                    </span>
                  </div>
                  <span>{activeModules[moduleIndex] ? '▼' : '▶'}</span>
                </div>
                <div className="module-progress-container">
                  <div className="module-progress-fill" style={{ width: `${calculateModuleProgress(moduleIndex)}%` }} />
                </div>
              </div>
              
              <div className={`module-content ${activeModules[moduleIndex] ? 'active' : ''}`}>
                {module.lessons.map((lesson, lessonIndex) => (
                  <div key={lessonIndex} className="lesson-container">
                    <div className="lesson-header">
                      <div className="lesson-title">
                        <h3>{lesson.title}</h3>
                        <span className="lesson-duration">⏱️ {lesson.duration} min</span>
                      </div>
                      <p className="lesson-description">{lesson.description}</p>
                      <button
                        className="reset-lesson-btn"
                        onClick={() => resetLessonProgress(moduleIndex, lessonIndex)}
                      >
                        Reiniciar lección
                      </button>
                    </div>
                    <div className="lesson-content">
                      <div className="lesson-tabs">
                        <button
                          className={`tab-button ${activeTab[`${moduleIndex}-${lessonIndex}`] === 'instructions' ? 'active' : ''}`}
                          onClick={() => toggleTab(moduleIndex, lessonIndex, 'instructions')}
                        >
                          <div className="tab-icon">📝</div>
                          <div className="tab-label">Instrucciones</div>
                          <div className="tab-description">Paso a paso de la lección</div>
                        </button>
                        {lesson.quiz && (
                          <button
                            className={`tab-button ${activeTab[`${moduleIndex}-${lessonIndex}`] === 'quiz' ? 'active' : ''}`}
                            onClick={() => toggleTab(moduleIndex, lessonIndex, 'quiz')}
                          >
                            <div className="tab-icon">❓</div>
                            <div className="tab-label">Preguntas</div>
                            <div className="tab-description">Prueba tu conocimiento</div>
                          </button>
                        )}
                        {lesson.exercise && lesson.exercise.options && lesson.exercise.options.length > 0 && (
                          <button
                            className={`tab-button ${activeTab[`${moduleIndex}-${lessonIndex}`] === 'exercise' ? 'active' : ''}`}
                            onClick={() => toggleTab(moduleIndex, lessonIndex, 'exercise')}
                          >
                            <div className="tab-icon">⚡</div>
                            <div className="tab-label">Ejercicio</div>
                            <div className="tab-description">Practica lo aprendido</div>
                          </button>
                        )}
                      </div>
                      <div className={`tab-content ${!activeTab[`${moduleIndex}-${lessonIndex}`] ? 'hidden' : ''}`}>
                        {activeTab[`${moduleIndex}-${lessonIndex}`] === 'instructions' && lesson.instructions && (
                          <div className="lesson-instructions">
                            {lesson.instructions.map((instruction, i) => (
                              <div key={i} className="instruction-item">
                                <span className="instruction-number">{i + 1}.</span>
                                <p className="instruction-text" dangerouslySetInnerHTML={{ __html: (typeof instruction === 'string' ? instruction : instruction.text).replace(/^\d+\.\s*/, '') }} />
                                {instruction.image && (
                                  <button
                                    className="show-image-btn"
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
                                    disabled={!!progress[`${moduleIndex}-${lessonIndex}-${i}`]}
                                  />
                                  <span>Completado</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                        {activeTab[`${moduleIndex}-${lessonIndex}`] === 'quiz' && lesson.quiz && (
                          <div className="quiz-container">
                            {lesson.quiz.map((q, qIndex) => (
                              <div key={qIndex} className="quiz-question">
                                <p>{q.question}</p>
                                <div className="quiz-options">
                                  {q.options.map((option, oIndex) => (
                                    <button
                                      key={oIndex}
                                      onClick={() => handleQuizAnswer(moduleIndex, lessonIndex, qIndex, option)}
                                      className="quiz-option"
                                      disabled={!!progress[`quiz-${moduleIndex}-${lessonIndex}-${qIndex}`]}
                                    >
                                      {option}
                                    </button>
                                  ))}
                                </div>
                                {feedback[`quiz-${moduleIndex}-${lessonIndex}-${qIndex}`] && (
                                  <p className="feedback-message" style={{ color: feedback[`quiz-${moduleIndex}-${lessonIndex}-${qIndex}`] === 'correct' ? '#22c55e' : '#ef4444' }}>
                                    {feedback[`quiz-${moduleIndex}-${lessonIndex}-${qIndex}`] === 'correct' ? '¡Bien!' : '¡Incorrecto, intenta de nuevo!'}
                                  </p>
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                        {activeTab[`${moduleIndex}-${lessonIndex}`] === 'exercise' && lesson.exercise && (
                          <div className="exercise-container">
                            {lesson.exercise.type === 'image-selection' && (
                              <>
                                <p>{lesson.exercise.question}</p>
                                <div className="image-options">
                                  {lesson.exercise.options.map((option, index) => (
                                    <img
                                      key={index}
                                      src={option.image}
                                      alt={`Opción ${index + 1}`}
                                      onClick={() => !progress[`exercise-${moduleIndex}-${lessonIndex}`] && handleImageSelection(moduleIndex, lessonIndex, index)}
                                      className="image-option"
                                      style={{ border: progress[`exercise-${moduleIndex}-${lessonIndex}`] ? '2px solid #22c55e' : '2px solid transparent' }}
                                    />
                                  ))}
                                </div>
                                {feedback[`exercise-${moduleIndex}-${lessonIndex}`] && (
                                  <p className="feedback-message" style={{ color: feedback[`exercise-${moduleIndex}-${lessonIndex}`] === 'correct' ? '#22c55e' : '#ef4444' }}>
                                    {feedback[`exercise-${moduleIndex}-${lessonIndex}`] === 'correct' ? '¡Bien!' : '¡Incorrecto, intenta de nuevo!'}
                                  </p>
                                )}
                              </>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {course.finalProject && (
          <div className="final-project">
            <h2>Proyecto Final: {course.finalProject.title}</h2>
            <p>{course.finalProject.description}</p>
            <ol>
              {course.finalProject.steps.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ol>
            <button
              onClick={() => setProgress(prev => ({ ...prev, 'final-project': true }))}
              className="complete-project-btn"
              disabled={progress['final-project']}
            >
              {progress['final-project'] ? 'Completado' : 'Marcar como completado'}
            </button>
          </div>
        )}

        {course.additionalResources && (
          <div className="additional-resources">
            <h2>Recursos Adicionales</h2>
            <ul>
              {course.additionalResources.map((resource, index) => (
                <li key={index}>
                  <a href={resource.url} target="_blank" rel="noopener noreferrer">{resource.text}</a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {showcase.open && (
        <div className="image-showcase-overlay" onClick={() => setShowcase({ open: false, image: '', text: '' })}>
          <div className="image-showcase-modal" onClick={e => e.stopPropagation()}>
            <button className="image-showcase-close" onClick={() => setShowcase({ open: false, image: '', text: '' })}>×</button>
            <img src={showcase.image} alt="Paso" className="image-showcase-img" />
            <div className="image-showcase-caption">{showcase.text}</div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CoursePage;