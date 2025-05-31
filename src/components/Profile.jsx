import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { courses } from '../data/courses';
import CourseCard from './CourseCard';
import { PrimerosPasos } from '../data/courseDetails/PrimerosPasos';
import { Excel } from '../data/courseDetails/Excel';
import { PowerPoint } from '../data/courseDetails/PowerPoint';
import '../styles/Profile.css';
import '../styles/Achievements.css';

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

// Logros disponibles
const ALL_ACHIEVEMENTS = [
  {
    id: 'first-course',
    name: '¡Mi primer curso!',
    description: 'Has completado tu primer curso.',
    condition: (stats) => stats.completedCourses >= 1,
    requirement: 'Completa un curso.',
    icon: '🎉',
    rarity: 'común',
  },
  {
    id: 'apprentice',
    name: 'Aprendiz en marcha',
    description: 'Completa 2 cursos.',
    condition: (stats) => stats.completedCourses >= 2,
    requirement: 'Completa dos cursos.',
    icon: '🚀',
    rarity: 'común',
  },
  {
    id: 'completionist',
    name: 'Completionista',
    description: 'Completa todos los cursos disponibles.',
    condition: (stats) => stats.completedCourses === stats.totalCourses && stats.totalCourses > 0,
    requirement: 'Completa todos los cursos.',
    icon: '🏅',
    rarity: 'raro',
  },
  {
    id: 'active-member',
    name: 'Miembro destacado',
    description: 'Participa activamente en la plataforma (visita tu perfil 5 días distintos).',
    condition: (stats) => stats.activeDays >= 5,
    requirement: 'Visita tu perfil 5 días distintos.',
    icon: '🌟',
    rarity: 'común',
  },
  {
    id: 'streak',
    name: 'Constancia',
    description: 'Avanza en cursos durante 3 días consecutivos.',
    condition: (stats) => stats.streak >= 3,
    requirement: 'Avanza en cursos durante 3 días seguidos.',
    icon: '🔥',
    rarity: 'raro',
  },
  {
    id: 'first-login',
    name: '¡Bienvenido!',
    description: 'Iniciaste sesión por primera vez.',
    condition: (stats) => stats.firstLogin,
    requirement: 'Inicia sesión en la plataforma.',
    icon: '👋',
    rarity: 'común',
  },
  {
    id: 'profile-edit',
    name: 'Personalización',
    description: 'Editaste tu perfil.',
    condition: (stats) => stats.profileEdited,
    requirement: 'Edita tu perfil.',
    icon: '🖊️',
    rarity: 'común',
  },
  // Puedes agregar más logros aquí...
];

// Helpers para logros
function getToday() {
  const d = new Date();
  return d.toISOString().slice(0, 10);
}
function getProfileStats(username) {
  // Guardar días activos y streak en localStorage
  const key = `aj_stats_${username}`;
  let stats = JSON.parse(localStorage.getItem(key) || '{}');
  // Actualizar días activos
  const today = getToday();
  if (!stats.activeDaysArr) stats.activeDaysArr = [];
  if (!stats.activeDaysArr.includes(today)) {
    stats.activeDaysArr.push(today);
    stats.activeDays = stats.activeDaysArr.length;
  }
  // Actualizar streak
  if (!stats.lastProgressDay) stats.lastProgressDay = null;
  if (!stats.streak) stats.streak = 0;
  // Revisar si hoy hubo progreso en algún curso
  let madeProgressToday = false;
  for (const c of courses) {
    const progress = JSON.parse(localStorage.getItem(`progress-${c.slug}`) || '{}');
    if (Object.values(progress).some(Boolean)) {
      madeProgressToday = true;
      break;
    }
  }
  if (madeProgressToday) {
    if (stats.lastProgressDay === today) {
      // nada
    } else if (
      stats.lastProgressDay &&
      new Date(today) - new Date(stats.lastProgressDay) === 86400000
    ) {
      stats.streak = (stats.streak || 0) + 1;
      stats.lastProgressDay = today;
    } else {
      stats.streak = 1;
      stats.lastProgressDay = today;
    }
  }
  // Guardar stats
  localStorage.setItem(key, JSON.stringify(stats));
  return stats;
}
function setProfileStat(username, field, value = true) {
  const key = `aj_stats_${username}`;
  let stats = JSON.parse(localStorage.getItem(key) || '{}');
  stats[field] = value;
  localStorage.setItem(key, JSON.stringify(stats));
}

