import { Typography, Menu, MenuItem, Box, styled } from '@mui/material';
import { useState } from 'react';
import LogoutIcon from '@mui/icons-material/Logout';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import { cartReset } from '../../redux/actions/cartActions';
import { addCartTodb } from '../../service/api';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';


const Component=styled(Menu)`
  margin-top:5px;
`
const Logout=styled(Typography)`
  font-size:14px;
  margin-left:10px;
`
const ProfileBox=styled(Box)`
  display:flex;
  &>p{
    margin-right:5px
  }
`


const Profile = ({ account , setAccount,userId}) => {
    const [open,setOpen]=useState(false);
  const { cartItems} = useSelector((state) => state.cart);
    const dispatch = useDispatch();


    const handleClick = (event) => {
      setOpen(event.currentTarget);
     };

    const logoutUser=async()=>{
      setAccount(''); 
      setOpen(false);
      toast.warn("You're logged Out");
      let response = await addCartTodb(cartItems,userId);
      dispatch(cartReset());
    }
    
  return (
    <>
      <ProfileBox onClick={handleClick} style={{marginTop:3,marginRight:30,cursor:'pointer'}}>
       <Typography> {account}</Typography> 
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
        <MenuItem onClick={()=>{ logoutUser(); }}>
          <ShoppingBagIcon color="primary" fontSize='small' />
          <Logout > Orders</Logout>
        </MenuItem>
      </Component>
    </>
  );
};

export default Profile;
