
// import * as React from 'react';
// import Button from '@mui/material/Button';
// import TextField from '@mui/material/TextField';
// import { useState } from 'react';
// import Dialog from '@mui/material/Dialog';
// import DialogActions from '@mui/material/DialogActions';
// import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
// import DialogTitle from '@mui/material/DialogTitle';



// export default function FormDialog() {
  
//   // const [admins, setAdmins]= useState({
//   //   full_name:'',
//   //   email:'',
//   //   password:'',
//   //   phone:'',
//   //   image:''
//   // });
 
//   const [open, setOpen] = useState(false);

//   const handleClickOpen = () => {
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };

//   // const handleInput = (e) =>{
//   //   e.persist();
//   //   setAdmins({...admins ,[e.target.full_name]: e.target.value})
//   //   console.log(admins);

//   // }
  

//   return (
//     <div >
//       <Button id ="admin" variant="outlined"  onClick={handleClickOpen}>
//         Add admin here
//       </Button>
//       <Dialog open={open} onClose={handleClose}>
//         <DialogTitle> New Admin </DialogTitle>
//         <DialogContent>
//           {/* <DialogContentText>
//             To subscribe to this website, please enter your email address here. We
//             will send updates occasionally.
//           </DialogContentText> */}
//           <TextField
//             autoFocus
//             margin="dense"
//             id="name"
//             label="Name"
//             type="text"
//             fullWidth
//             variant="standard"
            
//           />
//           <TextField
//             autoFocus
//             margin="dense"
//             id="name"
//             label="Email "
//             type="email"
//             fullWidth
//             variant="standard"
            

//           />
//           <TextField
//             autoFocus
//             margin="dense"
//             id="name"
//             label="Password "
//             type="text"
//             fullWidth
//             variant="standard"
            

//           />
//           <TextField
//             autoFocus
//             margin="dense"
//             id="name"
//             label="Phone"
//             type="text"
//             fullWidth
//             variant="standard"
            

//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleClose}>Cancel</Button>
//           <Button onClick={handleClose}>Save</Button>
//         </DialogActions>
//       </Dialog>
//     </div>
//   );
// }
