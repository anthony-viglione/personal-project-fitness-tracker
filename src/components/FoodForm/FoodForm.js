import React, {Component} from 'react';
import {connect} from 'react-redux';
import {toggleShowFoodForm} from '../../redux/reducer';

class FoodForm extends Component{
    constructor(){
        super()
        this.state={

        }
    }

    render(){
        const{showFoodForm} = this.props
        return(
            <div className="modal">
                <div className="modalContent">
                    <button className='close' onClick={e=>this.props.toggleShowFoodForm({showFoodForm})}>Close</button>
                    <div className='goalCardTitle'>Add a Food</div>
                    <div className='FoodFormGoalBarHolder'>
                        <div className='goalBar'>
                            <div className='goal'>
                                Food
                            </div>
                            <input/>
                        </div>
                        <div className='goalBar'>
                            <div className='goal'>
                                Calories
                            </div>
                            <input/>
                        </div>
                        <div className='goalBar'>
                            <div className='goal'>
                                Protein
                            </div>
                            <input/>
                        </div>
                        <div className='goalBar'>
                            <div className='goal'>
                                Carb
                            </div>
                            <input/>
                        </div>
                        <div className='goalBar'>
                            <div className='goal'>
                                Fat
                            </div>
                            <input/>
                        </div>
                        <div>
                            <button>
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = reduxState => {
    return {
        showFoodForm: reduxState.showFoodForm
    }
}

export default connect(mapStateToProps,{toggleShowFoodForm})(FoodForm);