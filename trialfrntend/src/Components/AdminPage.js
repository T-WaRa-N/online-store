//import React
import React from "react";
import './adminPage.css'

class AdminPage extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            users:[]
        }
        // binding the callback functions
        this.remove = this.remove.bind(this)
    }
    
    //componentDidMount
    componentDidMount() {
        
        fetch("/users", {
            method: "GET",
            headers: {
              "Content-Type": "application/json"
            }
        })
        .then(res => res.json())
        .then((result) => { this.setState({ users: result.users }) },
          (error) => { alert(error, 'could not log you in please try again') }
        )
    }

    //function to delet or remove a online store user
    remove(){
        alert('Development under progress')
    }
   
    //rendering
    render(){
        
        //list of all products in stock
        const productOnStock = this.props.products.map((obj)=>{
            return <li>{obj.name}</li>
        })

        //list of all appliances in stock
        const appliances = this.props.products.filter((obj)=>{
            return obj.type == 'appliance'
        })

        //list of all furniture in stock
        const furnitures = this.props.products.filter((obj)=>{
            return obj.type == 'furniture'
        })

        //list of all gadget in stock
        const gadgets = this.props.products.filter((obj)=>{
            return obj.type == 'gadget'
        })

        //list of all users in the online store database
        const users = this.state.users.map((obj)=>{
            return <li>{obj.username} <button onClick={this.remove}>del user</button></li>
        })

        //retreivng the username that is online
        const username = localStorage.getItem("username") //getting  the current username

        return (
            <div className="adminPage">
                <div className="adminPageNav">
                  <h1>Greetings {username}, Thank you for you service</h1>
                  <button onClick={this.props.logout}>logout</button>
                </div>
                <div className="admin-container">
                    <div className="userList">
                        <h3>Online Store Users</h3>
                        <ol>{users}</ol>
                    </div>
                    <div className="inventory">
                        <h3>inventory</h3>
                        <p>On Appliances we have {appliances.length} products</p>
                        <p>On Furniture we have {furnitures.length} products</p>
                        <p>On Gadgets we have {gadgets.length} products</p>

                    </div>
                    <div className="itemList">
                        <h3>Items on stock ({this.props.products.length})</h3>
                        <ol>{productOnStock}</ol>
                    </div>
                </div>
            </div>
        )
    }
}
export default AdminPage
