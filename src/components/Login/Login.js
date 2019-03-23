import React, {Component} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {updateUser} from './../../redux/reducer';

class Login extends Component{
    constructor(){
        super()
        this.state = {
            email: '',
            password: ''
        }
    }

    componentDidMount(){
        this.checkUser();
    }

    checkUser = async () => {
        const {id} = this.props
        if (!id) {
            try {
                let res = await axios.get('/api/current')
                this.props.updateUser(res.data)
                this.props.history.push('/home')
            }   catch(err) {
            }
        } else {
            this.props.history.push('/home')
        }
    }

    handleChange(prop,val) { 
        this.setState({
            [prop]: val
        })
    }

    register = async () => {
        let user = {
            email: this.state.email,
            password: this.state.password
        }

        try {
            let res = await axios.post('/auth/register', user)
            this.props.updateUser(res.data)
            this.props.history.push('/home')
        } catch(err) {
            console.log(err)
            alert('register error in Login')
        }
    }

    login = async() => {
        let user ={
            email:this.state.email,
            password:this.state.password
        }

        try{
            let res = await axios.post('/auth/login', user);
            this.props.updateUser(res.data)
            this.props.history.push('/home')
        } catch(err) {
            alert('Incorrect username or password')
        }
    }

    render(){
        const{ email, password } = this.state;
        // console.log({password:password})
        // console.log({email:email})
        return(
            <div>Login Component
                <div>
                    <div>Email</div>
                    <input value={email} onChange={e => this.handleChange('email', e.target.value)}/>
                </div>
                <div>
                    <div>Password</div>
                    <input type='password' value={password} onChange={e => this.handleChange('password', e.target.value)}/>
                </div>
                <div>
                    <button onClick={this.login}>Login</button>
                    <button onClick={()=>{this.register()}}>Register</button>
                </div>
            </div>
        )
    }
}
const mapStateToProps = (reduxState) => {
    return{
        id:reduxState.id
    }
}
const mapDispatchToProps = {
    updateUser
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);