
import { Grid ,styled} from '@mui/material';

const Wrapper =styled(Grid)`
    margin-top:10px;
    justify-content:space-between;
`

const Image=styled('img')(({theme})=>({
    marginTop:10,
    width:'100%',
    display:'flex',
    justifyContent:'space-between',
    [theme.breakpoints.down('md')]:{
        objectFit:'cover',
        height:120,
    }

}));

const ImageURL = [
    'https://rukminim1.flixcart.com/flap/960/960/image/2f30db9425df5cec.jpg?q=50',
    'https://rukminim1.flixcart.com/flap/960/960/image/084789479074d2b2.jpg',
    'https://rukminim1.flixcart.com/flap/960/960/image/1ce0c4c1fb501b45.jpg?q=50'
];

const MidSection=()=>{
    const url = 'https://rukminim1.flixcart.com/flap/3006/433/image/4789bc3aefd54494.jpg?q=50';
    return (
        <>
        //full screen divided into 12 parts 
        <Wrapper container lg={12} md={12} sm={12} xs={12}>
            {
                ImageURL.map(image=>(
                    <Grid item lg={4} md={4} sm={12} xm={12}>   
                    <img src={image} alt="image" style={{width:'100%'}}/>
                    </Grid>
                ))
               
            }
        </Wrapper>
            <Image src={url} alt="covid"/>
        </>
    )
}

export default MidSection;