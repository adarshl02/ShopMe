import NavBar from "./NavBar";
import Banner from "./Banner";
import { styled ,Box} from "@mui/material";
import { useEffect } from "react";
import { getProducts } from "../../redux/actions/productActions";
import {useDispatch,useSelector} from 'react-redux';
import Slide from "./Slide";
import MidSlide from './MidSlide';
import MidSection from "./MidSection";

const Component =styled(Box)`
    padding : 10px;
    background: #f2f2f2;

`
export default function Home() {

  const {products}=useSelector(state=>state.getProducts) //state in redux
    const dispatch=useDispatch();

    useEffect(()=>{
      dispatch(getProducts())  //an function
    },[dispatch])

  return (
    <>
      <NavBar  />
      <Component >
        <Banner />
        <MidSlide products={products} title="Deal of the day"/>
        <MidSection/>
        <Slide products={products} title="Discounts for you"/>
        <Slide products={products} title="Suggesting items"/>
        <Slide products={products} title="Top Selection"/>
        <Slide products={products} title="Recommended items"/>
        <Slide products={products} title="Season's top picks"/>
        <Slide products={products} title="Top Deals on Accessories"/>

      </Component>  
        
    </>
  );
}
