export type HeaderProps = { name: string }
export type ContentProps = { courses: CoursePart[] }
export type TotalProps = { courses: CoursePart[] }

export interface BaseCoursePart {
  name: string;
  exerciseCount: number;
}

export interface CoursePartOne extends BaseCoursePart {
  name: 'Fundamentals';
  description: string;  
}

export interface CoursePartTwo extends BaseCoursePart {
  name: 'Using props to pass data';
  groupProjectCount: number;
}

export interface CoursePartThree extends BaseCoursePart {
  name: 'Deeper type usage';
  description: string;
  exerciseSubmissionLink: string;
}

export interface CoursePartFour extends BaseCoursePart {
  name: 'Developing a MERN stack application';
  prerequisites: string;
}

export type CoursePart = CoursePartOne | CoursePartTwo | CoursePartThree | CoursePartFour

export interface PropsBag {
  [prop: string]: string | number;
}