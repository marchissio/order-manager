import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
  Typography,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import TableChartIcon from "@mui/icons-material/TableChart";
import PeopleIcon from "@mui/icons-material/People";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import MessageIcon from "@mui/icons-material/Message";
import LocalCafeIcon from "@mui/icons-material/LocalCafe";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import { Routes } from "../../enums/route";
const drawerWidth = 240;

const NavigationSection = () => {
  const location = useLocation();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          backgroundColor: "#19181f",
          color: "#ffffff",
          borderRight: "1px solid #2c2c34",
        },
      }}
    >
      <Box sx={{ padding: 2, textAlign: "center" }}>
        <Typography
          variant="h6"
          component="div"
          sx={{ fontWeight: "bold", color: "#ffffff" }}
        >
          OrderUp
        </Typography>
      </Box>
      <List>
        <ListItem
          button
          component={Link}
          to="/tables"
          selected={location.pathname === Routes.TABLES}
          sx={{
            color: location.pathname === Routes.TABLES ? "#f0803c" : "#ffffff",
          }}
        >
          <ListItemIcon>
            <TableChartIcon
              sx={{
                color:
                  location.pathname === Routes.TABLES ? "#f0803c" : "#ffffff",
              }}
            />
          </ListItemIcon>
          <ListItemText primary="Tables" />
        </ListItem>
        {/* <ListItem
          button
          component={Link}
          to="/waiters"
          selected={location.pathname === "/"}
          sx={{
            color: location.pathname === "/" ? "#f0803c" : "#ffffff",
          }}
        >
          <ListItemIcon>
            <PeopleIcon
              sx={{
                color: location.pathname === "/" ? "#f0803c" : "#ffffff",
              }}
            />
          </ListItemIcon>
          <ListItemText primary="Waiters" />
        </ListItem> */}
        <ListItem
          button
          component={Link}
          to="/menu"
          selected={location.pathname === Routes.MENU}
          sx={{
            color: location.pathname === Routes.MENU ? "#f0803c" : "#ffffff",
          }}
        >
          <ListItemIcon>
            <MenuBookIcon
              sx={{
                color:
                  location.pathname === Routes.MENU ? "#f0803c" : "#ffffff",
              }}
            />
          </ListItemIcon>
          <ListItemText primary="Menu" />
        </ListItem>
        {/* <ListItem
          button
          component={Link}
          to="/messages"
          selected={location.pathname === "/"}
          sx={{
            color: location.pathname === "/" ? "#f0803c" : "#ffffff",
          }}
        >
          <ListItemIcon>
            <MessageIcon
              sx={{
                color:
                  location.pathname === "/" ? "#f0803c" : "#ffffff",
              }}
            />
          </ListItemIcon>
          <ListItemText primary="Messages" />
        </ListItem> */}
      </List>
      <Box
        sx={{
          padding: 2,
          textAlign: "center",
          color: "#ffffff",
          fontWeight: "bold",
        }}
      >
        Bars&Restaurants
      </Box>
      <List>
        <ListItem
          button
          component={Link}
          to="/bacchanall"
          selected={location.pathname === "/"}
          sx={{
            color: location.pathname === "/" ? "#f0803c" : "#ffffff",
          }}
        >
          <ListItemIcon>
            <LocalCafeIcon
              sx={{
                color: location.pathname === "/" ? "#f0803c" : "#ffffff",
              }}
            />
          </ListItemIcon>
          <ListItemText primary="Bacchanall" />
        </ListItem>
        <ListItem
          button
          component={Link}
          to="/caruso"
          selected={location.pathname === "/"}
          sx={{
            color: location.pathname === "/" ? "#f0803c" : "#ffffff",
          }}
        >
          <ListItemIcon>
            <RestaurantIcon
              sx={{
                color: location.pathname === "/" ? "#f0803c" : "#ffffff",
              }}
            />
          </ListItemIcon>
          <ListItemText primary="Caruso" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default NavigationSection;
