import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import styled from "styled-components";
import SaveIcon from "@mui/icons-material/Save";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import Header from "../components/Header";
import ViewListIcon from "@mui/icons-material/ViewList";
import GridViewIcon from "@mui/icons-material/GridView";
import AddIcon from "@mui/icons-material/Add";
import AdminCard from "../components/AdminCard";
import Cookies from "universal-cookie";

import "./Admin.scss";

const RightContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const AdminsContainer = styled.div`
  padding: 25px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  gap: 30px;
  @media only screen and (max-width: 568px) {
    flex-direction: column;
    align-items: center;
  }
`;

const Img = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 10px;
`;

const ImgContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const AddImg = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  margin-bottom: 20px;
  object-fit: cover;
`;

const Input = styled.input`
  display: none;
`;

const rows = [
  {
    id: 1,
    email: "Ahmad98@gmail.com",
    fullname: "Ahmad sayess",
    password: "315",
    phone: 70032876,
  },
  {
    id: 2,
    email: "Rabih33@gmail.com",
    fullname: "Rabih hussein",
    password: "rabih142",
    phone: 70032996,
  },
  {
    id: 3,
    email: "Yahya404@gmail.com",
    fullname: "Yahya darwich",
    password: "hello45",
    phone: 71432876,
  },
  {
    id: 4,
    email: "Hadihayek20@gmail.com",
    fullname: "Hadi hayek",
    password: "password16",
    phone: 70562876,
  },
  {
    id: 5,
    email: "Moemat77@gmail.com",
    fullname: "Mhamad mattar",
    password: "moe2019",
    phone: 71032876,
  },
];

