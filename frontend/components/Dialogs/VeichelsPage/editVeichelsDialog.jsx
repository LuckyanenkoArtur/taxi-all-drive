// Import React Fuctionnality
import React, { useEffect, useState, useRef } from "react";

// Import Redux Functionality
import { useEditVeichelMutation } from "../../../api/redux/features/veichels/veichelsApiSlice";

//  Import PrimeReact components
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";

// Import Custom components
import CommentInput from "../../Inputs/commentInput";
import VehicleAutocompleteInput from "../../Inputs/vehicleAutocompleteInput";

// Import Data
import statusData from "../../../data/statusOrderPageOptions";

const editOrderDialog = (props) => {
  const {
    visibleEditDialog,
    setVisibleEditDialog,
    setDataTableReload,
    toastMainWindow,
    veichelsData,
  } = props;

  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [disabledOpt, setDisableOpt] = useState(true);
  const [veichleId, setVeichleId] = useState(null);
  const [model, setModel] = useState(null);
  const [color, setColor] = useState(null);
  const [licencePlate, setLicencePlate] = useState(null);
  const [condition, setCondition] = useState(null);
  const [fuel, setFuel] = useState(null);
  const [comment, setComment] = useState(null);
  const toast = useRef(null);

  const [editVeichel] = useEditVeichelMutation();

  const inputFileds = [
    {
      title: "Автомобиль:",
      inputBox: (
        <VehicleAutocompleteInput
          vehiclesData={veichelsData}
          selectedVehicle={selectedVehicle}
          setSelectedVehicle={setSelectedVehicle}
        />
      ),
    },
    {
      title: "Модель | Марка:",
      inputBox: (
        <InputText
          value={model}
          onChange={(e) => setModel(e.target.value)}
          disabled={disabledOpt}
        />
      ),
    },
    {
      title: "Номерной знак:",
      inputBox: (
        <InputText
          value={licencePlate}
          onChange={(e) => setLicencePlate(e.target.value)}
          disabled={disabledOpt}
        />
      ),
    },
    {
      title: "Цвет:",
      inputBox: (
        <InputText
          value={color}
          onChange={(e) => setColor(e.target.value)}
          disabled={disabledOpt}
        />
      ),
    },
    {
      title: "Состояние:",
      inputBox: (
        <InputText
          value={condition}
          onChange={(e) => setCondition(e.target.value)}
          disabled={disabledOpt}
        />
      ),
    },
    {
      title: "Тип топлева:",
      inputBox: (
        <InputText
          value={fuel}
          onChange={(e) => setFuel(e.target.value)}
          disabled={disabledOpt}
        />
      ),
    },
    {
      title: "Комментарий:",
      inputBox: (
        <CommentInput
          commentText={comment}
          setCommentText={setComment}
          disabled={disabledOpt}
        />
      ),
    },
  ];

  useEffect(() => {
    if (typeof selectedVehicle === "object" && selectedVehicle !== null) {
      const {
        id,
        model,
        color,
        tech_condition,
        fuel_type,
        licence_plate,
        comment,
      } = selectedVehicle;

      setDisableOpt(false);
      setVeichleId(id);
      setModel(model);
      setColor(color);
      setLicencePlate(licence_plate);
      setCondition(tech_condition);
      setFuel(fuel_type);
      setComment(comment);
      return;
    }

    setDisableOpt(true);
    setVeichleId(null);
    setModel("");
    setColor("");
    setLicencePlate("");
    setCondition("");
    setFuel("");
    setComment("");
  }, [selectedVehicle]);

  return (
    <Dialog
      header="Измение данных об автомобиле"
      position="top"
      visible={visibleEditDialog}
      style={{ width: "50vw" }}
      onHide={() => {
        if (!visibleEditDialog) return;
        setVisibleEditDialog(false);

        setVeichleId(null);
        setModel("");
        setColor("");
        setLicencePlate("");
        setCondition("");
        setFuel("");
        setComment("");
        setSelectedVehicle({});
        setDisableOpt(true);
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
              id: veichleId,
              model: model,
              color: color,
              tech_condition: condition,
              fuel_type: fuel,
              licence_plate: licencePlate,
              comment: comment,
            };

            editVeichel(requestData)
              .unwrap()
              .then((response) => {
                setVisibleEditDialog(false);
                setDataTableReload(true);
                setVeichleId(null);
                setModel("");
                setColor("");
                setLicencePlate("");
                setCondition("");
                setFuel("");
                setComment("");
                setDisableOpt(true);

                toastMainWindow.current.show({
                  severity: "success",
                  summary: "Успех",
                  detail: "Данные об автомобиле успешно изменнены",
                });
              })
              .catch((error) => {
                if (error.data.message.includes("All data should be provided"))
                  return toast.current.show({
                    severity: "info",
                    summary: "Информация",
                    detail: "Заполните все поля",
                  });

                if (error.data.message.includes("Client exist"))
                  return toast.current.show({
                    severity: "info",
                    summary: "Информация",
                    detail:
                      "Данный автомобиль с таким номер знаком уже существует в базе",
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
