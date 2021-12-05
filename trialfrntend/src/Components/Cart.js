import { RiHome2Line } from "react-icons/ri"
import './cart.css'

//Saving added to Cart item in to orderList
const orderList = JSON.parse(localStorage.getItem("orders"))


// Adjusting the price of  item based on qauntity
function priceUpdate(){
    
    alert("Under development")
    
}

//Removing and Item from the Cart function callback
function delItem(object){

    const index = orderList.indexOf(object)
    orderList.splice(index, 1)
    localStorage.setItem("orders", JSON.stringify(orderList))

}

// Simulating purchase callback function
function purchase(){
    alert("simulating purchase")
    window.location.reload()
}


//functional component
function Cart(props){
    
    const username = localStorage.getItem("username") //getting  the current username
    let iconStyel = {color:"whitesmoke", marginTop: "10px", fontSize:"25px"} // styling icons

    //if there is something in the cart disply the following
    if(orderList){

        //name of an item
        const count = orderList.map((obj) => {
            return<li>{obj.name}</li>
        })
        
        //url of an item
        const image = orderList.map((obj)=>{
            return <img src={obj.imageUrl} alt="Product Image"/>
        })
        
        //Input quantiy
        const quantity = orderList.map((obj)=>{
            return<div className="quantity"><input type="number" min="1" onChange={priceUpdate}/></div>
        })
        
        // remove button
        const remove = orderList.map((obj)=>{
            return<div className="removeButton"><button onClick={()=>{delItem(obj)}}>remove</button></div>
        })
        
        //price of all items
        const priceList = []
        for(let i = 0; i < orderList.length; i++ ){
            priceList.push(parseInt(orderList[i].price))
        }
        
        // Total amount due of the items
        const sum = priceList.reduce((a, b)=>{
            return a + b
        }, 0)

        return (
            <div className="cartPage">
                <div className="cartPageNav">
                    <h1>---This is your shopping cart- {username}</h1>
                    <RiHome2Line 
                        style={iconStyel} 
                        onMouseOver={({target}) => (target.style.cursor="pointer")}
                        onClick={props.goHome}
                    />
                    <button onClick={props.logout}>logout</button>
                </div>
                <hr/><br/>
                <div className="totalPrice">
                    <h3>Amount Due</h3><hr/>
                    <p>R{sum}.00</p>
                    <button onClick={purchase}>buy</button>
                </div>
    
                <div className="cartItems">
                   <div className="item"><h3>Count&name</h3><hr/><ol>{count}</ol></div>
                   <div className="item"><h3>Image</h3><hr/>{image}</div>
                   <div className="item"><h3>Quantity</h3><hr/>{quantity}</div>
                   <div className="item"><h3>Remove</h3><hr/>{remove}</div>
                </div>
                
            </div>
        )
    }else{

        return (
            <div className="cartPage">
                <div className="cartPageNav">
                    <h1>---This is your shopping cart- {username}</h1>
                    <RiHome2Line 
                        style={iconStyel} 
                        onMouseOver={({target}) => (target.style.cursor="pointer")}
                        onClick={props.goHome}
                    />
                    <button onClick={props.logout}>logout</button>
                </div>
                <hr/><br/>
                                
            </div>
        )

    }
    
    
}

export default Cart