import React from 'react'
import Greeting from './greeting';
import BasicModal from './ui/modal';
import Button from '@mui/material/Button';
import UserForm from './ui/forms/userForm';
import {getUsers, removeUserId} from './api/apiUsers'
import DataTable from './ui/dataTable';
import { GridDeleteForeverIcon } from '@mui/x-data-grid';


const Home = () => {

    const [error, setError] = React.useState('')
    const [user, setUser] = React.useState([]);
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    React.useEffect(() => {
        setError('')          // очистка ошибки при вторичной загрузке
        getUsers(user)
          .then(
            (result) => {
              setUser(result.data.data); 
            })
          .catch(error => {
            setError(error.message)
          })
      }, [])  
      const rows = user
      const columns = [
        {  field: 'firstName', width: 180, headerName: 'Имя', editable: true, headerAlign: 'center', align: 'center'},
        {  field: 'secondName', headerName: 'Отчество', editable: true, width: 180, headerAlign: 'center', align: 'center'},
        {  field: 'lastName',   width: 180, headerName: 'Фамилия', editable: true, headerAlign: 'center',  align: 'center' },
        {  field: 'login', headerName: 'Логин', editable: true,  width: 180 ,  headerAlign: 'center', align: 'center' },
        {  field: 'password', headerName: 'Пароль', editable: true, width: 180,  headerAlign: 'center',  align: 'center' },
        {  field: 'roleId', headerName: 'Роль', editable: true, width: 180,  headerAlign: 'center',  align: 'center' },
        {editable: true,
          field: "actions",
          headerName: "Удалить",
          sortable: false,
          width: 100,
          align: 'center', 
          renderCell: (params) => {
              return (
                  <div className="d-flex justify-content-between align-items-center" style={{ cursor: "pointer" }}>
                      <GridDeleteForeverIcon index={params.row.id}    onClick = {async () => {
                     const res =  window.confirm('Вы уверены')
                     if(!res){return false}
                     await removeUserId(params.row.id)
                     setUser((await getUsers()).data.data)
                    }}/>
                   </div>
           );
          }
       }
    
      ]

    return(
        <div className={'home'}>
            <Greeting/>
            <Button onClick={handleOpen}>Добавить пользователя</Button>
            <DataTable rows={rows} columns={columns}/>
            <BasicModal open={open} handleClose={handleClose} text={'Добавить пользователя'} children={<UserForm setUser={setUser} handleClose={handleClose} />}/>
        </div>
    )
}

export default Home;