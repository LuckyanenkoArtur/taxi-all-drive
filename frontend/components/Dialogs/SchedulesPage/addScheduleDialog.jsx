// Import React Fuctionnality
import React, { useState, useRef } from "react";

// Import Redux Functionality
import { useAddDispatcherMutation } from "../../../api/redux/features/dispatchers/dispatchersApiSlice";

//  Import PrimeReact components
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";

// Import Custom components
import PhoneInput from "../../Inputs/phoneInput";
import СommentInput from "../../Inputs/commentInput";

// Import SCSS styles
import "./addScheduleDialog.scss";

const addOrderDialog = (props) => {
  const {
    setVisibleAddDialog,
    visibleAddDialog,
    setDataTableReload,
    toastMainWindow,
  } = props;

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [surename, setSurename] = useState("");
  const [phone, setPhone] = useState(null);
  const [email, setEmail] = useState(null);
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [address, setAddress] = useState(null);
  const [comment, setComment] = useState(null);
  const toast = useRef(null);

  const [addDispatcher] = useAddDispatcherMutation();

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
      title: "Эл. Почта:",
      inputBox: (
        <InputText value={email} onChange={(e) => setEmail(e.target.value)} />
      ),
    },
    {
      title: "Адрес:",
      inputBox: (
        <InputText
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      ),
    },
    {
      title: "Имя пользователя:",
      inputBox: (
        <InputText
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      ),
    },
    {
      title: "Пароль:",
      inputBox: (
        <InputText
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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
      header="Новый диспечер"
      visible={visibleAddDialog}
      position="top"
      style={{ width: "50vw" }}
      onHide={() => {
        if (!visibleAddDialog) return;
        setVisibleAddDialog(false);
        setComment(null);
        setAddress(null);
        setPassword(null);
        setUsername(null);
        setPhone(null);
        setEmail(null);
        setSurename(null);
        setLastname(null);
        setFirstname(null);
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
              phone: phone,
              comment: comment,
              username: username,
              password: password,
              address: address,
              email: email,
            };

            addDispatcher(requestData)
              .unwrap()
              .then((response) => {
                setVisibleAddDialog(false);
                setComment(null);
                setAddress(null);
                setPassword(null);
                setUsername(null);
                setPhone(null);
                setEmail(null);
                setSurename(null);
                setLastname(null);
                setFirstname(null);
                setDataTableReload(true);
                toastMainWindow.current.show({
                  severity: "success",
                  summary: "Успех",
                  detail: "Клиент успещно создан",
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
