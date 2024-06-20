import { AppBar, Toolbar, styled, Box, Typography, List, ListItemButton, IconButton, Drawer } from "@mui/material";
import { Menu } from '@mui/icons-material';
import Search from "./search";
import CustomButtons from "./CustomButtons";
import { Link } from 'react-router-dom';
import { useState } from "react";
import DarkMode from "../DarkMode/DarkMode";

const StyledHeader = styled(AppBar)`
  background: linear-gradient(135deg, #2874f0, #030c32);
  height: 55px;
  position:fixed;
  top:0;
  z-index:100;
`;

const Component = styled(Link)`
  line-height: 0;
  text-decoration: none;
  color: inherit;
  display: flex;
  flex-direction :column;
  align-items: center;
`;

const Subheading = styled(Typography)`
  font-size: 10px;
  font-style: italic;
  display: flex;
  align-items: center;
  margin-left:2rem;
`;

const PlusImage = styled("img")({
  width: 10,
  height: 10,
});

const CustomButtonWrapper = styled(Box)(({ theme }) => ({
  padding: "30px 0",
  [theme.breakpoints.down('md')]: {
    display: 'none'
  }
}));

const MenuButton = styled(IconButton)(({ theme }) => ({
  display: 'none',
  [theme.breakpoints.down('md')]: {
    display: 'block',
  }
}));

const Header = () => {
  const logoURL = "https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/flipkart-plus_8d85f4.png";
  const subURL = "https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/plus_aef861.png";

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <StyledHeader position="static">
      <Toolbar style={{ minHeight: 55, display: 'flex', justifyContent: 'space-between' }}>
        <Box style={{ display: 'flex', alignItems: 'center' }}>
          <MenuButton color="inherit" onClick={handleOpen}>
            <Menu />
          </MenuButton>

          <Drawer open={open} onClose={handleClose}>
            <Box >
              <List>
                <ListItemButton key="custom-buttons" >
                  <CustomButtons />
                </ListItemButton>
              </List>
            </Box>
          </Drawer>

          <Component to="/">
            <img src={logoURL} alt="Logo" style={{ width: 75 }} />
            <Box style={{ display: "flex", alignItems: "center" }}>
              <Subheading>
                Explore &nbsp;
                <Box component="span" style={{ color: "#FFE500" }}>
                  Plus
                </Box>
              </Subheading>
              <PlusImage src={subURL} alt="sub-logo" />
            </Box>
          </Component>
        </Box>

        <Search />

        <Box style={{ display: 'flex', alignItems: 'center' }}>
          <CustomButtonWrapper>
            <CustomButtons />
          </CustomButtonWrapper>
          <DarkMode />
        </Box>
      </Toolbar>
    </StyledHeader>
  );
};

export default Header;
