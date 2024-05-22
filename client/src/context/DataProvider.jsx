import {createContext,useState} from 'react';

export const DataContext=createContext(null);  //states aer in dataContext

const DataProvider=({children})=>{       
    const [account,setAccount]=useState('');  //This States are available everywhere
    const [toasti,setToasti]=useState('');
    const [userId,setUserId]=useState('');

    return (
        <DataContext.Provider value={{
            account, setAccount,toasti,setToasti,userId,setUserId  
        }}>

        {children}
        </DataContext.Provider>
    )
}


export default DataProvider; //wrapped dataprovider in app.js