import {InputBase,Box,styled, List, ListItem} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useEffect, useState } from 'react';
import { useSelector ,useDispatch} from 'react-redux';
import {getProducts} from '../../redux/actions/productActions';
import {Link} from 'react-router-dom'

const SearchContainer=styled(Box)`
    background:#f1f1f1;
    width:38%;
    border-radius:6px;
    margin-left:50px;
    margin-right:50px;
    display:flex;
`
const InputSearchBase=styled(InputBase)`
    width:100%;
    padding-left:20px;
    font-size:17px;
`

const SearchIconWrapper=styled(Box)`
color:blue;
padding : 5px;
display:flex;
`

const ListWrapper=styled(List)`
     position :absolute;
     border-radius:4px;
     background-color:#F6F6F6;
     margin-top:36px;
    color:#878787;
    width:inherit;

`

const Component=styled(ListItem)`
&:hover{
    color:black;
    cursor:pointer;
    transition: all .3s ease-in-out ;
}
`

export default function Search(){
    const [text,setText]=useState('');

    const {products}= useSelector(state=>state.getProducts);
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getProducts());
    },[dispatch])

    const getText=(text)=>{
        setText(text);
    }
  

    return(
        <SearchContainer>
           <InputSearchBase
           placeholder='Search for products ,brands and more'
           onChange={(e)=>{getText(e.target.value)}}
           value={text}
           /> 
           <SearchIconWrapper>
            <SearchIcon/>
           </SearchIconWrapper>

            {
                text && 
                <ListWrapper>
                    {
                        products.filter(product => product.title.longTitle.toLowerCase().includes(text.toLowerCase())).map(product=>(
                            <Component>
                                <Link to={`/product/${product.id}`}
                                onClick={()=>setText('')}
                                style={{textDecoration:'none',color:"inherit"}}
                                >
                                {product.title.shortTitle}
                                </Link>
                              
                            </Component>
                        ))
                    }
                </ListWrapper>
            }

        </SearchContainer>
        
    )
}