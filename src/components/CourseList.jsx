import React from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { courses, categories } from '../data/courses';
import CourseCard from './CourseCard';
import '../styles/CourseList.css';

function CourseList() {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const isHomePage = location.pathname === '/';
  const categoria = searchParams.get('categoria');
  const filteredCourses = categoria
    ? courses.filter(c => c.category === categoria)
    : courses;
  const displayedCourses = isHomePage ? courses.slice(0, 3) : filteredCourses;

  return (
    <section className="course-list">
      <h2 className="course-list-title">Explora Nuestros Cursos</h2>
      <nav className="course-categories-bar" aria-label="Categorías de cursos">
        <ul className="course-categories-list">
          <li>
            <Link to="/cursos" className={`course-categories-link${!categoria ? ' active' : ''}`}>
              Todas
            </Link>
          </li>
          {categories.map(cat => (
            <li key={cat.key}>
              <Link
                to={`/cursos?categoria=${cat.key}`}
                className={`course-categories-link${categoria === cat.key ? ' active' : ''}`}
              >
                {cat.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="course-grid">
        {displayedCourses.map(course => (
          <CourseCard key={course.id} {...course} />
        ))}
      </div>
      {isHomePage && (
        <div className="course-list-footer">
          <Link to="/cursos" className="menu-button">
            Ver todos los cursos
          </Link>
        </div>
      )}
    </section>
  );
}
CourseList.Card = CourseCard;
export default CourseList;