import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/actions/cartActions";

export const DataContext = createContext(null); //states aer in dataContext

const DataProvider = ({ children }) => {
  const dispatch = useDispatch();
  const [account, setAccount] = useState(null); //This States are available everywhere
  const [userId, setUserId] = useState("");
  const[similarItemsId,setSimilarItemsId]=useState([])
  

  useEffect(() => {
    axios
      .get("/api/profile", {
        withCredentials: true, //the request will include the necessary cookies or credentials, allowing the server to identify and authenticate the user making the request.
      })
      .then(({ data }) => {
        // console.log(data); // all user data
        dispatch(addToCart(123, data.cart, true));
        setAccount(data);
        setUserId(data._id);
        
        
        if ( data.orders && data.orders.length > 0) {
            const latestOrder = data.orders[data.orders.length - 1];
            setSimilarItemsId(latestOrder.similarProductIds)
            // console.log(similarItemsId)
        }
      })
      .catch((e) => {
        console.log(e.response.data.message);
      });
  }, []);

  return (
    <DataContext.Provider
      value={{
        account,
        setAccount,
        userId,
        setUserId,
        similarItemsId,
        setSimilarItemsId,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider; //wrapped dataprovider in app.js
