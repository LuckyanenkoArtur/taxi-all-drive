// Import React Fuctionnality
import React from "react";

// Import PrimeReact components
import { Button } from "primereact/button";

const dataTableManipulationPanel = (props) => {
  const {
    editDialog,
    addDialog,
    removeDialog,
    setVisibleEditDialog,
    setVisibleAddDialog,
    setVisibleRemoveDialog,
    enableOpt = true,
  } = props;
  return (
    <div className="orders-data-table-manipulation-panel">
      <Button
        icon="pi pi-plus"
        onClick={() => setVisibleAddDialog(true)}
        className="manipulation-panel-button"
      />
      <Button
        icon="pi pi-pencil"
        onClick={() => setVisibleEditDialog(true)}
        className="manipulation-panel-button"
        style={enableOpt ? {} : { display: "none" }}
      />
      <Button
        icon="pi pi-trash"
        onClick={() => setVisibleRemoveDialog(true)}
        className="manipulation-panel-button"
      />
      {editDialog}
      {addDialog}
      {removeDialog}
    </div>
  );
};

export default dataTableManipulationPanel;
