import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import AppTheme from "../../theme/AppTheme";
import { AuthContext } from "../../context/AuthContext";
import IconButton from "@mui/material/IconButton";
import LogoutIcon from "@mui/icons-material/Logout";
import { Outlet, useNavigate } from "react-router";
import { privateRoutes } from "../../routes/routes";
import { CustomRoute } from "../../routes/customRoute";

const drawerWidth = 240;

//TODO переделать choosePage
export default function Dashboard(props: { disableCustomTheme?: boolean }) {
  const navigate = useNavigate();
  const auth = React.useContext(AuthContext);

  function logout() {
    auth?.setAuth(false);
    auth?.setAuthUser(null);
    localStorage.removeItem("accessToken");
    navigate("/login");
  }

  function choosePage(route: CustomRoute) {
    navigate(route.path);
  }

  React.useEffect(() => {}, []);

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{
            width: `calc(100% - ${drawerWidth}px)`,
            ml: `${drawerWidth}px`,
            display: "flex",
            alignItems: "center",
            height: "100%",
          }}
        >
          <Outlet />
        </AppBar>
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
          variant="permanent"
          anchor="left"
        >
          <Toolbar>
            <div
              style={{ gap: "45px", justifyContent: "center", display: "flex" }}
            >
              <Typography>{auth?.authUser?.name}</Typography>
              <IconButton aria-label="delete" onClick={logout}>
                <LogoutIcon />
              </IconButton>
            </div>
          </Toolbar>
          <Divider />
          <List>
            {privateRoutes
              .filter(
                (r) =>
                  auth?.authUser?.role && r.roles.includes(auth.authUser?.role)
              )
              .map((r) => (
                <ListItem key={r.label} disablePadding>
                  <ListItemButton onClick={() => choosePage(r)}>
                    <ListItemIcon>{r.icon}</ListItemIcon>
                    <ListItemText primary={r.label} />
                  </ListItemButton>
                </ListItem>
              ))}
          </List>
          <Divider />
        </Drawer>
        <Box
          component="main"
          sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
        >
          <Toolbar />
        </Box>
      </Box>
    </AppTheme>
  );
}
