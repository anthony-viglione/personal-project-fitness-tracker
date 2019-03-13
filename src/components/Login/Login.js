import React, {Component} from 'react';

class Login extends Component{
    constructor(){
        super()
        this.state = {
            email: '',
            password: ''
        }
    }

    handleChange(prop,val) {
        this.setState({
            [prop]: val
        })
    }

    render(){
        const{ email, password } = this.state;
        console.log({password:password})
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
                    <button>Login</button>
                    <button>Register</button>
                </div>
            </div>
        )
    }
}

export default Login;