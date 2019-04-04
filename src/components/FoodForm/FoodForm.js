import React, {Component} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import {toggleShowFoodForm, updateFoods} from '../../redux/reducer';

class FoodForm extends Component{
    constructor(){
        super()
        this.state={
            food:'',
            calories:0,
            protein:0,
            carb:0,
            fat:0
        }
    }

    handleInput(prop, val) {
        this.setState({
            [prop]:val
        })
        // console.log({[prop]:this.state[prop]})
    }

    addFood = async()=>{
        const{food, calories, protein, carb, fat} = this.state
        const{ id} = this.props
        let newFood = {
            food,
            calories,
            protein,
            carb,
            fat
        }
        try{
            let res = await axios.post(`/api/addFood/id${id}`, newFood)
            console.log({foodFormRES:res.data})
            this.props.updateFoods({foods:res.data})

        }catch(err) {
            console.log(err)
        }
    }

    handleFireTwoFunctions = async () => {
        const { showFoodForm, toggleShowFoodForm } = this.props
        await this.addFood()
        toggleShowFoodForm({showFoodForm})
    }
    
    render(){
        const{showFoodForm} = this.props
        const{food, calories, protein, carb, fat} = this.state
        return(
            <div className="modal">
                <div className="modalContent">
                    <button className='close' onClick={e=>this.props.toggleShowFoodForm({showFoodForm})}>
                        Close
                    </button>
                    <div className='goalCardTitle'>
                        Add a Food
                    </div>
                    <div className='formGoalBarHolder'>
                        <div className='goalBar'>
                            <div className='goal'>
                                Food
                            </div>
                            <input placeholder={food} onChange={e => this.handleInput('food', e.target.value)}/>
                        </div>
                        <div className='goalBar'>
                            <div className='goal'>
                                Calories
                            </div>
                            <input placeholder={calories} onChange={e => this.handleInput('calories', e.target.value)}/>
                        </div>
                        <div className='goalBar'>
                            <div className='goal'>
                                Protein
                            </div>
                            <input placeholder={protein} onChange={e => this.handleInput('protein', e.target.value)}/>
                        </div>
                        <div className='goalBar'>
                            <div className='goal'>
                                Carb
                            </div>
                            <input placeholder={carb} onChange={e => this.handleInput('carb', e.target.value)}/>
                        </div>
                        <div className='goalBar'>
                            <div className='goal'>
                                Fat
                            </div>
                            <input placeholder={fat} onChange={e => this.handleInput('fat', e.target.value)}/>
                        </div>
                    </div>

                    <button onClick={()=>this.handleFireTwoFunctions()}>
                        Add
                    </button>
                    
                </div>
            </div>
        )
    }
}

const mapStateToProps = reduxState => {
    return {
        showFoodForm: reduxState.showFoodForm,
        id: reduxState.id
    }
}

export default connect(mapStateToProps,{toggleShowFoodForm, updateFoods})(FoodForm);