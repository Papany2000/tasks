import { Button, TextField } from '@mui/material';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import { Controller, useForm, useFormState } from "react-hook-form";
import React from 'react';
import Box from '@mui/material/Box';
import Swal from 'sweetalert2';
import { postUser, getUsers } from '../../api/apiUsers';

function UserForm({setUser, handleClose}) {

  const { handleSubmit, control } = useForm();
  const { errors } = useFormState({
    control
  });
 
  const onSubmit =  async (data) => {
    try {
        await postUser(data)
        Swal.fire({
          showCloseButton: false,
          showCancelButton: false,
          showConfirmButton: false,
          width: 200,
          position: 'top-start',
          title: 'info!',
          text: 'Успешно',
          timer: 1500
        })
        await setUser((await getUsers()).data.data)
        handleClose()
      } catch(e) {
        Swal.fire({
          showCloseButton: false,
          showCancelButton: false,
          showConfirmButton: false,
          width: 200,
          position: 'top-end',
          title: 'Error!',
          text: 'Do you want to continue',
          timer: 1500
        })
      }
  }
  return (

    <div style={{ display: 'flex', justifyContent: 'space-evenly', }}>


      <Box mr={3} style={{ width: '50%', borderRight: '25%'}}>

        <form onSubmit={handleSubmit(onSubmit)} style={{ borderRight: '25%' }}>
        <Controller
            control={control}
            name="firstName"
            rules={{ required: "обязательно к заполнению" }}
            render={({ field }) => (
              <TextField
                style={{ marginTop: '10%' }}
                autoFocus
                margin='dense'
                name="firstName"
                label="Имя"
                type="text"
                fullWidth={true}
                onChange={(e) => field.onChange(e)}
                value={field.value || ''}
                error={!!errors.firstName?.message}
                helperText={errors.firstName?.message}
              />
            )}
          />
        <Controller
            control={control}
            name="secondName"
            rules={{ required: "обязательно к заполнению" }}
            render={({ field }) => (
              <TextField
                style={{ marginTop: '10%' }}
                autoFocus
                margin='dense'
                name="secondName"
                label="Отчество"
                type="text"
                fullWidth={true}
                onChange={(e) => field.onChange(e)}
                value={field.value || ''}
                error={!!errors.secondName?.message}
                helperText={errors.secondName?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="lastName"
            rules={{ required: "обязательно к заполнению" }}
            render={({ field }) => (
              <TextField
                style={{ marginTop: '10%' }}
                autoFocus
                margin='dense'
                name="lastdName"
                label="Фамилия"
                type="text"
                fullWidth={true}
                onChange={(e) => field.onChange(e)}
                value={field.value || ''}
                error={!!errors.lastdName?.message}
                helperText={errors.lastdName?.message}
              />
            )}
          />
           <Controller
            control={control}
            name="login"
            rules={{ required: "обязательно к заполнению" }}
            render={({ field }) => (
              <TextField
                style={{ marginTop: '10%' }}
                autoFocus
                margin='dense'
                name="login"
                label="Логин"
                type="text"
                fullWidth={true}
                onChange={(e) => field.onChange(e)}
                value={field.value || ''}
                error={!!errors.login?.message}
                helperText={errors.login?.message}
              />
            )}
          />
          <Controller
           style={{ marginTop: '10%' }}
            control={control}
            name="password"
            rules={{ required: "обязательно к заполнению" }}
            render={({ field }) => (
              <TextField
                autoFocus
                margin='dense'
                name="password"
                label="пароль"
                type="password"
                fullWidth={true}
                onChange={(e) => field.onChange(e)}
                value={field.value || ''}
                error={!!errors.password?.message}
                helperText={errors.password?.message}
              />
            )}
          />
          <Controller
           style={{ marginTop: '10%' }}
            control={control}
            name="roleId"
            rules={{ required: "обязательно к заполнению" }}
            render={({ field }) => (
              <div>
                <InputLabel style={{paddingLeft: '1rem', fontSize: '0.8rem'}}>роль</InputLabel>
                <Select
                  autoFocus
                  marginBotton='dense'
                  name="roleId"
                  label="роль"
                  type="select"
                  fullWidth={true}
                  onChange={(e) => field.onChange(e)}
                  value={field.value || ''}
                >
                  <MenuItem value={'1'}>admin</MenuItem>
                  <MenuItem value={'2'}>employee</MenuItem>
                </Select>
              </div>

            )}
          />
          <Button type="submit" fullWidth={true} variant="contained">Авторизуйтесь</Button>
        </form>
      </Box>

    </div>

  );
}

export default UserForm;