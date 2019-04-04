import React, {Component} from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import {updateUser, updateGoals, updateFoods, clearUser, toggleShowGoalForm, toggleShowFoodForm} from './../../redux/reducer';
import GoalForm from '../GoalForm/GoalForm';
import FoodForm from '../FoodForm/FoodForm';


class Home extends Component{
    constructor(){
        super()
        this.state={
            calorieGoal:0,
            fatGoalPercent:0,
            proteinGoalPercent:0,
            carbGoalPercent:0,
            showGoalForm:true,
            showFoodForm:false,
            showNav:false,
            foods:[],   // from FoodList
            name:''     // from FoodList
        }
    }
    componentDidMount() {
        this.getUser();
        this.getGoals();
        this.getFoods();
    }

    getUser = async ()=> {
        const {id} = this.props;
        if(!id) {
            try {
                let res = await axios.get('/api/current')
                this.props.updateUser(res.data)
            } catch(err) {
                // console.log(err)
                this.props.history.push('/') // comment out for testing Home
            }
        }
    }

    getGoals = async ()=> {
        try{
            let res = await axios.get('/api/current/goals')
            // console.log(res.data[0])
            const{calorie_goal, fat_goal_percent, protein_goal_percent, carb_goal_percent} = res.data[0]
            this.props.updateGoals({calorie_goal, fat_goal_percent, protein_goal_percent, carb_goal_percent})
        } catch(err){
            console.log(err)
        }
    }

    getFoods = async ()=> { // same function in FoodList -------------------- maybe try a componentdidupdate in that component?
        try{
        let res = await axios.get('/api/getFoods')
        console.log({data:res.data})
        this.props.updateFoods({foods:res.data})
        console.log({foods:this.state.foods})
        console.log({name:this.state.name})
    } catch(err) {
            console.log(err)
        }
    }

    logout = async () => {
        await axios.post('./auth/logout')
        this.props.clearUser();
        this.props.history.push('/')
    }

    toggleNav = () => {
        this.setState({
            showNav: !this.state.showNav
        })
    }


    deleteFood =  (id)=>{
        axios.delete(`/api/deleteFood/${id}`).then(res=>{
            console.log()
            // console.log(res.data)
            this.props.updateFoods({foods: res.data})
        })
    }

    render(){
        // console.log(this.props)
        const {email, img, calorieGoal, fatGoalPercent, proteinGoalPercent, carbGoalPercent, showGoalForm, showFoodForm} = this.props
        const fatGoalGrams =(calorieGoal*(fatGoalPercent*.01)/9).toFixed(0)
        const proteinGoalGrams =(calorieGoal*(proteinGoalPercent*.01)/4).toFixed(0)
        const carbGoalGrams =(calorieGoal*(carbGoalPercent*.01)/4).toFixed(0)
        const toggleButton = showGoalForm ? "Done" : "Change Goals";

        let foods = this.props.foods.map((food)=>{
            return(
                <div key={food.id} className="foodListContainer">
                    <div className='foodProp' id='foodName'>{food.food}</div>
                    <div className='foodProp'>{food.calories}</div>
                    <div className='foodProp'>{food.carb}</div>
                    <div className='foodProp'>{food.protein}</div>
                    <div className='foodProp'>{food.fat}</div>
                    <div className='foodProp'>
                        <button className="close" onClick={()=>this.deleteFood(food.id)}>x</button>
                    </div>
                </div>

            )
        })

        return(
            <div >
                <div className="titleBanner">Fitness Tracker</div>
                <div className="userCard">

                    <div>
                        <div className="attribution">Cats provided by robohash.org</div>
                        <img className="userImg" src={img} alt=''/>
                        <div>{email}</div>
                    </div>


                        <div className='nav1'>
                            <div><button onClick={e => this.props.toggleShowGoalForm({showGoalForm})}>Change Goals</button></div>
                            <div><button onClick={e=>this.props.toggleShowFoodForm({showFoodForm})}>Add Foods</button></div>
                            <div><button onClick={this.logout}>Logout</button></div>
                        </div>

                        {this.state.showNav &&                         
                            <div className='nav2'>
                                <div><button onClick={e => this.props.toggleShowGoalForm({showGoalForm})}>Change Goals</button></div>
                                <div><button onClick={e=>this.props.toggleShowFoodForm({showFoodForm})}>Add Foods</button></div>
                                <div><button onClick={this.logout}>Logout</button></div>
                            </div>
                        }

                        <div className='nav2'>
                            <img src="https://icongr.am/material/menu.svg" alt="nav button" style={{width:'50px'}} onClick={()=>this.toggleNav()}/>
                        </div>


                </div>

                <div className="goalCardOuter">
                    <div className="goalCardTitle" >DAILY GOALS </div>
                        <div className="goalCardInner">
                            <div className="goal">{calorieGoal} Calories</div>
                            <div className="goalBar">
                                <div className="goal">Fat</div>
                                <div className="goal">Protein</div>
                                <div className="goal">Carb</div>
                            </div>
                            <div className="goalBar">
                                <div>{fatGoalPercent}</div>
                                <div>{proteinGoalPercent}</div>
                                <div>{carbGoalPercent}</div>
                            </div>
                            <div className="goalBar">
                                <div>{fatGoalGrams}g</div>
                                <div>{proteinGoalGrams}g</div>
                                <div>{carbGoalGrams}g</div>
                            </div>
                        </div>
                </div>

                <div>
                    {showGoalForm && <GoalForm/>}
                </div>

                <div>
                    {showFoodForm && <FoodForm/>}
                </div>

                <div >
                    {/* <FoodList foods={this.state.foods} name={this.state.name}/> */}
                    <div className='card'>
                <h3 >List of Foods for {this.state.name}</h3>
                    <div className="foodListContainer">
                        <div className='foodPropHeader'>Food</div>
                        <div className='foodPropHeader'>Calories</div>
                        <div className='foodPropHeader'>Carb</div>
                        <div className='foodPropHeader'>Protein</div>
                        <div className='foodPropHeader'>Fat</div>
                        <div className='foodPropHeader'></div>
                    </div>
                    {foods}
                        
                </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = reduxState => {
    return {
        calorieGoal: reduxState.calorieGoal,
        fatGoalPercent: reduxState.fatGoalPercent,
        proteinGoalPercent: reduxState.proteinGoalPercent,
        carbGoalPercent: reduxState.carbGoalPercent,
        showGoalForm: reduxState.showGoalForm,
        test: reduxState.test,
        email: reduxState.email,
        img: reduxState.img,
        showFoodForm: reduxState.showFoodForm,
        foods: reduxState.foods

    }
}
const mapDispatchToProps ={ //reducer holds the methods
    updateUser,
    updateGoals,
    updateFoods,
    clearUser,
    toggleShowGoalForm,
    toggleShowFoodForm
}
export default connect(mapStateToProps, mapDispatchToProps) (Home);
