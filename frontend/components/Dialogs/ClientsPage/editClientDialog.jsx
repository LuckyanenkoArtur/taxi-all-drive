// Import React Fuctionnality
import React, { useEffect, useState, useRef } from "react";

// Import Redux Functionality
import { useEditClientMutation } from "../../../api/redux/features/clients/clientsApiSlice";

//  Import PrimeReact components
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";

// Import Custom components
import PersonAutocompleteInput from "../../Inputs/personAutocompleteInput";
import PhoneInput from "../../Inputs/phoneInput";
import StatusInput from "../../Inputs/statusInput";
import СommentInput from "../../Inputs/commentInput";

// Import Data
import statusData from "../../../data/statusClientsPageOptions";

const editOrderDialog = (props) => {
  const {
    visibleEditDialog,
    setVisibleEditDialog,
    setDataTableReload,
    toastMainWindow,
    clientsData,
  } = props;

  const [editClient] = useEditClientMutation();

  const [selectedClient, setSelectedClient] = useState({});
  const [clientId, setClientId] = useState({});
  const [disabledOpt, setDisableOpt] = useState(true);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [surename, setSurename] = useState("");
  const [phone, setPhone] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [comment, setComment] = useState(null);
  const toast = useRef(null);

  useEffect(() => {
    if (typeof selectedClient === "object" && selectedClient !== null) {
      const { id, fullname, status, phone, comment } = selectedClient;
      const [lastname, firstname, surename] = fullname?.split(" ") ?? [];
      setDisableOpt(false);
      setClientId(id);
      setFirstname(firstname);
      setLastname(lastname);
      setSurename(surename);
      setPhone(phone);
      setSelectedStatus(status);
      setComment(comment);
      return;
    }

    setDisableOpt(true);
    setClientId(null);
    setFirstname("");
    setLastname("");
    setSurename("");
    setPhone("");
    setSelectedStatus("");
    setComment("");
  }, [selectedClient]);

  const inputFileds = [
    {
      title: "ФИО:",
      inputBox: (
        <PersonAutocompleteInput
          personsData={clientsData}
          selectedPerson={selectedClient}
          setSelectedPerson={setSelectedClient}
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
      title: "Номер телефона:",
      inputBox: (
        <PhoneInput phone={phone} setPhone={setPhone} disabled={disabledOpt} />
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
      header="Изменить данные об клиенте"
      visible={visibleEditDialog}
      position="top"
      style={{ width: "50vw" }}
      onHide={() => {
        if (!visibleEditDialog) return;
        setVisibleEditDialog(false);
        setClientId(null);
        setFirstname("");
        setLastname("");
        setSurename("");
        setPhone("");
        setSelectedStatus("");
        setComment("");
        setSelectedClient({});
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
              id: clientId,
              firstname: firstname,
              lastname: lastname,
              surename: surename,
              status: selectedStatus.name || "Отсуствует",
              phone: phone,
              comment: comment,
            };

            editClient(requestData)
              .unwrap()
              .then((response) => {
                setVisibleEditDialog(false);
                setDataTableReload(true);
                setClientId(null);
                setFirstname("");
                setLastname("");
                setSurename("");
                setPhone("");
                setSelectedStatus("");
                setComment("");
                setDisableOpt(true);

                toastMainWindow.current.show({
                  severity: "success",
                  summary: "Успех",
                  detail: "Данные об клиенте успешно изменнены",
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

export default editOrderDialog;
