import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
  Button,
  Typography,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import TableChartIcon from "@mui/icons-material/TableChart";
import PeopleIcon from "@mui/icons-material/People";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import MessageIcon from "@mui/icons-material/Message";
import LocalCafeIcon from "@mui/icons-material/LocalCafe";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import { Routes } from "../enums/route";

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
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        },
      }}
    >
      <Box>
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
              color:
                location.pathname === Routes.TABLES ? "#f0803c" : "#ffffff",
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
      </Box>
      <Box sx={{ padding: 2 }}>
        <Button variant="contained" color="error" sx={{ width: "100%" }}>
          Logout
        </Button>
      </Box>
    </Drawer>
  );
};

export default NavigationSection;