function Profile() {
  const { user } = useAuth();
  const [profile, setProfile] = useState({ name: '', avatar: '', description: '', birthdate: '' });
  const [edit, setEdit] = useState(false);
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('');
  const [description, setDescription] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [completed, setCompleted] = useState(0);
  const [total, setTotal] = useState(0);
  const [userCourses, setUserCourses] = useState([]);
  const [showAchievements, setShowAchievements] = useState(false);
  const [showAchievementsShowcase, setShowAchievementsShowcase] = useState(false);
  const [achievements, setAchievements] = useState([]);
  const [stats, setStats] = useState({});
  const [showTooltip, setShowTooltip] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [profileVersion, setProfileVersion] = useState(0); // Nuevo estado para forzar recarga

  useEffect(() => {
    if (user) {
      const p = getUserProfile(user.username);
      setProfile({
        name: p.name || user.username,
        avatar: p.avatar || '',
        description: p.description || '',
        birthdate: p.birthdate || ''
      });
      setName(p.name || user.username);
      setAvatar(p.avatar || '');
      setDescription(p.description || '');
      setBirthdate(p.birthdate || '');
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
      // Logros y stats
      const statsObj = getProfileStats(user.username);
      statsObj.completedCourses = completedCourses;
      statsObj.totalCourses = totalCourses;
      setStats(statsObj);
      // Calcular logros desbloqueados
      const unlocked = ALL_ACHIEVEMENTS.map(a => ({
        ...a,
        unlocked: a.condition(statsObj),
      }));
      setAchievements(unlocked);
      // Marcar primer login si no estaba
      if (!statsObj.firstLogin) setProfileStat(user.username, 'firstLogin', true);
    }
  }, [user, edit, profileVersion]); // Añade profileVersion

  // Marcar edición de perfil
  useEffect(() => {
    if (!edit && user) {
      const statsObj = getProfileStats(user.username);
      if (!statsObj.profileEdited && profile.name !== user.username) {
        setProfileStat(user.username, 'profileEdited', true);
      }
    }
    // eslint-disable-next-line
  }, [edit]);

  if (!user) return null;

  const handleSave = (e) => {
    e.preventDefault();
    setUserProfile(user.username, { name, avatar, description, birthdate });
    setProfile({ name, avatar, description, birthdate });
    setEdit(false);
    setShowEditModal(false);
    setProfileVersion(v => v + 1); // Fuerza recarga de datos
  };

  function AchievementBadge({ ach }) {
    const [hovered, setHovered] = useState(false);

    return (
      <div
        className={
          `achievement-badge-modern 
          ${ach.unlocked ? 'unlocked' : 'locked'} 
          rarity-${ach.rarity} 
          ${!ach.unlocked ? 'achievement-badge-dent' : ''} 
          ${hovered ? 'achievement-badge-hovered' : ''}`
        }
        tabIndex={0}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onFocus={() => setHovered(true)}
        onBlur={() => setHovered(false)}
      >
        <div className="achievement-badge-icon">{ach.unlocked ? ach.icon : '🔒'}</div>
        <div className="achievement-badge-info">
          <div className="achievement-badge-name">{ach.name}</div>
          <div className="achievement-badge-desc">
            {hovered ? ach.description : ach.description.slice(0, 80) + (ach.description.length > 80 ? '...' : '')}
          </div>
          <div className={`achievement-badge-status ${ach.unlocked ? 'unlocked' : 'locked'}`}>
            {ach.unlocked ? '¡Desbloqueado!' : 'Bloqueado'}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-giant-container">
      {/* Perfil */}
      <div className="profile-top-section">
        <div className="profile-header">
          <div className="profile-avatar">
            {profile.avatar
              ? <img src={profile.avatar} alt="avatar" />
              : <span className="profile-avatar-placeholder">{profile.name?.[0]?.toUpperCase() || 'U'}</span>
            }
          </div>
          <div className="profile-info">
            <h2>{profile.name}</h2>
            {profile.description && (
              <div className="profile-description" style={{ margin: '0.5rem 0', color: '#555', fontSize: '1.05rem' }}>
                {profile.description}
              </div>
            )}
            {profile.birthdate && (
              <div className="profile-birthdate" style={{ color: '#2563eb', fontSize: '1rem', marginBottom: 6 }}>
                🎂 Fecha de nacimiento: {
                  (() => {
                    // Asegura que la fecha se muestre correctamente en español y con el día correcto
                    const date = new Date(profile.birthdate + 'T00:00:00');
                    return date.toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' });
                  })()
                }
                {/* Mostrar edad debajo */}
                <div style={{ color: '#444', fontSize: '0.98rem', marginTop: 2 }}>
                  Edad: {
                    (() => {
                      const birth = new Date(profile.birthdate + 'T00:00:00');
                      const today = new Date();
                      let age = today.getFullYear() - birth.getFullYear();
                      const m = today.getMonth() - birth.getMonth();
                      if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
                        age--;
                      }
                      return `${age} años`;
                    })()
                  }
                </div>
              </div>
            )}
            <div className="profile-progress">
              {completed === 0
                ? "Cursos completados: Aún no has completado ningún curso"
                : `Cursos completados: ${completed}`}
            </div>
            <button
              className="profile-edit-btn"
              onClick={() => { setEdit(!edit); setShowEditModal(!edit ? true : false); }}
            >
              {edit ? 'Cancelar' : 'Editar perfil'}
            </button>
          </div>
        </div>
      </div>
      {/* Logros */}
      <div className="profile-achievements-section">
        <div className="profile-achievements-header" style={{ alignItems: 'flex-end' }}>
          <h3>Logros</h3>
          <button
            className="profile-achievements-btn"
            onClick={() => setShowAchievementsShowcase(true)}
            aria-label="Ver todos los logros"
          >
            Ver todos
          </button>
        </div>
        <div className="profile-achievements-badges-grid profile-achievements-badges-grid-compact profile-achievements-badges-centered">
          {[...achievements]
            .sort((a, b) => (b.unlocked - a.unlocked))
            .slice(0, 4)
            .map((ach) => (
              <AchievementBadge key={ach.id} ach={ach} />
            ))}
        </div>
      </div>
      {/* Cursos */}
      <div className="profile-courses-section profile-courses-section-giant">
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
      {/* Modal/Showcase de editar perfil */}
      {showEditModal && (
        <div className="profile-edit-modal-overlay" onClick={() => { setEdit(false); setShowEditModal(false); }}>
          <div className="profile-edit-modal" onClick={e => e.stopPropagation()}>
            <h2 style={{ textAlign: 'center', marginBottom: 18 }}>Editar perfil</h2>
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
              <label>
                Descripción:
                <textarea
                  value={description}
                  onChange={e => {
                    if (e.target.value.length <= 120) setDescription(e.target.value);
                  }}
                  className="profile-edit-input"
                  placeholder="Cuéntanos algo sobre ti..."
                  rows={3}
                  maxLength={120}
                  style={{ resize: 'vertical', minHeight: 48, fontFamily: 'inherit' }}
                />
                <div style={{ fontSize: '0.92rem', color: '#888', textAlign: 'right' }}>
                  {description.length}/120
                </div>
              </label>
              <label>
                Fecha de nacimiento:
                <input
                  type="date"
                  value={birthdate}
                  onChange={e => setBirthdate(e.target.value)}
                  className="profile-edit-input profile-date-input"
                  style={{ maxWidth: 220, cursor: 'pointer' }}
                  required={false}
                />
              </label>
              <button type="submit" className="profile-save-btn">Guardar</button>
            </form>
          </div>
        </div>
      )}
      {/* Showcase de logros */}
      {showAchievementsShowcase && (
        <div className="achievements-showcase-overlay" onClick={() => setShowAchievementsShowcase(false)}>
          <div
            className="achievements-showcase-modal"
            style={{ position: 'relative' }} // Asegura el contexto para el botón absoluto
            onClick={e => e.stopPropagation()}
          >
            {/* Botón de cerrar SOLO aquí, bien posicionado */}
            <button
              className="achievements-showcase-close"
              type="button"
              onClick={() => setShowAchievementsShowcase(false)}
              aria-label="Cerrar"
              style={{
                position: 'absolute',
                top: '1rem',
                left: '1rem',
                zIndex: 10
              }}
            >×</button>
            <h2 style={{ textAlign: 'center', marginBottom: 18 }}>Todos los logros</h2>
            <div className="achievements-list achievements-list-showcase">
              {achievements.map(ach => (
                <div
                  key={ach.id}
                  className={`achievement-card ${ach.unlocked ? 'unlocked' : 'locked'} rarity-${ach.rarity}`}
                >
                  <div className="achievement-bubble-lg">
                    <span className="achievement-icon">{ach.unlocked ? ach.icon : '🔒'}</span>
                  </div>
                  <div className="achievement-info">
                    <strong>{ach.name}</strong>
                    <div style={{ fontSize: '0.98rem', margin: '0.2em 0' }}>{ach.description}</div>
                    <div style={{ fontSize: '0.92rem', color: '#888' }}>
                      <em>Requisito: {ach.requirement}</em>
                    </div>
                    <div style={{ fontSize: '0.93rem', color: ach.unlocked ? '#22c55e' : '#2563eb', marginTop: 2 }}>
                      {ach.unlocked ? '¡Desbloqueado!' : 'Bloqueado'}
                    </div>
                    <div className="achievement-rarity">{ach.rarity === 'raro' ? '🌟 Raro' : 'Común'}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;
