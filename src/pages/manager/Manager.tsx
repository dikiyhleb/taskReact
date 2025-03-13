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
import MailIcon from "@mui/icons-material/Mail";
import AppTheme from "../../theme/AppTheme";
import { BusinessOutlined } from "@mui/icons-material";
import { AuthContext } from "../../context/AuthContext";
import { useState } from "react";
import ManagerTable from "../../components/UI/ManagerTable";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import LogoutIcon from "@mui/icons-material/Logout";

const drawerWidth = 240;

//TODO переделать механизм перемещения между страницами в List
//TODO label у поиска не по центру
export default function Manager(props: { disableCustomTheme?: boolean }) {
  const auth = React.useContext(AuthContext);
  const [activePage, setActivePage] = useState<string>("Объекты");

  function logout() {
    auth?.setAuth(false);
    auth?.setAuthUser(null);
    localStorage.removeItem("accessToken");
  }

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
          <Toolbar>
            <Typography variant="h6" noWrap component="div">
              {activePage}
            </Typography>
          </Toolbar>
          <div style={{ width: "95%" }}>
            <TextField
              fullWidth
              id="outlined-basic"
              label="Поиск"
              variant="outlined"
              sx={{ marginBottom: "30px" }}
            />
            <ManagerTable activePage={activePage} />
          </div>
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
            {["Объекты", "Список заявок"].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton onClick={() => setActivePage(text)}>
                  <ListItemIcon>
                    {index % 2 === 0 ? <BusinessOutlined /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
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
