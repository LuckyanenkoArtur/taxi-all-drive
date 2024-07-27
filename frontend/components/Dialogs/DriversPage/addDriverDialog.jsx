// Import React Fuctionnality
import React, { useState, useRef } from "react";

// Import Redux Functionality
import { useAddDriverMutation } from "../../../api/redux/features/drivers/driversApiSlice";

//  Import PrimeReact components
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";

// Import Custom components
import VehicleAutocompleteInput from "../../Inputs/vehicleAutocompleteInput";
import PhoneInput from "../../Inputs/phoneInput";
import DateInput from "../../Inputs/dateInput";
import DriveLicenseCategory from "../../Inputs/driveLicenseCategory";
import DriversLicenseNumber from "../../Inputs/driversLicenseNumber";
import StatusInput from "../../Inputs/statusInput";
import СommentInput from "../../Inputs/commentInput";

// Import Data
import statusData from "../../../data/statusOrderPageOptions";

// Import SCSS styles
import "./addDriverDialog.scss";

const addOrderDialog = (props) => {
  const {
    setVisibleAddDialog,
    visibleAddDialog,
    veichelsData,
    setDataTableReload,
    toastMainWindow,
  } = props;

  const [firstname, setFirstname] = useState(null);
  const [lastname, setLastname] = useState(null);
  const [surename, setSurename] = useState(null);
  const [birthday, setBirthday] = useState(null);
  const [phone, setPhone] = useState(null);
  const [address, setAddress] = useState(null);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState();
  const [driverLicenseCategory, setDriverLicenseCategory] = useState([]);
  const [driversLicenseNumber, setDriversLicenseNumber] = useState(null);
  const [сomment, setComment] = useState(null);
  const toast = useRef(null);

  const [addDriver] = useAddDriverMutation();

  const inputFileds = [
    {
      title: "Фамилия:",
      inputBox: (
        <InputText
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
        />
      ),
    },
    {
      title: "Имя:",
      inputBox: (
        <InputText
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
        />
      ),
    },
    {
      title: "Отчество:",
      inputBox: (
        <InputText
          value={surename}
          onChange={(e) => setSurename(e.target.value)}
        />
      ),
    },
    {
      title: "Дата рождения:",
      inputBox: <DateInput date={birthday} setDate={setBirthday} />,
    },
    {
      title: "Номер телефона:",
      inputBox: <PhoneInput phone={phone} setPhone={setPhone} />,
    },
    {
      title: "Адрес проживания:",
      inputBox: (
        <InputText
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      ),
    },
    {
      title: "Номер водительского удостоверения:",
      inputBox: (
        <DriversLicenseNumber
          driversLicenseNumber={driversLicenseNumber}
          setDriversLicenseNumber={setDriversLicenseNumber}
        />
      ),
    },
    {
      title: "Категория прав:",
      inputBox: (
        <DriveLicenseCategory
          driverLicenseCategory={driverLicenseCategory}
          setDriverLicenseCategory={setDriverLicenseCategory}
        />
      ),
    },
    {
      title: "Автомабиль:",
      inputBox: (
        <VehicleAutocompleteInput
          vehiclesData={veichelsData}
          selectedVehicle={selectedVehicle}
          setSelectedVehicle={setSelectedVehicle}
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
      title: "Комментарий:",
      inputBox: (
        <СommentInput commentText={сomment} setCommentText={setComment} />
      ),
    },
  ];

  return (
    <Dialog
      header="Добавить водителя"
      position="top"
      visible={visibleAddDialog}
      style={{ width: "50vw" }}
      onHide={() => {
        if (!visibleAddDialog) return;
        setVisibleAddDialog(false);
        setFirstname(null);
        setLastname(null);
        setSurename(null);
        setBirthday(null);
        setPhone(null);
        setAddress(null);
        setSelectedVehicle(null);
        setSelectedStatus(null);
        setDriverLicenseCategory(null);
        setDriversLicenseNumber(null);
        setComment(null);
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
          label="Добавить"
          style={{ background: "#fdd75e", color: "black", border: "none" }}
          onClick={() => {
            const requestData = {
              firstname: firstname,
              lastname: lastname,
              surename: surename,
              birthday: birthday,
              phone: phone,
              address: address,
              vehicle: selectedVehicle?.id,
              status: selectedStatus.name,
              driver_licence_category: driverLicenseCategory,
              driver_licence: driversLicenseNumber,
            };

            addDriver(requestData)
              .unwrap()
              .then((response) => {
                setVisibleAddDialog(false);
                setDataTableReload(true);
                setFirstname(null);
                setLastname(null);
                setSurename(null);
                setBirthday(null);
                setPhone(null);
                setAddress(null);
                setSelectedVehicle(null);
                setSelectedStatus(null);
                setDriverLicenseCategory(null);
                setDriversLicenseNumber(null);
                setComment(null);
                toastMainWindow.current.show({
                  severity: "success",
                  summary: "Успех",
                  detail: "Водитель успешно добавлен",
                });
              })
              .catch((error) => {
                if (error.data.message.includes("All data should be provided"))
                  return toast.current.show({
                    severity: "info",
                    summary: "Информация",
                    detail: "Заполните все поля",
                  });

                if (error.data.message.includes("Vehicle exist"))
                  return toast.current.show({
                    severity: "info",
                    summary: "Информация",
                    detail:
                      "Данный водитель с таким номерным телефона уже существует в базе",
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
