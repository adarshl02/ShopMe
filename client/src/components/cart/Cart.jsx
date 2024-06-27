import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import {  useSelector } from "react-redux";
import CartItem from "./CartItem";
import TotalBalance from "./TotalBalance";
import EmptyCart from "./Emptycart";
import { loadStripe } from "@stripe/stripe-js";
import { useContext, useEffect, useState } from "react";
import MoonLoader from "react-spinners/MoonLoader";
import "../PreLoader/loader.css";
import LocalActivityIcon from "@mui/icons-material/LocalActivity";
import { CartToOrder, addCart } from "../../service/api";
import { DataContext } from "../../context/DataProvider";
import { toast } from "react-toastify";


const Container = styled(Grid)(({ theme }) => ({
  padding: "30px 135px",
  [theme.breakpoints.down("md")]: {
    padding: "15px 0",
  },
}));

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
  &:hover {
    background-color: #f8894c;
  }
`;

const LeftComponent = styled(Grid)(({ theme }) => ({
  paddingRight: 15,
  [theme.breakpoints.down("md")]: {
    marginBottom: 15,
  },
}));

const PromoWrapper = styled(Box)`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  width: 100%;
  & > * {
    margin-bottom: 10px;
  }
`;

const PromoInner = styled(Box)`
  padding: 10px;
  background: #fff;
  color: #FE9900;
`;
const SubmitButton = styled(Button)`
  background: #000;
  color: #fff;
  &:hover {
    background: #3b3b3b;
  }
`;

const Cart = () => {
  const {userId}=useContext(DataContext);
  const { cartItems, loading } = useSelector((state) => state.cart);
  const [isLoading, setIsLoading] = useState(true); // Add loading state
  

  useEffect(() => {
    setIsLoading(loading);
    console.log(cartItems) // Update loading state
  }, [loading]);

  const buyNow = async () => {
    const stripe = await loadStripe(
      "pk_test_51PDV4OSJ3FiDzTUunKg1cfflvxPseKNX1J0NFVsoJtdnAk2L07hHGINpGtVMOeDgGPeljzdGWqBShpPCPq2UEuhP00LpZUKqZJ"
    );

    const body = {
      products: cartItems,
    };

    const headers = {
      "Content-Type": "application/json",
    };
    const URL = "/api";

    const response = await fetch(`${URL}/create-checkout-session`, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(body),
    })
   
    const session = await response.json();
   // window.open(session.url, "_blank");
    const result = stripe.redirectToCheckout({
      sessionId: session.id,
     
    });

    let res=await CartToOrder(userId,cartItems);
    toast.success("Order placed successfully");

  };
  return (
    <>
      {isLoading ? ( // Render loader if isLoading is true
        <div className="loader">
          <MoonLoader
            color={"#2874f0"}
            loading={isLoading}
            size={50}
            data-testid="loader"
          />
        </div>
      ) : cartItems.length ? (
        <Container container>
          <LeftComponent item lg={9} md={9} sm={12} xs={12}>
            <Header>
              <Typography>My Cart ({cartItems.length}) </Typography>
            </Header>

            {cartItems.map((item) => (
              <CartItem item={item} key={item.id}  />
            ))}
            <ButtonWrapper>
              <StyledButton onClick={buyNow}>Proceed to Checkout</StyledButton>
            </ButtonWrapper>
          </LeftComponent>
          <Grid item lg={3} md={3} sm={12} xs={12}>
            <TotalBalance cartItems={cartItems} />
            <PromoWrapper>
              <Box style={{ display: "flex", alignItems: "center" }}>
                <PromoInner>
                  If you have Promo Code , &nbsp; Enter it here &nbsp;{" "}
                  <LocalActivityIcon />{" "}
                </PromoInner>
              </Box>

                <TextField
                  id="filled-basic"
                  label="Promo Code"
                  variant="filled"
                  color="success"
                />

              <SubmitButton>Submit</SubmitButton>
            </PromoWrapper>
          </Grid>
        </Container>
      ) : (
        <EmptyCart />
      )}
    </>
  );
};

export default Cart;
