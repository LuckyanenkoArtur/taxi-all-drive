// Import React Fuctionnality
import React, { useState, useEffect } from "react";

//  Import Custom components
import PageHeader from "../components/pageHeader";
import Layout from "../layout/layout";

// Import assets
import video from "../assets/videos/v-1-1-1_TaxiAllDrive.mp4";

// Import SCSS styles for Registration page
import "./homePage.scss";

const homePage = () => {
  return (
    <Layout>
      <PageHeader arrayBreadCrumbs={[]} />
      <div className="app-preview-description-main">
        <div>
          <b>TaxiAllDrive</b> - это мощное и удобное приложение, разработанное
          специально для диспетчеров такси. Оно предоставляет все необходимые
          инструменты для эффективного управления таксопарком и обслуживания
          клиентов.
        </div>
        <br />
        <div>Основные функции:</div>
        <div>
          <ul>
            <li>
              Управление заказами: Создавайте, отслеживайте и редактируйте
              заказы в режиме реального времени.
            </li>
            <li>
              База водителей: Храните и обновляйте информацию о водителях,
              включая их статус, рейтинг и историю поездок.
            </li>
            <li>
              Управление заказами: Создавайте, отслеживайте и редактируйте
              заказы в режиме реального времени.
            </li>
            <li>
              Контроль автопарка: Отслеживайте состояние и доступность всех
              автомобилей в вашем парке.
            </li>
            <li>Управление диспечерами: Добавляйте или удаляйте диспечеров.</li>
          </ul>
        </div>
        <div>
          <b>TaxiAllDrive</b> позволяет легко добавлять и изменять данные во
          всех разделах, обеспечивая гибкость и актуальность информации. Это
          приложение станет незаменимым помощником для оптимизации работы вашей
          службы такси.
        </div>
      </div>
      <div className="app-video-preview-main">
        <video autoPlay muted>
          <source src={video} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </Layout>
  );
};

export default homePage;
