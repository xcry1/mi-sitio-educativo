import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { courses } from '../data/courses';
import CourseCard from './CourseCard';

export default function CourseList() {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const displayedCourses = isHomePage ? courses.slice(0, 3) : courses;

  return (
    <section className="course-list">
      <h2>Explora Nuestros Cursos</h2>
      <div className="course-grid">
        {displayedCourses.map(course => (
          <CourseCard key={course.id} {...course} />
        ))}
      </div>
      {isHomePage && (
        <div className="course-list-footer">
          <Link to="/cursos" className="button-primary">
            Ver todos los cursos
          </Link>
        </div>
      )}
    </section>
  );
}