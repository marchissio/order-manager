import React from "react";
import { Card, CardContent, Typography, IconButton, Box } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
export interface Category {
  name: string;
  subcategories: string[];
}
interface TableCardProps {
  name: string;
  categories: Category[];
  onEdit: () => void;
}

const TableCard = ({ name, onEdit }: TableCardProps) => {
  return (
    <Card
      sx={{
        padding: 2,
        backgroundColor: "#f5f5f5",
        boxShadow: "0 6px 12px rgba(0, 0, 0, 0.1)",
        borderRadius: "16px",
        width: "100%",
        maxWidth: "250px",
        margin: "0 auto",
        position: "relative",
        transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow: "0 12px 24px rgba(0, 0, 0, 0.2)",
        },
        cursor: "pointer",
      }}
    >
      <CardContent sx={{ textAlign: "center" }}>
        <Typography
          variant="h6"
          component="div"
          sx={{
            fontWeight: "bold",
            color: "#333",
          }}
        >
          {name}
        </Typography>
      </CardContent>
      <Box
        sx={{
          position: "absolute",
          top: 8,
          right: 8,
          display: "flex",
          gap: 1,
        }}
      >
        <IconButton
          color="primary"
          aria-label="edit"
          size="small"
          onClick={onEdit}
        >
          <EditIcon />
        </IconButton>
        <IconButton color="secondary" aria-label="delete" size="small">
          <DeleteIcon />
        </IconButton>
      </Box>
    </Card>
  );
};

export default TableCard;
