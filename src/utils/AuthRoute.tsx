import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import {
  Box,
  IconButton,
  AppBar,
  Container,
  Toolbar,
  Typography,
  Menu,
  MenuItem,
  Tooltip,
  Avatar,
  Button,
  Grid,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Search, SearchIconWrapper, StyledInputBase } from "./style";
import SearchIcon from "@mui/icons-material/Search";
import { auth } from "../constants/firebase";
import { Footer } from "../components/Footer";

const AuthRoute: any = (props: any) => {
  // call use history
  const navigate = useNavigate();

  const { children } = props;
  const { path } = props;

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
    auth.signOut();
  };

  // read user
  const currentUser =
    localStorage.getItem("user") != null
      ? JSON.parse(localStorage.getItem("user") as string)
      : null;

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      {path !== "/movies/:id" && (
        <AppBar
          position="static"
          sx={{
            backgroundColor: "#fff !important",
            color: "gray !important",
            boxShadow: "none",
            borderBottom: "1px solid #f2f2f2",
          }}
        >
          <Container
            maxWidth="xl"
            sx={{
              display: { xs: "flex", md: "none" },
            }}
          >
            <Toolbar
              disableGutters
              sx={{
                width: "100%",
              }}
            >
              <Box sx={{ flexGrow: 0 }}>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>

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
                  <MenuItem onClick={() => navigate("/")}>
                    <Typography textAlign="center">Home</Typography>
                  </MenuItem>
                  <MenuItem onClick={() => navigate("/movieslist")}>
                    <Typography textAlign="center">Movies</Typography>
                  </MenuItem>
                  <MenuItem
                    onClick={() => navigate(`/watchlist/${currentUser.uid}`)}
                  >
                    <Typography textAlign="center">Watch List</Typography>
                  </MenuItem>
                  <MenuItem onClick={() => navigate("/aboutus")}>
                    <Typography textAlign="center">About</Typography>
                  </MenuItem>
                </Menu>
              </Box>
              <Box sx={{ flexGrow: 1, textAlign: "center" }}>
                <Typography mt={1} variant="h6" noWrap component="div">
                  <img
                    src={window.location.origin + "/images/logo.png"}
                    alt="logo"
                    width="90"
                  />
                </Typography>
              </Box>

              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      sx={{ bgcolor: "#0099cc" }}
                      alt={currentUser?.email}
                      src={
                        currentUser?.providerData.photoURL != null
                          ? currentUser?.providerData.photoURL
                          : "/assets/test.png"
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
                  <div style={{ flex: "0 1" }}></div>
                  <MenuItem
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyItems: "center",
                      justifyContents: "center",
                      borderBottom: "1px solid #f2f2f2",
                    }}
                    onClick={handleLogout}
                  >
                    <Box>
                      <Avatar
                        sx={{ width: 70, height: 70 }}
                        alt={currentUser?.email}
                        src={
                          currentUser?.providerData.photoURL != null
                            ? currentUser?.providerData.photoURL
                            : ""
                        }
                      />
                    </Box>
                    <Typography
                      textAlign="center"
                      mt={1}
                      sx={{ color: "gray" }}
                    >
                      {currentUser?.email}
                    </Typography>
                  </MenuItem>
                  <MenuItem
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyItems: "center",
                      marginTop: "5px",
                    }}
                  >
                    <Button
                      sx={{
                        color: "gray",
                        borderColor: "gray",
                      }}
                      variant="outlined"
                      size="medium"
                      onClick={handleLogout}
                    >
                      Logout
                    </Button>
                  </MenuItem>
                </Menu>
              </Box>
            </Toolbar>
          </Container>

          <Container
            maxWidth="xl"
            sx={{
              display: { xs: "none", md: "flex" },
            }}
          >
            <Toolbar
              disableGutters
              sx={{
                width: "100%",
              }}
            >
              <Typography variant="h6" noWrap component="div" ml={4} mr={2}>
                <img
                  src={window.location.origin + "/images/logo.png"}
                  alt="logo"
                  width="90"
                />
              </Typography>

              <Box
                sx={{
                  flex: { xs: "none", md: "1" },
                  display: { xs: "none", md: "flex" },
                  justifyContent: "center",
                }}
              >
                <Button
                  onClick={() => navigate("/")}
                  sx={{
                    my: 2,
                    color: "#000",
                    fontFamily: "'Roboto Condensed', Arial, sans-serif;",
                    fontWeight: "bold",
                  }}
                >
                  Home
                </Button>
                <Button
                  onClick={() => navigate("/movieslist")}
                  sx={{
                    my: 2,
                    color: "#000",
                    fontFamily: "'Roboto Condensed', Arial, sans-serif;",
                    fontWeight: "bold",
                  }}
                >
                  Movies
                </Button>
                <Button
                  onClick={() => navigate(`/watchlist/${currentUser.uid}`)}
                  sx={{
                    my: 2,
                    color: "#000",
                    fontFamily: "'Roboto Condensed', Arial, sans-serif;",
                    fontWeight: "bold",
                  }}
                >
                  Watch List
                </Button>
                <Button
                  onClick={() => navigate("/aboutus")}
                  sx={{
                    my: 2,
                    color: "#000",
                    fontFamily: "'Roboto Condensed', Arial, sans-serif;",
                    fontWeight: "bold",
                  }}
                >
                  About
                </Button>
              </Box>
              {
                /*<Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Movie search .."
                 inputProps={{ "aria-label": "search" }}
                />
              </Search>
             */
                // Will be implement later :)
              }
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      sx={{ bgcolor: "#0099cc" }}
                      alt={currentUser?.email}
                      src={
                        currentUser?.providerData.photoURL != null
                          ? currentUser?.providerData.photoURL
                          : "/assets/test.png"
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
                  <div style={{ flex: "0 1" }}></div>
                  <MenuItem
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyItems: "center",
                      justifyContents: "center",
                      borderBottom: "1px solid #f2f2f2",
                    }}
                    onClick={handleLogout}
                  >
                    <Box>
                      <Avatar
                        sx={{ width: 70, height: 70 }}
                        alt={currentUser?.email}
                        src={
                          currentUser?.providerData.photoURL != null
                            ? currentUser?.providerData.photoURL
                            : ""
                        }
                      />
                    </Box>
                    <Typography
                      textAlign="center"
                      mt={1}
                      sx={{ color: "gray" }}
                    >
                      {currentUser?.email}
                    </Typography>
                  </MenuItem>
                  <MenuItem
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyItems: "center",
                      marginTop: "5px",
                    }}
                  >
                    <Button
                      sx={{
                        color: "gray",
                        borderColor: "gray",
                      }}
                      variant="outlined"
                      size="large"
                      onClick={handleLogout}
                    >
                      Logout
                    </Button>
                  </MenuItem>
                </Menu>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      )}
      {path !== "/movies/:id" ? (
        <Container
          maxWidth="xl"
          sx={{
            display: "flex",
            flexDirection: "column",
            minHeight: "85vh",
          }}
        >
          <div style={{ flex: "1 1 0%" }}>{children}</div>
        </Container>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            minHeight: "85vh",
          }}
        >
          <div style={{ flex: "1 1 0%" }}> {children} </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default AuthRoute;
