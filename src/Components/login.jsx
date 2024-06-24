import React from 'react';
import Button from '@mui/material/Button';
import BasicModal from './ui/modal';
import LoginForm from './loginForm';





const Login = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

    return(
        <div className={'main'}>
           <Button onClick={handleOpen}>Войти</Button> 
           <BasicModal open={open} handleClose={handleClose}  children={<LoginForm/>}/>
        </div>
    )
}

export default Login;