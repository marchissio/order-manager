import React, { useState } from "react";
import { Box, Tabs, Tab, Button, Container } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CategorySection from "../components/CategorySection";

// Sample data for categories and items
const categories = {
  Hrana: [
    {
      id: 1,
      name: "Pizza",
      description: "Delicious cheese pizza",
      price: "10$",
      image: "image_url",
    },
    {
      id: 2,
      name: "Pasta",
      description: "Penne al Pomodoro",
      price: "12$",
      image: "image_url",
    },
  ],
  Pice: [
    {
      id: 3,
      name: "Coke",
      description: "Cold and refreshing",
      price: "2$",
      image: "image_url",
    },
  ],
  Ostalo: [],
};

const MenuPage = () => {
  const [currentTab, setCurrentTab] = useState("Hrana");

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setCurrentTab(newValue);
  };

  return (
    <Container>
      <Box sx={{ padding: 3, fontFamily: "Quicksand, sans-serif" }}>
        {/* Centered Tabs */}
        <Tabs
          value={currentTab}
          onChange={handleTabChange}
          centered
          textColor="secondary"
          indicatorColor="secondary"
          sx={{ marginBottom: 3 }}
        >
          <Tab label="HRANA" value="Hrana" sx={{ color: "#aaa" }} />
          <Tab label="PICE" value="Pice" sx={{ color: "#aaa" }} />
          <Tab label="OSTALO" value="Ostalo" sx={{ color: "#aaa" }} />
        </Tabs>

        {/* Add Item Button Below Tabs */}
        <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 3 }}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            sx={{
              fontSize: "0.875rem",
              padding: "6px 12px",
              borderRadius: "16px",
              backgroundColor: "#f0803c",
              "&:hover": {
                backgroundColor: "#d0692e",
              },
            }}
          >
            Dodaj artikal
          </Button>
        </Box>

        {/* Category Sections */}
        <Box sx={{ marginTop: 3 }}>
          {categories[currentTab as keyof typeof categories].map(
            (item, index) => (
              <CategorySection key={index} item={item} />
            )
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default MenuPage;
