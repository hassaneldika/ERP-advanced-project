import * as React from "react";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Autocomplete from "@mui/material/Autocomplete";

const LiveSearch = ({ employees, getReport }) => {
  const onSelect = (event, value) => {
    const first_name = value.split(" ")[0];
    const email = employees.find(
      (employee) => employee.first_name === first_name
    ).email;
    getReport(email);
  };
  return (
    <Stack spacing={2} sx={{ width: 300 }}>
      <Autocomplete
        freeSolo
        onChange={(event, value) => onSelect(event, value)}
        id="free-solo-2-demo"
        disableClearable
        options={employees.map(
          (option) => `${option.first_name} ${option.last_name}`
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Employees"
            InputProps={{
              ...params.InputProps,
              type: "search",
            }}
          />
        )}
      />
    </Stack>
  );
};

export default LiveSearch;
