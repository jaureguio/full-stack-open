export type HeaderProps = Pick<CoursePart, 'name'>
export type ContentProps = { courses: CoursePart[] }
export type TotalProps = { courses: CoursePart[] }

export interface CoursePart {
  name: string;
  exerciseCount: number;
}
