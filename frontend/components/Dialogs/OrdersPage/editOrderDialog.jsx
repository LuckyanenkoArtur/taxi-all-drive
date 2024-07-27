// Import React Fuctionnality
import React, { useState, useRef, useEffect } from "react";

// Import Redux Functionality
import { useEditOrderMutation } from "../../../api/redux/features/orders/ordersApiSlice";

//  Import PrimeReact components
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";

// Import Custom components
import PersonAutocompleteInput from "../../Inputs/personAutocompleteInput";
import PriceInput from "../../Inputs/priceInput";
import PaymentMethodsInput from "../../Inputs/paymentMethodsInput";
import StatusInput from "../../Inputs/statusInput";

// Import Data
import statusData from "../../../data/statusOrderPageOptions";

// Import Custom functions
import { getSelectedClient } from "../../../utils/getSelectedClient";
import { getSelectedDriver } from "../../../utils/getSelectedDriver";

const editOrderDialog = (props) => {
  const {
    setVisibleEditDialog,
    visibleEditDialog,
    setDataTableReload,
    toastMainWindow,
    clientsData,
    driversData,
    ordersData,
  } = props;

  const [disabledOpt, setDisableOpt] = useState(true);
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [selectedClient, setSelectedClient] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [pickupAddress, setPickupAddress] = useState(null);
  const [destinationAddress, setDestinationAddress] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [selectedPriceMethod, setSelectedPriceMethod] = useState(null);
  const [price, setPrice] = useState();

  const [editOrder] = useEditOrderMutation();
  const toast = useRef(null);

  useEffect(() => {
    if (typeof selectedOrder === "object" && selectedOrder !== null) {
      const {
        driver,
        client,
        destination_address,
        pickup_address,
        status,
        price,
        pay_method,
      } = selectedOrder;

      const _selectedClient = getSelectedClient(client, clientsData);
      const _selectedDriver = getSelectedDriver(driver, driversData);

      setDisableOpt(false);
      setSelectedDriver(_selectedDriver[0]);
      setSelectedClient(_selectedClient[0]);
      setPickupAddress(destination_address);
      setDestinationAddress(pickup_address);
      setSelectedStatus(status);
      setSelectedPriceMethod(pay_method);
      setPrice(price);
      return;
    }

    setDisableOpt(true);
    setSelectedDriver(null);
    setSelectedClient(null);
    setSelectedOrder(null);
    setPickupAddress(null);
    setDestinationAddress(null);
    setSelectedStatus(null);
    setSelectedPriceMethod(null);
    setPrice(null);
    setSelectedStatus(null);
  }, [selectedOrder]);

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
    {
      title: "Клиент:",
      inputBox: (
        <PersonAutocompleteInput
          personsData={clientsData}
          selectedPerson={selectedClient}
          setSelectedPerson={setSelectedClient}
          disabled={disabledOpt}
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
          disabled={disabledOpt}
        />
      ),
    },
    {
      title: "Адрес забора:",
      inputBox: (
        <InputText
          value={pickupAddress}
          onChange={(e) => setPickupAddress(e.target.value)}
          disabled={disabledOpt}
        />
      ),
    },
    {
      title: "Адрес назначения:",
      inputBox: (
        <InputText
          value={destinationAddress}
          onChange={(e) => setDestinationAddress(e.target.value)}
          disabled={disabledOpt}
        />
      ),
    },
    {
      title: "Оплата:",
      inputBox: (
        <PaymentMethodsInput
          selectedPriceMethod={selectedPriceMethod}
          setSelectedPriceMethod={setSelectedPriceMethod}
          disabled={disabledOpt}
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
          disabled={disabledOpt}
        />
      ),
    },
    {
      title: "Cтоимость:",
      inputBox: (
        <PriceInput price={price} setPriice={setPrice} disabled={disabledOpt} />
      ),
    },
  ];

  return (
    <Dialog
      header="Измение заказа"
      position="top"
      visible={visibleEditDialog}
      style={{ width: "50vw" }}
      onHide={() => {
        if (!visibleEditDialog) return;
        setVisibleEditDialog(false);
        setSelectedDriver(null);
        setSelectedClient(null);
        setSelectedOrder(null);
        setPickupAddress(null);
        setDestinationAddress(null);
        setSelectedStatus(null);
        setSelectedPriceMethod(null);
        setPrice(null);
        setSelectedStatus(null);
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
          label="Изменить"
          style={{ background: "#fdd75e", color: "black", border: "none" }}
          onClick={() => {
            const requestData = {
              id: selectedOrder.id,
              driver: selectedDriver.id,
              client: selectedClient.id,
              pay_method: selectedPriceMethod?.name || selectedPriceMethod,
              status: selectedStatus.name || selectedStatus,
              destination_address: destinationAddress,
              pickup_address: pickupAddress,
              price: price,
            };

            editOrder(requestData)
              .unwrap()
              .then((response) => {
                setDataTableReload(true);
                setVisibleEditDialog(false);
                setSelectedDriver(null);
                setSelectedClient(null);
                setSelectedOrder(null);
                setPickupAddress(null);
                setDestinationAddress(null);
                setSelectedStatus(null);
                setSelectedPriceMethod(null);
                setPrice(null);
                setSelectedStatus(null);
                toastMainWindow.current.show({
                  severity: "success",
                  summary: "Успех",
                  detail: "Заказ успешно изменен",
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

export default editOrderDialog;
