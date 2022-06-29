import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Button } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import styled from "styled-components";
import { Box } from "@mui/system";

const AdminImg = styled.img`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  object-fit: cover;
`;
const FullName = styled.h4`
  font-size: 1.1rem;
  font-weight: 500;
  margin: 0;
`;

const Id = styled.h4`
  font-size: 0.9rem;
  margin: 0;
  margin-bottom: 6px;
`;
const Email = styled.div``;
const Phone = styled.div``;
const DetailsText = styled.h4`
  font-size: 0.9rem;
  margin: 0;
  margin-left: 3px;
  display: inline-block;
  font-weight: normal;
`;
const AdminCard = ({ admin, setId, open, handleDelete }) => {
  return (
    <Card
      sx={{
        minWidth: 210,
        width: 230,
        textAlign: "center",
        background: "#dcdcdc",
      }}
    >
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "2px",
          padding: "20px 0",
          cursor: "pointer",
        }}
      >
        <AdminImg src={admin.image} alt="" />
        <div>
          <FullName>{admin.name}</FullName>
          <Id>#{admin.id}</Id>
        </div>
        <Email>
          <EmailIcon fontSize="13px" />
          <DetailsText> {admin.email}</DetailsText>
        </Email>
        <Phone>
          <PhoneIcon fontSize="13px" />
          <DetailsText> {admin.phone}</DetailsText>
        </Phone>
      </CardContent>
      <Box sx={{ marginBottom: "20px" }}>
        <Button
          variant="contained"
          size="small"
          sx={{ mr: 2 }}
          onClick={() => {
            open(true);
            setId(admin.id);
          }}
        >
          <EditIcon />
        </Button>
        <Button
          variant="contained"
          size="small"
          color="error"
          onClick={() => {
            if (
              window.confirm("Are you sure that you want to delete this admin")
            )
              handleDelete(admin.id);
          }}
        >
          <DeleteIcon />
        </Button>
      </Box>
    </Card>
  );
};

export default AdminCard;
