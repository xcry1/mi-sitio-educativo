import { Link } from 'react-router-dom';
import { PrimerosPasos } from '../data/courseDetails/PrimerosPasos';
import { Excel } from '../data/courseDetails/Excel';
import { PowerPoint } from '../data/courseDetails/PowerPoint';
import '../styles/CourseCard.css';

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

export default function CourseCard({ slug, name, description, image, duration, level }) {
  const savedProgress = localStorage.getItem(`progress-${slug}`);
  const progress = savedProgress ? JSON.parse(savedProgress) : {};
  const totalInstructions = parseInt(localStorage.getItem(`total-instructions-${slug}`)) || 0;

  const completedInstructions = savedProgress ? Object.values(progress).filter(Boolean).length : 0;
  const progressPercentage = totalInstructions > 0 ? Math.round((completedInstructions / totalInstructions) * 100) : 0;

  // Calcular duración real
  const totalMinutes = getTotalMinutes(slug);

  return (
    <Link to={`/curso/${slug}`} className="course-card">
      <div className="course-image-wrapper">
        <img src={image} alt={name} className="course-image" />
      </div>
      <div className="course-details">
        <h3>{name}</h3>
        <p>{description}</p>
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