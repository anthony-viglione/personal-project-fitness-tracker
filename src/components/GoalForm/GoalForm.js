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
            carbGoalPercent:0
        }
    }

    componentDidMount(){
        // console.log(this.props)
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
        const{email} = this.props
        let userGoals = {
            calorieGoal,
            fatGoalPercent,
            proteinGoalPercent,
            carbGoalPercent
        }
        try{
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
        const{showGoalForm, toggleShowGoalForm} = this.props
        await this.changeGoals()
        toggleShowGoalForm({showGoalForm})
    }

    render(){
        const{calorieGoal, fatGoalPercent, proteinGoalPercent, carbGoalPercent, showGoalForm, toggleShowGoalForm} = this.props
        // console.log(calorieGoal, fatGoalPercent,proteinGoalPercent,carbGoalPercent)
        // console.log(this)
        return(
            <div className="modal">
                <div className="modalContent">
                    <button className="close" onClick={e=>{toggleShowGoalForm({showGoalForm})}}>
                        close
                    </button>
                    <div className="goalCardTitle">
                        Goal Updater
                    </div>

                    <div className="formGoalBarHolder">
                        <div className = "goalBar">
                            <div className= "goal">Calorie</div>
                            <input placeholder={calorieGoal} onChange={e => this.handleInput('calorieGoal', e.target.value)}/>
                        </div>
                        <div className = "goalBar">
                            <div className= "goal">Fat</div>
                            <input placeholder={fatGoalPercent}  onChange={e => this.handleInput('fatGoalPercent', e.target.value)}/>
                        </div>
                        <div className = "goalBar">
                            <div className= "goal">Protein</div>
                            <input placeholder={proteinGoalPercent} onChange={e => this.handleInput('proteinGoalPercent', e.target.value)}/>
                        </div>
                        <div className = "goalBar">
                            <div className= "goal">Carb</div>
                            <input placeholder={carbGoalPercent} onChange={e => this.handleInput('carbGoalPercent', e.target.value)}/>
                            </div>
                    </div>

                    <div>
                        <button onClick={()=>this.handleFireTwoFunctions()}>Save Changes</button>
                    </div>
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
