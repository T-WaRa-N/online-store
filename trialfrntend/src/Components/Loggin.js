//importing css atyle
import React from 'react';
import './loggin.css';

// functional component
class Loggin extends React.Component{
    constructor(props){
        super(props)

        //binding the call back function
        this.username = this.username.bind(this)
        this.password = this.password.bind(this)

    }
    
    //callback functions
    username(event){ this.props.username( event.target.value ) }
    password(event){ this.props.password( event.target.value ) }

    render(){
        return (
            <div className="log-in-page">
                <h1>Welcome to the online shopping where you get great discounts on most deals</h1>
                <div className="log-in-form-container">
                    <h3>log-in</h3>
                    <hr/>
                    <form onSubmit={this.props.login}>
                        <label>username:</label><br/>
                        <input type="text" onChange={this.username} /><br/>
                        <label>password:</label><br/>
                        <input type="text" onChange={this.password} /><br/><br/>
                        <button id="log-in-button" type="submit">Log-in</button><br/>
                        <a href="#" onClick={this.props.forgot}>forgot password?</a><br/><br/><hr/>
                    </form>
    
                   <button id="fcbk" onClick={this.props.facebook}>Sign in using Facebook</button><br/><br/>
                   <button id="ggl" onClick={this.props.google}>Sign in using Google</button><br/><br/><hr/>
                   <label>New User</label><br/>
                   <button id="sign-up-button" onClick={this.props.signUp}>Sign-Up</button>
                </div>
                
            </div>
        )
    }
    
}

export default Loggin

