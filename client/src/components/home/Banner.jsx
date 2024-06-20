import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';


import {bannerData} from '../../constants/data'
import {styled}from '@mui/material';

const Image=styled('img')(({theme})=>({
    width:'100%',
    height:280,
    [theme.breakpoints.down('md')]:{
        objectFit:'cover',
        height:180
    }  
}));


const responsive = {
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 1,
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 1,
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
    }
};

export default function Banner(){
    return (
        <Carousel
            swipeable={false}
            draggable={false}
            responsive={responsive}
            infinite={false}
            autoPlay={true}
            autoPlaySpeed={4000}
            keyBoardControl={true}
            showDots={false}
            slidesToSlide={1}
            containerClass="carousel-container"
            dotListClass="custom-dot-list-style"
            itemClass="carousel-item-padding-40-px"
        >
            {
                bannerData.map(data=> (
                   <Image src={data.url} alt="banner" key={data.id} />
                )
                )}
        </Carousel>
    )
}