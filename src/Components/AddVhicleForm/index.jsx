// import React, { useState } from "react";
import { useForm } from "@mantine/form";
import { DatePicker, DateInput } from "@mantine/dates";
import { useStyles } from "./styles";
import {
  Box,
  Button,
  Grid,
  Text,
  TextInput,
  Title,
  Group,
  Select,
  CloseButton,
} from "@mantine/core";
const AddVhicleForm = () => {
  const { classes } = useStyles();
  const form = useForm({
    validateInputOnChange: true,
    initialValues: {
      vin: " ",
      purchasedFrom: "",
      purchasedDate: "",
      vehicleFloor:"",
      purchasePrice: "",
      retailPrice: "",
      vehicleTitle: "",
      make:"",
      model:"",
      year:0,
      condition:""
    },
    validate: {
      vin: (value) => (/^[A-HJ-NPR-Z\d]{17}$/.test(value) ? null : "invalid"),
      purchasedFrom: (value)=>(value!=="")? null:"select purchase from",
      vehicleFloor:(value)=>(value!=="")?null:"select vehicle floor",
      purchasePrice: (value) =>(/^\d+(\.\d{1,})?$/.test(value))? null:"invalid",
      retailPrice: (value) =>(/^\d+(\.\d{1,})?$/.test(value))? null:"invalid",
      vehicleTitle: (value) =>((value.length>=3))? null:"invalid",
      make: (value) =>((value.length>=1))? null:"invalid",
      model: (value) =>((value.length>=1))? null:"invalid",
      year: (value) =>((value>=1900 && value<=2023))? null:"invalid",
      condition: (value)=>(value!=="")? null:"select condition",
    },
  });
// const [purchasePrice, setPurcasePrice] = useState("");
// const [retailPrice, setRetailPrice] = useState("");
// const [enableRetailPrice, setEnableRetailPrice] =useState(false)
//  const handlePurchaseField=(event)=>{
//     const value = event.currentTarget.value;
//     setPurcasePrice(value)
//     setEnableRetailPrice(value!=="")
//  }
 

// const handleRetailField =(event)=>{
//     setRetailPrice(event.currentTarget.value)
// }

  return (
    <Box className={classes.addvhicleBox}>
      {/* ...Top Part Start... */}
      <Box className={classes.topBoxText}>
        <Title order={3} className={classes.topBoxHeading}>
          Add Vehicle
        </Title>
        <Text className={classes.topBoxdecription}>
          Fill In the data of Vehicle Registration. It will take A Couple of
          Minutes
        </Text>
        <br />
        <Button>View Vehicle</Button>
      </Box>
      {/* ...Top Part End... */}

      {/* ...Grid Form Start... */}
      <Box className={classes.formInputData}>
        <form onSubmit={form.onSubmit((values) => console.log(values))}>
          <Grid p={10} >
            <Grid.Col span={12}>
              <TextInput
                withAsterisk
                label="VIN"
                placeholder=""
            
                {...form.getInputProps("vin")}
              ></TextInput>
            </Grid.Col>
            <Grid.Col lg={6} md={6} sm={12}>
              <Select
                withAsterisk
                label="Vehicle Auction (Purchased From)"
                placeholder="Vehicle Auction (Purchased From)"
                data={[
                  { value: "ma", label: "Mecum Auctions" },
                  { value: "aa", label: "ACV Auctions" },
                ]}
                {...form.getInputProps("purchasedFrom")}
              />
            </Grid.Col>
            <Grid.Col lg={6} md={6} sm={12}>
              <DateInput
                withAsterisk
                label="Vehicle Purchase Price "
                placeholder=" Enter Vehicle Purchase Price "
                clearable
                {...form.getInputProps("purchasedDate")}
                //   {...<CloseButton/>}
              ></DateInput>
            </Grid.Col>
            <Grid.Col lg={6} md={6} sm={12}>
              <Select
                withAsterisk
                label="Vehicle Floor"
                placeholder="Select Floor"
                data={[
                  { value: "rf", label: "Rockland Florring" },
                  { value: "wf", label: "Westlake Flooring" },
                ]}
                {...form.getInputProps("vehicleFloor")}
              />
            </Grid.Col>
            <Grid.Col lg={6} md={6} sm={12}>
              <TextInput
                withAsterisk
                label="Vehicle Purchase Price"
                placeholder=""
                // value={purchasePrice}
                {...form.getInputProps("purchasePrice")}
                // onChange={handlePurchaseField}
              ></TextInput>
            </Grid.Col>
            <Grid.Col lg={6} md={6} sm={12}>
              <TextInput
                withAsterisk
                label="Vehicle Retail Price"
                placeholder=""
                // value={retailPrice}
                disabled={!form.values.purchasePrice}
                {...form.getInputProps("retailPrice")}
                // onChange={handleRetailField}
              ></TextInput>
            </Grid.Col>
            <Grid.Col lg={6} md={6} sm={12}>
              <TextInput
                withAsterisk
                label="Vehicle Title"
                placeholder=""
                // value={retailPrice}
                {...form.getInputProps("vehicleTitle")}
                // onChange={handleRetailField}
              ></TextInput>
            </Grid.Col>
            <Grid.Col lg={6} md={6} sm={12}>
              <TextInput
                withAsterisk
                label="Make"
                placeholder=""
                // value={retailPrice}
                {...form.getInputProps("make")}
                // onChange={handleRetailField}
              ></TextInput>
            </Grid.Col>
            <Grid.Col lg={6} md={6} sm={12}>
              <TextInput
                withAsterisk
                label="Model"
                placeholder=""
                // value={retailPrice}
                {...form.getInputProps("model")}
                // onChange={handleRetailField}
              ></TextInput>
            </Grid.Col>
            <Grid.Col lg={6} md={6} sm={12}>
              <TextInput
                withAsterisk
                label="Year"
                type="number"
                placeholder=""
                // value={retailPrice}
                {...form.getInputProps("year")}
                // onChange={handleRetailField}
              ></TextInput>
            </Grid.Col>
            <Grid.Col lg={6} md={6} sm={12}>
              <Select
                withAsterisk
                label="Condition"
                placeholder="Select Condition"
                data={[
                  { value: "new", label: "New"},
                  { value: "used", label: "Used" },
                ]}
                {...form.getInputProps("condition")}
              />
            </Grid.Col>
          </Grid>
         <Group position="right" spacing={"xl"}><Button type="submit">Add</Button></Group> 
        </form>
      </Box>
      {/* ...Grid Form End... */}
    </Box>
  );
};

export default AddVhicleForm;
