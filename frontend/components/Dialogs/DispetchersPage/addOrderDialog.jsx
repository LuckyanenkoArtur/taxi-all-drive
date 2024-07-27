// Import React Fuctionnality
import React, { useState, useEffect } from "react";

//  Import PrimeReact components
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";

// Import Custom components
import PersonAutocompleteInput from "../../Inputs/personAutocompleteInput";
import PriceInput from "../../Inputs/priceInput";
import PaymentMethodsInput from "../../Inputs/paymentMethodsInput";
import VehicleAutocompleteInput from "../../Inputs/vehicleAutocompleteInput";
import AddressAutocompleteInput from "../../Inputs/addressAutocompleteInput";
import StatusInput from "../../Inputs/statusInput";

// Import Data
import statusData from "../../../data/statusOrderPageOptions";

// Import SCSS styles
import "./addOrderDialog.scss";

const addOrderDialog = (props) => {
  const { visibleAddDialog, setVisibleAddDialog } = props;
  const [clients, setClients] = useState([
    { fullname: "Дмитриченко Артур Сергеевич" },
    { fullname: "Коваленко Евгений Владимерович" },
  ]);

  const [drivers, setDrivers] = useState([
    { fullname: "Дмитриченко Артур Сергеевич" },
    { fullname: "Коваленко Евгений Владимерович" },
  ]);
  const [addresses, setAddresses] = useState([
    { address: "г. Краснодра, ул. Московская 159/1" },
    { address: "г. Краснодра, ул. Московская 18/1" },
  ]);
  const [vehicles, setVehicles] = useState([
    { model: "BMW X6 12EC134RU" },
    { model: "BMW X6 1234566RU" },
  ]);

  const [selectedDriver, setSelectedDriver] = useState(null);
  const [selectedClient, setSelectedClient] = useState(null);
  const [selectedPickupAddress, setSelectedPickupAddress] = useState(null);
  const [selectedDestinationAddress, setSelectedDestinationAddress] =
    useState(null);
  const [selectedVehicle, setSelectedCVehicle] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [selectedPriceMethod, setSelectedPriceMethod] = useState(null);
  const [price, setPriice] = useState();

  const inputFileds = [
    {
      title: "Клиент:",
      inputBox: (
        <PersonAutocompleteInput
          personsData={clients}
          selectedPerson={selectedClient}
          setSelectedPerson={setSelectedClient}
        />
      ),
    },
    {
      title: "Водитель:",
      inputBox: (
        <PersonAutocompleteInput
          personsData={drivers}
          selectedPerson={selectedDriver}
          setSelectedPerson={setSelectedDriver}
        />
      ),
    },
    {
      title: "Автомобиль:",
      inputBox: (
        <VehicleAutocompleteInput
          vehiclesData={vehicles}
          selectedVehicle={selectedVehicle}
          setSelectedVehicle={setSelectedCVehicle}
        />
      ),
    },
    {
      title: "Адрес забора:",
      inputBox: (
        <AddressAutocompleteInput
          addressData={addresses}
          selectedAddress={selectedPickupAddress}
          setSelectedAddress={setSelectedPickupAddress}
        />
      ),
    },
    {
      title: "Адрес назначения:",
      inputBox: (
        <AddressAutocompleteInput
          addressData={addresses}
          selectedAddress={selectedDestinationAddress}
          setSelectedAddress={setSelectedDestinationAddress}
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
      inputBox: <PriceInput price={price} setPriice={setPriice} />,
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
          label="Создать"
          style={{ background: "#fdd75e", color: "black", border: "none" }}
          onClick={() => {
            const requestData = {
              client: selectedClient,
              driver: selectedDriver,
              price: price,
            };

            console.log(requestData);
          }}
        />
      </div>
    </Dialog>
  );
};

export default addOrderDialog;
