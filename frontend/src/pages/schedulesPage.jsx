// Import React Fuctionnality
import React, { useState, useEffect, useRef } from "react";

//  Import PrimeReact components
import { Toast } from "primereact/toast";

// Import Redux Functionality
import { useGetDispatchersMutation } from "../api/redux/features/dispatchers/dispatchersApiSlice";

//  Import Custom components
import PageHeader from "../components/pageHeader";
import DataTable from "../components/dataTable";
import DataTableManipulationPanel from "../components/dataTableManipulationPanel";
import EditOrderDialog from "../components/Dialogs/SchedulesPage/editScheduleDialog";
import AddOrderDialog from "../components/Dialogs/SchedulesPage/addScheduleDialog";
import RemoveOrderDialog from "../components/Dialogs/SchedulesPage/removeScheduleDialog";
import Layout from "../layout/layout";

// Import Data
import columns from "../data/schedulesDataTableColumns";

// Import SCSS styles for Registration page
import "./schedulesPage.scss";

function schedulesPage() {
  const [shedules, setSchedules] = useState([{ id: 1 }, { id: 1 }]);
  const [clientsData, setClientsData] = useState([]);

  const [visibleEditDialog, setVisibleEditDialog] = useState(false);
  const [visibleAddDialog, setVisibleAddDialog] = useState(false);
  const [visibleRemoveDialog, setVisibleRemoveDialog] = useState(false);

  const [dataTableReload, setDataTableReload] = useState(false);

  const [getDispatchers] = useGetDispatchersMutation();
  const toast = useRef(null);

  useEffect(() => {
    getDispatchers()
      .unwrap()
      .then((response) => {
        setSchedules(response.data);
        setDataTableReload(false);
      })
      .catch((error) => {});
  }, [dataTableReload]);

  return (
    <>
      <Toast ref={toast} />
      <Layout>
        <PageHeader arrayBreadCrumbs={["Диспечера", "/dispachers"]} />
        <DataTableManipulationPanel
          // editDialog={
          //   <EditOrderDialog
          //     setVisibleEditDialog={setVisibleEditDialog}
          //     visibleEditDialog={visibleEditDialog}
          //     setDataTableReload={setDataTableReload}
          //     toastMainWindow={toast}
          //   />
          // }
          enableOpt={false}
          addDialog={
            <AddOrderDialog
              setVisibleAddDialog={setVisibleAddDialog}
              visibleAddDialog={visibleAddDialog}
              setDataTableReload={setDataTableReload}
              toastMainWindow={toast}
            />
          }
          removeDialog={
            <RemoveOrderDialog
              setVisibleRemoveDialog={setVisibleRemoveDialog}
              visibleRemoveDialog={visibleRemoveDialog}
              setDataTableReload={setDataTableReload}
              toastMainWindow={toast}
              shedulesData={shedules}
            />
          }
          // setVisibleEditDialog={setVisibleEditDialog}
          setVisibleAddDialog={setVisibleAddDialog}
          setVisibleRemoveDialog={setVisibleRemoveDialog}
        />
        <DataTable
          dataTableColumns={columns}
          dataTableData={shedules}
          dataTableEmptyMessage={"Диспечер не найден"}
        />
      </Layout>
    </>
  );
}

export default schedulesPage;
