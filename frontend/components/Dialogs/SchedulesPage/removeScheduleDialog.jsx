// Import React Fuctionnality
import React, { useState, useRef } from "react";

// Import Redux Functionality
import { useDeleteDispatcherMutation } from "../../../api/redux/features/dispatchers/dispatchersApiSlice";

//  Import PrimeReact components
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";

// Import SCSS styles for Registration page
import "./removeScheduleDialog.scss";

const removeOrderDialog = (props) => {
  const {
    setVisibleRemoveDialog,
    visibleRemoveDialog,
    setDataTableReload,
    toastMainWindow,
    shedulesData,
  } = props;

  const [selectedId, setSelectedId] = useState(null);

  const [deleteDispatcher] = useDeleteDispatcherMutation();

  const toast = useRef(null);

  const inputFileds = [
    {
      title: "Диспечер:",
      inputBox: (
        <Dropdown
          value={selectedId}
          onChange={(e) => setSelectedId(e.value)}
          options={shedulesData}
          optionLabel="fullname"
          editable
          placeholder="Выбирите диспечера"
        />
      ),
    },
  ];

  return (
    <Dialog
      header="Удаление диспечера"
      visible={visibleRemoveDialog}
      position="top"
      style={{ width: "50vw" }}
      onHide={() => {
        if (!visibleRemoveDialog) return;
        setVisibleRemoveDialog(false);
        setSelectedId(null);
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
              id: selectedId.user_id,
            };
            deleteDispatcher(requestData)
              .unwrap()
              .then((response) => {
                setVisibleRemoveDialog(false);
                setDataTableReload(true);
                setSelectedId(null);
                toastMainWindow.current.show({
                  severity: "success",
                  summary: "Успех",
                  detail: "Диспечер успешно удален",
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
