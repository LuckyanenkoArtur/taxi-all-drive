// Import React Fuctionnality
import React, { useState, useRef } from "react";

// Import Redux Functionality
import { useDeleteVeichelMutation } from "../../../api/redux/features/veichels/veichelsApiSlice";
//  Import PrimeReact components
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";

// Import SCSS styles for Registration page
import "./removeVeichelsDialog.scss";

const removeOrderDialog = (props) => {
  const {
    visibleRemoveDialog,
    setVisibleRemoveDialog,
    veichelsData,
    setDataTableReload,
    toastMainWindow,
  } = props;

  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [deleteVehicle] = useDeleteVeichelMutation();
  const toast = useRef(null);

  const inputFileds = [
    {
      title: "Автомобиль",
      inputBox: (
        <Dropdown
          value={selectedVehicle}
          onChange={(e) => setSelectedVehicle(e.value)}
          options={veichelsData}
          optionLabel="veichel"
          editable
          placeholder="Выбирите автомобиль"
        />
      ),
    },
  ];

  return (
    <Dialog
      header="Удаление данные автомобиля"
      visible={visibleRemoveDialog}
      position="top"
      style={{ width: "50vw" }}
      onHide={() => {
        if (!visibleRemoveDialog) return;
        setVisibleRemoveDialog(false);
        setSelectedVehicle(null);
      }}
    >
      <Toast ref={toast} />
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
            const requestData = {
              id: selectedVehicle.id,
            };
            deleteVehicle(requestData)
              .unwrap()
              .then((response) => {
                setVisibleRemoveDialog(false);
                setDataTableReload(true);
                setSelectedVehicle(null);
                toastMainWindow.current.show({
                  severity: "success",
                  summary: "Успех",
                  detail: "Автомобиль успешно удален",
                });
              })
              .catch((error) => {
                if (error.data.message.includes("All data should be provided"))
                  return toast.current.show({
                    severity: "info",
                    summary: "Информация",
                    detail: "Заполните все поля",
                  });

                if (
                  error.data.message.includes(
                    "While creaing user error is rised"
                  )
                )
                  return toast.current.show({
                    severity: "error",
                    summary: "ERROR",
                    detail: "Something bad is happened",
                  });
              });
          }}
        />
      </div>
    </Dialog>
  );
};

export default removeOrderDialog;
