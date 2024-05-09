import { Box, Button, Typography, styled } from "@mui/material"
import {Link} from 'react-router-dom';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';

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
const Cancel=()=>{
    return(
        <Component style={{background:'#9fd1e0'}}>
            
            <SentimentVeryDissatisfiedIcon style={{textDecoration:'none'}}/>
            <Box><Typography color={"black"}>Payment Not Done</Typography></Box>
            <Box><Typography color={"black"}>Sorry for the bad service</Typography></Box>
            <Box><Link to="/"><Button variant="contained" color="success">Go to Home</Button></Link></Box>
            
        </Component>
    )
}

export default Cancel;