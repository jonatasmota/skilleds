import CourseItem from "./course-item";

interface Course {
  title: string;
  description: string;
  link: string;
  status: string;
  _id: string;
}

interface CourseListProps {
  courses: Course[];
}
const CourseList: React.FC<CourseListProps> = ({ courses }) => {
  return (
    <div className="w-fit grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 md:grid-cols-2 justify-items-start justify-start gap-y-4 gap-x-4 md:gap-x-2 mt-2 mb-5 text-center">
      {courses.map((course: Course) => (
        <CourseItem _id={course._id} course={course} key={course._id} />
      ))}
    </div>
  );
};

export default CourseList;
