import React, {Component} from 'react';
import {connect} from 'react-redux';
import Axios from 'axios';


class Form extends Component{
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

    handleInput(prop, val) {
        this.setState({
            [prop]:val
        })
    }

    changeGoals = async()=>{
        let userGoals = {
            email: this.props.email,
            calorieGoal:this.state.calorieGoal,
            fatGoalPercent:this.state.fatGoalPercent,
            proteinGoalPercent:this.state.proteinGoalPercent,
            carbGoalPercent:this.state.carbGoalPercent
        }

        try{
            let res = await axios
        } catch(err) {
            alert(`something went wrong${err}`)
        }
    }

    render(){
        const{calorieGoal, fatGoalPercent, proteinGoalPercent, carbGoalPercent} = this.state
        // console.log(calorieGoal, fatGoalPercent,proteinGoalPercent,carbGoalPercent)
        console.log(this)
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
                {/* <div>{this.state.button && <button></button>}</div> */}
            </div>
        )
    }
}

const mapStateToProps = reduxState => {
    return reduxState
}
export default connect(mapStateToProps) (Form);
