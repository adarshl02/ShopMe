import {
  Box,
  Rating,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
  styled,
} from "@mui/material";
import { LocalOffer as Badge } from "@mui/icons-material";

const SmallText = styled(Box)`
  font-size: 14px;
  vetical-align: baseline;
  & > p {
    font-size: 14px;
    margin-top: 10px;
  }
`;
const StyledBadge = styled(Badge)`
  margin-right: 10px;
  color: #00cc00;
  font-size: 15px;
`;

const Columntext = styled(TableRow)`
  font-size: 14px;
  vertical-align: baseline;
  & > td {
    font-size: 14px;
    margin-top: 10px;
    border: none;
  }
`;

const ProductDetail = ({ product }) => {
  const adURL =
    "https://rukminim1.flixcart.com/lockin/774/185/images/CCO__PP_2019-07-14.png?q=50";
  const fassured =
    "https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/fa_62673a.png";
  const date = new Date(new Date().getTime() + 5 * 24 * 60 * 60 * 1000); //add

  return (
    <>
      <Typography>{product.title.longTitle}</Typography>
      <Typography style={{ marginTop: 5, color: "#878787", fontSize: 14 }}>
        8 Ratings & 1 Reviews
        <Box component="span">
          <img src={fassured} style={{ width: 77, marginLeft: 20 }} />{" "}
        </Box>
      </Typography>

      <Typography>
        <Box component="span" style={{ fontSize: 28 }}>
          ₹{product.price.cost} &nbsp;&nbsp;&nbsp;
        </Box>
        <Box component="span" style={{ color: "#878787" }}>
          <strike>{product.price.mrp}</strike>
        </Box>{" "}
        &nbsp;&nbsp;&nbsp;
        <Box component="span" style={{ color: "#388e3c" }}>
          {product.price.discount}
        </Box>
      </Typography>
      <Box>
      <Typography style={{ marginTop: 5, color: "#878787", fontSize: 14 }}>
        <b>{product.ratingCount}</b> Users Ordered and rated this product</Typography>
        <Rating
          name={`rating-${product.id}`}
          value={product.rating}
          readOnly
          precision={0.5}
        />
      </Box>
      <Typography>Available offers</Typography>
      <SmallText>
        <Typography>
          <StyledBadge /> Get extra 20% off on this product.
        </Typography>

        <Typography>
          <StyledBadge />
          Get extra 13% off on your first order. T&Cs apply
        </Typography>

        <Typography>
          <StyledBadge />
          Sign up for Flipkart Pay Later and get Flipkart Gift Card worth ₹100*
          . Know More
        </Typography>

        <Typography>
          <StyledBadge />
          Buy 2 items save 5%. Buy 3 or more save 10%. T&C
        </Typography>

        <Typography>
          <StyledBadge />
          5% Cashback on Flipkart Axis Bank Card
        </Typography>

        <Typography>
          <StyledBadge />
          No Cost EMI on Bajaj Finance EMI Card on cart value above ₹2999
        </Typography>
      </SmallText>

      <Table>
        <TableBody>
          <Columntext>
            <TableCell style={{ color: "#878787" }}>Delivery</TableCell>
            <TableCell style={{ fontWeight: 600 }}>
              Delivery By : {date.toDateString()}| ₹40
            </TableCell>
          </Columntext>

          <Columntext>
            <TableCell style={{ color: "#878787" }}>Warrenty</TableCell>
            <TableCell>No Warrenty</TableCell>
          </Columntext>

          <Columntext>
            <TableCell style={{ color: "#878787" }}>Seller</TableCell>
            <TableCell>
              <Box component="span" style={{ color: "#2874f0" }}>
                SuperComnet
              </Box>
              <Typography>GST invoice available</Typography>
              <Typography>
                View More Seller starting from ₹{product.price.cost}
              </Typography>
            </TableCell>
          </Columntext>

          <Columntext>
            <TableCell colSpan={2}>
              <img src={adURL} style={{ width: 390 }} alt="img" />
            </TableCell>
          </Columntext>

          <Columntext>
            <TableCell style={{ color: "#878787" }}>Description</TableCell>
            <TableCell>{product.description}</TableCell>
          </Columntext>
        </TableBody>
      </Table>
    </>
  );
};

export default ProductDetail;
