import * as React from 'react';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import { GridToolbarContainer } from '@mui/x-data-grid';
import { GridRowEditStopReasons } from '@mui/x-data-grid';
import { DataGrid } from '@mui/x-data-grid';
import { GridRowModes } from '@mui/x-data-grid';
import Swal from 'sweetalert2';
import { getTaskList, postTask, updateTaskId } from '../api/apiTask';
import { makeStyles } from '@material-ui/core/styles';
import CreateIcon from '@mui/icons-material/Create';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import PauseIcon from '@mui/icons-material/Pause';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ScheduleIcon from '@mui/icons-material/Schedule';
import CloseIcon from '@mui/icons-material/Close';
import { MenuItem, Select } from '@mui/material';

const useStyles = makeStyles({
    root:{
        '& .cold' : {
            backgroundColor: '#b9d5ff91',
            color: 'red',
        },
        '& .hot': {
            backgroundColor: '#ff943975',
            color: '#1a3e72',
        }
    }
})

function EditToolbar(props) {
    const { setFunction, setRowModesModel } = props;

    const handleClick = () => {
        const currentDate = new Date();
        const isoDate = currentDate.toISOString();
        // объявим newId здесь чтобы его было видно во всей функции
        let newId;
        setFunction(oldRows => {
            const maxId = Math.max(...oldRows.map(row => row.id), 0);
            newId = maxId + 1;

            return [
                ...oldRows,
                { id: newId, authorId: '', taskExecutorId: '', taskEndDate: isoDate, executorDescription: '', statusId: 1, isNew: true },
            ];
        });

        setRowModesModel(oldModel => ({
            ...oldModel,
            [newId]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
        }));

    };

    return (
        <GridToolbarContainer>
            <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
                Добавить строку
            </Button>
        </GridToolbarContainer>
    );
}

export default function FullFeaturedCrudGrid({ rows, columns, setFunction, setRowModesModel, rowModesModel }) {

    const classes = useStyles();
    const handleRowEditStop = (params, event) => {
        if (params.reason === GridRowEditStopReasons.rowFocusOut) {
            event.defaultMuiPrevented = true;
        }
    };

    const processRowUpdate = async (newRow) => {
        console.log(newRow)
        const updatedRow = { ...newRow };
        if (newRow.isNew) {
            try {
                await postTask(newRow, newRow.id);
                Swal.fire({
                    showCloseButton: false,
                    showCancelButton: false,
                    showConfirmButton: false,
                    width: 200,
                    position: "top-start",
                    title: "info!",
                    text: "Успешно",
                    timer: 1500,
                });
                await setFunction((await getTaskList()).data);
            } catch (e) {
                Swal.fire({
                    showCloseButton: false,
                    showCancelButton: false,
                    showConfirmButton: false,
                    width: 200,
                    position: "top-end",
                    title: "Error!",
                    text: "Do you want to continue",
                    timer: 1500,
                });
            }
        } else {
            try {
                await updateTaskId(newRow, newRow.id);
                Swal.fire({
                    showCloseButton: false,
                    showCancelButton: false,
                    showConfirmButton: false,
                    width: 200,
                    position: "top-start",
                    title: "info!",
                    text: "Успешно",
                    timer: 1500,
                });
                await setFunction((await getTaskList()).data);
            } catch (e) {
                Swal.fire({
                    showCloseButton: false,
                    showCancelButton: false,
                    showConfirmButton: false,
                    width: 200,
                    position: "top-end",
                    title: "Error!",
                    text: "Do you want to continue",
                    timer: 1500,
                });
            }
        }
        setFunction(rows.map(row => (row.id === newRow.id ? updatedRow : row)));
        return updatedRow;
    };

    const handleRowModesModelChange = newRowModesModel => {
        setRowModesModel(newRowModesModel);
    };

    const statusIcons = {
        1: <CreateIcon fontSize="small" />,
        2: <AutorenewIcon fontSize="small" />,
        3: <PauseIcon fontSize="small" />,
        4: <CheckCircleIcon fontSize="small" />,
        5: <ScheduleIcon fontSize="small" />,
        6: <CloseIcon fontSize="small" />
    };

    const statusTooltip = {
        1: 'создано',
        2: 'прогресс',
        3: 'приостановлено',
        4: 'завершено',
        5: 'отложено',
        6: 'закрыто'
    };

    const statusOptions = [
        { value: 1, label: 'создано' },
        { value: 2, label: 'прогресс' },
        { value: 3, label: 'приостановлено' },
        { value: 4, label: 'завершено' },
        { value: 5, label: 'отложено' },
        { value: 6, label: 'закрыто' }
    ];

    const updatedColumns = columns.map(column => {
        if (column.field === 'statusId') {
            return {
                ...column,
                renderCell: (params) => (
                    <div
                        title={statusTooltip[params.value]}
                        style={{ display: 'flex', alignItems: 'center' }}
                        className={`status-${statusTooltip[params.value]}`}
                    >
                        {statusIcons[params.value]}
                        <span style={{ marginLeft: '5px' }}>{statusTooltip[params.value]}</span>
                    </div>
                ),
                renderEditCell: (params) => (
                    <Select
                        value={params.value}
                        onChange={(e) => params.api.setEditCellValue({ id: params.id, field: params.field, value: e.target.value })}
                        fullWidth
                    >
                        {statusOptions.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </Select>
                ),
                editable: true,
            };
        }
        return column;
    });

    return (
        <div styles = {{height: 400, width: '100%'}} className={classes.root}>
            <DataGrid
                rows={rows}
                columns={updatedColumns}
                editMode="row"
                rowModesModel={rowModesModel}
                onRowModesModelChange={handleRowModesModelChange}
                onRowEditStop={handleRowEditStop}
                processRowUpdate={processRowUpdate}
                sx={{
                    ".MuiDataGrid-columnHeaderTitle": {fontWeight: "bold"},
                    ".MuiDataGrid-cell--textCenter": {color: "lightGree"},

                }}
                getCellClassName={(params) => {
                    if(params.field === 'statusId') {
                        return params.value > 1 ? 'hot' : 'cold'
                    }
                }}
                slots={{
                    toolbar: EditToolbar,
                }}
                slotProps={{
                    toolbar: { setFunction, setRowModesModel },
                }}
            />
        </div>
           
        
    );
}