import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MoonLoader from "react-spinners/MoonLoader";
import { useParams } from "react-router-dom";
import { getProductDetails } from "../../redux/actions/productActions";
import { Box, Grid, Rating, styled } from "@mui/material";
import ActionItem from "./ActionItem";
import ProductDetail from "./ProductDetail";
import "../PreLoader/loader.css";

const Component = styled(Box)`
  background: var(--body_background);
  margin-top: 55px;
`;

const Container = styled(Grid)(({ theme }) => ({
  background: "#fff",
  display: "flex",
}));

const RightContainer = styled(Grid)`
  margin-top: 50px;
  padding-left: 25px;
  & > p {
    margin-top: 10px;
  }
`;

const DetailView = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { loading, product } = useSelector((state) => state.getProductDetails);
  const [isLoading, setIsLoading] = useState(true); // Add loading state
  useEffect(() => {
    if (product && id !== product.id) {
      dispatch(getProductDetails(id));
    }
  }, [dispatch, id, product]);

  useEffect(() => {
    setIsLoading(loading); // Update loading state
  }, [loading]);

  
  return (
    <Component>
      {isLoading ? ( // Render loader if isLoading is true
        <div className="loader">
          <MoonLoader
            color={"#2874f0"}
            loading={isLoading}
            size={50}
            data-testid="loader"
          />
        </div>
      ) : (
        product &&
        Object.keys(product).length && (
          <Container container>
            <Grid item lg={4} md={4} sm={12} xs={12}>
              <ActionItem product={product} />
            </Grid>
            
            <RightContainer item lg={8} md={8} sm={12} xs={12}>
              <ProductDetail product={product} />
              <Rating name="no-value" value={null} />
            </RightContainer>
          </Container>
        )
      )}
    </Component>
  );
};

export default DetailView;
