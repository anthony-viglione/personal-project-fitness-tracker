import React, {Component} from 'react';

class Form extends Component{
    constructor(){
        super()

    }

    render(){
        return(
            <div>
                <div>
                </div>
                <div>
                    Form Component
                </div>
                <div>
                    <div>
                        Calorie Goal
                        <input/>
                    </div>
                    <div>
                        Fat Goal
                        <input/>
                    </div>
                    <div>
                        Protein Goal
                        <input/>
                    </div>
                    <div>
                        Carb Goal
                        <input/>
                        </div>
                </div>
            </div>
        )
    }
}
export default Form;
