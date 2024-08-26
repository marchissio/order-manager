import React, { useState } from "react";
import { Box, Grid, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import TableCard from "../components/TableCard";
import TableModal from "../components/TableModal";

export interface Category {
  name: string;
  subcategories: string[];
}
// Sample JSON data for categories
const categories: Category[] = [
  {
    name: "Food",
    subcategories: ["Pizza", "Pasta", "Salad"],
  },
  {
    name: "Drinks",
    subcategories: ["Beer", "Wine", "Soft Drinks"],
  },
  {
    name: "Others",
    subcategories: ["Cigars", "Snacks"],
  },
];

const tables = [
  {
    id: "1",
    name: "Table 1",
  },
  {
    id: "2",
    name: "Table 2",
  },
  {
    id: "3",
    name: "Table 3",
  },
];

const TablesPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTable, setCurrentTable] = useState<string | null>(null);

  const handleOpenModal = (tableName: string | null) => {
    setCurrentTable(tableName);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentTable(null);
  };

  return (
    <Box sx={{ padding: 3, fontFamily: "Quicksand, sans-serif" }}>
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
          onClick={() => handleOpenModal(null)}
        >
          Add Table
        </Button>
      </Box>
      <Grid container spacing={3}>
        {tables.map((table) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={table.id}>
            <TableCard
              name={table.name}
              categories={categories}
              onEdit={() => handleOpenModal(table.name)}
            />
          </Grid>
        ))}
      </Grid>

      <TableModal
        open={isModalOpen}
        onClose={handleCloseModal}
        name={currentTable || "New Table"}
        categories={categories}
      />
    </Box>
  );
};

export default TablesPage;
