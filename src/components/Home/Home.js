import React, {Component} from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import {updateUser, updateGoals, clearUser, toggleShowGoalForm} from './../../redux/reducer';
import GoalForm from '../GoalForm/GoalForm';


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
        console.log(this.props)
        // console.log({homeProps:this.props})
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
            <div style={{display:"flex", alignItems:"center", flexDirection:"column"}}>
                <h1>Home Page</h1>
                <div>
                    <h3>{email}</h3>
                    <button onClick={this.logout}>Logout</button>
                </div>
                <img src={img} alt='' style={{width:'25%', height:'auto'}}/>
                <div style={{display:"flex"}}>
                    <h1 style={{width:"200px"}}>GOALS </h1>
                    <div style={{width:'300px'}}>
                        <div>{calorieGoal} Calories</div>
                        <div style={{display:"flex", justifyContent:"space-between"}}>
                            <div>Fat</div>
                            <div>Protein</div>
                            <div>Carb</div>
                        </div>
                        <div style={{display:"flex", justifyContent:"space-between"}}>
                            <div>{fatGoalPercent}</div>
                            <div>{proteinGoalPercent}</div>
                            <div>{carbGoalPercent}</div>
                        </div>
                        <div style={{display:"flex", justifyContent:"space-between"}}>
                            <div>{fatGoalGrams}</div>
                            <div>{proteinGoalGrams}</div>
                            <div>{carbGoalGrams}</div>
                        </div>
                    </div>
                    <h1>
                        {!showGoalForm && <button onClick={e => this.props.toggleShowGoalForm({showGoalForm})}>{toggleButton}</button>}
                    </h1>
                </div>
                {showGoalForm && <GoalForm/>}
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
