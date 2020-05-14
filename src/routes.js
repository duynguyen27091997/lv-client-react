import Courses from "./pages/Courses";
import Lesson from "./pages/Lesson";
import Exercise from "./pages/Exercise";
import Test from "./pages/Test";

const routes = [
    {
        path: '/courses',
        component: Courses,
    },
    {
        path: '/lesson',
        component: Lesson,
    },
    {
        path: '/exercise',
        component: Exercise,
    },
    {
        path: '/test',
        component: Test,
    },
];
export default routes