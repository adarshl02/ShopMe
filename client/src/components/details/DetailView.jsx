//6

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom"; //get from url
import { getProductDetails } from "../../redux/actions/productActions";
import { Box, Grid, Typography, styled } from "@mui/material";
import ActionItem from "./ActionItem";
import ProductDetail from "./ProductDetail";


const Component = styled(Box)`
  background: #f2f2f2;
  margin-top: 55px;
`;
const Container = styled(Grid)(({theme})=>({
  background: '#fff',
  display: 'flex',
  // [theme.breakpoints.down('md')]:{
  //   margin:0
  // }
}))
 
const RightContainer = styled(Grid)`
  margin-top: 50px;
  padding-left:25px;
  &>p{
    margin-top:10px;
  }
`;

const DetailView = () => {

  const dispatch = useDispatch();
  const { id } = useParams(); //get the id parameter from the URL

  const { loading, product } = useSelector((state) => state.getProductDetails);

  useEffect(() => {
    if (product && id != product.id) dispatch(getProductDetails(id)); //6_03
  }, [dispatch, id, loading, product]);

  return (
    <Component>
      {product && Object.keys(product).length && (
        <Container container>

          <Grid item lg={4} md={4} sm={12} xs={12}>
            <ActionItem product={product} />
          </Grid>

          <RightContainer item lg={8} md={8} sm={12} xs={12}>
            <ProductDetail product={product}/>
          </RightContainer>

        </Container>
      )}
    </Component>
  );
};

export default DetailView;
