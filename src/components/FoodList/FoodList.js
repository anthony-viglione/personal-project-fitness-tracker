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
                <div key={food.id} style={{display:'flex'}}>
                    <div className='foodProp'>{food.email}</div>
                    <div className='foodProp'>{food.food}</div>
                    <div className='foodProp'>{food.calories}</div>
                    <div className='foodProp'>{food.carb}</div>
                    <div className='foodProp'>{food.protein}</div>
                    <div className='foodProp'>{food.fat}</div>
                    <div className='foodProp'>
                        <button className="close" onClick={()=>this.deleteFood(food.id)}>delete</button>
                    </div>
                </div>

            )
        })
        this.setState({
            foods:foods,
            name:res.data[0].email
        })
    }

    deleteFood = async (id)=>{
        axios.delete(`/api/deleteFood/${id}`)
    }

    render(){
        return(
            <>
                <h3 >List of Foods for {this.state.name}</h3>
                <div className='card'>
                    <div style={{display:'flex'}}>
                        <div className='foodProp'>Person</div>
                        <div className='foodProp'>Food</div>
                        <div className='foodProp'>Calories</div>
                        <div className='foodProp'>Carb</div>
                        <div className='foodProp'>Protein</div>
                        <div className='foodProp'>Fat</div>
                        <div className='foodProp'></div>
                    </div>
                    {this.state.foods}
                </div>
            </>
        )
    }
}

export default FoodList;