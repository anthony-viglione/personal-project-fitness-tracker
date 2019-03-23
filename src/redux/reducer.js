const initialState = {
    id:0,
    email:'',
    img:'',
    calorieGoal:0,
    fatGoalPercent:0,
    proteinGoalPercent:0,
    carbGoalPercent:0,
    showGoalForm:true,
    test:true


}

const UPDATE_USER = 'UPDATE_USER';
const CLEAR_USER = 'CLEAR_USER';
const UPDATE_GOALS = 'UPDATE_GOALS';
const TOGGLE_SHOW_GOAL_FORM = 'TOGGLE_SHOW_GOAL_FORM';

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

export function toggleShowGoalForm(val){
    return {
        type: TOGGLE_SHOW_GOAL_FORM,
        payload: val
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
            return{...state, id:0, email:'', calorieGoal:0, fatGoalPercent:0, proteinGoalPercent:0, carbGoalPercent:0}
        case UPDATE_GOALS:
            const {calorie_goal, fat_goal_percent, protein_goal_percent, carb_goal_percent} = payload;
            return{...state, calorieGoal: calorie_goal, fatGoalPercent: fat_goal_percent, proteinGoalPercent: protein_goal_percent, carbGoalPercent: carb_goal_percent}
        case TOGGLE_SHOW_GOAL_FORM:
            const {showGoalForm} = payload;
            return{...state, showGoalForm: !showGoalForm}
        default:
            return state
    }
}