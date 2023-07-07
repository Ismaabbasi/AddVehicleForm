// import React, { useState } from "react";
import { useForm } from "@mantine/form";
import { DatePicker, DateInput } from "@mantine/dates";
import { Upload, Photo, X } from "tabler-icons-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Dropzone,
  IMAGE_MIME_TYPE,
  MS_WORD_MIME_TYPE,
  PDF_MIME_TYPE,
} from "@mantine/dropzone";
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
  rem,
  useMantineTheme,
  Image,
  Alert,
} from "@mantine/core";
const AddVhicleForm = () => {
  const { classes } = useStyles();

  const theme = useMantineTheme();
  const form = useForm({
    validateInputOnChange: true,
    initialValues: {
      VIN: "",
      purchasedFrom: "",
      purchasedDate: "",
      floorCompany: "",
      vehiclePurchasePrice: "",
      vehicleRetailPrice: "",
      vehicleTitle: "",
      make: "",
      model: "",
      year: 0,
      vehicleType: "",
      condition: "",
      exteriorColor: "",
      engine: "",
      transmission: "",
      driveTrain: "",
      cylinders: "",
      fuelType: "",
      document: [],
      image: [],
      keyImage: [],
    },
    validate: {
      VIN: (value) => (/^[A-HJ-NPR-Z\d]{17}$/.test(value) ? null : "invalid"),
      purchasedFrom: (value) => (value !== "" ? null : "select purchase from"),
      floorCompany: (value) => (value !== "" ? null : "select vehicle floor"),
      vehiclePurchasePrice: (value) =>
        /^\d+(\.\d{1,})?$/.test(value) ? null : "invalid",
      vehicleRetailPrice: (value) =>
        /^\d+(\.\d{1,})?$/.test(value) ? null : "invalid",
      vehicleTitle: (value) => (value.length >= 3 ? null : "invalid"),
      make: (value) => (value.length >= 1 ? null : "invalid"),
      model: (value) => (value.length >= 1 ? null : "invalid"),
      year: (value) => (value >= 1900 && value <= 2023 ? null : "invalid"),
      vehicleType: (value) => (value !== "" ? null : "select vehicle type"),
      condition: (value) => (value !== "" ? null : "select condition"),
      exteriorColor: (value) => (value !== "" ? null : "Enter Exterior Color"),
      engine: (value) => (value !== "" ? null : "Enter engine"),
      transmission: (value) => (value !== "" ? null : "Select Transmision"),
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
  const closeDocument = () => {
    form.setFieldValue("document", []);
  };
  const closeImage = (index) => {
    const filteredFiles = form.values.image.filter(
      (file, ind) => ind !== index
    );
    form.setFieldValue("image", filteredFiles);
  };
  const closeKeyImage = () => {
    form.setFieldValue("keyImage", []);
  };

  const navigate=useNavigate()
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
        <Button onClick={()=>navigate("viewvehicle")
        }
        >View Vehicle</Button>
      </Box>
      {/* ...Top Part End... */}

      {/* ...Grid Form Start... */}
      <form
        onSubmit={form.onSubmit(async (values) => {
          const token = localStorage.getItem("token");
          const body = { ...values, state:"Maryland" };
          console.log("token", token);

          const response = await axios.post(
            "https://usquare-test-apis.onrender.com/vehicle",
            body,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          console.log(response);
        })}
      >
        {/* ...Form Start... */}
        <Box className={classes.formInputData}>
          <Grid p={10}>
            <Grid.Col span={12}>
              <TextInput
                withAsterisk
                label="VIN"
                placeholder=""
                {...form.getInputProps("VIN")}
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
                label="Vehicle Purchase Date "
                placeholder=" Enter Vehicle Purchase Date "
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
                  { value: "floorCompany", label: "Rockland Florring" },
                  { value: "floorCompany", label: "Westlake Flooring" },
                ]}
                {...form.getInputProps("floorCompany")}
              />
            </Grid.Col>
            <Grid.Col lg={6} md={6} sm={12}>
              <TextInput
                withAsterisk
                label="Vehicle Purchase Price"
                type="number"
                placeholder=""
                // value={purchasePrice}
                {...form.getInputProps("vehiclePurchasePrice")}
                // onChange={handlePurchaseField}
              ></TextInput>
            </Grid.Col>
            <Grid.Col lg={6} md={6} sm={12}>
              <TextInput
                withAsterisk
                label="Vehicle Retail Price"
                type="number"
                placeholder=""
                // value={retailPrice}
                disabled={!form.values.vehiclePurchasePrice}
                {...form.getInputProps("vehicleRetailPrice")}
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
                label="Vehicle Type"
                placeholder="Select Vehicle Type"
                data={[
                  { value: "sedan", label: "Sedan" },
                  { value: "pickup", label: "Pickup" },
                  { value: "hatchback", label: "Hatchback" },
                  { value: "coup", label: "Coup" },
                  { value: "suv", label: "SUV" },
                ]}
                {...form.getInputProps("vehicleType")}
              />
            </Grid.Col>
            <Grid.Col lg={6} md={6} sm={12}>
              <Select
                withAsterisk
                label="Condition"
                placeholder="Select Condition"
                data={[
                  { value: "New", label: "New" },
                  { value: "Used", label: "Used" },
                ]}
                {...form.getInputProps("condition")}
              />
            </Grid.Col>
            <Grid.Col lg={6} md={6} sm={12}>
              <TextInput
                withAsterisk
                label="Exterior Color"
                placeholder=""
                // value={retailPrice}
                {...form.getInputProps("exteriorColor")}
                // onChange={handleRetailField}
              ></TextInput>
            </Grid.Col>
            <Grid.Col lg={6} md={6} sm={12}>
              <TextInput
                withAsterisk
                label="Engine"
                placeholder=""
                // value={retailPrice}
                {...form.getInputProps("engine")}
                // onChange={handleRetailField}
              ></TextInput>
            </Grid.Col>
            <Grid.Col lg={6} md={6} sm={12}>
              <Select
                withAsterisk
                label="Transmission"
                placeholder="Select Tranmission"
                data={[
                  { value: "auto", label: "Automatic" },
                  { value: "manual", label: "Manual" },
                  { value: "dual", label: "Dual Clutch" },
                  { value: "con", label: "Continuously Variable" },
                  { value: "other", label: "Other" },
                ]}
                {...form.getInputProps("transmission")}
              />
            </Grid.Col>
            <Grid.Col lg={6} md={6} sm={12}>
              <Select
                withAsterisk
                label="Drive Train"
                placeholder="Select Drive Train"
                data={[
                  { value: "auto", label: "FWD" },
                  { value: "manual", label: "RWD" },
                  { value: "dual", label: "AWD" },
                  { value: "con", label: "4WD" },
                  { value: "other", label: "Other" },
                ]}
                // {...form.getInputProps("driveTrain")}
              />
            </Grid.Col>
            <Grid.Col lg={6} md={6} sm={12}>
              <TextInput
                withAsterisk
                label="Trim"
                placeholder=""
                // {...form.getInputProps("trim")}
              ></TextInput>
            </Grid.Col>
            <Grid.Col lg={6} md={6} sm={12}>
              <Select
                withAsterisk
                label="Doors"
                placeholder="Select Door"
                data={[
                  { value: "2", label: "2 Doors" },
                  { value: "3", label: "3 Doors" },
                  { value: "4", label: "4 Doors" },
                  { value: "5", label: "5 Doors" },
                  { value: "6", label: "6 Doors" },
                  { value: "7", label: "7 Doors" },
                ]}
                // {...form.getInputProps("driveTrain")}
              />
            </Grid.Col>
            <Grid.Col lg={6} md={6} sm={12}>
              <Select
                withAsterisk
                label="Cylinders"
                // type="number"
                placeholder="Select Cylinders"
                data={[
                  { value: "1", label: "1 Cylinders" },
                  { value: "2", label: "2 Cylinders" },
                  { value: "4", label: "4 Cylinders" },
                  { value: "6", label: "6 Cylinders" },
                  { value: "8", label: "8 Cylinders" },
                  { value: "10", label: "10 Cylinders" },
                  { value: "12", label: "12 Cylinders" },
                  { value: "14", label: "14 Cylinders" },
                  { value: "16", label: "16 Cylinders" },
                ]}
                {...form.getInputProps("cylinders")}
              />
            </Grid.Col>
            <Grid.Col lg={6} md={6} sm={12}>
              <Select
                withAsterisk
                label="Fuel Type"
                placeholder="Select fuel type"
                data={[
                  { value: "1", label: "Gasoline" },
                  { value: "2", label: "Diesel" },
                  { value: "3", label: "Electric" },
                  { value: "4", label: "Hybrid" },
                  { value: "5", label: "Hydrogen" },
                  { value: "6", label: "flexFuel" },
                ]}
                // {...form.getInputProps("fuelType")}
              />
            </Grid.Col>
            <Grid.Col lg={6} md={6} sm={12}>
              <TextInput
                withAsterisk
                label="Horse Power"
                placeholder=""
                // {...form.getInputProps("horsePower")}
              ></TextInput>
            </Grid.Col>
            <Grid.Col lg={6} md={6} sm={12}>
              <TextInput
                withAsterisk
                label="Mileage"
                type="number"
                placeholder=""
                // {...form.getInputProps("mileage")}
              ></TextInput>
            </Grid.Col>
          </Grid>
        </Box>

        {/* ...Grid Form End... */}

        {/* ...Vehicle Document Start... */}

        <Box className={classes.DropzoneVehicleDocument}>
          <Title order={4} px={"10px"}>
            Add Vheicle Document
          </Title>
          <Dropzone
            mx={"10px"}
            h={200}
            onDrop={(files) => {
              files.forEach((file) => {
                const preview = URL.createObjectURL(file);
                file.abc = preview;
              });
              console.log(files);
              form.setFieldValue("document", files);
            }}
            onReject={(files) => alert("image not set")}
            maxSize={3 * 1024 ** 2}
            accept={[...MS_WORD_MIME_TYPE, ...PDF_MIME_TYPE]}
          >
            <Group
              position="center"
              spacing="xl"
              style={{ minHeight: rem(220), pointerEvents: "none" }}
            >
              <Dropzone.Accept>
                <Upload
                  size={40}
                  color={
                    theme.colors[theme.primaryColor][
                      theme.colorScheme === "dark" ? 4 : 6
                    ]
                  }
                />
              </Dropzone.Accept>
              <Dropzone.Reject>
                <X
                  size={40}
                  color={theme.colors.red[theme.colorScheme === "dark" ? 4 : 6]}
                />
              </Dropzone.Reject>
              <Dropzone.Idle>
                <Photo size={40} />
              </Dropzone.Idle>

              <div>
                <Text size="xl" inline>
                  Drag images here or click to select files
                </Text>
                <Text size="sm" color="dimmed" inline mt={7}>
                  Attach one file, file should not exceed 5mb
                </Text>
              </div>
            </Group>
          </Dropzone>
          <Grid>
            {form.values.document.map((file) => {
              return (
                <Grid.Col p={"30px"} lg={3} md={6} sm={12}>
                  <iframe mt={20} height={200} fit="cover" src={file.abc} />
                  <CloseButton
                    color="red"
                    size={"lg"}
                    onClick={() => {
                      closeDocument();
                    }}
                  />
                </Grid.Col>
              );
            })}
          </Grid>
        </Box>
        {/* ...Vehicle Document End... */}

        {/* ......vehicle Image Start...... */}

        <Box className={classes.DropzoneVehicleImage}>
          <Title order={4} px={"10px"}>
            Add Vheicle Image
          </Title>
          <Dropzone
            mx={"10px"}
            h={200}
            // p={"30px"}
            // maxFiles={1}
            onDrop={(files) => {
              files.forEach((file) => {
                const preview = URL.createObjectURL(file);
                file.abc = preview;
              });
              console.log(files);
              form.setFieldValue("image", files);
            }}
            onReject={(files) => alert("image not set")}
            maxSize={3 * 1024 ** 2}
            accept={IMAGE_MIME_TYPE}
          >
            <Group
              position="center"
              spacing="xl"
              style={{ minHeight: rem(220), pointerEvents: "none" }}
            >
              <Dropzone.Accept>
                <Upload
                  size={40}
                  color={
                    theme.colors[theme.primaryColor][
                      theme.colorScheme === "dark" ? 4 : 6
                    ]
                  }
                />
              </Dropzone.Accept>
              <Dropzone.Reject>
                <X
                  size={40}
                  color={theme.colors.red[theme.colorScheme === "dark" ? 4 : 6]}
                />
              </Dropzone.Reject>
              <Dropzone.Idle>
                <Photo size={40} />
              </Dropzone.Idle>

              <div>
                <Text size="xl" inline>
                  Drag images here or click to select files
                </Text>
                <Text size="sm" color="dimmed" inline mt={7}>
                  Attach as many files as you like, each file should not exceed
                  5mb
                </Text>
              </div>
            </Group>
          </Dropzone>
          <Grid>
            {form.values.image.map((file, i) => {
              return (
                <Grid.Col lg={3} md={6} sm={12} p={"30px"} key={i}>
                  <Image mt={20} height={200} fit="cover" src={file.abc} />
                  <CloseButton
                    color="red"
                    size={"lg"}
                    onClick={() => {
                      closeImage(i);
                    }}
                  />
                </Grid.Col>
              );
            })}
          </Grid>
        </Box>
        {/* ......vehicle Image End...... */}

        {/* ...Vehicle Key Start... */}

        <Box className={classes.DropzoneVehicleKey}>
          {/* ...Grid Form End... */}
          <Title order={4} px={"10px"}>
            Add Vheicle key
          </Title>
          <Dropzone
            mx={"10px"}
            h={200}
            // p={"30px"}
            // maxFiles={1}
            onDrop={(files) => {
              files.forEach((file) => {
                const preview = URL.createObjectURL(file);
                file.abc = preview;
              });
              console.log(files);
              form.setFieldValue("keyImage", files);
            }}
            onReject={(files) => alert("keyImage not set")}
            maxSize={3 * 1024 ** 2}
            accept={IMAGE_MIME_TYPE}
          >
            <Group
              position="center"
              spacing="xl"
              style={{ minHeight: rem(220), pointerEvents: "none" }}
            >
              <Dropzone.Accept>
                <Upload
                  size={40}
                  color={
                    theme.colors[theme.primaryColor][
                      theme.colorScheme === "dark" ? 4 : 6
                    ]
                  }
                />
              </Dropzone.Accept>
              <Dropzone.Reject>
                <X
                  size={40}
                  color={theme.colors.red[theme.colorScheme === "dark" ? 4 : 6]}
                />
              </Dropzone.Reject>
              <Dropzone.Idle>
                <Photo size={40} />
              </Dropzone.Idle>

              <div>
                <Text size="xl" inline>
                  Drag images here or click to select files
                </Text>
                <Text size="sm" color="dimmed" inline mt={7}>
                  Attach as many files as you like, each file should not exceed
                  5mb
                </Text>
              </div>
            </Group>
          </Dropzone>
          <Grid>
            {form.values.keyImage.map((file) => {
              return (
                <Grid.Col lg={3} md={6} sm={12} p={"30px"}>
                  <Image mt={20} height={200} fit="cover" src={file.abc} />
                  <CloseButton
                    color="red"
                    size={"lg"}
                    onClick={() => {
                      closeKeyImage();
                    }}
                  />
                </Grid.Col>
              );
            })}
          </Grid>
        </Box>
        {/* ...Vehicle Key End... */}

        <Group position="right" spacing={"xl"}>
          <Button
            variant="outline"
            onClick={() => {
              form.reset();
            }}
          >
            Reset
          </Button>
          <Button type="submit">Add</Button>
        </Group>
      </form>
    </Box>
  );
};

export default AddVhicleForm;
