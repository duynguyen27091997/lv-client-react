import {ANSWER_LESSON, SET_COURSE, SET_EXERCISES, SET_LESSONS} from "../actions/courseActions";

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
        case ANSWER_LESSON:
            let index =  state.lessons.findIndex(quiz => quiz === action.quiz);
            let newLessons = state.lessons;
            newLessons[index]['members'][0] = action.data;
            if (index){
                return state = {...state, lessons: newLessons};
            }else{
                return state;
            }
        case SET_EXERCISES:
            return state = {...state, exercises: action.exercises}
        default:
            return state
    }
};
export default rootReducer;