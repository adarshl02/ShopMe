
import {Box,Button,Checkbox, Dialog,TextField,Typography, styled,} from "@mui/material";
import { useState, useContext, useEffect } from "react";
import { DataContext } from "../../context/DataProvider";
import { authenticateLogin, authenticateSignup } from "../../service/api";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/actions/cartActions";


const Component = styled(Box)`
  height: 70vh;
  width: 90vh;
  padding: 0;
  padding-top: 0;
`;

const Image = styled(Box)`
  height: 100%;
  background: #2874f0
    url(https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/login_img_c4a81e.png)
    center 85% no-repeat;
  width: 30%;
  padding: 0px 35px;
  & > p,
  & > h5 {
    color: #fff;
    font-weight: 600;
  }
`;

const Wrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  padding: 25px 35px;
  overflow: auto;
  flex: 1;
  & > p {
    margin-top: 5px;
  }
`;

const LoginButton = styled(Button)`
  text-transform: none;
  background: #fb641b;
  color: #fff;
  &:hover {
    background: #fb641b;
    box-shadow: 0 2px 4px 0 rgb(0 0 0 /0.4);
  }
  height: 48px;
  border-radius: 2px;
  margin-top: 5px;
`;

const RequestOTP = styled(Button)`
   text-transform: none;
  background: #fff;
  color: #2874f0;
  height: 48px;
  font-size: 16px;
  border-radius: 2px;
  box-shadow: 0 2px 4px 0 rgb(0 0 0 /0.4);
  // box-shadow:0  2px 4px rgba(0,0,0,.12), 0 -2px 4px rgba(0,0,0,.08);
`;

const Text = styled(Typography)`
  font-size: 12px;
  color: rgba(0, 0, 0, 0.6);
`;

const CreateAccount = styled(Typography)`
  margin: auto 0 5px 0;
  font-size: 14px;
  text-align: center;
  color: #2874f0;
  font-weight: 600;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

const Error = styled(Typography)`
  font-size: 10px;
  color: #ff6161;
  margin-top: 10px;
  font-weight: 600;
`;

const CheckMe = styled(Box)`
  font-size: 12px;
  padding: 0px;
  margin-top: 12px;
  display: flex;
`;

const accountInitialValues = {
  login: {
    view: "login",
    heading: "Login",
    subHeading: " Get access to your Orders, Wishlist and Recommandation",
  },
  signup: {
    view: "signup",
    heading: "Looks like you're new here!",
    subHeading: "Sign up with your mobile number to get started",
  },
};

const signupInitialValues = {
  firstname: "",
  lastname: "",
  username: "",
  email: "",
  password: "",
  phone: "",
};

const loginInitialValues = {
  username: "",
  password: "",
};

