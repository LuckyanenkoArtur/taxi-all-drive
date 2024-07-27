// Import React Fuctionnality
import React, { useState, useRef } from "react";

// Import Redux Functionality
import { useDeleteOrderMutation } from "../../../api/redux/features/orders/ordersApiSlice";

//  Import PrimeReact components
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";

// Import SCSS styles for Registration page
import "./removeOrderDialog.scss";

const removeOrderDialog = (props) => {
  const {
    setVisibleRemoveDialog,
    visibleRemoveDialog,
    setDataTableReload,
    toastMainWindow,
    ordersData,
  } = props;

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [deleteOrder] = useDeleteOrderMutation();
  const toast = useRef(null);

  const inputFileds = [
    {
      title: "Номер заказа",
      inputBox: (
        <Dropdown
          value={selectedOrder}
          onChange={(e) => setSelectedOrder(e.value)}
          options={ordersData}
          optionLabel="id"
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
        setSelectedOrder(null);
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
              id: selectedOrder.id,
            };
            deleteOrder(requestData)
              .unwrap()
              .then((response) => {
                setVisibleRemoveDialog(false);
                setDataTableReload(true);
                setSelectedOrder(null);
                toastMainWindow.current.show({
                  severity: "success",
                  summary: "Успех",
                  detail: "Заказ успешно удален",
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
