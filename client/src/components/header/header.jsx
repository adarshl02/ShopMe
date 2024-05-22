import { AppBar, Toolbar, styled, Box, Typography,List,ListItemButton, IconButton, Drawer } from "@mui/material";
import {Menu} from '@mui/icons-material';
import Search from "./search";
import CustomButtons from "./CustomButtons";
import {Link} from 'react-router-dom';
import { useState } from "react";

const StyledHeader = styled(AppBar)`
  background: linear-gradient(135deg,#2874f0,#030c32);
  height: 55px;
`;
const Component = styled(Link)`
  margin-left: 12%;
  line-height: 0;
  text-decoration:none;
  color:inherit;
`;
const Subheading = styled(Typography)`
  font-size: 10px;
  font-style: italic;
`;

const PlusImage = styled("img")({
  width: 10,
  height: 10,
  marginLeft: 4,
});

const CustomButtonWrapper = styled(Box)(({theme})=>({
  margin: '0 2% 0 auto',
  [theme.breakpoints.down('md')]:{  //md se niche jate hi
    display:'none'
    }

}));

const MenuButton=styled(IconButton)(({ theme }) => ({
  display:'none',

  [theme.breakpoints.down('md')]:{
    display:'block',
  }
}));




const Header = () => {
  const logoURL =
    "https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/flipkart-plus_8d85f4.png";
  const subURL =
    "https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/plus_aef861.png";

  const [open,setOpen]=useState(false);

  const handleOpen=()=>{
    setOpen(true)
  }

  const handleClose=()=>{
    setOpen(false)
  }


  return (
    <StyledHeader>
      <Toolbar style={{ minHeight: 55 }}>
        <MenuButton color="inherit" onClick={handleOpen} >
          <Menu/>
        </MenuButton>

        <Drawer open={open} onClose={handleClose}>
        <Box style={{width:200}}>
        <List>
        <ListItemButton>
          <CustomButtons/>
        </ListItemButton>
      </List>
      </Box>
        </Drawer>

        <Component to="/">
          <img src={logoURL} alt="Logo" style={{ width: 75 }} />
          <Box style={{ display: "flex" }}>
            <Subheading>
              Explore &nbsp;
              <Box component="span" style={{ color: "#FFE500" }}>
                Plus
              </Box>
            </Subheading>
            <PlusImage src={subURL} alt="sub-logo" />
          </Box>
        </Component>

        <Search />
        <CustomButtonWrapper>
          <CustomButtons />
        </CustomButtonWrapper>
      </Toolbar>
    </StyledHeader>
  );
};

export default Header;
