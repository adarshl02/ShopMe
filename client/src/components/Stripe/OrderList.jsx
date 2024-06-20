import { Box, Button, Typography, styled } from "@mui/material";
import ShareLocationIcon from '@mui/icons-material/ShareLocation';

const Wrapper = styled(Box)`
    background: #fff;
  display: flex;
  flex-direction:column;
 
  border: 1px solid #828282;
  border-radius:5px;
  margin: 30px;
`;

const InnerWrapper=styled(Box)`
    margin-left: 10px;
    color: #878787;
`

export const OrderList = ({ item }) => {
  return (
    <Wrapper>
      <Box style={{ padding: 10,display:'flex', justifyContent: 'center' }}>
        <img src={item.url} alt="image" style={{ height: 90, width: 90 }} />
      </Box>
      <Box style={{ padding: 10,display:'flex', justifyContent: 'center' }}>
        <Typography variant="h6" >{item.title.shortTitle}</Typography>
      </Box>
    
      <InnerWrapper >
      <Box>
        <Typography>Ordered Price : ₹{item.price.cost}</Typography>
      </Box>
      <Box>
        <Typography>Ordered Date : {item.orderDate}</Typography>
      </Box>
      <Box>
        <Typography>Quantity : {item.quantity}</Typography>
      </Box>
      <Box>
        <Typography>Delivery Status : Delivered</Typography>
      </Box>

      </InnerWrapper>
      <Box style={{margin:15}}>
        <Button variant="contained" endIcon={<ShareLocationIcon />}>
          Track Order
        </Button>
      </Box>
    </Wrapper>
    
  );
};
