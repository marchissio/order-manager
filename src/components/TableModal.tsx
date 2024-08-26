import React from "react";
import {
  Modal,
  Box,
  Typography,
  Button,
  TextField,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";

interface Category {
  name: string;
  subcategories: string[];
}

interface TableModalProps {
  open: boolean;
  onClose: () => void;
  name: string;
  categories: Category[];
}

interface SelectedCategories {
  [key: string]: {
    [key: string]: boolean;
  };
}

const TableModal: React.FC<TableModalProps> = ({
  open,
  onClose,
  name,
  categories,
}) => {
  const [selectedCategories, setSelectedCategories] =
    React.useState<SelectedCategories>(
      categories.reduce((acc: SelectedCategories, category) => {
        acc[category.name] = category.subcategories.reduce((subAcc, sub) => {
          subAcc[sub] = true;
          return subAcc;
        }, {} as { [key: string]: boolean });
        return acc;
      }, {})
    );

  const handleCategoryChange = (
    categoryName: string,
    subcategoryName: string
  ) => {
    setSelectedCategories((prev) => ({
      ...prev,
      [categoryName]: {
        ...prev[categoryName],
        [subcategoryName]: !prev[categoryName][subcategoryName],
      },
    }));
  };

  const handleCategoryAllChange = (categoryName: string) => {
    const allChecked = Object.values(selectedCategories[categoryName]).every(
      Boolean
    );
    setSelectedCategories((prev) => ({
      ...prev,
      [categoryName]: Object.keys(prev[categoryName]).reduce((subAcc, sub) => {
        subAcc[sub] = !allChecked;
        return subAcc;
      }, {} as { [key: string]: boolean }),
    }));
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      <Box
        sx={{
          backgroundColor: "#fff",
          padding: 3,
          borderRadius: "8px",
          boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
          minWidth: "400px",
          maxHeight: "90vh",
          overflowY: "auto",
        }}
      >
        <Typography variant="h6" sx={{ mb: 2, color: "#ccc" }}>
          Add Table - {name}
        </Typography>
        <TextField
          label="Table Name"
          variant="outlined"
          fullWidth
          sx={{ mb: 3 }}
        />
        {categories.map((category) => (
          <Box key={category.name} sx={{ mb: 2 }}>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={Object.values(
                      selectedCategories[category.name]
                    ).every(Boolean)}
                    onChange={() => handleCategoryAllChange(category.name)}
                  />
                }
                label={category.name}
              />
              <Box sx={{ pl: 3 }}>
                {category.subcategories.map((subcategory) => (
                  <FormControlLabel
                    key={subcategory}
                    control={
                      <Checkbox
                        checked={selectedCategories[category.name][subcategory]}
                        onChange={() =>
                          handleCategoryChange(category.name, subcategory)
                        }
                      />
                    }
                    label={subcategory}
                  />
                ))}
              </Box>
            </FormGroup>
          </Box>
        ))}
        <Button
          onClick={onClose}
          variant="contained"
          color="primary"
          sx={{ mt: 2, width: "100%" }}
        >
          Save
        </Button>
      </Box>
    </Modal>
  );
};

export default TableModal;
