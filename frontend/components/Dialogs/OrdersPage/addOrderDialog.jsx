// Import React Fuctionnality
import React, { useState, useRef } from "react";

// Import Redux Functionality
import { useAddOrderMutation } from "../../../api/redux/features/orders/ordersApiSlice";

//  Import PrimeReact components
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { InputText } from "primereact/inputtext";

// Import Custom components
import PersonAutocompleteInput from "../../Inputs/personAutocompleteInput";
import PriceInput from "../../Inputs/priceInput";
import PaymentMethodsInput from "../../Inputs/paymentMethodsInput";
import StatusInput from "../../Inputs/statusInput";

// Import Data
import statusData from "../../../data/statusOrderPageOptions";

// Import SCSS styles
import "./addOrderDialog.scss";

const addOrderDialog = (props) => {
  const {
    setVisibleAddDialog,
    visibleAddDialog,
    setDataTableReload,
    toastMainWindow,
    clientsData,
    driversData,
  } = props;

  const [selectedDriver, setSelectedDriver] = useState(null);
  const [selectedClient, setSelectedClient] = useState(null);
  const [pickupAddress, setPickupAddress] = useState(null);
  const [destinationAddress, setDestinationAddress] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [selectedPriceMethod, setSelectedPriceMethod] = useState(null);
  const [price, setPrice] = useState();

  const [addOrder] = useAddOrderMutation();

  const toast = useRef(null);

  const inputFileds = [
    {
      title: "Клиент:",
      inputBox: (
        <PersonAutocompleteInput
          personsData={clientsData}
          selectedPerson={selectedClient}
          setSelectedPerson={setSelectedClient}
        />
      ),
    },
    {
      title: "Водитель:",
      inputBox: (
        <PersonAutocompleteInput
          personsData={driversData}
          selectedPerson={selectedDriver}
          setSelectedPerson={setSelectedDriver}
        />
      ),
    },
    {
      title: "Адрес забора:",
      inputBox: (
        <InputText
          value={pickupAddress}
          onChange={(e) => setPickupAddress(e.target.value)}
        />
      ),
    },
    {
      title: "Адрес назначения:",
      inputBox: (
        <InputText
          value={destinationAddress}
          onChange={(e) => setDestinationAddress(e.target.value)}
        />
      ),
    },
    {
      title: "Оплата:",
      inputBox: (
        <PaymentMethodsInput
          selectedPriceMethod={selectedPriceMethod}
          setSelectedPriceMethod={setSelectedPriceMethod}
        />
      ),
    },
    {
      title: "Статус:",
      inputBox: (
        <StatusInput
          statusData={statusData}
          selectedStatus={selectedStatus}
          setSelectedStatus={setSelectedStatus}
        />
      ),
    },
    {
      title: "Cтоимость:",
      inputBox: <PriceInput price={price} setPriice={setPrice} />,
    },
  ];

  return (
    <Dialog
      header="Новый заказ"
      visible={visibleAddDialog}
      position="top"
      style={{ width: "50vw" }}
      onHide={() => {
        if (!visibleAddDialog) return;
        setVisibleAddDialog(false);
        setSelectedDriver(null);
        setSelectedClient(null);
        setPickupAddress(null);
        setDestinationAddress(null);
        setSelectedStatus(null);
        setSelectedPriceMethod(null);
        setPrice(null);
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
          label="Создать"
          style={{ background: "#fdd75e", color: "black", border: "none" }}
          onClick={() => {
            const requestData = {
              driver: selectedDriver.id,
              client: selectedClient.id,
              pay_method: selectedPriceMethod?.name || "Отсуствует",
              status: selectedStatus?.name || "Отсуствует",
              destination_address: destinationAddress,
              pickup_address: pickupAddress,
              price: price,
            };

            addOrder(requestData)
              .unwrap()
              .then((response) => {
                setVisibleAddDialog(false);
                setDataTableReload(true);
                setVisibleAddDialog(false);
                setSelectedDriver(null);
                setSelectedClient(null);
                setPickupAddress(null);
                setDestinationAddress(null);
                setSelectedStatus(null);
                setSelectedPriceMethod(null);
                setPrice(null);
                toastMainWindow.current.show({
                  severity: "success",
                  summary: "Успех",
                  detail: "Заказ успешно создан",
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

export default addOrderDialog;
