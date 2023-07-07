import { createStyles, em } from "@mantine/core";

export const useStyles = createStyles((theme) => ({
  addvhicleBox: {
    backgroundColor: "#E8E8E8",
    // position: "absolute",
    top: 0,
    width: "100%",
    // height: "auto",
    color: "black",
    padding: "10px",
  },
  topBoxText: {
    color: "black",
    textAlign: "center",
    paddingTop: "20px",
  },
  topBoxdecription: {
    color: "gray",
  },
  formInputData: {
    backgroundColor: "#ffffff",
    border: "1px solid gray",
    borderRadius: "5px",
  },
  DropzoneVehicleDocument: {
    marginTop: 30,
    backgroundColor: "#ffffff",
    border: "1px solid gray",
    height: "250px",
    borderRadius: "5px",
  },
  DropzoneVehicleImage: {
    marginTop: 30,
    backgroundColor: "#ffffff",
    border: "1px solid gray",
    height: "250px",
    width: "100%",
    borderRadius: "5px",
  },
  DropzoneVehicleKey:{
    marginTop: 30,
    backgroundColor: "#ffffff",
    border: "1px solid gray",
    height: "250px",
    width: "100%",
    borderRadius: "5px",
  }
}));
