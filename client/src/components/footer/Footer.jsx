import { Box, Typography, styled } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import XIcon from "@mui/icons-material/X";
import YouTubeIcon from "@mui/icons-material/YouTube";
import CopyrightIcon from '@mui/icons-material/Copyright';
import './footer.css';


const Container = styled(Box)`
  display: flex;
  background-color: #2c2c2c;
  height: auto;
  width: 100%;
   position: relative;
   margin-top:10rem;
  bottom: 0;
`;
const InnerBox = styled(Box)`
  opacity: 0.5;
`;
const Wrapper = styled(Box)`
  & > p:hover {
    text-decoration: underline;
  }
`;
const ContainerWrapper = styled(Box)`
  margin:30px;
  color: #fff;
  font-size: 20px;
  font-weight: 600;

  display: flex;
  width: 100%;
  justify-content: space-between;
`;
export default function Footer() {
  return (
    <Container>
      <ContainerWrapper>
        <Box>
          {" "}
          <InnerBox>About </InnerBox>
          <Wrapper>
            <Typography style={{ marginTop: 10 }}>Contact Us</Typography>
            <Typography>About Us</Typography>
            <Typography>Careers</Typography>
            <Typography>Flipkart Stories</Typography>
            <Typography>Information</Typography>
          </Wrapper>
        </Box>
        <Box>
          {" "}
          <InnerBox>Group Companies </InnerBox>
          <Wrapper>
            <Typography style={{ marginTop: 10 }}>Myntra</Typography>
            <Typography>Flipkart Wholesale</Typography>
            <Typography>Cleartrip</Typography>
            <Typography>Shopsy</Typography>
          </Wrapper>
          <Box style={{ marginTop: 15}}>
            <Typography style={{ marginBottom: 8, opacity: 0.5 }}>
              Social :
            </Typography>
            <span>
              <a
                href="https://www.facebook.com/flipkart"
                target="_blank"
                rel="noopener noreferrer"
                className="icon-link"
              >
                <FacebookIcon />
              </a>
              &nbsp;&nbsp;
              <a
                href="https://www.twitter.com/flipkart"
                target="_blank"
                rel="noopener noreferrer"
                className="icon-link"
              >
                <XIcon />
              </a>
              &nbsp;&nbsp;
              <a
                href="https://www.youtube.com/flipkart"
                target="_blank"
                rel="noopener noreferrer"
                className="icon-link"
              >
                <YouTubeIcon />
              </a>
            </span>
          </Box>
        </Box>

        <Box>
          {" "}
          <InnerBox>Help</InnerBox>
          <Wrapper>
            <Typography style={{ marginTop: 10 }}>Payment</Typography>
            <Typography>Shipping</Typography>
            <Typography>Cancellation and returns</Typography>
            <Typography>FAQ</Typography>
            <Typography>Report Infrigemnet</Typography>
          </Wrapper>
          <hr/>
          <Box style={{marginTop:10,opacity:0.5}}>
          <Typography style={{ fontSize: '14px' }}>2007-2024 FlipKart.com</Typography>
            <Typography style={{ fontSize: '14px' }}><CopyrightIcon style={{ fontSize: '14px' }}/>All Right Reserved</Typography>
          </Box>
        </Box>

        <Box>
          {" "}
          <InnerBox>Mail Us :</InnerBox>
          <Wrapper>
            <Typography style={{ marginTop: 10 }}>
              Flipkart Internet Pvt
            </Typography>
            <Typography>Building Alyssa</Typography>
            <Typography>Outer Ring Road</Typography>
            <Typography>Karnataka , India</Typography>
            <Typography>
              Telephonec: <span style={{ color: "#90caf9" }}>044-45614700</span>
            </Typography>
          </Wrapper>
        </Box>
      </ContainerWrapper>
    </Container>
  );
}
