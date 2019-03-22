const initialState = {
    id:0,
    email:'',
    img:'',
    calorieGoal:"",
    fatGoalPercent:"",
    proteinGoalPercent:"",
    carbGoalPercent:""


}

const UPDATE_USER = 'UPDATE_USER';
const CLEAR_USER = 'CLEAR_USER';
const UPDATE_GOALS = 'UPDATE_GOALS';

export function updateUser(user) {
    return {
        type: UPDATE_USER,
        payload: user
    }
}

export function clearUser() {
    return{
        type: CLEAR_USER
    }
}

export function updateGoals(goals){
    return {
        type: UPDATE_GOALS,
        payload: goals
    }
}

export default function reducer(state = initialState, action){
    const { type, payload } = action;
    switch(type){
        case UPDATE_USER:
            const {id, email} = payload;
            const img = payload.user_image;
            return{...state, id, email, img}
        case CLEAR_USER:
            return{...state, id:0, email:''}
        case UPDATE_GOALS:
        console.log({payload:payload})
            const {calorie_goal, fat_goal_percent, protein_goal_percent, carb_goal_percent} = payload;
            return{...state, calorieGoal: calorie_goal, fatGoalPercent: fat_goal_percent, proteinGoalPercent: protein_goal_percent, carbGoalPercent: carb_goal_percent}
        default:
            return state
    }
}