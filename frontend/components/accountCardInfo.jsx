import React, { useState, useEffect } from "react";

// Import PrimeReact UI components
import { Avatar } from "primereact/avatar";

// Import Custom components
import UserProfileInfoEntryComponent from "./userProfileInfoEntry";

import { useGetUserProfileDetailsMutation } from "../api/redux/features/userprofile/userprofileApiSlice";

const accountCardInfo = (props) => {
  const [firstname, setFirstname] = useState("Отсуствует");
  const [lastname, setLastname] = useState("Отсуствует");
  const [surname, setSurename] = useState("Отсуствует");
  const [phone, setPhone] = useState("Отсуствует");
  const [email, setEmail] = useState("Отсуствует");
  const [username, setUsername] = useState("Отсуствует");
  const [password, setPassword] = useState("Отсуствует");

  const [getUserProfileDetails] = useGetUserProfileDetailsMutation();

  useEffect(() => {
    getUserProfileDetails()
      .unwrap()
      .then((response) => {
        const {
          id,
          lastname,
          firstname,
          surename,
          phone,
          email,
          username,
          password,
        } = response.data;
        setFirstname(firstname);
        setLastname(lastname);
        setSurename(surename);
        setPhone(phone);
        setEmail(email);
        setUsername(username);
        setPassword(password);
      })
      .catch((error) => {});
  }, []);

  return (
    <main className="account-main">
      <section className="account-image-section">
        <Avatar className="p-overlay-badge" icon="pi pi-user" size="xlarge" />
      </section>
      <section className="account-info-details-section">
        <div className="account-info-details-section-entries">
          <UserProfileInfoEntryComponent
            value={firstname}
            setValue={setFirstname}
            fieldLable="Имя"
          />
          <UserProfileInfoEntryComponent
            value={lastname}
            setValue={setLastname}
            fieldLable="Фамилия"
          />
          <UserProfileInfoEntryComponent
            value={surname}
            setValue={setSurename}
            fieldLable="Отчество"
          />
          <UserProfileInfoEntryComponent
            value={email}
            setValue={setEmail}
            fieldLable="Почтовый адрес"
          />
          <UserProfileInfoEntryComponent
            value={phone}
            setValue={setPhone}
            fieldLable="Моб. телефона"
          />
          <UserProfileInfoEntryComponent
            value={username}
            setValue={setUsername}
            fieldLable="Имя пользователя"
          />
          <UserProfileInfoEntryComponent
            value={password}
            setValue={setPassword}
            fieldLable="Пароль"
          />
        </div>
      </section>
    </main>
  );
};

export default accountCardInfo;
