import React, {Component} from 'react';

class Form extends Component{
    constructor(){
        super()
        this.state={
            calorieGoal:0,
            fatGoalPercent:0,
            proteinGoalPercent:0,
            carbGoalPercent:0
        }
    }

    handleInput(prop, val) {
        this.setState({
            [prop]:val
        })
    }

    render(){
        const{calorieGoal, fatGoalPercent, proteinGoalPercent, carbGoalPercent} = this.state
        // console.log(calorieGoal, fatGoalPercent,proteinGoalPercent,carbGoalPercent)
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
            </div>
        )
    }
}
export default Form;
