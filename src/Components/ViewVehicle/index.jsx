import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import axios from "axios";
import { Edit, EyeOff } from "tabler-icons-react";
import {
  Button,
  Grid,
  Group,
  Modal,
  Paper,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useNavigate, useParams } from "react-router-dom";

const ViewVehicle = () => {
  const [vehicleData, setVehicleData] = useState([]);
  const [opened, { open, close }] = useDisclosure(false);
  const [modalData, setModalData] = useState(null);
  const getVehicles = async () => {
    const token = localStorage.getItem("token");
    // const body = { ...values, state: "Maryland" };
    const res = await axios.get(
      "https://usquare-test-apis.onrender.com/vehicle",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("res", res.data.data);
    setVehicleData(res.data.data);
  };
  useEffect(() => {
    getVehicles();
  }, []);

  const params = useParams();
  console.log("param", params);
  console.log("id", params?.id);

  const columns = [
    {
      name: "S.No",
      selector: (row, index) => index + 1,
      // selector: Id
    },
    {
      name: "Purchase Date",
      selector: (row) => row.purchaseDate,
      sortable: true,
    },
    {
      name: "Image",
      cell: (row) => (
        <img src={row.createdBy.image} alt="Item" style={{ width: "50px" }} />
      ),
      sortable: true,
    },
    // {
    //   name: "VIN",
    //   selector: (row) => row.VIN,
    //   sortable: true,
    // },
    {
      name: "Stock Number",
      // selector:(row)=> row.VIN.slice(10,)
      // selector:(row)=> row.VIN.splite("")
      selector: (row) => row.VIN.substr(10, 16),
    },
    {
      name: "Year",
      selector: (row) => row.year,
      sortable: true,
    },
    {
      name: "Make",
      selector: (row) => row.make,
    },
    {
      name: "Model",
      selector: (row) => row.model,
    },
    {
      name: "Color",
      selector: (row) => row.exteriorColor,
    },
    {
      name: "Vehicle Title",
      selector: (row) => row.vehicleTitle,
      sortable: true,
    },
    {
      name: "Vehicle Condition",
      selector: (row) => row.condition,
    },
    {
      name: "Details",
      selector: (row) => (
        <Group position="center">
          <Edit onClick={() => navigate(`/${row.id}`)} />
          <EyeOff
            onClick={() => {
              setModalData(row);
              open();
            }}
          />
        </Group>
      ),
    },
  ];
  const [searchName, setSearchName] = useState();
  const handleFilter = (event) => {
    const findName = vehicleData.filter((singleRow) => {
      return singleRow.color
        .toLowerCase()
        .includes(event.target.value.toLowerCase());
    });
    setSearchName(findName);
  };
  const navigate = useNavigate();
  return (
    <>
      
      <div>
        {/* <h1 style={{ backgroundColor: "black", color: "white" }}>
          View Vehicle
        </h1> */}
        <div>
          <input type="text" onChange={handleFilter} />
        </div>
        <div>
          <Button onClick={()=>navigate("/")}>Add Vehicle
          </Button></div>
        <Modal opened={opened} onClose={close} withCloseButton={true} size="lg">
          <Paper p={10} shadow="md">
            <Title order={4}>Vehicle Details</Title>
            <Grid>
              {/* <Grid.Col order={3} span={12}>vehicle Details</Grid.Col> */}
              <Grid.Col span={6}>
                <Text color="#7393B3" weight={700} >VIN</Text>
                <Text>{modalData?.VIN}</Text>
              </Grid.Col>
              <Grid.Col span={6}>
                <Text color="#7393B3" weight={700} >Condition</Text>
                <Text>{modalData?.condition}</Text>
              </Grid.Col>
              <Grid.Col span={6}>
                <Text color="#7393B3" weight={700}>Vehicle Type</Text>
                <Text>{modalData?.vehicleType}</Text>
              </Grid.Col>
              <Grid.Col span={6}>
                <Text color="#7393B3" weight={700}  >Color</Text>
                <Text>{modalData?.exteriorColor}</Text>
              </Grid.Col>
              <Grid.Col span={6}>
                <Text color="#7393B3" weight={700} >Date</Text>
                <Text>{modalData?.purchaseDate}</Text>
              </Grid.Col>
              <Grid.Col span={6}>
                <Text color="#7393B3" weight={700} >status</Text>
                <Text>{modalData?.status}</Text>
              </Grid.Col>
              <Grid.Col span={6}>
                <Text color="#7393B3" weight={700} >Transmission</Text>
                <Text>{modalData?.transmission}</Text>
              </Grid.Col>
              <Grid.Col span={6}>
                <Text color="#7393B3" weight={700} >Floor Company</Text>
                <Text>{modalData?.floorCompany}</Text>
              </Grid.Col>
              <Grid.Col span={6}>
                <Text color="#7393B3" weight={700} >Floor Company</Text>
                <Text>{modalData?.floorCompany}</Text>
              </Grid.Col>
              
              <Grid.Col span={6}>
                <Text color="#7393B3" weight={700} >Purchase Price</Text>
                <Text>{modalData?.vehiclePurchasePrice}</Text>
              </Grid.Col>
              <Grid.Col span={6}>
                <Text color="#7393B3" weight={700} >Retail Price</Text>
                <Text>{modalData?.vehicleRetailPrice}</Text>
              </Grid.Col>
              <Grid.Col span={6}>
                <Text color="#7393B3" weight={700} >Make</Text>
                <Text>{modalData?.make}</Text>
              </Grid.Col>
              <Grid.Col span={6}>
                <Text color="#7393B3" weight={700} >Year</Text>
                <Text>{modalData?.year}</Text>
              </Grid.Col>
              <Grid.Col span={6}>
                <Text color="#7393B3" weight={700} >Engine</Text>
                <Text>{modalData?.engine}</Text>
              </Grid.Col>
              <Grid.Col span={6}>
                <Text color="#7393B3" weight={700} >Cylinders</Text>
                <Text>{modalData?.cylinders}</Text>
              </Grid.Col>
              <Grid.Col span={6}>
                <Text color="#7393B3" weight={700} >Fuel Type</Text>
                <Text>{modalData?.fuelType}</Text>
              </Grid.Col>
              <Grid.Col span={6}>
                <Text color="#7393B3" weight={700} >Model</Text>
                <Text>{modalData?.model}</Text>
              </Grid.Col>
              <Grid.Col span={6}>
                <Text color="#7393B3" weight={700} >Vehicle Auction</Text>
                <Text>{modalData?.purchasedFrom}</Text>
              </Grid.Col>
              <Grid.Col span={6}>
                <Text color="#7393B3" weight={700} >Horse Power</Text>
                <Text>{modalData?.horsePower}</Text>
              </Grid.Col>
              
            </Grid>
          </Paper>
        </Modal>
        <DataTable
          columns={columns}
          data={vehicleData}
          selectableRows
          fixedHeader
          pagination
        />
      </div>
    </>
  );
};

export default ViewVehicle;
