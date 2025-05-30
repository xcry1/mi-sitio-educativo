import { Link } from 'react-router-dom';
import { PrimerosPasos } from '../data/courseDetails/PrimerosPasos';
import { Excel } from '../data/courseDetails/Excel';
import { PowerPoint } from '../data/courseDetails/PowerPoint';
import '../styles/CourseCard.css';
import { useState } from 'react';

// Helper para obtener el objeto de detalles del curso por slug
const courseDetailsMap = {
  'primeros-pasos': PrimerosPasos,
  'excel': Excel,
  'powerpoint': PowerPoint,
};

function getTotalMinutes(slug) {
  const details = courseDetailsMap[slug];
  if (!details || !details.contents) return null;
  let total = 0;
  details.contents.forEach(module => {
    module.lessons.forEach(lesson => {
      const min = parseInt(lesson.duration, 10);
      if (!isNaN(min)) total += min;
    });
  });
  return total;
}

// NUEVO: obtener la cantidad de instrucciones válidas para el curso
function getInstructionKeys(slug) {
  const details = courseDetailsMap[slug];
  if (!details || !details.contents) return [];
  const keys = [];
  details.contents.forEach((module, moduleIndex) => {
    module.lessons.forEach((lesson, lessonIndex) => {
      if (lesson.instructions) {
        for (let i = 0; i < lesson.instructions.length; i++) {
          keys.push(`${moduleIndex}-${lessonIndex}-${i}`);
        }
      }
    });
  });
  return keys;
}

export default function CourseCard({ slug, name, description, image, duration, level }) {
  const savedProgress = localStorage.getItem(`progress-${slug}`);
  const progress = savedProgress ? JSON.parse(savedProgress) : {};
  const instructionKeys = getInstructionKeys(slug);
  const totalInstructions = instructionKeys.length;

  // Solo contar como completados los pasos válidos
  const completedInstructions = instructionKeys.filter(key => progress[key]).length;
  const progressPercentage = totalInstructions > 0 ? Math.round((completedInstructions / totalInstructions) * 100) : 0;

  // Calcular duración real
  const totalMinutes = getTotalMinutes(slug);
  const [showFull, setShowFull] = useState(false);
  const shortDesc = description.length > 80 && !showFull
    ? description.slice(0, 80) + '...'
    : description;

  return (
    <Link to={`/curso/${slug}`} className="course-card"
      onMouseEnter={() => setShowFull(true)}
      onMouseLeave={() => setShowFull(false)}
      tabIndex={0}
    >
      <div className="course-image-wrapper">
        <img src={image} alt={name} className="course-image" />
      </div>
      <div className="course-details">
        <h3>{name}</h3>
        <p>
          {shortDesc}
          {description.length > 80 && (
            <span style={{
              color: '#2563eb',
              fontWeight: 600,
              marginLeft: 4,
              fontSize: '0.97em'
            }}>
              {showFull ? '' : 'Ver más'}
            </span>
          )}
        </p>
        {progressPercentage > 0 && (
          <div className="course-progress">
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
            <span className="progress-text">{progressPercentage}% completado</span>
          </div>
        )}
        <div className="course-badges">
          <span className="badge duration">
            {totalMinutes ? `${totalMinutes} min` : duration}
          </span>
          <span className="badge level">{level}</span>
        </div>
      </div>
    </Link>
  );
}