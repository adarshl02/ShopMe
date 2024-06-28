import { Box, Grid, Typography, styled } from "@mui/material";
import { OrderList } from "./OrderList";
import { useContext, useEffect, useState } from "react";
import Emptyorders from "./Emptyorders";

import { useLocation } from "react-router-dom";
import { DataContext } from "../../context/DataProvider";

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
const location =useLocation();
const { account} = useContext(DataContext);
const orders = account ? account.orders : [];
const [isLoading, setIsLoading] = useState(true); // Add loading state
  

useEffect(() => {
  setIsLoading(false);
}, []);

  return (
    <div style={{background:'#f2f2f2'}} >

      <Header>
        <Typography> My Orders</Typography>
      </Header>
      { orders !== null ? (
         orders.length?(
      <Grid container spacing={1} >
         
        {orders.map((item) => (
            <Grid item lg={3} md={6} sm={12} xs={12} key={item.id}>
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
