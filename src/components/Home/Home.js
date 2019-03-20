import React, {Component} from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import {updateUser, clearUser} from './../../redux/reducer';
import Form from '../Form/Form';


class Home extends Component{
    constructor(){
        super()
        this.state={
            calorieGoal:2000,
            fatGoalPercent:20,
            proteinGoalPercent:40,
            carbGoalPercent:40,
            showEdit:true
        }
    }
    componentDidMount() {
        this.getUser();
        console.log(this.props)
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

    logout = async () => {
        await axios.post('./auth/logout')
        this.props.clearUser();
        this.props.history.push('/')
    }

    handleShowEdit=(val) => {
        this.setState({
            showEdit:!val
        })
    }

    render(){
        const {email, img} = this.props
        const {calorieGoal,fatGoalPercent,proteinGoalPercent,carbGoalPercent} = this.state
        const fatGoalGrams =(calorieGoal*(fatGoalPercent*.01)/9).toFixed(0)
        const proteinGoalGrams =(calorieGoal*(proteinGoalPercent*.01)/4).toFixed(0)
        const carbGoalGrams =(calorieGoal*(carbGoalPercent*.01)/4).toFixed(0)
        const toggleButton = !this.state.showEdit ? "Change Goals" : "Done";
        return(
            <div style={{display:"flex", alignItems:"center", flexDirection:"column"}}>
                <h1>Home Page</h1>
                <div>
                    <h3>{email}</h3>
                    <button onClick={this.logout}>Logout</button>
                </div>
                <img src={img} alt=''/>
                <div style={{display:"flex"}}>
                    <h1 style={{width:"200px"}}>GOALS </h1>
                    <div style={{width:'300px'}}>
                        {/* <div>Goals</div> */}
                        <div>{calorieGoal} Calories</div>
                        {/* <div>Macros</div> */}
                        <div style={{display:"flex", justifyContent:"space-between"}}>
                            <div>Fat</div>
                            <div>Protein</div>
                            <div>Carb</div>
                        </div>
                        <div style={{display:"flex", justifyContent:"space-between"}}>
                            <div>{fatGoalPercent}</div>
                            <div>{proteinGoalPercent}</div>
                            <div>{carbGoalPercent}</div>
                        </div>
                        <div style={{display:"flex", justifyContent:"space-between"}}>
                            <div>{fatGoalGrams}</div>
                            <div>{proteinGoalGrams}</div>
                            <div>{carbGoalGrams}</div>
                        </div>
                    </div>
                    <hi>
                        <button onClick={e => this.handleShowEdit(this.state.showEdit)}>{toggleButton}</button>
                    </hi>
                </div>
                {this.state.showEdit && <Form/>}
            </div>
        )
    }
}

const mapStateToProps = reduxState => {
    return reduxState
}
const mapDispatchToProps ={
    updateUser,
    clearUser
}
export default connect(mapStateToProps, mapDispatchToProps) (Home);
