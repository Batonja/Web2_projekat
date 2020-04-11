import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Icon from "@mdi/react";
import Button from "@material-ui/core/Button";
import Rating from "@material-ui/lab/Rating";

import SendRoundedIcon from "@material-ui/icons/SendRounded";
//import AirlineSeatReclineNormalRoundedIcon from '@material-ui/icons/AirlineSeatReclineNormalRounded';
import { mdiCarDoor } from "@mdi/js";
import { mdiAccountMultiple } from "@mdi/js";
// import { mdiMinusBox } from '@mdi/js';
// import { mdiCheckboxMarked } from '@mdi/js';
import { mdiBriefcase } from "@mdi/js";
import { mdiCarShiftPattern } from "@mdi/js"; //Manual
import { mdiAirConditioner } from "@mdi/js";
import Box from "@material-ui/core/Box";

const styles = (theme) => ({
  //------Level0
  carOrderModalContainer: {
    width: "70%",
    height: "400px",
    display: "flex",
    margin: "20px",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    borderRadius: "10px",
    backgroundColor: "#3F51B5",
  },
  //------Level1
  contentContainer: {
    width: "90%",
    height: "60%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    textAlign: "center",
    borderRadius: "10px",
    backgroundColor: "#3F51B5",
  },
  carNameHeaderModal: {
    backgroundColor: "#e5e5e5",
    width: "90%",
    margin: "10px",
    borderRadius: "5px",
  },
  //------Level2
  infoAndImageFlex: {
    width: "100%",
    height: "100%",
    display: "flex",
    margin: "15px",
    flexDirection: "row",
    textAlign: "center",
    alignItems: "center",
    backgroundColor: "#e5e5e5",
    borderRadius: "10px",
  },
  priceButtonSectionModal: {
    width: "30%",
    height: "60%",
    display: "flex",
    margin: "15px 10px 10px 00px",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    backgroundColor: "#e5e5e5",
    borderRadius: "5px",
  },
  //------Level3
  carImageOrderModal: {
    width: "50%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    margin: "5px 5px 5px 5px",
    borderRadius: "5px",
  },
  carOrderInfoModal: {
    width: "50%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "top",
    textAlign: "left",
    alignItems: "left",
    borderRadius: "5px",
    // margin: "10px 10px 10px 10px",
  },
  //------Level4
  featureList: {
    listStyleType: "none",
    textAlign: "left",
    columns: 2,
    alignItems: "left",
    justifyContent: "left",
  },
  modalHeaders: {
    textAlign: "center",
    fontWeight: "bold",
    color: "#ff4d07",
  },
  orderButton: {
    backgroundColor: "#ff4d07",
  },
});

const CarOrdersModal = (props) => {
  const { classes } = props;
  const { vehicle } = props;

  return (
    <div className={classes.carOrderModalContainer}>
      <div className={classes.carNameHeaderModal}>
        <h4 className={classes.modalHeaders}>{vehicle.CarModel}</h4>
      </div>
      <div className={classes.contentContainer}>
        <div className={classes.infoAndImageFlex}>
          <div className={classes.carImageOrderModal}>
            <img
              src={require("./template-images/add-car-form.png")}
              alt="car aimage"
              style={{ height: "90%" }}
            />
            <div>
              <h6 className={classes.modalHeaders}>{vehicle.CarModel}</h6>
            </div>
          </div>
          <div className={classes.carOrderInfoModal}>
            <div>
              <h6 className={classes.modalHeaders}>Car Details:</h6>
              <ul className={classes.featureList}>
                <li>
                  <Icon
                    path={mdiAccountMultiple}
                    title="Number of passengers"
                    size={1}
                    color="black"
                  />
                  : {vehicle.NumberOfSeats}
                </li>
                <li>
                  <Icon
                    path={mdiCarDoor}
                    title="Number of doors"
                    size={1}
                    color="black"
                  />
                  : {vehicle.NumberOfDoors}
                </li>
                <li>
                  <Icon
                    path={mdiBriefcase}
                    title="Number of suitcases"
                    size={1}
                    color="black"
                  />
                  : {vehicle.NumberOfSuitcases}
                </li>
                <li>
                  <Icon
                    path={mdiCarShiftPattern}
                    title="Gearbox type"
                    size={1}
                    color="black"
                  />
                  : {vehicle.GearboxType}
                </li>
                <li>
                  <Icon
                    path={mdiAirConditioner}
                    title="Air cooling"
                    size={1}
                    color="black"
                  />
                  : {vehicle.CoolingType}
                </li>
                <li></li>
              </ul>
              <h6 className={classes.modalHeaders}>Customer Ratings:</h6>
              <Box
                component="fieldset"
                mb={3}
                borderColor="transparent"
                textAlign={"center"}
              >
                <Rating value={vehicle.AverageCarGrade} readOnly />
              </Box>
            </div>
          </div>
        </div>
        <div className={classes.priceButtonSectionModal}>
          <h4 className={classes.modalHeaders}>Choose vehicle</h4>
          <h4>{vehicle.PriceADay}$</h4>
          <Button
            variant="contained"
            color="primary"
            size="large"
            className={classes.orderButton}
            endIcon={<SendRoundedIcon />}
          >
            Order
          </Button>
        </div>
      </div>

      <div className={classes.priceButtonSectionModal}>
        <h4 className={classes.modalHeaders}>Choose vihacle</h4>
        <h4>{vehicle.PriceADay}$</h4>
        <Button
          variant="contained"
          color="primary"
          size="large"
          className={classes.orderButton}
          endIcon={<SendRoundedIcon />}
        >
          Order
        </Button>
      </div>
    </div>
  );
};

export default withStyles(styles)(CarOrdersModal);
