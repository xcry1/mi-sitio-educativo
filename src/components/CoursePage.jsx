import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { PrimerosPasos } from '../data/courseDetails/PrimerosPasos';
import { Excel } from '../data/courseDetails/Excel';
import { PowerPoint } from '../data/courseDetails/PowerPoint';

const courses = {
  'primeros-pasos': PrimerosPasos,
  'excel': Excel,
  'powerpoint': PowerPoint,
};

function CoursePage() {
  const { slug } = useParams();
  const course = courses[slug];
  const [activeModules, setActiveModules] = useState({});
  const [progress, setProgress] = useState(() => {
    const savedProgress = localStorage.getItem(`progress-${slug}`);
    return savedProgress ? JSON.parse(savedProgress) : {};
  });

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

  return (
    <div className="course-page">
      <div 
        className="course-hero" 
        style={{ 
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${course.image})` 
        }}
      >
        <h1>{course.title}</h1>
        <div className="course-meta">
          <span>{course.duration}</span>
          <span>{course.level}</span>
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
            {course.topics.map((topic, index) => (
              <div key={index} className="topic-item">
                <span className="topic-number">{index + 1}</span>
                <p>{topic}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="modules">
          {course.contents.map((module, moduleIndex) => (
            <div key={moduleIndex} className="module">
              <div 
                className="module-header"
                onClick={() => toggleModule(moduleIndex)}
              >
                <div className="module-header-content">
                  <h3>{module.title}</h3>
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
                      <h3 className="lesson-title-main">{lesson.title}</h3>
                      <div className="lesson-duration-main">⏱️ {lesson.duration}</div>
                      <p className="lesson-description">{lesson.description}</p>
                    </div>

                    <div className="lesson-content-grid">
                      <div className="lesson-instructions">
                        <h5>Instrucciones:</h5>
                        {lesson.instructions?.map((instruction, i) => (
                          <div key={i} className="instruction-item">
                            <span className="instruction-number">{i + 1}.</span>
                            <p className="instruction-text">
                              {instruction.replace(/^\d+\.\s*/, '')}
                            </p>
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
                      
                      {lesson.imageUrl && (
                        <div className="lesson-image-container">
                          <img 
                            src={lesson.imageUrl} 
                            alt={lesson.title}
                            className="lesson-image"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CoursePage;