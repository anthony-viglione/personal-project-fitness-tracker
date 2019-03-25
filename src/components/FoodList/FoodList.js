import React, {Component} from 'react';
import axios from 'axios';

class FoodList extends Component{
    constructor(){
        super()
        this.state={
            name:'',
            foods:""
        }
    }


    componentDidMount = async ()=> {
        let res = await axios.get('/api/getFoods')
        console.log(res.data)
        let foods = res.data.map((food)=>{
            return(
                <div style={{dislpay:'flex', margin:'5px 5px 5px 5px'}}>
                    <div>{food.email}</div>
                    <div>{food.food}</div>
                    <div>{food.calories}</div>
                    <div>{food.carb}</div>
                    <div>{food.protein}</div>
                    <div>{food.fat}</div>
                    <button>delete</button>
                </div>

            )
        })
        this.setState({
            foods:foods,
            name:res.data[0].email
        })
    }

    render(){
        return(
            <div >
                <div >List of Foods for {this.state.name}</div>
                <div style={{display:'flex'}}>
                    <div style={{dislpay:'flex', margin:'5px 5px 5px 5px'}}>
                        <div>Person</div>
                        <div>Food</div>
                        <div>Calories</div>
                        <div>Carb</div>
                        <div>Protein</div>
                        <div>Fat</div>
                    </div>
                    {this.state.foods}
                </div>
            </div>
        )
    }
}

export default FoodList;