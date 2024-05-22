import Header from "./components/header/header";
import Home from "./components/home/Home";
import { Box } from "@mui/material";
import DataProvider from "./context/DataProvider";
import { BrowserRouter, Routes ,Route} from "react-router-dom";  //6
import DetailView from "./components/details/DetailView";        //6
import Cart from "./components/cart/Cart";
import Success from "./components/Stripe/Success";
import Cancel from "./components/Stripe/Cancel";
import Footer from "./components/footer/Footer";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function App() {
  return (
    //      dataprovider me jo bhi state hai ,unko use kr paye
    <DataProvider>
      {/* <PreLoader/> */}
      <BrowserRouter>
        <Header />
        <Box style={{ marginTop: 54 }}>
          <Routes>
          {/* 6_02 */}
             <Route path="/" element={<Home />} />                   
             <Route path="/product/:id" element={<DetailView/>} />  
             <Route path='/cart' element={<Cart/>}/>
             <Route path='/success' element={<Success/>}/>
             <Route path='/cancel' element={<Cancel/>}/>
          </Routes>
        </Box>
        <Footer/>
      </BrowserRouter>
      <ToastContainer/>
    </DataProvider>
  );
}

export default App;