export default function DataGridDemo() {
  const [admin, setAdmin] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    phone: "",
    image:
      "https://i2-prod.birminghammail.co.uk/incoming/article11256820.ece/ALTERNATES/s1200c/JS88492176.jpg",
  });

  const [id, setId] = useState();
  const [admins, setAdmins] = useState([]);
  const [openEdit, setOpenEdit] = useState(false);
  const [openAdd, setOpenAdd] = React.useState(false);
  const [showGrid, setShowGrid] = useState(true);
  const [img, setImg] = useState();
  const [image, setImage] = useState();
  const cookies = new Cookies();
  const token = cookies.get("TOKEN");
  const headers = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const columns = [
    { field: "id", headerName: "ID", width: 60 },
    {
      field: "image",
      headerName: "Image",
      type: "string",
      width: 80,
      renderCell: (params) => {
        return <Img className="student-img" src={params.row.image} alt="" />;
      },
    },

    {
      field: "name",
      headerName: "Fullname",
      width: 120,
    },
    {
      field: "email",
      headerName: "Email",
      width: 180,
    },
    // {
    //   field: "password",
    //   headerName: "password",
    //   type: "string",
    //   minWidth: 150,
    // },
    {
      field: "phone",
      headerName: "phone",
      minWidth: 160,
      flex: 1,
    },

    {
      field: "action",
      headerName: "Actions",
      minWidth: 160,
      flex: 1,
      renderCell: (params) => {
        return (
          <>
            <Button
              id="edit"
              variant="contained"
              color="success"
              size="small"
              style={{ marginRight: "8px" }}
              onClick={() => {
                setId(params.row.id);
                setOpenEdit(true);
              }}
            >
              Edit
            </Button>
            <Button
              id="delete"
              variant="contained"
              color="error"
              size="small"
              style={{ marginRight: "8px" }}
              onClick={() => {
                if (
                  window.confirm(
                    "Are you sure you want to delete admin " + params.row.id
                  )
                )
                  handleDelete(params.row.id);
              }}
            >
              Delete
            </Button>
          </>
        );
      },
    },
  ];

  useEffect(() => {
    axios.get(`http://localhost:8000/api/admin`, headers).then((res) => {
      if (res.status === 200) {
        console.log(res.data);
        setAdmins(res.data.data);
      }
    });
  }, []);

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:8000/api/admin/${id}`, headers)
        .then((res) => {
          if (res.status === 200) {
            console.log(res.data);
            setAdmin(res.data.data);
          }
        });
    }
  }, [id]);

  const handleImage = (e) => {
    let img = e.target.files[0];
    console.log(e);
    if (img) {
      setImg(img);
      console.log(img);
      setImage(URL.createObjectURL(img));
    }
  };

  const handleInput = (e) => {
    e.persist();
    setAdmin({ ...admin, [e.target.name]: e.target.value });
    // console.log(admin);
  };

  const handleEdit = (e) => {
    const formData = new FormData();
    formData.append("name", admin.name);
    formData.append("email", admin.email);
    formData.append("phone", admin.phone);
    formData.append("image", img);
    e.preventDefault();

    axios
      .put(`http://127.0.0.1:8000/api/admin/${id}`, formData, headers)
      .then((res) => {
        if (res.data.status === 200) {
          setAdmin({
            name: "",
            email: "",
            password: "",
            password_confirmation: "",
            phone: "",
          });
          setImg("");
          setImage("");
        }
      });
  };
  const savedata = (e) => {
    // e.preventDefault();
    const formData = new FormData();
    formData.append("name", admin.name);
    formData.append("email", admin.email);
    formData.append("phone", admin.phone);
    formData.append("password", admin.password);
    formData.append("password_confirmation", admin.password_confirmation);
    formData.append("image", img);
    console.log("submit");
    axios
      .post("http://127.0.0.1:8000/api/admin/", admin, headers)
      .then((res) => {
        console.log(res);
        if (res.data.status === 200) {
          setAdmin({
            name: "",
            email: "",
            password: "",
            password_confirmation: "",
            phone: "",
          });
          setImg("");
          setImage("");
          console.log(res);
        }
      });
  };

  const handleDelete = (admin_id) => {
    console.log("submit");
    axios
      .delete(`http://127.0.0.1:8000/api/admin/${admin_id}`, headers)
      .then((res) => {
        if (res.data.status === 200) {
          setAdmins(res.data.admins);
        }
      });
  };

  const resetAdmin = () => {
    setAdmin({
      name: "",
      email: "",
      password: "",
      phone: "",
      image:
        "https://i2-prod.birminghammail.co.uk/incoming/article11256820.ece/ALTERNATES/s1200c/JS88492176.jpg",
    });
  };

  return (
    <>
      <RightContainer>
        <Header
          icon={
            <AdminPanelSettingsOutlinedIcon
              style={{
                fontSize: "50px",
                color: "#204B64",
              }}
            />
          }
          title="Admins"
          subTitle="In this page you can manage admins (add, delete, edit)."
        />
        <div className="admins__container">
          <div style={{ height: 423, width: "90%", margin: "0px auto" }}>
            <div className="button-container">
              <Button
                variant="contained"
                onClick={() => setShowGrid(!showGrid)}
                sx={{
                  marginRight: "15px",
                }}
              >
                {showGrid ? <ViewListIcon /> : <GridViewIcon />}
              </Button>
              <Button
                id="button"
                variant="contained"
                color="primary"
                startIcon={<AddIcon />}
                onClick={() => setOpenAdd(true)}
              >
                Add admin
              </Button>
            </div>
            {showGrid ? (
              <DataGrid
                rows={admins}
                columns={columns}
                pageSize={6}
                rowsPerPageOptions={[5]}
                checkboxSelection
                disableSelectionOnClick
              />
            ) : (
              <AdminsContainer>
                {admins.map((admin) => (
                  <AdminCard
                    admin={admin}
                    setId={(e) => setId(e)}
                    open={(e) => setOpenEdit(e)}
                    handleDelete={(e) => handleDelete(e)}
                  />
                ))}
              </AdminsContainer>
            )}

            {/* <Link to="/addadmin">
     <button type="button">
          Add admin!
     </button>
 </Link> */}

            <Dialog open={openAdd} onSubmit={savedata}>
              <DialogTitle> Add New Admin </DialogTitle>
              <form onSubmit={savedata}>
                <DialogContent sx={{ padding: "30px" }}>
                  <ImgContainer>
                    <AddImg src={image} />
                    <label htmlFor="contained-button-file">
                      <Input
                        accept="image/*"
                        id="contained-button-file"
                        multiple
                        type="file"
                        name="image"
                        onChange={handleImage}
                        required
                      />

                      <Button
                        variant="contained"
                        component="span"
                        startIcon={<DriveFolderUploadIcon />}
                      >
                        Upload
                      </Button>
                    </label>
                  </ImgContainer>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Name"
                    type="text"
                    fullWidth
                    variant="standard"
                    onChange={handleInput}
                    name="name"
                    value={admin.name}
                    required
                  />
                  <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Email "
                    type="email"
                    fullWidth
                    variant="standard"
                    onChange={handleInput}
                    name="email"
                    value={admin.email}
                    required
                  />
                  <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Password "
                    type="text"
                    fullWidth
                    variant="standard"
                    onChange={handleInput}
                    name="password"
                    value={admin.password}
                    required
                  />
                  <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Password Confirmation "
                    type="text"
                    fullWidth
                    variant="standard"
                    onChange={handleInput}
                    name="password_confirmation"
                    value={admin.password_confirmation}
                    required
                  />
                  <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Phone"
                    type="text"
                    fullWidth
                    variant="standard"
                    onChange={handleInput}
                    name="phone"
                    value={admin.phone}
                    required
                  />
                </DialogContent>
                <DialogActions>
                  <Button
                    type="button"
                    onClick={() => {
                      setOpenAdd(false);
                      setImage("");
                      setImg("");
                    }}
                  >
                    Cancel
                  </Button>
                  <Button type="submit">Save</Button>
                </DialogActions>
              </form>
            </Dialog>

            <Dialog open={openEdit} onSubmit={handleEdit}>
              <DialogTitle> Edit Admin </DialogTitle>
              <form onSubmit={handleEdit}>
                <DialogContent>
                  <ImgContainer>
                    <AddImg
                      src={
                        image || "http://localhost:8000/image/" + admin.image
                      }
                    />
                    <label htmlFor="contained-button-file">
                      <Input
                        // accept="image/*"
                        id="contained-button-file"
                        multiple
                        type="file"
                        name="image"
                        onChange={handleImage}
                      />

                      <Button
                        variant="contained"
                        component="span"
                        startIcon={<DriveFolderUploadIcon />}
                      >
                        Upload
                      </Button>
                    </label>
                  </ImgContainer>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Name"
                    type="text"
                    fullWidth
                    variant="standard"
                    onChange={handleInput}
                    name="name"
                    value={admin.name}
                    required
                  />
                  <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Email "
                    type="email"
                    fullWidth
                    variant="standard"
                    onChange={handleInput}
                    name="email"
                    value={admin.email}
                    required
                  />
                  {/* <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Password "
                    type="text"
                    fullWidth
                    variant="standard"
                    onChange={handleInput}
                    name="password"
                    value={admin.password}
                    required
                  /> */}
                  <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Phone"
                    type="text"
                    fullWidth
                    variant="standard"
                    onChange={handleInput}
                    name="phone"
                    value={admin.phone}
                    required
                  />
                </DialogContent>
                <DialogActions>
                  <Button
                    type="button"
                    onClick={() => {
                      setOpenEdit(false);
                      resetAdmin();
                      setImage("");
                      setImg("");
                    }}
                  >
                    Cancel
                  </Button>
                  <Button type="submit">Save</Button>
                </DialogActions>
              </form>
            </Dialog>
          </div>
        </div>
      </RightContainer>
    </>
  );
}
