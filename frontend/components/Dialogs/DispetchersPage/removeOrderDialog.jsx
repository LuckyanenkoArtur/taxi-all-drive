// Import React Fuctionnality
import React, { useState, useEffect } from "react";

//  Import PrimeReact components
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";

// Import SCSS styles for Registration page
import "./removeOrderDialog.scss";

const removeOrderDialog = (props) => {
  const { visibleRemoveDialog, setVisibleRemoveDialog } = props;

  const [selectedId, setSelectedId] = useState(null);
  const orderIds = [{ name: "1" }, { name: "2" }];

  const inputFileds = [
    {
      title: "Номер заказа",
      inputBox: (
        <Dropdown
          value={selectedId}
          onChange={(e) => setSelectedId(e.value)}
          options={orderIds}
          optionLabel="name"
          editable
          placeholder="Выбирите номер заказа"
        />
      ),
    },
  ];

  return (
    <Dialog
      header="Удаление заказа"
      visible={visibleRemoveDialog}
      position="top"
      style={{ width: "50vw" }}
      onHide={() => {
        if (!visibleRemoveDialog) return;
        setVisibleRemoveDialog(false);
      }}
    >
      <div className="dialog-main-container">
        {inputFileds.map((inputFiled) => {
          return (
            <div key={inputFiled.title} className="dialog-input-container">
              <div className="dialog-input-title">{inputFiled.title}</div>
              <div className="diaglog-input">{inputFiled.inputBox}</div>
            </div>
          );
        })}

        <Button
          label="Удалить"
          style={{ background: "#fdd75e", color: "black", border: "none" }}
          onClick={() => {
            const requestData = {};

            console.log(requestData);
          }}
        />
      </div>
    </Dialog>
  );
};

export default removeOrderDialog;
