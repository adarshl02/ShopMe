import { Box, Button, Grid, Typography, styled } from "@mui/material";
import { useSelector } from "react-redux";
import CartItem from "./CartItem";
import TotalBalance from "./TotalBalance";
import EmptyCart from "./Emptycart";
import { payUsingPaytm } from "../../service/api";
import { post } from '../../utils/paytm';
import {loadStripe} from '@stripe/stripe-js';
import axios from "axios";

const Container = styled(Grid)(({theme})=>({
    padding: '30px 135px',
    [theme.breakpoints.down('md')]:{
        padding:'15px 0'
    }
}))
 

const Header = styled(Box)`
  padding: 15px 24px;
  background-color: #fff;
`;
const ButtonWrapper = styled(Box)`
  padding: 16px 22px;
  background-color: #fff;
  box-shadow: 0 -2px 10px 0 rgb(0 0 0 /10%);
`;
const StyledButton = styled(Button)`
  display: flex;
  margin-left: auto;
  background-color: #fb641b;
  color: #fff;
  width: 250px;
  height: 51px;
  border-radius: 2px;
`;

const LeftComponent = styled(Grid)(({ theme }) => ({
    paddingRight:15,
    [theme.breakpoints.down('md')]:{
        marginBottom :15
    }

}))

const Cart = () => {
  const { cartItems } = useSelector((state) => state.cart);
  console.log(cartItems);

  const buyNow=async()=>{
    const stripe=await loadStripe("pk_test_51PDV4OSJ3FiDzTUunKg1cfflvxPseKNX1J0NFVsoJtdnAk2L07hHGINpGtVMOeDgGPeljzdGWqBShpPCPq2UEuhP00LpZUKqZJ");
    
    const body={
      products: cartItems
    }

    const headers={
      "Content-Type":"application/json"
    }
    const URL='/api';

    const response=await fetch(`${URL}/create-checkout-session`,{
      method:"POST",
      headers:headers,
      body:JSON.stringify(body)
    })

    const session=await response.json();
    const result=stripe.redirectToCheckout({
      sessionId:session.id
    })
    // let response=await payUsingPaytm({amount:500,email:'adarh@gmail.com'});
    // let information={
    //     action:'https://securegw-stage.paytm.in/order/process',
    //     params:response
    // }
    // post(information);
}
  return (
    <>
      {cartItems.length ? (
        <Container container>
          <LeftComponent item lg={9} md={9} sm={12} xs={12}>
            <Header>
              <Typography>My Cart ({cartItems.length}) </Typography>
            </Header>

            {cartItems.map((item) => (
              <CartItem item={item} />
            ))}
            <ButtonWrapper>
              <StyledButton onClick={buyNow}>Place Order</StyledButton>
            </ButtonWrapper>
          </LeftComponent>
          <Grid item lg={3} md={3} sm={12} xs={12}>
            <TotalBalance cartItems={cartItems} />
          </Grid>
        </Container>
      ) : (
        <EmptyCart />
      )}
    </>
  );
};

export default Cart;
