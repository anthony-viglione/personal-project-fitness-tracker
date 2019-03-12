import React, {Component} from 'react';

class Login extends Component{
    // constructor(){
    //     super()

    // }

    render(){
        return(
            <div>Login Component
                <div>
                    <div>Email</div>
                    <input/>
                </div>
                <div>
                    <div>Password</div>
                    <input/>
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