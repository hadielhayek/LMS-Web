import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Img1 from "../assets/images/profile.jpeg";
import Button from "@mui/material/Button";
import SaveIcon from "@mui/icons-material/Save";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import axios from "axios";
import Cookies from "universal-cookie";
import { toast } from "react-toastify";

const AddStudentContainer = styled.div`
  padding: 30px 10px 0px;
  @media only screen and (max-width: 768px) {
    padding-top: 10px;
  }
`;
const FormContainer = styled.form``;

const FormWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  gap: 60px;
  @media only screen and (max-width: 768px) {
    gap: 10px;
    flex-direction: column;
  }
`;

const ImgContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Img = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  margin-bottom: 20px;
  object-fit: cover;
`;

const Input = styled.input`
  display: none;
`;

const AddStudentPopup = ({ open, filter, setStudents }) => {
  toast.configure();
  const [student, setStudent] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    std__class_id: "",
    section_id: "",
    image: "",
  });
  const [classes, setClasses] = useState([]);
  const [class_id, setClass_id] = useState();
  const [sections, setSections] = useState([]);
  const [image, setImage] = useState();

  const cookies = new Cookies();
  const token = cookies.get("TOKEN");
  const headers = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
    console.log(student);
  };
  const handleImage = async (e) => {
    let img = e.target.files[0];
    if (img) {
      setImage(URL.createObjectURL(img));
    }
  };

  useEffect(() => {
    axios.get(`http://localhost:8000/api/class`, headers).then((res) => {
      if (res.status === 200) {
        setClasses(res.data.data);
        setClass_id(res.data.data[0].id);
      }
    });
  }, []);

  useEffect(() => {
    if (class_id) {
      axios
        .get(`http://localhost:8000/api/class/${class_id}`,headers)
        .then((res) => {
          if (res.status === 200) {
            console.log(res.data);
            setSections(res.data.data.sections);
            setStudent({
              ...student,
              ["section_id"]: res.data.data.sections[0].id,
              ["std__class_id"]: class_id,
            });
          }
        });
    }
  }, [class_id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let res;
    try {
      res = await axios.post(
        `http://localhost:8000/api/student`,
        headers,
        student
      );
      toast.success(res.data.message);
      try {
        const res = await axios.get(
          `http://localhost:8000/api/student`,
          headers
        );
        filter(res.data.data);
        open(false);
      } catch (err) {
        console.log(err);
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <AddStudentContainer>
      <FormContainer>
        <FormWrapper>
          <ImgContainer>
            <Img src={image || Img1} />
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
          <Grid
            container
            spacing={{ xs: 0, md: 8 }}
            px={5}
            sx={{
              "& .MuiFormControl-root": {
                margin: "6px",
              },
            }}
          >
            <Grid item md={6} xs={12}>
              <TextField
                id="standard-basic"
                label="First Name"
                name="first_name"
                variant="standard"
                onChange={handleChange}
                value={student.first_name}
                required
                fullWidth
              />
              <TextField
                id="standard-basic"
                label="Last Name"
                name="last_name"
                variant="standard"
                onChange={handleChange}
                value={student.last_name}
                required
                fullWidth
              />

              <TextField
                id="standard-basic"
                label="Email"
                name="email"
                type="email"
                variant="standard"
                onChange={handleChange}
                value={student.email}
                required
                fullWidth
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                label="Phone"
                name="phone"
                variant="standard"
                onChange={handleChange}
                value={student.phone}
                fullWidth
                required
              />
              <FormControl fullWidth variant="standard">
                <InputLabel>Class</InputLabel>
                <Select
                  label="Class"
                  onChange={(e) => {
                    setClass_id(e.target.value);
                    handleChange(e);
                  }}
                  value={student.std__class_id}
                  name="std__class_id"
                  required
                >
                  <MenuItem value="none" hidden>
                    Choose a class
                  </MenuItem>
                  {classes.map((c) => (
                    <MenuItem key={c.id} value={c.id}>
                      {c.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl fullWidth variant="standard">
                <InputLabel>Section</InputLabel>
                <Select
                  label="Section"
                  onChange={handleChange}
                  value={student.section_id}
                  name="section_id"
                  required
                >
                  {sections.map((c) => (
                    <MenuItem key={c.id} value={c.id}>
                      {c.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </FormWrapper>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: { xs: "center", sm: "flex-end" },
            alignItems: "center",
            mt: 4,
          }}
        >
          <Button
            type="button"
            variant="contained"
            sx={{ m: 1 }}
            onClick={() => open(false)}
            color="error"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            sx={{ m: 1 }}
            startIcon={<SaveIcon />}
            onClick={handleSubmit}
          >
            Save
          </Button>
        </Box>
      </FormContainer>
    </AddStudentContainer>
  );
};

export default AddStudentPopup;