export default function LoginDialog({ open, setOpen }) {
  
  const [accountInfo, toggleAccount] = useState(accountInitialValues.login);
  const [signup, setSignup] = useState(signupInitialValues); //to store the Signup Data*
  const [login, setLogin] = useState(loginInitialValues);
  const [error, setError] = useState(false);
  const [checked, setChecked] = useState(false);
  const [isSignupValid, setIsSignupValid] = useState(false);
  const [isLoginValid, setIsLoginValid] = useState(false);

  const dispatch = useDispatch();
  const {setAccount,setUserId,setSimilarItemsId,similarItemsId} = useContext(DataContext);

  const validateSignupForm = () => {
    const { firstname, lastname, username, email, password, phone } = signup;
    return firstname && lastname && username && email && password && phone;
  };

  const validateLoginForm = () => {
    const { username, password } = login;
    return username && password;
  };

  useEffect(() => {
    setIsSignupValid(validateSignupForm());
  }, [signup]);

  useEffect(() => {
    setIsLoginValid(validateLoginForm());
  }, [login]);


  const handleClose = () => {
    setOpen(false);
    setError(false);
    toggleAccount(accountInitialValues.login);
  };

  const setSignUp = () => {
    toggleAccount(accountInitialValues.signup);
  };

  const onInputChange = (event) => {
    setSignup({ ...signup, [event.target.name]: event.target.value }); //[]? ans=using variable as a key
  };

  const signupUser = async () => {
    let response = await authenticateSignup(signup); // exporting signup object which contain signup info
    if (response.status === 200) {
      handleClose(); //response ana is good
      toast.success("You're Successfully Signed Up");
      dispatch(addToCart(123,response.data.cart, true));
      setAccount(response.data);
      setUserId(response.data._id);

      
    } else {
      toast.warn("Please try with different Credentials");
    }
  };

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };
  const onValueChange = (event) => {
    setLogin({ ...login, [event.target.name]: event.target.value });
  };

  const loginUser = async () => {
    let response = await authenticateLogin(login); //login frontend se jara hai and respnose backend se ara hai
    if (response.status === 200) {
      handleClose();
      toast.success(`Welcome back ${response.data.username}`);   
      setError(false);
      dispatch(addToCart(123,response.data.cart, true));
      setAccount(response.data);
      setUserId(response.data._id);
      const orders=response.data.orders
      if ( orders && orders.length > 0) {
        const latestOrder = orders[orders.length - 1];
  
        setSimilarItemsId(latestOrder.similarProductIds)
        // console.log(similarItemsId)
    }
    } else {
      setError(true);
    }
  };

  const googleAuth=async()=>{
     window.open(`${process.env.REACT_APP_BACKEND_URL}/api/auth/google`, "_self");  //1)
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{ sx: { maxWidth: "unset" } }}
    >
      <Component>
        <Box style={{ display: "flex", height: "100%" }}>
          {/* loginimage */}
          <Image>
            <Typography variant="h5" style={{ marginTop: 30 }}>
              {accountInfo.heading}
            </Typography>
            <Typography
              style={{ marginTop: 20, color: "rgba(255,255,255,0.7)" }}
            >
              {accountInfo.subHeading}
            </Typography>
          </Image>

          {/* login */}
          {accountInfo.view === "login" ? (
            <Wrapper>
              <TextField
                variant="standard"
                onChange={(event) => onValueChange(event)}
                name="username"
                label="Enter Username"
              />

              <TextField
                variant="standard"
                onChange={(event) => onValueChange(event)}
                name="password"
                type="password"
                label="Enter Password"
              />
              {error && <Error>Please enter valid username or password</Error>}
              <Text>
                By continuing , you agree to Flipkart's Terms of Use and Privacy
                Policy .
              </Text>
              <LoginButton onClick={loginUser}  disabled={!isLoginValid} >Login</LoginButton>
              <Typography style={{ textAlign: "center" }}>OR</Typography>
              <RequestOTP  onClick={googleAuth} > <img src="/google.png" alt="google"/> Sign in with Google</RequestOTP>
              <CreateAccount onClick={() => setSignUp()}>
                New to Flipkart? Create an account
              </CreateAccount>
            </Wrapper>
          ) : (
            // SignUp
            <Wrapper>
              <TextField
                variant="standard"
                onChange={(event) => onInputChange(event)}
                name="firstname"
                label="Enter FirstName"
              />
              <TextField
                variant="standard"
                onChange={(event) => onInputChange(event)}
                name="lastname"
                label="Enter LastName"
              />
              <TextField
                variant="standard"
                onChange={(event) => onInputChange(event)}
                name="username"
                label="Enter Username"
              />
              <TextField
                variant="standard"
                onChange={(event) => onInputChange(event)}
                name="email"
                label="Enter Email"
              />
              <TextField
                variant="standard"
                onChange={(event) => onInputChange(event)}
                name="password"
                type="password"
                label="Enter Password"
              />
              <TextField
                variant="standard"
                onChange={(event) => onInputChange(event)}
                name="phone"
                label="Enter Phone No. "
              />

              <CheckMe>
                <Checkbox checked={checked} onChange={handleChange} />
                By continuing, I agree to terms of Use & Privacy Policy
              </CheckMe>
              <LoginButton
                onClick={signupUser}
                style={{ opacity: checked ? "1" : "0.7" }}
                disabled={!isSignupValid}
              >
                Continue
              </LoginButton>
            </Wrapper>
          )}
        </Box>
      </Component>
    </Dialog>
  );
}
