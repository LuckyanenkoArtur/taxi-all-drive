// Import React Fuctionnality
import React, { useState, useRef } from "react";

// Import Redux Functionality
import { useDeleteDriverMutation } from "../../../api/redux/features/drivers/driversApiSlice";

//  Import PrimeReact components
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";

// Import SCSS styles for Registration page

const removeOrderDialog = (props) => {
  const {
    setVisibleRemoveDialog,
    visibleRemoveDialog,
    driversData,
    setDataTableReload,
    toastMainWindow,
  } = props;

  const [selectedDriver, setSelectedDriver] = useState(null);
  const toast = useRef(null);

  const [deleteDriver] = useDeleteDriverMutation();

  const inputFileds = [
    {
      title: "Водитель",
      inputBox: (
        <Dropdown
          value={selectedDriver}
          onChange={(e) => setSelectedDriver(e.value)}
          options={driversData}
          optionLabel="fullname"
          editable
          placeholder="Выбирите водителя"
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
        setSelectedDriver(null);
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
              id: selectedDriver.id,
            };
            deleteDriver(requestData)
              .unwrap()
              .then((response) => {
                setVisibleRemoveDialog(false);
                setDataTableReload(true);
                setSelectedDriver(null);
                toastMainWindow.current.show({
                  severity: "success",
                  summary: "Успех",
                  detail: "Водитель успешно удален",
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
