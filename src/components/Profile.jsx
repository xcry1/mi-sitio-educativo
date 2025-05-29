import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { courses } from '../data/courses';
import CourseCard from './CourseCard';
import { PrimerosPasos } from '../data/courseDetails/PrimerosPasos';
import { Excel } from '../data/courseDetails/Excel';
import { PowerPoint } from '../data/courseDetails/PowerPoint';
import '../styles/Profile.css';

// Mapa estático de detalles de cursos
const courseDetailsMap = {
  'primeros-pasos': PrimerosPasos,
  'excel': Excel,
  'powerpoint': PowerPoint,
};

function getUserProfile(username) {
  const users = JSON.parse(localStorage.getItem('aj_users') || '{}');
  return users[username]?.profile || {};
}

function setUserProfile(username, profile) {
  const users = JSON.parse(localStorage.getItem('aj_users') || '{}');
  if (users[username]) {
    users[username].profile = profile;
    localStorage.setItem('aj_users', JSON.stringify(users));
  }
}

function getCourseProgress(slug) {
  const progress = JSON.parse(localStorage.getItem(`progress-${slug}`) || '{}');
  const details = courseDetailsMap[slug];
  let total = 0, completed = 0;
  if (details && details.contents) {
    details.contents.forEach((module, mi) => {
      module.lessons.forEach((lesson, li) => {
        if (lesson.instructions) {
          for (let i = 0; i < lesson.instructions.length; i++) {
            total++;
            if (progress[`${mi}-${li}-${i}`]) completed++;
          }
        }
      });
    });
  }
  return { total, completed, percentage: total > 0 ? Math.round((completed / total) * 100) : 0 };
}

function Profile() {
  const { user } = useAuth();
  const [profile, setProfile] = useState({ name: '', avatar: '' });
  const [edit, setEdit] = useState(false);
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('');
  const [completed, setCompleted] = useState(0);
  const [total, setTotal] = useState(0);
  const [userCourses, setUserCourses] = useState([]);

  useEffect(() => {
    if (user) {
      const p = getUserProfile(user.username);
      setProfile({ name: p.name || user.username, avatar: p.avatar || '' });
      setName(p.name || user.username);
      setAvatar(p.avatar || '');
      // Calcular cursos completados y cursos con progreso
      let completedCourses = 0;
      let totalCourses = 0;
      let withProgress = [];
      courses.forEach(c => {
        const prog = getCourseProgress(c.slug);
        if (prog.total > 0 && prog.completed === prog.total) completedCourses++;
        if (prog.percentage > 0) {
          withProgress.push({ ...c, progress: prog.percentage });
        }
        if (prog.total > 0) totalCourses++;
      });
      setCompleted(completedCourses);
      setTotal(totalCourses);
      setUserCourses(withProgress);
    }
  }, [user]);

  if (!user) return null;

  const handleSave = (e) => {
    e.preventDefault();
    setUserProfile(user.username, { name, avatar });
    setProfile({ name, avatar });
    setEdit(false);
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-avatar">
          {profile.avatar
            ? <img src={profile.avatar} alt="avatar" />
            : <span className="profile-avatar-placeholder">{profile.name?.[0]?.toUpperCase() || 'U'}</span>
          }
        </div>
        <div className="profile-info">
          <h2>{profile.name}</h2>
          <div className="profile-progress">
            Cursos completados: <strong>{completed}/{total}</strong>
          </div>
          <button className="profile-edit-btn" onClick={() => setEdit(!edit)}>
            {edit ? 'Cancelar' : 'Editar perfil'}
          </button>
        </div>
      </div>
      {edit && (
        <form className="profile-edit-form" onSubmit={handleSave}>
          <label>
            Nombre:
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              className="profile-edit-input"
              required
            />
          </label>
          <label>
            Foto de perfil (URL):
            <input
              type="url"
              value={avatar}
              onChange={e => setAvatar(e.target.value)}
              className="profile-edit-input"
              placeholder="https://..."
            />
          </label>
          <button type="submit" className="profile-save-btn">Guardar</button>
        </form>
      )}
      <div className="profile-courses-section">
        <h3>Tus cursos</h3>
        {userCourses.length === 0 && (
          <div style={{ color: '#888', margin: '1.5rem 0' }}>
            Aún no tienes progreso en ningún curso.
          </div>
        )}
        <div className="profile-courses-list">
          {userCourses.map(course => (
            <div key={course.slug} className="profile-course-card">
              <CourseCard {...course} />
              <div style={{
                marginTop: 8,
                fontSize: '0.98rem',
                color: course.progress === 100 ? '#22c55e' : '#2563eb',
                textAlign: 'center',
                fontWeight: 500
              }}>
                Progreso: {course.progress}%
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Profile;
