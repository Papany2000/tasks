import React from 'react';
import Button from '@mui/material/Button';
import BasicModal from './ui/modal';
import TaskForm from './ui/forms/taskForm';
import DataTable from './ui/dataTable';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';



const Sibling = () => {

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [task, setTask] = React.useState([{authorId: 1, taskExecutorId: 2, taskDescription: 'Убрать территорию', taskEndDate: '19.07.24', status: 1}])

  const rows = task;
  const columns = [
    {  field: 'authorId', width: 80, headerName: 'Id автора', headerAlign: 'center', align: 'center'},
    {  field: 'taskExecutorId', headerName: 'Id исполнителя ', width: 130, headerAlign: 'center', align: 'center'},
    {  field: 'taskDescription',   width: 390, headerName: 'Постановка задачи', headerAlign: 'center',  align: 'center' },
    {  field: 'taskEndDate', headerName: 'Дата выполнения', width: 150 ,  headerAlign: 'center', align: 'center' },
    {  field: 'executorDescription', headerName: 'Доклад исполнителя', editable: true, width: 200,  headerAlign: 'center',  align: 'center' },
    {  field: 'status', headerName: 'Статус', editable: true, width: 80,  headerAlign: 'center',  align: 'center' },
    {
      field: "actions",
      headerName: "Удалить",
      sortable: false,
      width: 70,
      align: 'center', 
      renderCell: (params) => {
          return (
              <div className="d-flex justify-content-between align-items-center" style={{ cursor: "pointer" }}>
                  <DeleteForeverIcon index={params.row.id}    onClick = {async () => {
                 const res =  window.confirm('Вы уверены')
                 if(!res){return false}
                 console.log('ok')
                }}/>
               </div>
       );
      }
   }

  ]
    return(
        <div className={'sibling'}>
           <Button onClick={handleOpen}>{'Поставить задачу'}</Button>
           <h3 style={{width: '100%', textAlign: 'center'}}>Список задач</h3>
           <DataTable rows={rows} columns={columns}/>  
           <BasicModal open={open} handleClose={handleClose}  children={<TaskForm/>}/>
        </div>
    )
}

export default Sibling;