import React, { useEffect, useState } from 'react';
import { courses } from '../data/courses';

// Mismos logros y helpers que en Profile.jsx
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

function getToday() {
  const d = new Date();
  return d.toISOString().slice(0, 10);
}
function getProfileStats(username, completed, total) {
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
  stats.completedCourses = completed;
  stats.totalCourses = total;
  localStorage.setItem(key, JSON.stringify(stats));
  return stats;
}

const Achievements = ({ user, completed, total, profile, edit }) => {
  const [achievements, setAchievements] = useState([]);
  const [stats, setStats] = useState({});
  const [showTooltip, setShowTooltip] = useState(null);

  useEffect(() => {
    if (user) {
      const statsObj = getProfileStats(user.username, completed, total);
      setStats(statsObj);
      const unlocked = ALL_ACHIEVEMENTS.map(a => ({
        ...a,
        unlocked: a.condition(statsObj),
      }));
      setAchievements(unlocked);
    }
  }, [user, completed, total, profile, edit]);

  return (
    <aside className="achievements-panel">
      <h2 className="achievements-title">Tus logros</h2>
      <div className="achievements-list achievements-list-panel">
        {achievements.map(ach => (
          <div
            key={ach.id}
            className={`achievement-card ${ach.unlocked ? 'unlocked' : 'locked'} rarity-${ach.rarity}`}
            onMouseEnter={() => setShowTooltip(ach.id)}
            onMouseLeave={() => setShowTooltip(null)}
            tabIndex={0}
            aria-label={ach.name}
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
            {showTooltip === ach.id && (
              <div className="achievement-tooltip achievement-tooltip-panel tooltip-below">
                <strong>{ach.name}</strong>
                <div style={{ fontSize: '0.98rem', margin: '0.2em 0' }}>{ach.description}</div>
                <div style={{ fontSize: '0.93rem', color: '#2563eb' }}>
                  {ach.unlocked ? '¡Desbloqueado!' : 'Bloqueado'}
                </div>
                <div style={{ fontSize: '0.92rem', color: '#888', marginTop: 2 }}>
                  <em>Requisito: {ach.requirement}</em>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </aside>
  );
};

export default Achievements;
