import Slide from "./Slide";
import { Box ,styled} from '@mui/material';

const Component=styled(Box)`
    display:flex;
`;

const LeftComponent=styled(Box)(({theme})=>({
    width:'82%',
    [theme.breakpoints.down('md')]:{
        width:'100%'
    }

}));

const RightComponent=styled(Box)(({theme})=>({
    background:'#fff',
    padding:5,
    marginTop:10,
    marginLeft:5,
    width:'18%',
    textAlign:'center',
    justifyContent:'center',
    alignItems:'center',
    [theme.breakpoints.down('md')]: {
        display:'none'
    }
}));
   



const MidSlide=({products,title})=>{
    const adURL = 'https://rukminim1.flixcart.com/flap/464/708/image/633789f7def60050.jpg?q=70';
    return (
        <Component>
            <LeftComponent>
            <Slide products={products} title={title}/>
            </LeftComponent>
            <RightComponent>
                <img src={adURL} alt="image" style={{width:217}}/>
            </RightComponent>
        </Component>
    )
}

export default MidSlide;