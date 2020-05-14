export let SET_COURSE = 'SET_COURSE';

export const setCourse = function (course) {
    return {
        type: SET_COURSE,
        course:course
    }
}
export let SET_LESSONS = 'SET_LESSONS';

export const setLessons = function (lessons) {
    return {
        type: SET_LESSONS,
        lessons:lessons
    }
}
export  const SET_EXERCISES = 'SET_EXERCISES';

export const setExercises = function (exercises) {
    return {
        type: SET_EXERCISES,
        exercises:exercises
    }
}