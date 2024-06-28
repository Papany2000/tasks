import React from "react";
import Button from "@mui/material/Button";
import BasicModal from "./ui/modal";
import LoginForm from "./ui/forms/loginForm";

const Login = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div className={"main"}>
      <Button onClick={handleOpen}>Login</Button>
      <BasicModal
        open={open}
        handleClose={handleClose}
        children={<LoginForm />}
      />
    </div>
  );
};

export default Login;
