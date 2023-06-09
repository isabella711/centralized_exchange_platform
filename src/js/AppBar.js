import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { Link } from "react-router-dom";
import { useAuth } from "../AuthContext";
import Header from "../components/Header";
import userprofile from "../assets/userprofile.jpg";
import { useSelector } from "react-redux";
import btcIcon from "../assets/btc.png";

export function MenuAppBar(props) {
  const userInfo = useSelector((state) => state.user);
  const { logout } = useAuth();
  const { isAuthenticated, isInLoginPage, wallets } = props;
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  console.log(`isAuthenticated>>>`, isAuthenticated);
  const prefix = isAuthenticated
    ? ["Home", "Deposit", "TransactionHistory", "WalletInformation", "Logout"]
    : ["Home", "Login"];
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const logoutHandle = () => {
    setAnchorElUser(null);
    if (isAuthenticated) {
      logout();
    }
  };
  const linkHandler = (page) => {
    let link = page.toLowerCase();
    if (link === "home") {
      return "/";
    }
    if (link === "login" && isInLoginPage) {
      return "/login";
    }
    if (link === "logout") {
      return "/";
    }
    if (link === "deposit") {
      return "/deposit";
    }
    if (link === "transactionHistory") {
      return "/transactionHistory";
    }
    if (link === "walletinformation") {
      return "/walletinformation";
    }
    console.log(`link>>>`, link);
    return link;
  };
  return (
    <>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar
            disableGutters
            sx={{ display: { md: "flex" }, justifyContent: "space-between" }}
          >
            {/* <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} /> */}

            <Typography
              variant="h5"
              noWrap
              component="a"
              href="/"
              sx={{
                "&:hover": { color: "#F2A900" },
                mr: 4,
                display: { xs: "none", md: "flex" },
                fontSize: 20,
                fontFamily: "monospace",
                fontWeight: 900,
                letterSpacing: ".5rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              CEX
            </Typography>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 1 }}>
                  <Avatar
                    src={
                      isAuthenticated
                        ? userprofile
                        : "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/800px-Bitcoin.svg.png"
                    }
                  />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {prefix.map((setting) => (
                  <Link to={linkHandler(setting)}>
                    {
                      setting.toLowerCase() === "logout" ? (
                        <MenuItem key={setting} onClick={logoutHandle}>
                          <Typography textAlign="center">{setting}</Typography>
                        </MenuItem>
                      ) : (
                        <MenuItem key={setting} onClick={handleCloseUserMenu}>
                          <Typography textAlign="center">{setting}</Typography>
                        </MenuItem>
                      )
                      // )}
                    }
                  </Link>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
}
