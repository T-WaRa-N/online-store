import React from 'react';
import Loggin from './Components/Loggin';
import UserPage from './Components/UserPage'
import AdminPage from './Components/AdminPage';
import Cart from './Components/Cart'

//class component for states
class App extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            username : "",
            password : "",
            cartOn : false,
            products: []
        }

        //Binding callback functions
        this.facebook = this.facebook.bind(this)
        this.google = this.google.bind(this)
        this.forgot = this.forgot.bind(this)
        this.username =this.username.bind(this)
        this.password = this.password.bind(this)
        this.login = this.login.bind(this)
        this.logout = this.logout.bind(this)
        this.signUp = this.signUp.bind(this)
        this.viewCart = this.viewCart.bind(this)
        this.homePage = this.homePage.bind(this)
    }

    //callback functions
    facebook(){ alert('Facebook loggin development is still under progress!') }
    google(){ alert('Google loggin development is still under progress!') }
    forgot(){ alert('Password recorvery still under development ') }
    viewCart(){  this.setState({ cartOn: true})  }
    homePage(){ this.setState({ cartOn: false}) }

    //when logging out of the page
    logout(){ 
        localStorage.clear()
        window.location.reload() 
    }

    //updating state to save username and password
    password(val){ this.setState({ password: val }) }
    username(val){ this.setState({ username: val }) }

    //login function is called before authentication
    login(){ 
        if( !this.state.username || !this.state.password ) { alert('You can not have empty input fields') }
        else{
            fetch("/logged",{
                method: "POST",
                headers: {
                  "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username: this.state.username,
                    password: this.state.password
                })
            })
            .then(res => res.json())
            .then((response) => { 
                localStorage.setItem("username", JSON.stringify(this.state.username))
                localStorage.setItem("token", JSON.stringify(response.token))
                localStorage.setItem("isLoggedIn", JSON.stringify(response.isLoggedIn))
                localStorage.setItem("isAdmin", response.payload.admin)
                
              },
            (error) => { alert('could not log you in please try again') })
        }
    }

    // componentDiiMount
    componentDidMount() {
        const token = localStorage.getItem("token")
        fetch("/onlineProducts", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`
            }
        })
        .then(res => res.json())
        .then((result) => { this.setState({ products: result.items }) },
          (error) => { alert(error, 'could not fetch data, please try again or you have wrong token') }
        )
    }

    // new user calls to function to register successfully
    signUp(){
        if( !this.state.username || !this.state.password ) { alert('You can not have empty input fields') }
        else{
            fetch("/signUp", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json"
                },
                body: JSON.stringify({ 
                  username: this.state.username,
                  password: this.state.password
                })
            })
            .then(res => res.json())
            .then((response) => {alert(response.message)},
              (error) => {alert(error)}
            )
        }
        window.location.reload()
    }
      
    render(){

        const userSignedIn = JSON.parse(localStorage.getItem("isLoggedIn"))
        const userIsAdmin =JSON.parse(localStorage.getItem("isAdmin"))

        //checks whether is user or admin
        if(userSignedIn && !userIsAdmin && !this.state.cartOn){

            return (
                <UserPage 
                    logout={this.logout} 
                    viewCart={this.viewCart}
                    products = {this.state.products}
                    addToCart = {this.addToCart}
                />
            )
            
        }if(userSignedIn && !userIsAdmin && this.state.cartOn){

            return (
                <Cart 
                    goHome={this.homePage}
                />
            )

        }if(userSignedIn && userIsAdmin){

            return ( 
                <AdminPage 
                   logout = {this.logout}
                   products = {this.state.products}
                />
            )

        }else{

            return (
                <Loggin 
                    facebook = {this.facebook} 
                    google = {this.google} 
                    forgot = {this.forgot}
                    username = {this.username}
                    password = {this.password}
                    login = {this.login}
                    signUp = {this.signUp}
                />
            )
        }
        
    }
  
}
export default App;
