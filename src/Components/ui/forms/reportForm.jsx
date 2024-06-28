import { Button, TextField } from "@mui/material";
import { Controller, useForm, useFormState } from "react-hook-form";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import React from "react";
import Box from "@mui/material/Box";
import Swal from "sweetalert2";
import { getTask, updateTaskId } from "../../api/apiTask";

function ReportForm({ setTask, handleClose }) {
  const { handleSubmit, control } = useForm();
  const { errors } = useFormState({
    control,
  });
  const onSubmit = async (data) => {
    try {
      console.log(1, data);
      await updateTaskId(data, data.id);
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
      setTask((await getTask()).data.data);
      handleClose();
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
  };

  return (
    <div style={{ display: "flex", justifyContent: "space-evenly" }}>
      <Box mr={3} style={{ width: "50%", borderright: "25%" }}>
        <form onSubmit={handleSubmit(onSubmit)} style={{ borderright: "25%" }}>
          <Controller
            control={control}
            name="id"
            rules={{ required: "обязательно к заполнению" }}
            render={({ field }) => (
              <TextField
                autoFocus
                margin="dense"
                name="id"
                label="Идентификатор"
                type="text"
                fullWidth={true}
                onChange={(e) => field.onChange(e)}
                value={field.value || ""}
                error={!!errors.id?.message}
                helperText={errors.id?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="executorDescription"
            rules={{ required: "обязательно к заполнению" }}
            render={({ field }) => (
              <TextField
                style={{ marginTop: "10%" }}
                autoFocus
                margin="dense"
                name="executorDescription"
                label="Короткий доклад"
                type="text"
                fullWidth={true}
                onChange={(e) => field.onChange(e)}
                value={field.value || ""}
                error={!!errors.taskExecutorId?.message}
                helperText={errors.taskExecutorId?.message}
              />
            )}
          />

          <Controller
            style={{ marginTop: "10%" }}
            control={control}
            name="statusId"
            rules={{ required: "обязательно к заполнению" }}
            render={({ field }) => (
              <div>
                <InputLabel style={{ paddingLeft: "1rem", fontSize: "0.8rem" }}>
                  Id статус
                </InputLabel>
                <Select
                  autoFocus
                  marginBotton="dense"
                  name="statusId"
                  label="statusId"
                  type="select"
                  fullWidth={true}
                  onChange={(e) => field.onChange(e)}
                  value={field.value || ""}
                >
                  <MenuItem value={1}>создано</MenuItem>
                  <MenuItem value={2}>выполняется</MenuItem>
                  <MenuItem value={3}>остановлено</MenuItem>
                  <MenuItem value={4}>завершено</MenuItem>
                  <MenuItem value={5}>отложено</MenuItem>
                  <MenuItem value={6}>закрыто</MenuItem>
                </Select>
              </div>
            )}
          />
          <Button type="submit" fullWidth={true} variant="contained">
            доложить о выполнении
          </Button>
        </form>
      </Box>
    </div>
  );
}

export default ReportForm;
