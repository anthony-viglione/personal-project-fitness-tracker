import React, {Component} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import {updateGoals, toggleShowGoalForm} from '../../redux/reducer'


class GoalForm extends Component{
    constructor(){
        super()
        this.state={
            calorieGoal:0,
            fatGoalPercent:0,
            proteinGoalPercent:0,
            carbGoalPercent:0,
            button:false
        }
    }

    componentDidMount(){
        const{calorieGoal, fatGoalPercent, proteinGoalPercent, carbGoalPercent} = this.props
        this.setState({
            calorieGoal,
            fatGoalPercent,
            proteinGoalPercent,
            carbGoalPercent
        })
    }

    handleInput(prop, val) {
        this.setState({
            [prop]:val
        })
    }

    changeGoals = async()=>{
        const{calorieGoal, fatGoalPercent, proteinGoalPercent, carbGoalPercent} = this.state
        let userGoals = {
            calorieGoal,
            fatGoalPercent,
            proteinGoalPercent,
            carbGoalPercent
        }
        try{
            const{email} = this.props
            let res = await axios.put(`/api/goals/${email}`, userGoals)
            // console.log(res.data)
            // console.log(res.data[0])
            const{
                calorie_goal,
                fat_goal_percent,
                protein_goal_percent,
                carb_goal_percent   
            }=res.data[0]
            this.props.updateGoals({email, calorie_goal, fat_goal_percent, protein_goal_percent, carb_goal_percent})

        } catch(err) {
            console.log(err)
        }
    }

    handleFireTwoFunctions = async () => {
        const{showGoalForm} = this.props
        await this.changeGoals()
        this.props.toggleShowGoalForm({showGoalForm})
    }

    render(){
        const{calorieGoal, fatGoalPercent, proteinGoalPercent, carbGoalPercent} = this.props
        // console.log(calorieGoal, fatGoalPercent,proteinGoalPercent,carbGoalPercent)
        // console.log(this)
        return(
            <div>
                <div>
                    GoalForm Component
                </div>
                <div>
                    <div>
                        Calorie Goal
                        <input placeholder={calorieGoal} onChange={e => this.handleInput('calorieGoal', e.target.value)}/>
                    </div>
                    <div>
                        Fat Goal
                        <input placeholder={fatGoalPercent}  onChange={e => this.handleInput('fatGoalPercent', e.target.value)}/>
                    </div>
                    <div>
                        Protein Goal
                        <input placeholder={proteinGoalPercent} onChange={e => this.handleInput('proteinGoalPercent', e.target.value)}/>
                    </div>
                    <div>
                        Carb Goal
                        <input placeholder={carbGoalPercent} onChange={e => this.handleInput('carbGoalPercent', e.target.value)}/>
                        </div>
                </div>
                <div>
                    {/* <button onClick={()=>console.log(calorieGoal,fatGoalPercent,proteinGoalPercent,carbGoalPercent)}>Check State</button> */}
                </div>
                <div>
                    <button onClick={()=>this.handleFireTwoFunctions()}>ChangeGoals</button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = reduxState => {
    return {
        email: reduxState.email,
        showGoalForm: reduxState.showGoalForm,
        calorieGoal: reduxState.calorieGoal, 
        fatGoalPercent: reduxState.fatGoalPercent, 
        proteinGoalPercent: reduxState.proteinGoalPercent, 
        carbGoalPercent: reduxState.carbGoalPercent
    }
}
export default connect(mapStateToProps,{updateGoals, toggleShowGoalForm}) (GoalForm); //could have used mapDispatchToProps, but only needed one function.
