import Home from "./pages/Home";
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
    {
        path: '/',
        component: Home,
//     path: '/Teachers/:teacherId',
//     component: TeacherPage,
// }, {
//     path: '/Teachers/:teacherId/Classes',
//     component: TaughtClassesPage,
    }, /* And so on. */];
export default routes