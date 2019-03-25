import React, {Component} from 'react';

class FoodForm extends Component{
    constructor(){
        super()
    }

    render(){
        return(
            <div className="modal">
                <div className="modalContent">
                    <button className='close'>Close</button>
                    FoodForm Component
                </div>
            </div>
        )
    }
}

export default FoodForm;