import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import TaskForm from "./forms/taskForm";



function TaskDialog({ open, setTaskOpen, setTask }) {


  return (
    <Dialog aria-labelledby="simple-dialog-title" open={open}>
      <DialogTitle id="simple-dialog-title">LOGIN</DialogTitle>
      <DialogContent><TaskForm setTask={setTask}/></DialogContent>
      <DialogActions>
        <Button onClick={(event) => {setTaskOpen(false)}}>CLOSE</Button>
      </DialogActions>
    </Dialog>
  );
}
export default TaskDialog;