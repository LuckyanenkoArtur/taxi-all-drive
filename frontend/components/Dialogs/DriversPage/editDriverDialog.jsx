// Import React Fuctionnality
import React, { useState, useEffect, useRef } from "react";

// Import Redux Functionality
import { useEditDriverMutation } from "../../../api/redux/features/drivers/driversApiSlice";

//  Import PrimeReact components
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";

// Import Custom components
import PersonAutocompleteInput from "../../Inputs/personAutocompleteInput";
import VehicleAutocompleteInput from "../../Inputs/vehicleAutocompleteInput";
import PhoneInput from "../../Inputs/phoneInput";
import DateInput from "../../Inputs/dateInput";
import DriveLicenseCategory from "../../Inputs/driveLicenseCategory";
import DriversLicenseNumber from "../../Inputs/driversLicenseNumber";
import StatusInput from "../../Inputs/statusInput";
import СommentInput from "../../Inputs/commentInput";

// Import Data
import statusData from "../../../data/statusOrderPageOptions";

// Import Custom functions
import getSelectedCategories from "../../../utils/getSelectedCategories";
import { getSelectedVeichel } from "../../../utils/getSelectedVeichel";

const editDriverDialog = (props) => {
  const {
    setVisibleEditDialog,
    visibleEditDialog,
    veichelsData,
    driversData,
    setDataTableReload,
    toastMainWindow,
  } = props;

  const [disabledOpt, setDisableOpt] = useState(true);
  const [driverId, setDriverId] = useState({});
  const [firstname, setFirstname] = useState(null);
  const [lastname, setLastname] = useState(null);
  const [surename, setSurename] = useState(null);
  const [birthday, setBirthday] = useState(null);
  const [phone, setPhone] = useState(null);
  const [address, setAddress] = useState(null);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState();
  const [driverLicenseCategory, setDriverLicenseCategory] = useState([]);
  const [driversLicenseNumber, setDriversLicenseNumber] = useState(null);
  const [comment, setComment] = useState(null);

  const [editDriver] = useEditDriverMutation();

  const toast = useRef(null);

  useEffect(() => {
    if (typeof selectedDriver === "object" && selectedDriver !== null) {
      const {
        id,
        fullname,
        birthday,
        status,
        driver_licence,
        driver_licence_category,
        veichel,
        phone,
        address,
        comment,
      } = selectedDriver;
      const [lastname, firstname, surename] = fullname?.split(" ") ?? [];
      const selectedVeichel = getSelectedVeichel(veichel, veichelsData);

      setDisableOpt(false);
      setDriverId(id);
      setFirstname(firstname);
      setLastname(lastname);
      setSurename(surename);
      setBirthday(birthday);
      setPhone(phone);
      setAddress(address);
      setSelectedVehicle(selectedVeichel[0]);
      setSelectedStatus(status);
      setDriverLicenseCategory(getSelectedCategories(driver_licence_category));
      setDriversLicenseNumber(driver_licence);
      setComment(comment);

      return;
    }

    setDisableOpt(true);
    setDriverId(null);
    setFirstname("");
    setLastname("");
    setSurename("");
    setBirthday(null);
    setPhone(null);
    setAddress(null);
    setSelectedVehicle(null);
    setSelectedStatus(null);
    setDriverLicenseCategory(null);
    setDriversLicenseNumber(null);
    setComment(null);
  }, [selectedDriver]);

  const inputFileds = [
    {
      title: "ФИО:",
      inputBox: (
        <PersonAutocompleteInput
          personsData={driversData}
          selectedPerson={selectedDriver}
          setSelectedPerson={setSelectedDriver}
        />
      ),
    },
    {
      title: "Фамилия:",
      inputBox: (
        <InputText
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
          disabled={disabledOpt}
        />
      ),
    },
    {
      title: "Имя:",
      inputBox: (
        <InputText
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
          disabled={disabledOpt}
        />
      ),
    },
    {
      title: "Отчество:",
      inputBox: (
        <InputText
          value={surename}
          onChange={(e) => setSurename(e.target.value)}
          disabled={disabledOpt}
        />
      ),
    },
    {
      title: "Дата рождения:",
      inputBox: (
        <DateInput
          date={birthday}
          setDate={setBirthday}
          disabled={disabledOpt}
        />
      ),
    },
    {
      title: "Номер телефона:",
      inputBox: (
        <PhoneInput phone={phone} setPhone={setPhone} disabled={disabledOpt} />
      ),
    },
    {
      title: "Адрес проживания:",
      inputBox: (
        <InputText
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          disabled={disabledOpt}
        />
      ),
    },
    {
      title: "Номер водительского удостоверения:",
      inputBox: (
        <DriversLicenseNumber
          driversLicenseNumber={driversLicenseNumber}
          setDriversLicenseNumber={setDriversLicenseNumber}
          disabled={disabledOpt}
        />
      ),
    },
    {
      title: "Категория прав:",
      inputBox: (
        <DriveLicenseCategory
          driverLicenseCategory={driverLicenseCategory}
          setDriverLicenseCategory={setDriverLicenseCategory}
          disabled={disabledOpt}
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
      title: "Комментарий:",
      inputBox: (
        <СommentInput
          commentText={comment}
          setCommentText={setComment}
          disabled={disabledOpt}
        />
      ),
    },
  ];

  return (
    <Dialog
      header="Измение данных водителя"
      position="top"
      visible={visibleEditDialog}
      style={{ width: "50vw" }}
      onHide={() => {
        if (!visibleEditDialog) return;
        setDriverId(null);
        setFirstname("");
        setLastname("");
        setSurename("");
        setBirthday(null);
        setPhone(null);
        setAddress(null);
        setSelectedVehicle(null);
        setSelectedStatus(null);
        setDriverLicenseCategory(null);
        setDriversLicenseNumber(null);
        setComment(null);
        setVisibleEditDialog(false);
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
              id: driverId,
              firstname: firstname,
              lastname: lastname,
              surename: surename,
              birthday: birthday,
              phone: phone,
              address: address,
              vehicle: selectedVehicle?.id,
              status: selectedStatus.name || selectedStatus,
              driver_licence_category: driverLicenseCategory,
              driver_licence: driversLicenseNumber,
              comment: comment,
            };

            editDriver(requestData)
              .unwrap()
              .then((response) => {
                setVisibleEditDialog(false);
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
                  detail: "Водитель успешно изменен",
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

export default editDriverDialog;
