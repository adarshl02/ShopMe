import { Box, Button, Typography, styled } from "@mui/material"
import {Link} from 'react-router-dom';
import PaidIcon from '@mui/icons-material/Paid';

const Component = styled(Link)`
    text-decoration:none;
    display:flex;
    flex-direction:column;
   align-items: center;
   margin:0 auto;
   margin-top:40vh;
   border-radius:5%;
   padding: 10px;
   width:50vh;
   &>div{
    padding: 6px;
   };
   
`
const Success=()=>{
    return(
        <Component style={{background:'#9fd1e0'}}>
            
            <PaidIcon />
            <Box><Typography color={"black"}>Payment Successfull</Typography></Box>
            <Box><Typography color={"black"}>Thank you for your payment!</Typography></Box>
            <Box><Link to="/"><Button variant="contained" color="success">Continue Shopping</Button></Link></Box>
            
        </Component>
    )
}

export default Success;