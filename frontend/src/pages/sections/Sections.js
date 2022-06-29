import "./Sections.css";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "@mui/material/Button";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Tooltip from "@mui/material/Tooltip";
import Zoom from "@mui/material/Zoom";
import { DataGrid } from "@mui/x-data-grid";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import CancelIcon from "@mui/icons-material/Cancel";
import SaveIcon from "@mui/icons-material/Save";
import axios from "axios";
import Cookies from "universal-cookie";
import CubeLoader from "../../components/Cube Loader/CubeLoader";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import Header from "../../components/Header";
import ViewListIcon from "@mui/icons-material/ViewList";
import GridViewIcon from "@mui/icons-material/GridView";
import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

const RightContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;
const CardsList = styled.div`
  padding-top: 20px;
  padding-bottom: 80px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  grid-column-gap: 20px;
  grid-row-gap: 25px;
  margin: 0 auto;
  overflow-y: auto;
  height: inherit;
`;

const Sections = () => {
  toast.configure();
  const [className, setClassName] = useState(undefined);
  const [classID, setClassID] = useState(undefined);
  const [addID, setAddID] = useState(undefined);
  const [sectionID, setSectionID] = useState(undefined);
  const [sectionName, setSectionName] = useState(undefined);
  const [sections, setSections] = useState([]);
  const [classes, setClasses] = useState([]);
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [newSection, setNewSection] = useState(undefined);
  const [loading, setLoading] = useState(true);
  const [showGrid, setShowGrid] = useState(false);

  // add Cookies and get token
  const cookies = new Cookies();
  const token = cookies.get("TOKEN", { path: "/" });
  const headers = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  // get sections in specific class and all classes
  useEffect(() => {
    // get id from url
    const id = document.URL.split("/")[5];
    if (id) {
      axios
        .get(`http://localhost:8000/api/class/${id}`, headers)
        .then((res) => {
          setClassID(res.data.data.id);
          setClassName(res.data.data.name);
          setSections(res.data.data.sections);
          setLoading(false);
          console.log(res.data.data.sections);
        })
        .catch((err) => toast.error(err.response.data.message));
    } else {
      axios
        .get(`http://localhost:8000/api/section`, headers)
        .then((res) => {
          setSections(res.data.data);
          console.log(res.data.data);
        })
        .catch((err) => console.log(`Error: ${err.message}`));
      axios
        .get(`http://localhost:8000/api/class`, headers)
        .then((res) => {
          setClasses(res.data.data);
          setLoading(false);
        })
        .catch((err) => console.log(`Error: ${err.message}`));
    }
  }, []);

  // Add new section
  const handleAdd = () => {
    const sectionName = {
      name: newSection,
      std__class_id: addID || classID,
    };
    axios
      .post(`http://localhost:8000/api/section`, sectionName, headers)
      .then((res) => {
        if (res.status === 200) {
          setOpen(false);
          setInterval(() => {
            window.location.reload(false);
          }, 500);
          clearInterval();
          toast.success(res.data.message);
        }
      })
      .catch((err) => toast.error(err.response.data.message));
  };

  // Delete a section
  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:8000/api/section/${id}`, headers)
      .then((res) => {
        if (res.status === 200) {
          setInterval(() => {
            window.location.reload(false);
          }, 500);
          clearInterval();
          toast.success(res.data.message);
        }
      })
      .catch((err) => toast.error(err.response.data.message));
  };

  // to Edit the name of section
  const handleEdit = () => {
    const sectionInfo = {
      name: sectionName,
    };
    axios
      .put(
        `http://localhost:8000/api/section/${sectionID}`,
        sectionInfo,
        headers
      )
      .then((res) => {
        if (res.status === 200) {
          setEdit(false);
          setInterval(() => {
            window.location.reload(false);
          }, 500);
          clearInterval();
          toast.success(res.data.message);
        }
      })
      .catch((err) => toast.error(err.response.data.message));
  };

  // handle changes in edit popup
  const handleChangeInput = (e) => {
    setSectionName(e.target.value);
  };

  // get id of class in selectbox add popup
  const handleChangeSelect = (e) => {
    setAddID(e.target.value);
  };
  // handle for new section name
  const handleChangeAddSection = (e) => {
    setNewSection(e.target.value);
  };

  // to open/close add section popup
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  // to open/close edit section popup
  const handleClickEdit = (sectionID, name) => {
    setSectionID(sectionID);
    setSectionName(name);
    setEdit(true);
  };
  const handleCloseEdit = () => {
    setEdit(false);
  };

  // columns
  const columns = [
    { field: "id", headerName: "ID", width: 80 },
    { field: "name", headerName: "Section name", width: 120 },
    {
      field: "",
      headerName: "Class name",
      width: 150,
      valueGetter: (params) => {
        return className || params.row.std__class.name;
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 400,
      flex: 1,
      renderCell: (params) => {
        return (
          <>
            <Tooltip
              title="Edit Class"
              placement="top"
              TransitionComponent={Zoom}
              enterDelay={500}
              leaveDelay={200}
              arrow
            >
              <Button
                variant="contained"
                size="small"
                color="success"
                startIcon={<ModeEditOutlineIcon />}
                style={{ marginRight: "10px" }}
                onClick={() => {
                  handleClickEdit(params.row.id, params.row.name);
                }}
              >
                Edit
              </Button>
            </Tooltip>
            <Tooltip
              title="Delete Class"
              placement="top"
              TransitionComponent={Zoom}
              enterDelay={500}
              leaveDelay={200}
              arrow
            >
              <Button
                variant="contained"
                size="small"
                color="error"
                startIcon={<DeleteIcon />}
                style={{ marginRight: "10px" }}
                onClick={() => {
                  handleDelete(params.row.id);
                }}
              >
                Delete
              </Button>
            </Tooltip>
          </>
        );
      },
    },
  ];

  return (
    <>
      <RightContainer>
        <Header
          icon={
            <LibraryBooksIcon
              style={{
                fontSize: "55px",
                color: "#204B64",
              }}
            />
          }
          title="Sections"
          subTitle="In this page you can manage sections (add, delete, edit)."
        />
        {loading ? (
          <CubeLoader />
        ) : (
          <div className="sections__container">
            <div className="add_section">
              <Button
                variant="contained"
                onClick={() => {
                  setShowGrid(!showGrid);
                }}
              >
                {showGrid ? <GridViewIcon /> : <ViewListIcon />}
              </Button>
              <Tooltip
                title="Add New Section"
                placement="top"
                TransitionComponent={Zoom}
                enterDelay={500}
                leaveDelay={200}
                arrow
              >
                <Button
                  variant="contained"
                  startIcon={<AddCircleIcon />}
                  onClick={handleClickOpen}
                >
                  Add section
                </Button>
              </Tooltip>
            </div>

            {showGrid ? (
              <CardsList>
                {sections.map((section, index) => {
                  return (
                    <CardContent
                      style={{
                        minWidth: 250,
                        height: 200,
                        backgroundColor: "#ddd",
                        borderRadius: 15,
                        margin: "0px auto",
                        overflow: "hidden",
                      }}
                      key={index}
                    >
                      <Typography
                        variant="h6"
                        align="center"
                        style={{ color: "green" }}
                      >
                        {section.name}
                      </Typography>
                      <Typography sx={{ mb: 1.5 }} align="center">
                        <b>Section ID </b> #{section.id}
                      </Typography>
                      {className ? (
                        <Typography sx={{ mb: 1.5 }} align="center">
                          <span>
                            <b style={{ color: "	#DC143C" }}>Class Name: </b>{" "}
                            {className}
                          </span>
                        </Typography>
                      ) : (
                        <span>
                          <b style={{ color: "	#DC143C" }}>Class Name: </b>
                          {section.std__class.name}
                        </span>
                      )}
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          height: 70,
                        }}
                      >
                        <Button
                          variant="contained"
                          size="small"
                          color="success"
                          style={{ marginRight: "10px" }}
                          onClick={() => {
                            handleClickEdit(section.id, section.name);
                          }}
                        >
                          <ModeEditOutlineIcon />
                        </Button>
                        <Button
                          variant="contained"
                          size="small"
                          color="error"
                          style={{ marginRight: "10px" }}
                          onClick={() => {
                            handleDelete(section.id);
                          }}
                        >
                          <DeleteIcon />
                        </Button>
                      </Box>
                    </CardContent>
                  );
                })}
              </CardsList>
            ) : (
              <div style={{ height: 423, width: "90%", margin: "0px auto" }}>
                <DataGrid
                  rows={sections}
                  columns={columns}
                  pageSize={6}
                  rowsPerPageOptions={[5]}
                  checkboxSelection
                  disableSelectionOnClick
                />
              </div>
            )}

            <Dialog open={open} onClose={handleClose}>
              <DialogTitle>Add New Section</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  To add new section to system, please enter the name of section
                  and select the class that you want add to it.
                  <br />
                  <div style={{ color: "#D8000C" }}>
                    Name of section and class required
                  </div>
                </DialogContentText>
                <FormControl
                  sx={{
                    display: "flex",
                    flexDirection: { xs: "column", sm: "row" },
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <TextField
                    id="outlined-required"
                    color="success"
                    helperText="Please enter the name of section"
                    required
                    size="small"
                    margin="normal"
                    type="text"
                    label="Name of section"
                    variant="outlined"
                    autoFocus
                    name="newSection"
                    onChange={handleChangeAddSection}
                    defaultValue={undefined}
                  />
                  <div style={{ marginTop: "8px" }}>
                    <Select
                      size="small"
                      color="success"
                      style={{ minWidth: 230 }}
                      name="className"
                      onChange={handleChangeSelect}
                      displayEmpty
                    >
                      (className)? return (<MenuItem>{className}</MenuItem>) :{" "}
                      {classes.map((classe, index) => {
                        return (
                          <MenuItem key={index} value={classe.id}>
                            {classe.name}
                          </MenuItem>
                        );
                      })}
                    </Select>
                    <FormHelperText>Choose class</FormHelperText>
                  </div>
                </FormControl>
              </DialogContent>
              <DialogActions>
                <Button
                  variant="contained"
                  size="small"
                  color="error"
                  startIcon={<CancelIcon />}
                  onClick={handleClose}
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  size="small"
                  color="success"
                  startIcon={<SaveIcon />}
                  onClick={handleAdd}
                >
                  Save
                </Button>
              </DialogActions>
            </Dialog>

            <Dialog open={edit} onClose={handleCloseEdit}>
              <DialogTitle>Edit Section</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Please enter the new name of section.
                </DialogContentText>
                <FormControl>
                  <TextField
                    id="outlined-required"
                    color="success"
                    size="small"
                    margin="normal"
                    type="text"
                    label="Name of class"
                    variant="outlined"
                    name="className"
                    autoFocus
                    onChange={handleChangeInput}
                    defaultValue={sectionName}
                  />
                  {/* <div style={{ marginTop: "8px" }}>
              <Select
                size="small"
                color="success"
                style={{ minWidth: 250 }}
                name="courseName"
                onChange={handleChangeSelect}
              >
                <MenuItem value={undefined}>
                  <em>None</em>
                </MenuItem>
                {classes.map((course, index) => {
                  return (
                    <MenuItem key={index} value={course.id}>
                      {course.name}
                    </MenuItem>
                  );
                })}
              </Select>
              <FormHelperText>Choose class</FormHelperText>
            </div> */}
                </FormControl>
              </DialogContent>
              <DialogActions>
                <Button
                  variant="contained"
                  size="small"
                  color="error"
                  startIcon={<CancelIcon />}
                  onClick={handleCloseEdit}
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  size="small"
                  color="success"
                  startIcon={<SaveIcon />}
                  onClick={handleEdit}
                >
                  Save
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        )}
      </RightContainer>
    </>
  );
};

export default Sections;
