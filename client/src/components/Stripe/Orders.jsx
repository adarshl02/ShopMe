import { Box, Grid, Typography, styled } from "@mui/material";
import { useSelector } from "react-redux";
import { OrderList } from "./OrderList";
import { useEffect, useState } from "react";
import Emptyorders from "./Emptyorders";
import axios from "axios";

const Header = styled(Box)`
background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  margin:auto;
  width:70%;
  color:#828282;
  border-radius: 30px;
  box-shadow: 2px 2px 10px black;
  margin-top: 70px;
   margin-bottom: 40px;
  padding: 20px;
  & > p {
    font-size: 24px;
    font-weight: 600;
  }
`;

const Orders = () => {
   const [orders,setOrders]=useState([]);
//   const { cartItems } = useSelector((state) => state.cart);

  useEffect(()=>{
      axios.get('/orders')
      .then((data)=>{
        console.log(data)
         setOrders([]);
         setOrders(data.data.orders);
      })
      .catch(e=>{
         if(!e.response){
             alert(e.message)
         }
     })
  },[]);

  return (
    <div style={{background:'#f2f2f2'}} >

      <Header>
        <Typography> My Orders</Typography>
      </Header>
      { orders !== null ? (
         orders.length?(
      <Grid container spacing={1} >
         
        {orders.map((item) => (
            <Grid item lg={3} md={6} sm={12} xs={12}>
          <OrderList item={item} key={item.id} />
          </Grid>

        ))}
      </Grid>
         ):
         <Emptyorders/>
        ): (
          <div>Loading...</div> // Optionally, show a loading indicator
        )
      }
    </div>
  );
};

export default Orders;
