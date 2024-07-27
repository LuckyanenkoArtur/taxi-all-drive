// Import React Fuctionnality
import React, { useState, useEffect, useRef } from "react";

//  Import PrimeReact components
import { Toast } from "primereact/toast";

// Import Redux Functionality
import { useGetClientsListMutation } from "../api/redux/features/autocompletes/autocompletesApiSlice";
import { useGetDriversListMutation } from "../api/redux/features/autocompletes/autocompletesApiSlice";
import { useGetOrdersMutation } from "../api/redux/features/orders/ordersApiSlice";

//  Import Custom components
import PageHeader from "../components/pageHeader";
import DataTable from "../components/dataTable";
import DataTableManipulationPanel from "../components/dataTableManipulationPanel";
import EditOrderDialog from "../components/Dialogs/OrdersPage/editOrderDialog";
import AddOrderDialog from "../components/Dialogs/OrdersPage/addOrderDialog";
import RemoveOrderDialog from "../components/Dialogs/OrdersPage/removeOrderDialog";
import Layout from "../layout/layout";

// Import Data
import columns from "../data/orderDataTableColumns";

// Import SCSS styles for Registration page
import "./ordersPage.scss";

function ordersPage() {
  const [orders, setOrders] = useState([]);

  const [clientsData, setClientsData] = useState([]);
  const [driversData, setDriversData] = useState([]);

  // Autocomplites
  const [getClients] = useGetClientsListMutation();
  const [getDrivers] = useGetDriversListMutation();
  const [getOrders] = useGetOrdersMutation();

  const [dataTableReload, setDataTableReload] = useState(false);

  const [visibleEditDialog, setVisibleEditDialog] = useState(false);
  const [visibleAddDialog, setVisibleAddDialog] = useState(false);
  const [visibleRemoveDialog, setVisibleRemoveDialog] = useState(false);

  const toast = useRef(null);

  useEffect(() => {
    getClients()
      .unwrap()
      .then((response) => {
        setClientsData(response.data);
      })
      .catch((error) => {});

    getDrivers()
      .unwrap()
      .then((response) => {
        setDriversData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    getOrders()
      .unwrap()
      .then((response) => {
        setOrders(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [dataTableReload]);

  return (
    <>
      <Toast ref={toast} />
      <Layout>
        <PageHeader arrayBreadCrumbs={["Заказы", "/orders"]} />
        <DataTableManipulationPanel
          editDialog={
            <EditOrderDialog
              setVisibleEditDialog={setVisibleEditDialog}
              visibleEditDialog={visibleEditDialog}
              setDataTableReload={setDataTableReload}
              toastMainWindow={toast}
              clientsData={clientsData}
              driversData={driversData}
              ordersData={orders}
            />
          }
          addDialog={
            <AddOrderDialog
              setVisibleAddDialog={setVisibleAddDialog}
              visibleAddDialog={visibleAddDialog}
              setDataTableReload={setDataTableReload}
              toastMainWindow={toast}
              clientsData={clientsData}
              driversData={driversData}
            />
          }
          removeDialog={
            <RemoveOrderDialog
              setVisibleRemoveDialog={setVisibleRemoveDialog}
              visibleRemoveDialog={visibleRemoveDialog}
              setDataTableReload={setDataTableReload}
              toastMainWindow={toast}
              ordersData={orders}
            />
          }
          setVisibleEditDialog={setVisibleEditDialog}
          setVisibleAddDialog={setVisibleAddDialog}
          setVisibleRemoveDialog={setVisibleRemoveDialog}
        />
        <DataTable
          dataTableColumns={columns}
          dataTableData={orders}
          dataTableEmptyMessage={"Заказ не найден"}
        />
      </Layout>
    </>
  );
}

export default ordersPage;
