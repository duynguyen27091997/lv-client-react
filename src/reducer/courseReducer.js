import {SET_COURSE, SET_EXERCISES, SET_LESSONS} from "../actions/courseActions";

let initialState = {
    course: null,
    lessons: null,
    exercises:null
}
const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_COURSE:
            return state = {...initialState, course: action.course}
        case SET_LESSONS:
            return state = {...state, lessons: action.lessons}
        case SET_EXERCISES:
            return state = {...state, exercises: action.exercises}
        default:
            return state
    }
};
export default rootReducer;