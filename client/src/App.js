import Header from "./components/header/header";
import Home from "./components/home/Home";
import { Box } from "@mui/material";
import DataProvider from "./context/DataProvider";
import { BrowserRouter, Routes ,Route} from "react-router-dom";  //6
import DetailView from "./components/details/DetailView";        //6
import Cart from "./components/cart/Cart";
import Cancel from "./components/Stripe/Cancel";
import Footer from "./components/footer/Footer";
import "./App.css";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Orders from "./components/Stripe/Orders";



function App() {
  return (
    //      dataprovider me jo bhi state hai ,unko use kr paye
   <div className="App" style={{background: '#f2d2bd'}}  >
    <header className="App-header" >
    <DataProvider>
      {/* <PreLoader/> */}
      <BrowserRouter>
        <Header />
        <Box style={{ marginTop: 54}}>
          <Routes>
          {/* 6_02 */}
             <Route path="/" element={<Home />} />                   
             <Route path="/product/:id" element={<DetailView/>} />  
             <Route path='/cart' element={<Cart/>}/>
             <Route path='/myorders' element={<Orders/>}/>
             <Route path='/cancel' element={<Cancel/>}/>
          </Routes>
        </Box>
        <Footer/>
      </BrowserRouter>

      <ToastContainer/>

    </DataProvider>
    </header>
    </div>
  );
}

export default App;
