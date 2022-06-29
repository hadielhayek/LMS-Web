import * as React from 'react';
// import "./Attendance.css";
import { DataGrid } from '@mui/x-data-grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListSubheader from '@mui/material/ListSubheader';
import Select from '@mui/material/Select';
import CheckIcon from '@mui/icons-material/Check';
// import WatchLaterIcon from '@mui/icons-material/WatchLater';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CloseIcon from '@mui/icons-material/Close';


const columns = [
  { field: 'id', headerName: 'ID', width: 80 },
  {
    field: 'firstName',
    headerName: 'First name',
    width: 200,
    editable: true,
  },
  {
    field: 'lastName',
    headerName: 'Last name',
    width: 200,
    editable: true,
  },

  {
      field: 'status',
      headerName: 'Status',
      type: 'status',
      width: 200,

      renderCell: (params) => {
        return (
          <FormControl sx={{ m: -1.5, minWidth: 205 }}>
          <InputLabel htmlFor="grouped-select"></InputLabel>
          <Select defaultValue="None" label="None">
            {/* <MenuItem value="" defaultValue="None">
              <em>Choose one</em>
            </MenuItem> */}
            <ListSubheader>Choose Status</ListSubheader>
            <MenuItem value="1"><CheckIcon style={{ fontSize: "20px" , color: "green", marginRight: "5px", display: '-webkit-inline-flex', verticalAlign: 'text-bottom', boxSizing: 'inherit', textAlign: 'center', alignItems: 'center' }} />
              Present</MenuItem>
            {/* <ListSubheader>Category 2</ListSubheader> */}
            <MenuItem value="2"><CloseIcon style={{fontSize:"20px", color: "red" , marginRight: "5px" , display: '-webkit-inline-flex', verticalAlign: 'text-bottom', boxSizing: 'inherit', textAlign: 'center', alignItems: 'center'}}/>
              Absent</MenuItem>
            <MenuItem value="3"><AccessTimeIcon style={{ fontSize: "20px", marginRight: "5px", display: '-webkit-inline-flex',verticalAlign: 'text-bottom', boxSizing: 'inherit', textAlign: 'center', alignItems: 'center' }} />
              Late</MenuItem>
          </Select>
        </FormControl>
      );
      },
    
    
  },

];

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', date: 35, },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', date: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', date: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', date: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', date: null },
  { id: 6, lastName: 'Melisandre', firstName: null, date: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', date: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', date: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', date: 65 },
];

export default function DataGridDemo() {
  return (


    <div style={{ height: 400, width: '100%' }}>
      <div>
      <div>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel></InputLabel>
            <TextField
              id="date"
              label="Date"
              type="date"
              defaultValue=""
              sx={{ width: 180,}}
              InputLabelProps={{
                shrink: true,
              }}
            />
      </FormControl>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
      <InputLabel >Class</InputLabel>
        <Select label="Classes">
          {/* <MenuItem value="">
            <em>Choose one</em>
          </MenuItem> */}
          <ListSubheader>Choose Class</ListSubheader>
          <MenuItem value={1}>Class 1</MenuItem>
          <MenuItem value={2}>Class 2</MenuItem>
          <MenuItem value={3}>Class 3</MenuItem>
          <MenuItem value={4}>Class 4</MenuItem>
          <MenuItem value={5}>Class 5</MenuItem>
          <MenuItem value={6}>Class 6</MenuItem>
          <MenuItem value={7}>Class 7</MenuItem>
          <MenuItem value={8}>Class 8</MenuItem>
          <MenuItem value={9}>Class 9</MenuItem>
          <MenuItem value={10}>Class 10</MenuItem>
          <MenuItem value={11}>Class 11</MenuItem>
          <MenuItem value={12}>Class 12</MenuItem>
        </Select>
      </FormControl>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel htmlFor="grouped-select">Section</InputLabel>
        <Select defaultValue="" id="grouped-select" label="Section">
          {/* <MenuItem value="">
            <em>Choose one</em>
          </MenuItem> */}
          <ListSubheader>Choose Section</ListSubheader>
          <MenuItem value="1">Section 1</MenuItem>
          <MenuItem value="2">Section 2</MenuItem>
          <MenuItem value="3">Section 3</MenuItem>
          <MenuItem value="4">Section 4</MenuItem>
        </Select>
      </FormControl>
    </div>
      </div>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableSelectionOnClick
      />


          <Stack direction="row" spacing={2} sx={{ m: 1, minWidth: 120, marginLeft: 60, }}>
            <Button color="secondary">Edit</Button>
            <Button variant="contained" color="success">
              Save
            </Button>
            <Button variant="outlined" color="error">
              Reset
            </Button>
          </Stack>
    </div>

  );
  }
