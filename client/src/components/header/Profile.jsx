import { Typography, Menu, MenuItem, Box, styled, Badge } from '@mui/material';
import {  useContext, useState } from 'react';
import LogoutIcon from '@mui/icons-material/Logout';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { cartReset } from '../../redux/actions/cartActions';
import { addCartTodb, logout } from '../../service/api';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link } from 'react-router-dom';
import { DataContext } from '../../context/DataProvider';


const Component=styled(Menu)`
`
const Logout=styled(Typography)`
  font-size:14px;
  margin-left:10px;
`
const ProfileBox=styled(Box)`
  display:flex;
  justify-content: space-between;
`
const Container=styled(Link)(({theme})=>({
  display:'flex',
  marginTop:3,
  textDecoration:'none',
  color:'inherit', 
  [theme.breakpoints.down('md')]:{
      display:'block'
  }

}));


const Profile = ({ account , setAccount,userId}) => {
    const [open,setOpen]=useState(false);
  const { cartItems} = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    const {setSimilarItemsId} = useContext(DataContext); 


    const handleClick = (event) => {
      setOpen(event.currentTarget);
     };

    const logoutUser=async()=>{ 
      setOpen(false);
     
      try {
         const updatedCart= await addCartTodb(cartItems,userId)
        await logout()
        toast.warn("You're logged Out");
        setSimilarItemsId('')
        dispatch(cartReset()); 
        setAccount(()=>null)
      } catch (error) {
        alert(error.message)
      }
    }

    const switchToOrder = () => {
      setOpen(false);
    }
    
  return (
    <>
      <ProfileBox onClick={handleClick} style={{cursor:'pointer'}}>
       <Typography> {account.username}</Typography> 
        <AccountCircleIcon/> 
      </ProfileBox>
      
      <Component
        anchorEl={open}
        open={Boolean(open)}
        onClose={()=>setOpen(false)}
      >
        <MenuItem onClick={()=>{ logoutUser(); }}>
        <LogoutIcon color="primary" fontSize='small' />
          <Logout > Logout</Logout>
        </MenuItem>
        <MenuItem onClick={()=>{switchToOrder()}}>
          <Container to="/myorders" >
          <Badge variant="dot" color="secondary">
          <ShoppingBagIcon color="primary" fontSize='small' />
          </Badge>
          <Logout > Orders</Logout>
          </Container>
        </MenuItem>
      </Component>
    </>
  );
};

export default Profile;
