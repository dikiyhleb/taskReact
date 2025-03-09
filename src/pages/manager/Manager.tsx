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

const drawerWidth = 240;

export default function Manager(props: { disableCustomTheme?: boolean }) {
  const auth = React.useContext(AuthContext);
  const [activePage, setActivePage] = useState<string>("");

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
          }}
        >
          <Toolbar>
            <Typography variant="h6" noWrap component="div">
              {activePage}
            </Typography>
          </Toolbar>
          <ManagerTable />
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
            <Typography>{auth?.authUser?.name}</Typography>
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
