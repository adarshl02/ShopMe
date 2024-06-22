import { Box, Button, styled } from "@mui/material";
import { ShoppingCart as Cart, FlashOn as Flash } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/actions/cartActions";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { DataContext } from "../../context/DataProvider";
import LoginDialog from "../login/LoginDialog";
import { loadStripe } from "@stripe/stripe-js";
import { CartToOrder } from "../../service/api";


const LeftContainer = styled(Box)(({ theme }) => ({
  minWidth: "40%",
  padding: "40px 0 0 80px",
  [theme.breakpoints.down("md")]: {
    padding: "20px 40px",
  },
}));

const Image = styled("img")({
  padding: "15px",
  width: "90%",
});

const StyledButton = styled(Button)(({ theme }) => ({
  width: "48%",
  height: 50,
  borderRadius: 2,
  [theme.breakpoints.down("lg")]: {
    width: "46%",
  },
  [theme.breakpoints.down("sm")]: {
    width: "48%",
  },
}));

const ActionItem = ({ product }) => {
  const { account, setAccount,userId } = useContext(DataContext);
  const [open, setOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = product;

  const productArray=[];
  productArray.push(product);

  const addItemToCart = async() => {
    //this to cartActions to cartReducer
    if (!account) {
      toast.warn("You must be logged in");
      setOpen(true);
    } else {
      
      dispatch(addToCart(id,[],false));
      navigate("/cart");
    }
  };

  const buyNow = async () => {
    if (!account) {
      toast.warn("You must be logged in");
      setOpen(true);
    } else {
      const stripe = await loadStripe(
        "pk_test_51PDV4OSJ3FiDzTUunKg1cfflvxPseKNX1J0NFVsoJtdnAk2L07hHGINpGtVMOeDgGPeljzdGWqBShpPCPq2UEuhP00LpZUKqZJ"
      );

      const body = {
        products: productArray,
      };

      const headers = {
        "Content-Type": "application/json",
      };
      const URL = "/api";

      const response = await fetch(`${URL}/create-checkout-session`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(body),
      });

      const session = await response.json();
      const result = stripe.redirectToCheckout({
        sessionId: session.id,
      });
      let res=await CartToOrder(userId,productArray);
    }
  };

  return (
    <LeftContainer>
      <Box style={{ padding:' 15px 20px', border: "1px solid #f0f0f0" }}>
        <Image src={product.detailUrl} />
      </Box>
      <StyledButton
        variant="contained"
        onClick={() => addItemToCart()}
        style={{ marginRight: 10, background: "#ff9f00" }}
      >
        {" "}
        <Cart /> Add to Cart
      </StyledButton>
      <StyledButton
        variant="contained"
        style={{ background: "#fb541b" }}
        onClick={() => buyNow()}
      >
        {" "}
        <Flash /> Buy Now
      </StyledButton>
      <LoginDialog open={open} setOpen={setOpen} />
    </LeftContainer>
  );
};
export default ActionItem;
