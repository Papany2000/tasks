import { Button, TextField } from "@mui/material";
import { Controller, useForm, useFormState } from "react-hook-form";
import React from "react";
import Box from "@mui/material/Box";
import { login } from "./api/ApiAuth";
import { setAuthToken } from "../utils/axiosClient";
import Cookies from 'js-cookie';
import { decodeToken } from "react-jwt";

function LoginForm() {
  const { handleSubmit, control } = useForm();
  const onSubmit = async (data) => {
    const res = await login(data);
    await setAuthToken(res.data.access_token);
    const token =  Cookies.get()
    const myDecodedToken = decodeToken(token.auth_token);
   // console.log(24, myDecodedToken)
    if(myDecodedToken.role === 'admin'){
      window.location = "/"
    }else{
      window.location = "/"
    }
   
  };
  const { errors } = useFormState({
    control,
  });

  return (
    <div style={{ display: "flex", justifyContent: "space-evenly" }}>
      <Box mr={3} style={{ width: "50%", borderRight: "25%" }}>
        <form onSubmit={handleSubmit(onSubmit)} style={{ borderRight: "25%" }}>
          <Controller
            control={control}
            name="login"
            rules={{ required: "обязательно к заполнению" }}
            render={({ field }) => (
              <TextField
                style={{ marginTop: "10%" }}
                autoFocus
                margin="dense"
                name="login"
                label="Логин"
                type="text"
                fullWidth={true}
                onChange={(e) => field.onChange(e)}
                value={field.value || ""}
                error={!!errors.login?.message}
                helperText={errors.login?.message}
              />
            )}
          />
          <Controller
            style={{ marginTop: "10%" }}
            control={control}
            name="password"
            rules={{ required: "обязательно к заполнению" }}
            render={({ field }) => (
              <TextField
                autoFocus
                margin="dense"
                name="password"
                label="пароль"
                type="password"
                fullWidth={true}
                onChange={(e) => field.onChange(e)}
                value={field.value || ""}
                error={!!errors.password?.message}
                helperText={errors.password?.message}
              />
            )}
          />
          <Button type="submit" fullWidth={true} variant="contained">
            Войти
          </Button>
        </form>
      </Box>
    </div>
  );
}

export default LoginForm;
