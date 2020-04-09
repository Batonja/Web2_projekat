import React, { useState, useEffect } from 'react'
import { withStyles } from "@material-ui/core/styles";
import AirlineSeatReclineNormalRoundedIcon from '@material-ui/icons/AirlineSeatReclineNormalRounded';
import Icon from '@mdi/react'
import Button from '@material-ui/core/Button';
import Rating from '@material-ui/lab/Rating';

import SendRoundedIcon from '@material-ui/icons/SendRounded';
import { mdiCarDoor } from '@mdi/js';
import { mdiAccountMultiple } from '@mdi/js';
import { mdiMinusBox } from '@mdi/js';
import { mdiCheckboxMarked } from '@mdi/js';
import { mdiBriefcase } from '@mdi/js';
import { mdiCarShiftPattern } from '@mdi/js'; //Manual
import { mdiAirConditioner } from '@mdi/js';
import { connect } from "react-redux";
import Box from '@material-ui/core/Box';

const styles = (theme) => ({

    carOrderModalContainer: {
        width: "70%",
        height: "300px",
        display: "flex",
        margin: "20px",
        flexDirection: "column",
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: "center",
        backgroundColor: "#3F51B5",
        borderRadius: '10px'

    },
    contentContainer: {


        width: "100%",
        height: "70%",
        display: "flex",
        margin: "10px",
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: "center",
        backgroundColor: "#3F51B5",
        borderRadius: '10px'

    },

    carOrderInfoModal: {
        width: "40%",
        height: "90%",
        margin: "10px 10px 10px 10px",
        display: "flex",
        flexDirection: "column",
        borderRadius: '5px',

    },

    carImageOrderModal: {
        width: "50%",
        height: "90%",
        display: "flex",
        margin: "5px 5px 5px 5px",
        flexDirection: "column",
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '5px'
    },

    infoAndImageFlex: {
        width: "70%",
        height: "80%",
        display: "flex",
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: "center",
        backgroundColor: "#e5e5e5",
        borderRadius: '10px'
    },

    priceButtonSectionModal: {
        width: "20%",
        height: "60%",
        display: "flex",
        margin: "10px 10px 10px 20px",
        flexDirection: "column",
        alignItems: 'center',
        justifyContent: 'top',
        textAlign: "center",
        backgroundColor: "#e5e5e5",
        borderRadius: '5px'
    },

    featureList: {
        textAlign: "left",
        columns: 2,
        padding: '0',
        alignItems: "left",
        justifyContent: "left",
        listStyleType: "none",
    },

    modalHeaders: {
        fontWeight: "bold",
        textAlign: "center",
        color: "#ff4d07"
    },

    orderButton: {
        backgroundColor: "#ff4d07",
    },

    carNameHeaderModal: {
        backgroundColor: "#e5e5e5",
        width: '80%',
        margin: "10px",
        borderRadius: "5px",
    }


});


const CarOrdersModal = (props) => {
    const { classes } = props
    const { vehicle } = props
    useEffect(() => {
        console.log(vehicle.AverageGrade)
    })

    return (
        <div className={classes.carOrderModalContainer}>
            <div className={classes.carNameHeaderModal}>
                <h4 className={classes.modalHeaders}>{vehicle.CarModel}</h4>
            </div>
            <div className={classes.contentContainer}>
                <div className={classes.infoAndImageFlex}>
                    <div className={classes.carImageOrderModal}>
                        <img src={require('./template-images/add-car-form.png')} alt="car aimage" styles={{ width: "100%", height: "100%" }} />
                        <h6 className={classes.modalHeaders}>{vehicle.CarModel}</h6>
                    </div>
                    <div className={classes.carOrderInfoModal}>
                        <div>
                            <h6 className={classes.modalHeaders}>Car Details:</h6>
                            <ul className={classes.featureList}>
                                <li>
                                    <Icon path={mdiAccountMultiple}
                                        title="Number of passengers"
                                        size={1}
                                        color="black"
                                    />: {vehicle.NumberOfSeats}
                                </li>
                                <li>
                                    <Icon path={mdiCarDoor}
                                        title="Number of doors"
                                        size={1}
                                        color="black"
                                    />: {vehicle.NumberOfDoors}
                                </li>
                                <li>
                                    <Icon path={mdiBriefcase}
                                        title="Number of suitcases"
                                        size={1}
                                        color="black"
                                    />: {vehicle.NumberOfSuitcases}
                                </li>
                                <li>
                                    <Icon path={mdiCarShiftPattern}
                                        title="Gearbox type"
                                        size={1}
                                        color="black"
                                    />: {vehicle.GearboxType}
                                </li>
                                <li>
                                    <Icon path={mdiAirConditioner}
                                        title="Air cooling"
                                        size={1}
                                        color="black"
                                    />: {vehicle.CoolingType}
                                </li>
                                <li>
                                    <Box component="fieldset" mb={3} borderColor="transparent">
                                        <Rating value={vehicle.AverageCarGrade} readOnly />
                                    </Box>
                                    
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className={classes.priceButtonSectionModal}>
                    <h4 className={classes.modalHeaders}>Choose vihacle</h4>
                    <h4 >{vehicle.PriceADay}$</h4>
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
        </div>
    )
}

export default withStyles(styles)(CarOrdersModal)
