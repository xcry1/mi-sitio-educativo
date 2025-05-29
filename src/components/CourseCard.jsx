import { Link } from 'react-router-dom';

export default function CourseCard({ slug, name, description, image, duration, level }) {
  const savedProgress = localStorage.getItem(`progress-${slug}`);
  const progress = savedProgress ? JSON.parse(savedProgress) : {};
  const totalInstructions = parseInt(localStorage.getItem(`total-instructions-${slug}`)) || 0;

  const completedInstructions = savedProgress ? Object.values(progress).filter(Boolean).length : 0;
  const progressPercentage = totalInstructions > 0 ? Math.round((completedInstructions / totalInstructions) * 100) : 0;

  return (
    <Link to={`/curso/${slug}`} className="course-card">
      <img src={image} alt={name} className="course-image" />
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
            <span className="progress-text">Progreso: {progressPercentage}%</span>
          </div>
        )}
        <div className="course-badges">
          <span className="badge duration">{duration}</span>
          <span className="badge level">{level}</span>
        </div>
      </div>
    </Link>
  );
}