import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import ReportForm from "./forms/reportForm";



function ReportDialog({ open, setReportOpen, setTask }) {


  return (
    <Dialog aria-labelledby="simple-dialog-title" open={open}>
      <DialogTitle id="simple-dialog-title">LOGIN</DialogTitle>
      <DialogContent><ReportForm setTask={setTask}/></DialogContent>
      <DialogActions>
        <Button onClick={(event) => {setReportOpen(false)}}>CLOSE</Button>
      </DialogActions>
    </Dialog>
  );
}
export default ReportDialog;