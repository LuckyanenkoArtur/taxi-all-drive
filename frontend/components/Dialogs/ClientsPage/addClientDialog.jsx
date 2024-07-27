// Import React Fuctionnality
import React, { useState, useRef } from "react";

// Import Redux Functionality
import { useAddClientMutation } from "../../../api/redux/features/clients/clientsApiSlice";

//  Import PrimeReact components
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";

// Import Custom components
import PhoneInput from "../../Inputs/phoneInput";
import StatusInput from "../../Inputs/statusInput";
import СommentInput from "../../Inputs/commentInput";

// Import Data
import statusData from "../../../data/statusClientsPageOptions";

// Import SCSS styles
// import "./addOrderDialog.scss";

const addOrderDialog = (props) => {
  const {
    visibleAddDialog,
    setVisibleAddDialog,
    setDataTableReload,
    toastMainWindow,
  } = props;

  const [addClient] = useAddClientMutation();

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [surename, setSurename] = useState("");
  const [phone, setPhone] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [comment, setComment] = useState(null);
  const toast = useRef(null);

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
      title: "Номер телефона:",
      inputBox: <PhoneInput phone={phone} setPhone={setPhone} />,
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
        <СommentInput commentText={comment} setCommentText={setComment} />
      ),
    },
  ];

  return (
    <Dialog
      header="Новый клиент"
      visible={visibleAddDialog}
      position="top"
      style={{ width: "50vw" }}
      onHide={() => {
        if (!visibleAddDialog) return;
        setVisibleAddDialog(false);
        setFirstname("");
        setLastname("");
        setSurename("");
        setPhone("");
        setSelectedStatus("");
        setComment("");
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
              firstname: firstname,
              lastname: lastname,
              surename: surename,
              status: selectedStatus.name || "Отсуствует",
              phone: phone,
              comment: comment,
            };

            addClient(requestData)
              .unwrap()
              .then((response) => {
                setVisibleAddDialog(false);
                setDataTableReload(true);
                toastMainWindow.current.show({
                  severity: "success",
                  summary: "Успех",
                  detail: "Клиент успещно создан",
                });
                setFirstname("");
                setLastname("");
                setSurename("");
                setPhone("");
                setSelectedStatus("");
                setComment("");
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
                      "Данный клиент с таким номер телефона уже существует в базе",
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
