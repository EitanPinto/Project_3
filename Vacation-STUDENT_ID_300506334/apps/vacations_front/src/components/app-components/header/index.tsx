import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import HomePage from "../../pages/homePage";
import { Link } from "react-router-dom";
import { NotFound } from "../../pages/notFound";
import { LoginPage } from "../../pages/login";
import { useAppSelector } from "../../../store/hooks";
import { RegistrationPage } from "../../pages/registration";
import logo from '../../../assests/lotus.jpg'
import { authState } from "../../../store/reducers/authReducer";
import { VacationsState } from "../../../store/reducers/vacationsReducer";
import AdminPage from "../../pages/admin";
import { AddVacation } from "../../pages/admin/addVacation";
import Stats from "../../pages/admin/statistics";
import LogOut from "../../pages/logOut/logOut";


export interface RouteConfig {
  key: string;
  path: string;
  label: string;
  element: React.ReactElement;
  invisible: boolean; 
}

export const routingConfiguration: Array<RouteConfig> = [
{
  key: "home",
  path: "",
  label: "Home", 
  element: <HomePage />,
  invisible: true
},
{
  key: "registration",
  path: "/registration",
  label: "Registration", 
  element: <RegistrationPage />,
  invisible: false
},
{
  key: "login",
  path: "/login",
  label: "Login", 
  element: <LoginPage />,
  invisible: true
},
{
  key: "admin",
  path: "/admin",
  label: "Administrator", 
  element: <AdminPage />,
  invisible: true
},
{
  key: "addVacation",
  path: "/addVacation",
  label: "", 
  element: <AddVacation />,
  invisible: true
},
{
  key: "stats",
  path: "/statistics",
  label: "Statistics", 
  element: <Stats />,
  invisible: true
  },
{
  key: "logOut",
  path: "/logOut",
  label: "Log out", 
  element: <LogOut />,
  invisible: true
},
{
  key: "notFound",
  path: "*",
  label: "",
  element: <NotFound />,
  invisible: true
}
];


const Header = () => {

const authState: authState = useAppSelector((state: {
  authorization: authState,
  vacations: VacationsState
}) => state.authorization);
 
  const { userNameServer: userName, role, isFrontTokenOkLogin} = authState;
  const adminTitle = 'admin';

  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };


  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };


  return (
    <AppBar position="static" className="appBar">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              fontSize: "40px",
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 300,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <div>
            <div><img src={`${logo}`} alt="" height="50px"/></div>
            <div style={{fontSize: 10, margin: 0}}> Lotus Global Destinations </div>
            </div>
          </Typography>
           { userName? ` Hi There ${userName}!` : "" }
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            ></IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {routingConfiguration
              .map((route: RouteConfig) => {
                if(role === adminTitle && route.key === adminTitle) {
                    route.invisible = false
                };
                if(role === adminTitle && route.key === 'stats') {
                  route.invisible = false
              };
              if(isFrontTokenOkLogin && route.key === 'logOut') {
                route.invisible = false
                };
              if(isFrontTokenOkLogin && route.key === 'registration') {
                route.invisible = true
                };
                return route;
              })
              .filter((route: RouteConfig) => !route.invisible)
              .map((route: RouteConfig) => (
                <MenuItem key={route.key}>
                  <Typography textAlign="center">
                    <Link to={route.path}>{route.label}</Link>
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {routingConfiguration
            .map((route: RouteConfig) => {
                if(role === adminTitle && route.key === adminTitle) {
                    route.invisible = false
                };
                if(role === adminTitle && route.key === 'stats') {
                  route.invisible = false
                };
                if(isFrontTokenOkLogin && route.key === 'logOut') {
                route.invisible = false
                };
                if(isFrontTokenOkLogin && route.key === 'registration') {
                  route.invisible = true
                  };
                return route;
              })
            .filter((route: RouteConfig) => !route.invisible)
            .map((route: RouteConfig) => (
              <Button sx={{boxShadow: 12, margin: 2, padding:2, border: "1px solid purple"} }
              key={route.key}>
                <Typography textAlign="center">
                  <Link
                    style={{ color: "white", textDecoration: "none" , fontSize: "13px"}}
                    to={route.path}
                  >
                    {route.label}
                  </Link>
                </Typography>
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};



export default Header;
