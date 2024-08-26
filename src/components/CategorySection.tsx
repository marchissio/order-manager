import React from "react";
import {
  Box,
  Grid,
  Typography,
  IconButton,
  Card,
  CardContent,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

interface MenuItemProps {
  item: {
    id: number;
    name: string;
    description: string;
    price: string;
    image: string;
  };
}

const CategorySection: React.FC<MenuItemProps> = ({ item }) => {
  return (
    <Card
      sx={{
        marginBottom: 3,
        borderRadius: "12px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <CardContent>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={2}>
            <Box
              sx={{
                width: "100%",
                height: "80px",
                backgroundColor: "#ddd",
                backgroundImage: `url(${item.image})`,
                backgroundSize: "cover",
                borderRadius: "8px",
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <Typography
              variant="subtitle1"
              sx={{ color: "#ccc", fontWeight: "bold" }}
            >
              {item.name} (šifra artikla)
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {item.description}
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography variant="h6" sx={{ textAlign: "right", color: "#ccc" }}>
              {item.price}
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <IconButton color="primary" aria-label="edit">
              <EditIcon />
            </IconButton>
            <IconButton color="secondary" aria-label="delete">
              <DeleteIcon />
            </IconButton>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default CategorySection;
