import React, {Component} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';


class Form extends Component{
    constructor(){
        super()
        this.state={
            calorieGoal:"",
            fatGoalPercent:"",
            proteinGoalPercent:"",
            carbGoalPercent:"",
            button:false
        }
    }

    handleInput(prop, val) {
        this.setState({
            [prop]:val
        })
    }

    changeGoals = async()=>{
        const{email} = this.props
        const{calorieGoal, fatGoalPercent, proteinGoalPercent, carbGoalPercent} = this.state
        let userGoals = {
            calorieGoal,
            fatGoalPercent,
            proteinGoalPercent,
            carbGoalPercent
        }
        // console.log(email)
        try{
            // console.log(userGoals)
            let res = await axios.put(`/api/goals/${email}`, userGoals)
            // console.log(res)

        } catch(err) {
            alert(`something went wrong${err}`)
        }
    }

    render(){
        const{calorieGoal, fatGoalPercent, proteinGoalPercent, carbGoalPercent} = this.state
        // console.log(calorieGoal, fatGoalPercent,proteinGoalPercent,carbGoalPercent)
        // console.log(this)
        return(
            <div>
                <div>
                    Form Component
                </div>
                <div>
                    <div>
                        Calorie Goal
                        <input value={calorieGoal} onChange={e => this.handleInput('calorieGoal', e.target.value)}/>
                    </div>
                    <div>
                        Fat Goal
                        <input value={fatGoalPercent}  onChange={e => this.handleInput('fatGoalPercent', e.target.value)}/>
                    </div>
                    <div>
                        Protein Goal
                        <input value={proteinGoalPercent} onChange={e => this.handleInput('proteinGoalPercent', e.target.value)}/>
                    </div>
                    <div>
                        Carb Goal
                        <input value={carbGoalPercent} onChange={e => this.handleInput('carbGoalPercent', e.target.value)}/>
                        </div>
                </div>
                <div>
                    <button onClick={()=>console.log(calorieGoal,fatGoalPercent,proteinGoalPercent,carbGoalPercent)}>Check State</button>
                </div>
                <div>
                    <button onClick={()=>this.changeGoals()}>ChangeGoals</button>
                </div>
                {/* <div>{this.state.button && <button></button>}</div> */}
            </div>
        )
    }
}

const mapStateToProps = reduxState => {
    return reduxState
}
export default connect(mapStateToProps) (Form);
