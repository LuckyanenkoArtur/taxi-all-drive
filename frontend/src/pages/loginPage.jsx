// Import React Functionality
import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

// Import Redux Functionality
import { setCredentials } from "../api/redux/features/authentication/authSlice";
import { useLoginMutation } from "../api/redux/features/authentication/authApiSlice";
import { useDispatch } from "react-redux";

// Import PrimeReact UI components
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";

// Import SCSS styles for Registration page
import "./loginPage.scss";

const loginPage = () => {
  const dispath = useDispatch();
  const navigate = useNavigate();
  const toastError = useRef(null);

  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const [sendAuthData] = useLoginMutation();

  const sendAuthHandeler = () => {
    sendAuthData({
      username: username,
      password: password,
    })
      .unwrap()
      .then((data) => {
        dispath(setCredentials({ token: data.acessToken }));
        navigate("/");
      })
      .catch((err) => {
        toastError.current.show({
          severity: "error",
          summary: "Ошибка при входе",
          detail: `${err.data.message}`,
        });
      });
  };

  return (
    <div className="login-main-container">
      <Toast ref={toastError} />
      <div className="login-main-info-part">
        <div className="logo">TaxiAllDrive 🚖</div>
        <div className="login-form">
          <div className="login-form-entry">
            <div className="test">Логин:</div>
            <InputText
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <div className="test">Пароль:</div>
            <Password
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              toggleMask
              feedback={false}
            />
          </div>
        </div>
        <Button
          label="Войти"
          onClick={sendAuthHandeler}
          style={{ background: "#fdd75e", color: "black", border: "none" }}
        />
      </div>
    </div>
  );
};

export default loginPage;
