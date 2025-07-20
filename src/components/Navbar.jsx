import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Logo from "../assets/HopyHour_logo.png";
import { useContext, useEffect, useState } from "react";
import UserContext from "../contexts/user/UserContext";
import ProductContext from "../contexts/product/ProductContext";
import { Link, useNavigate } from "react-router-dom";
import Footer from "./Footer";

const drawerWidth = 240;

function ResponsiveDrawer(props) {
  const navigate = useNavigate();
  const ctx = useContext(UserContext);
  const {
    currentUser,
    getUsers,
    cart,
    authStatus,
    verifyUser,
    logoutUser,
    getCart,
    setLoading
  } = ctx;
  const { role } = ctx.currentUser;
  const { getProducts } = useContext(ProductContext);
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [total, setTotal] = useState(0);

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  useEffect(() => {
    setLoading(true);
    verifyUser();
    getCart();
    setLoading(false);
  }, []);
  
  useEffect(() => {
    getCart();
    if (role == "Administrador") {
      getUsers();
      getProducts();
    }
  }, [currentUser]);

  useEffect(() => {
    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
    setTotal(totalItems);
  }, [cart]);

  const userInitial = [
    { name: "LOGIN", path: "/inicio-sesion" },
    { name: "REGISTRO", path: "/registro" }
  ];

  const pages = [
    { name: "HOME", path: "/" },
    { name: "PRODUCTOS", path: "/productos" },
    { name: "TIPO CERVECERIA", path: "/cerveceriasTipos" },
    { name: "NOSOTROS", path: "/nosotros" },
    { name: "CONTACTO", path: "/contacto" },
  ];

  const drawer = (
    <div>
      <Link
        to="/" 
        style={{ textDecoration: "none" }}
      >
        <Box
          component="img"
          sx={{
            width: "100%"
          }}
          alt="Your logo."
          src={Logo}
        />
      </Link>
      <List>
        { authStatus ? (
          <>
            <Link 
              to="/perfil"
              key={"PERFIL"}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <ListItem key={"PERFIL"} disablePadding>
                <ListItemButton>
                  <ListItemText primary={"PERFIL"} />
                </ListItemButton>
              </ListItem>
            </Link>
            <Link 
              to="/carrito"
              key={"CARRITO"}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <ListItem key={"CARRITO"} disablePadding>
                <ListItemButton>
                  <ListItemText 
                    primary={"CARRITO"}
                  />
                  { total != 0 && (
                    <ListItemText 
                      primary={total}
                      sx={{
                        padding:"0px",
                        margin:"0px",
                        textAlign:"center",
                        backgroundColor: "#FDEFD7",
                        borderRadius: '30px 0 30px 0'
                      }}
                    />
                  ) }
                </ListItemButton>
              </ListItem>
            </Link>
            <Link
              key={"CERRAR SESION"}
              style={{ textDecoration: "none", color: "inherit" }}
              onClick={() => {logoutUser(navigate)}}
            >
              <ListItem key={"CERRAR SESION"} disablePadding>
                <ListItemButton>
                  <ListItemText primary={"CERRAR SESION"} />
                </ListItemButton>
              </ListItem>
            </Link>
            { role === "Administrador" && (
              <>
                <Link 
                  to="/admin-usuarios"
                  key={"LISTA USUARIOS"}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <ListItem key={"LISTA USUARIOS"} disablePadding>
                    <ListItemButton>
                      <ListItemText primary={"LISTA USUARIOS"} />
                    </ListItemButton>
                  </ListItem>
                </Link>
                <Link
                  to="/registrar-producto"
                  key={"NUEVO PRODUCTO"}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <ListItem key={"NUEVO PRODUCTO"} disablePadding>
                    <ListItemButton>
                      <ListItemText primary={"NUEVO PRODUCTO"} />
                    </ListItemButton>
                  </ListItem>
                </Link>
                <Link
                  to="/admin-productos"
                  key={"LISTA PRODUCTOS"}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <ListItem key={"LISTA PRODUCTOS"} disablePadding>
                    <ListItemButton>
                      <ListItemText primary={"LISTA PRODUCTOS"} />
                    </ListItemButton>
                  </ListItem>
                </Link>
              </>
            )}
          </>
        ) : (
          <>
            { userInitial.map((link) => (
              <Link
                to={link.path}
                key={link.name}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <ListItem key={link.name} disablePadding>
                  <ListItemButton>
                    <ListItemText primary={link.name} />
                  </ListItemButton>
                </ListItem>
              </Link>
            ))}
          </>
        )}
      </List>
      <Divider />
      <List
        sx={{
          padding: "0px",
        }}
      >
        {pages.map((page) => (
          <Link
            to={page.path} 
            key={page.name}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <ListItem key={page.name} disablePadding>
              <ListItemButton>
                <ListItemText primary={page.name} />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          display: { xs: "block", sm: "block", md: "none" },
          width: { md: `calc(100% - ${drawerWidth}px)` },
          ml: { md: `${drawerWidth}px` },
          backgroundColor: "#FDEFD7",
          color: "#000"
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: "none" } }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          sx={{
            display: { xs: "block", sm: "block", md: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          slotProps={{
            root: {
              keepMounted: true, // Better open performance on mobile.
            },
          }}
        >
          {drawer}
        </Drawer>
        <Footer />
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "none", md: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
          <Footer />
        </Drawer>
      </Box>
    </Box>
  );
}

ResponsiveDrawer.propTypes = {
  window: PropTypes.func,
};

export default ResponsiveDrawer;
