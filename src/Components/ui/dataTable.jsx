import React from "react";
import { DataGrid } from "@mui/x-data-grid";

const DataTable = ({ rows, columns}) => {
  // функция указывает на пользовательские id в таблице


  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        editMode="row"
        rows={rows}
        columns={columns}
        processRowUpdate={(updatedRow, originalRow) => console.log(updatedRow)}
        onProcessRowUpdateError={(error) => console.log(error)} 
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        sx={{ ".MuiDataGrid-columnHeaderTitle": { fontWeight: "bold" }}}
      />
    </div>
  );
};

export default DataTable;
