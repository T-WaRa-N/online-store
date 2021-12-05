//import React
import { BsCart4 } from "react-icons/bs"
import { makeStyles } from "@material-ui/core/styles"
import { Grid, Paper } from "@material-ui/core"
import './userPage.css'

//Styling
const useStyles = makeStyles((theme)=>({
    grid:{
       width: '90%',
       margin: '0 auto'
    },
    paper:{
       padding: theme.spacing(2),
       textAlign: 'center',
    
    }
}))

//Constructor for Product Object
function Product(imageUrl, name, price, type){
    this.imageUrl = imageUrl
    this.name = name
    this.price = price
    this.type = type
}

//Adding selected items to customer Cart
function addToCart(a, b, c, d){

    const item = new Product(a, b, c, d)
    if(!localStorage.getItem("hasRun")){
        const orderArray = []
        orderArray.push(item)
        localStorage.setItem("hasRun", true)
        localStorage.setItem("orders", JSON.stringify(orderArray))
    }else{
        const orderArray = JSON.parse(localStorage.getItem("orders"))
        orderArray.push(item)
        localStorage.setItem("orders", JSON.stringify(orderArray))
    }
    window.location.reload()
}

//Functional Component
function UserPage (props){   

    //button styling and image styling
    const buttonStyle = {backgroundColor: 'rgb(124, 175, 243) ', width:'100%', border: 'none', color:'whitesmoke'}
    const imgStyle = {width:'100%', height:'12em', border:'1px solid rgb(124, 175, 243)'}

    const classes = useStyles()

    //Grid items styled
    const paperItems = props.products.map((obj)=>{
        return (
            <Grid item xs={6} md={3}>
                <Paper className={classes.paper}>
                    <img src={obj.imageUrl} alt="Online Product" style={imgStyle}/><br/>
                    Name: {obj.name}<br/>
                    Price: R{obj.price}.00<br/>
                    <button style={buttonStyle} onClick={()=>{addToCart(obj.imageUrl, obj.name, obj.price, obj.type)}}>
                        Add to Cart
                    </button>
                </Paper>
            </Grid>
        )
    })

    // receiving user that has logged in
    const username = localStorage.getItem("username") //getting  the current username
    let iconStyel = {color:"whitesmoke", marginTop: "10px", fontSize:"25px"} // styling icons

    return (
        <div className="userPage">
            <div className="userPageNav">
                <h1>Welcome to our online store {username}</h1>
                <BsCart4 
                    style={iconStyel} 
                    onMouseOver={({target}) => (target.style.cursor="pointer")}
                    onClick={props.viewCart}
                />
                <button onClick={props.logout}>logout</button>
            </div>
            <hr/>

            <Grid container spacing={2} className={classes.grid}>
               {paperItems}
            </Grid>
            
        </div>
    )
   
}

export default UserPage