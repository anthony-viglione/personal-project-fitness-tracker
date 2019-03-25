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
                    FoodForm Component
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