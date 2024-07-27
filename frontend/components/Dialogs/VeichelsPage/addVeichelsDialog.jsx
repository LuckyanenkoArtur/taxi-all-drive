// Import React Fuctionnality
import React, { useState, useRef } from "react";

// Import Redux Functionality
import { useAddVeichelMutation } from "../../../api/redux/features/veichels/veichelsApiSlice";

//  Import PrimeReact components
import { Toast } from "primereact/toast";

//  Import PrimeReact components
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";

// Import Custom components
import CommentInput from "../../Inputs/commentInput";

// Import SCSS styles
import "./addVeichelsDialog.scss";

const addVeichelsDialog = (props) => {
  const {
    visibleAddDialog,
    setVisibleAddDialog,
    setDataTableReload,
    toastMainWindow,
  } = props;

  const [addVeichel] = useAddVeichelMutation();

  const [model, setModel] = useState(null);
  const [licencePlate, setLicencePlate] = useState(null);
  const [color, setColor] = useState(null);
  const [condition, setCondition] = useState(null);
  const [fuel, setFuel] = useState(null);
  const [comment, setComment] = useState(null);
  const toast = useRef(null);

  const inputFileds = [
    {
      title: "Модель | Марка:",
      inputBox: (
        <InputText value={model} onChange={(e) => setModel(e.target.value)} />
      ),
    },
    {
      title: "Номерной знак:",
      inputBox: (
        <InputText
          value={licencePlate}
          onChange={(e) => setLicencePlate(e.target.value)}
        />
      ),
    },
    {
      title: "Цвет:",
      inputBox: (
        <InputText value={color} onChange={(e) => setColor(e.target.value)} />
      ),
    },
    {
      title: "Состояние:",
      inputBox: (
        <InputText
          value={condition}
          onChange={(e) => setCondition(e.target.value)}
        />
      ),
    },
    {
      title: "Тип топлева:",
      inputBox: (
        <InputText value={fuel} onChange={(e) => setFuel(e.target.value)} />
      ),
    },
    {
      title: "Комментарий:",
      inputBox: (
        <CommentInput commentText={comment} setCommentText={setComment} />
      ),
    },
  ];

  return (
    <Dialog
      header="Новый автомобиль"
      visible={visibleAddDialog}
      position="top"
      style={{ width: "50vw" }}
      onHide={() => {
        if (!visibleAddDialog) return;
        setVisibleAddDialog(false);
        setModel(null);
        setColor(null);
        setCondition(null);
        setLicencePlate(null);
        setFuel(null);
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
          label="Создать"
          style={{ background: "#fdd75e", color: "black", border: "none" }}
          onClick={() => {
            const requestData = {
              model: model,
              color: color,
              licence_plate: licencePlate,
              condition: condition,
              fuel_type: fuel,
              comment: comment,
            };

            addVeichel(requestData)
              .unwrap()
              .then((response) => {
                setVisibleAddDialog(false);
                setDataTableReload(true);
                toastMainWindow.current.show({
                  severity: "success",
                  summary: "Успех",
                  detail: "Автомобиль успешно добавлен",
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
                      "Данный автобобиль с таким номерным знаком уже существует в базе",
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

export default addVeichelsDialog;
