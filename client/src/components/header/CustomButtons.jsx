import { Badge, Box,Button,Typography,styled} from "@mui/material";    //named import / default export
import {ShoppingCart} from '@mui/icons-material';

//components
import LoginDialog from "../login/LoginDialog";
import { useState ,useContext} from "react";
import {DataContext} from "../../context/DataProvider"
import Profile from "./Profile";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";


const Wrapper=styled(Box)(({theme})=>({
    display:'flex',
    margin: '0 3% 0 auto', 
 
    '&>*':{
        alignItems:"center",
        marginRight:'30px !important',
        fontSize:16,
    },
    [theme.breakpoints.down('md')]:{
        display:'block'
    }
}));
const Container=styled(Link)(({theme})=>({
    display:'flex',
    marginTop:3,
    textDecoration:'none',
    color:'inherit', 
    [theme.breakpoints.down('md')]:{
        display:'block'
    }

}));
const LoginButton=styled(Button)`
    color:#aaa;
    background :#f1f1f1;
    text-transform:none;
    padding :5px 40px;
    border-radius:6px;
    box-shadow:none;
    font-size: 18px;
    font-weight:600;
    height:32px;
    &:hover{
        color: #686868;
        background :#f2f2f2;
        
    }

`
export default function CustomButtons(){

    const[open,setOpen]=useState(false);    
    const {account,setAccount,userId}=useContext(DataContext);
    const {cartItems}=useSelector(state=>state.cart);

    const openDialog=()=>{
        setOpen(true);
    }

    return(
        <Wrapper>
            {
                account ? <Profile account={account} setAccount={setAccount} userId={userId}/> : 
                <LoginButton  onClick={()=>openDialog()}>Login</LoginButton>
            }
            <Typography style={{marginTop:3,width:135}}>Become a Seller</Typography>
            <Typography style={{marginTop:3}}>More</Typography>
            <Container to="/cart">
                <Badge badgeContent={cartItems?.length} color="secondary">
                <ShoppingCart/>
                </Badge>
                <Typography style={{marginLeft:10}}>Cart</Typography>
               
            </Container>
            <LoginDialog open={open} setOpen={setOpen}/>
        </Wrapper>
    )
}
