// Import React Fuctionnality
import React, { useState, useRef } from "react";

// Import Redux Functionality
import { useDeleteClientMutation } from "../../../api/redux/features/clients/clientsApiSlice";

//  Import PrimeReact components
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";

// Import SCSS styles for Registration page

const removeOrderDialog = (props) => {
  const {
    visibleRemoveDialog,
    setVisibleRemoveDialog,
    setDataTableReload,
    toastMainWindow,
    clientsData,
  } = props;

  const [client, setSelectedClient] = useState(null);
  const [deleteClient] = useDeleteClientMutation();
  const toast = useRef(null);

  const inputFileds = [
    {
      title: "Клиент:",
      inputBox: (
        <Dropdown
          value={client}
          onChange={(e) => setSelectedClient(e.value)}
          options={clientsData}
          optionLabel="fullname"
          editable
          placeholder="Выбирите клиента"
        />
      ),
    },
  ];

  return (
    <Dialog
      header="Удаление клиента"
      visible={visibleRemoveDialog}
      position="top"
      style={{ width: "50vw" }}
      onHide={() => {
        if (!visibleRemoveDialog) return;
        setVisibleRemoveDialog(false);
        setSelectedClient(null);
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
              id: client.id,
            };
            deleteClient(requestData)
              .unwrap()
              .then((response) => {
                setVisibleRemoveDialog(false);
                setDataTableReload(true);
                setSelectedClient(null);
                toastMainWindow.current.show({
                  severity: "success",
                  summary: "Успех",
                  detail: "Клиент успешно удален",
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
