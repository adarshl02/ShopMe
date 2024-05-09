import { Box, Button, Typography, styled } from "@mui/material";
import { addEllipsis } from "../../utils/common-utils";
import GroupedButton from "./GroupedButton";
import { removeFromCart } from "../../redux/actions/cartActions";
import { useDispatch } from "react-redux";

const Component = styled(Box)`
  border-top: 2px solid #f0f0f0;
  display: flex;
  background-color: #fff;
`;
const LeftComponent = styled(Box)`
  margin: 20px;
  display: flex;
  flex-direction: column;
`;
const SmallText = styled(Typography)`
  color: #878787;
  font-size: 14px;
  margin-top: 10px;
`;

const Remove = styled(Button)`
  margin-top: 20px;
  font-size: 16px;
  color: #000;
  font-weight: 600;
`;

const CartItem = ({ item }) => {
  const fassured =
    "https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/fa_62673a.png";

    const dispatch=useDispatch();
  const removeItemFromCart=(id)=>{
    dispatch(removeFromCart(id));
  }

  return (
    <Component>
      <LeftComponent>
        <img src={item.url} alt="img" style={{ height: 110, width: 110 }} />
        <GroupedButton />
      </LeftComponent>

      <Box style={{ margin: 20 }}>
        <Typography>{addEllipsis(item.title.longTitle)}</Typography>
        <SmallText>
          Seller : RetailNet
          <Box component="span">
            <img src={fassured} style={{ width: 60, marginLeft: 10 }} />
          </Box>
        </SmallText>

        <Typography style={{ margin: "20px 0" }}>
          <Box component="span" style={{ fontWeight: 600, fontSize: 18 }}>
            ₹{item.price.cost} &nbsp;&nbsp;&nbsp;
          </Box>
          <Box component="span" style={{ color: "#878787" }}>
            <strike>{item.price.mrp}</strike>
          </Box>{" "}
          &nbsp;&nbsp;&nbsp;
          <Box component="span" style={{ color: "#388e3c" }}>
            {item.price.discount}
          </Box>
        </Typography>
        <Remove onClick={()=>removeItemFromCart(item.id)}>Remove</Remove>
      </Box>
    </Component>
  );
};

export default CartItem;
