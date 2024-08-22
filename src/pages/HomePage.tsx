import { Box, CircularProgress } from "@mui/material";
import { Outlet } from "react-router-dom";
import NavigationSection from "../components/Navigation/NavigationSection";

interface HomePageProps {
  isScreenLoading: boolean;
}

const HomePage = ({ isScreenLoading }: HomePageProps) => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        overflow: { xs: "auto", md: "hidden" },
        fontFamily: "global",
        backgroundColor: "background.default",
        color: "text.primary",
      }}
    >
      <Box sx={{ display: "flex", height: "100vh" }}>
        {isScreenLoading && <CircularProgress sx={{ m: "auto" }} />}
        <NavigationSection />
        <Box
          sx={{
            width: "100%",
            height: "100vh",
            paddingRight: { md: 10, xs: 5 },
            paddingLeft: { md: 10, xs: 5 },
            flexGrow: 1,
          }}
        >
          <Box sx={{ paddingTop: 4, height: "100%" }}>
            <Outlet />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default HomePage;
