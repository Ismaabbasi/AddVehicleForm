import React, { useEffect } from "react";
import ReactDataGrid from "@inovua/reactdatagrid-community";
import DataTable from "react-data-table-component";

const getVehicles = async () => {
  const token = localStorage.getItem("token");
  const body = { ...values, state: "Maryland" };
  const res = await axios.get(
    "https://usquare-test-apis.onrender.com/vehicle",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
useEffect(() => {
  getVehicles();
});
const ViewVehicle = () => {
  const columns = [
    {
      name: "S.NO",
      selector: (row) => row.title,
      sortable: true,
    },
    {
      name: "Purchase Date",
      selector: (row) => row.year,
      sortable: true,
    },
    {
      name: "Imge",
      selector: (row) => row.year,
      sortable: true,
    },
    {
      name: "Stock.No",
      selector: (row) => row.year,
      sortable: true,
    },
    {
      name: "Year",
      selector: (row) => row.title,
      sortable: true,
    },
    {
      name: "Make",
      selector: (row) => row.title,
      sortable: true,
    },
    {
      name: "Model",
      selector: (row) => row.title,
      sortable: true,
    },
    {
      name: "Color",
      selector: (row) => row.title,
      sortable: true,
    },
    {
      name: "Vehicle Status",
      selector: (row) => row.title,
      sortable: true,
    },
    {
      name: "Assign To",
      selector: (row) => row.title,
      sortable: true,
    },
    {
      name: "Details",
      selector: (row) => row.title,
      sortable: true,
    },
  ];

  const data = [
    {
      id: 1,
      title: "Beetlejuice",
      year: "1988",
    },
    {
      id: 2,
      title: "Ghostbusters",
      year: "1984",
    },
  ];
  return (
    <>
      {/* <ReactDataGrid /> */}

      <div>
        {/* <h1 style={{ backgroundColor: "black", color: "white" }}>
          View Vehicle
        </h1> */}
        <DataTable columns={columns} data={data} />
      </div>
    </>
  );
};

export default ViewVehicle;
