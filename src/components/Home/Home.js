import React, {Component} from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import {updateUser, updateGoals, clearUser, toggleShowGoalForm} from './../../redux/reducer';
import GoalForm from '../GoalForm/GoalForm';
import './Home.css';


class Home extends Component{
    constructor(){
        super()
        this.state={
            calorieGoal:0,
            fatGoalPercent:0,
            proteinGoalPercent:0,
            carbGoalPercent:0,
            showGoalForm:true
        }
    }
    componentDidMount() {
        this.getUser();
        this.getGoals();
    }

    getUser = async ()=> {
        const {id} = this.props;
        if(!id) {
            try {
                let res = await axios.get('/api/current')
                this.props.updateUser(res.data)
            } catch(err) {
                // console.log(err)
                this.props.history.push('/') // comment out for testing Home
            }
        }
    }

    getGoals = async ()=> {
        try{
            let res = await axios.get('/api/current/goals')
            // console.log(res.data[0])
            const{calorie_goal, fat_goal_percent, protein_goal_percent, carb_goal_percent} =res.data[0]
            this.props.updateGoals({calorie_goal, fat_goal_percent, protein_goal_percent, carb_goal_percent})
        } catch(err){
            console.log(err)
        }
    }

    logout = async () => {
        await axios.post('./auth/logout')
        this.props.clearUser();
        this.props.history.push('/')
    }

    render(){
        const {email, img, calorieGoal, fatGoalPercent, proteinGoalPercent, carbGoalPercent, showGoalForm} = this.props
        const fatGoalGrams =(calorieGoal*(fatGoalPercent*.01)/9).toFixed(0)
        const proteinGoalGrams =(calorieGoal*(proteinGoalPercent*.01)/4).toFixed(0)
        const carbGoalGrams =(calorieGoal*(carbGoalPercent*.01)/4).toFixed(0)
        const toggleButton = showGoalForm ? "Done" : "Change Goals";
        return(
            <div >
                <div className="titleBanner">Fitness Tracker</div>
                <div className="userCard">
                    <div>
                        <img className="userImg" src={img} alt='' />
                        <div>{email}</div>
                    </div>
                        <div>
                        <button onClick={this.logout}>Logout</button>
                        </div>
                </div>

                <div className="goalCardOuter">
                    <div className="goalCardTitle" >DAILY GOALS </div>
                        <div className="goalCardInner">
                            <div className="goal">{calorieGoal} Calories</div>
                            <div className="goalBar">
                                <div className="goal">Fat</div>
                                <div className="goal">Protein</div>
                                <div className="goal">Carb</div>
                            </div>
                            <div className="goalBar">
                                <div>{fatGoalPercent}</div>
                                <div>{proteinGoalPercent}</div>
                                <div>{carbGoalPercent}</div>
                            </div>
                            <div className="goalBar">
                                <div>{fatGoalGrams}g</div>
                                <div>{proteinGoalGrams}g</div>
                                <div>{carbGoalGrams}g</div>
                            </div>
                        </div>
                    <div className="goalButton">
                        {!showGoalForm && <button onClick={e => this.props.toggleShowGoalForm({showGoalForm})}>{toggleButton}</button>}
                    </div>
                </div>

                <div>
                    {showGoalForm && <GoalForm/>}
                </div>
            </div>
        )
    }
}

const mapStateToProps = reduxState => {
    return {
        calorieGoal: reduxState.calorieGoal,
        fatGoalPercent: reduxState.fatGoalPercent,
        proteinGoalPercent: reduxState.proteinGoalPercent,
        carbGoalPercent: reduxState.carbGoalPercent,
        showGoalForm: reduxState.showGoalForm,
        test: reduxState.test,
        email: reduxState.email,
        img: reduxState.img

    }
}
const mapDispatchToProps ={ //reducer holds the methods
    updateUser,
    updateGoals,
    clearUser,
    toggleShowGoalForm
}
export default connect(mapStateToProps, mapDispatchToProps) (Home);
