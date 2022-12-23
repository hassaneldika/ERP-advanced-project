import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

const DiscreteSlider = ({ score, setScore }) => {
  const handleChange = (event, newValue) => {
    setScore(newValue);
  };
  return (
    <Box>
      <Slider
        onChange={handleChange}
        valueLabelDisplay="auto"
        step={1}
        marks
        min={1}
        max={10}
        value={score}
      />
    </Box>
  );
};

export default DiscreteSlider;
