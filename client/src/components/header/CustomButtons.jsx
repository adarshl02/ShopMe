import { Badge, Box, Button, Typography, styled } from "@mui/material";    //named import / default export
import { ShoppingCart } from '@mui/icons-material';

//components
import LoginDialog from "../login/LoginDialog";
import { useState, useContext } from "react";
import { DataContext } from "../../context/DataProvider";
import Profile from "./Profile";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Wrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '30px',
  [theme.breakpoints.down('md')]: {
    display: 'block',
    textAlign: 'center'
  }
}));

const Container = styled(Link)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  textDecoration: 'none',
  color: 'inherit', 
  [theme.breakpoints.down('md')]: {
    justifyContent: 'center',
    margin: '10px 0'
  }
}));

const LoginButton = styled(Button)`
  color: #000;
  background: #f1f1f1;
  text-transform: none;
  padding: 5px 40px;
  border-radius: 6px;
  box-shadow: none;
  font-size: 18px;
  font-weight: 600;
  height: 32px;
  &:hover {
  box-shadow: 0 2px 4px 0 rgb(0 0 0 /0.4);

    background: #f1f1f1;
  }
`;

export default function CustomButtons() {
  const [open, setOpen] = useState(false);    
  const { account, setAccount, userId } = useContext(DataContext);
  const { cartItems } = useSelector(state => state.cart);

  const openDialog = () => {
    setOpen(true);
  };

  return (
    <Wrapper>
      {account ? (
        <Profile account={account} setAccount={setAccount} userId={userId} />
      ) : (
        <LoginButton onClick={openDialog}>Login</LoginButton>
      )}
      <Typography>Become a Seller</Typography>
      <Typography>More</Typography>
      <Container to="/cart">
        <Badge badgeContent={cartItems?.length} color="secondary">
          <ShoppingCart />
        </Badge>
        <Typography style={{ marginLeft: 4 }}>Cart</Typography>
      </Container>
      <LoginDialog open={open} setOpen={setOpen} />
    </Wrapper>
  );
}
