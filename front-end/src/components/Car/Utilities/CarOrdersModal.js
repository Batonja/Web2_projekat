import React, { useState } from 'react'
import { connect } from 'react-redux'
import carOrderToProfile from '../../../actions/User/carOrderToProfile.js'
import { Redirect } from 'react-router-dom'
import Link from "@material-ui/core/Link";
import { Link as RouterLink } from "react-router-dom";

//Material UI
import { withStyles } from "@material-ui/core/styles";
import Icon from '@mdi/react'
import Button from '@material-ui/core/Button';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
// ICONS 
import SendRoundedIcon from '@material-ui/icons/SendRounded';
//import AirlineSeatReclineNormalRoundedIcon from '@material-ui/icons/AirlineSeatReclineNormalRounded';
import { mdiCarDoor } from '@mdi/js';
import { mdiAccountMultiple } from '@mdi/js';
// import { mdiMinusBox } from '@mdi/js';
// import { mdiCheckboxMarked } from '@mdi/js';
import { mdiBriefcase } from '@mdi/js';
import { mdiCarShiftPattern } from '@mdi/js'; //Manual
import { mdiAirConditioner } from '@mdi/js';
//ANIMATION
import { useSpring, animated } from 'react-spring'

import isEmpty from 'lodash/isEmpty'

import carImage from '../template-images/add-car-form.png'


const styles = (theme) => ({
    //------Level0
    carOrderModalContainer: {
        width: "70%",
        height: "400px",
        display: "flex",
        margin: "20px",
        flexDirection: "column",
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: "center",
        borderRadius: '10px',
        backgroundColor: "#3F51B5",

    },
    PurchaseOverlayContainer: {
        position: 'fixed',
        flexDirection: "column",
        display: 'none',
        [theme.breakpoints.down("xs", "sm", "md")]: {
            width: "95%",
            height: "700"
        },
        width: '50%',
        height: '80%',
        top: '10.0%',
        justifyContent: 'center',
        alignItems: 'center',
        opacity: '0.9',
        border: '',
        borderRadius: '20%',
        backgroundColor: 'black',
        zIndex: '2',
        cursor: 'pointer',
    },
    //------Level1
    contentContainer: {
        width: "90%",
        height: "60%",
        display: "flex",
        flexDirection: "row",
        justifyContent: 'center',
        textAlign: "center",
        borderRadius: '10px',
        backgroundColor: "#3F51B5",

    },
    carNameHeaderModal: {
        backgroundColor: "#e5e5e5",
        width: '90%',
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
        alignItems: 'center',
        backgroundColor: "#e5e5e5",
        borderRadius: '10px'
    },
    priceButtonSectionModal: {
        width: "30%",
        height: "60%",
        display: "flex",
        margin: "15px 10px 10px 00px",
        flexDirection: "column",
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: "center",
        backgroundColor: "#e5e5e5",
        borderRadius: '5px'
    },
    //------Level3
    carImageOrderModal: {
        width: "50%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        margin: "5px 5px 5px 5px",
        borderRadius: '5px'
    },
    carOrderInfoModal: {
        width: "50%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: 'top',
        textAlign: "left",
        alignItems: 'left',
        borderRadius: '5px',
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
        color: "#ff4d07"
    },
    orderButton: {
        backgroundColor: "#ff4d07",
    },
    placesFinishDiv: {
        display: "flex",
        flexDirection: 'column',
        [theme.breakpoints.down("xs", "sm", "md")]: {
            width: "95%",
        },
        width: "40%",
        height: '200px',
        margin: "5px",
        border: '10px solid #3F51B5',
        borderRadius: '15px',
        backgroundColor: "white",


    }
});

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: '#3F51B5',
        color: 'white',
        width: '10%',
        textAlign: 'left',
        fontWeight: 'bold'

    },
    body: {
        color: 'black',
        textAlign: 'left',
        fontSize: 16,

    },
}))(TableCell);


const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.background.paper,
            width: "95%"
        },
    },
}))(TableRow);


const CarOrdersModal = (props) => {
    const [totalPrice, setTotalPrice] = useState(0)
    const purchaseOverlayModalRef = React.useRef(null)
    const spring = useSpring({

        config: {
            duration: 3500
        },
        from: { opacity: 0 },
        to: { opacity: 0.9 },
    })

    React.useEffect(() => {
        const { orderDetails } = props
        const diffTime = Math.abs(orderDetails.pickUpDate - orderDetails.returnDate);
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        setTotalPrice(vehicle.priceADay * diffDays)
    }, [])

    const onPurchaseOverlayModal = () => {
        const node = purchaseOverlayModalRef.current
        node.style.display = "flex";
    }
    const onFinishOrder = () => {
        const { LoggedInUser } = props
        const { carOrderToProfile } = props
        const { orderDetails } = props
        const { vehicle } = props
        const order = {
            orderDetails,//service, datesForLease, stations
            vehicle,
            totalPrice
        }
        props.setToggleSearch(false)
        if (isEmpty(LoggedInUser)) {
            console.log("Not Logged in: ", LoggedInUser)

        } else {
            console.log("Logged in: ", LoggedInUser)
            carOrderToProfile(order, LoggedInUser.id)
        }
    }

    const off = () => {
        const node = purchaseOverlayModalRef.current
        node.style.display = "none";
    }
    const dateConversion = (date) => {
        return date.toLocaleDateString('en-US');
    }
    const { classes } = props
    const { orderDetails } = props
    const { selectedServiceName} = props
    const { vehicle } = props
    const { LoggedInUser } = props
    
    return (
        <>
            <div className={classes.carOrderModalContainer}>
                <div className={classes.carNameHeaderModal}>
                    <h4 className={classes.modalHeaders}>{vehicle.carModel}</h4>
                </div>
                <div className={classes.contentContainer}>
                    <div className={classes.infoAndImageFlex}>
                        <div className={classes.carImageOrderModal}>
                            <img src={carImage} alt="car aimage" style={{ height: "90%" }} />
                            <div>
                                <h6 className={classes.modalHeaders}>{vehicle.carModel}</h6>

                            </div>
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
                                        />: {vehicle.numberOfSeats}
                                    </li>
                                    <li>
                                        <Icon path={mdiCarDoor}
                                            title="Number of doors"
                                            size={1}
                                            color="black"
                                        />: {vehicle.numberOfDoors}
                                    </li>
                                    <li>
                                        <Icon path={mdiBriefcase}
                                            title="Number of suitcases"
                                            size={1}
                                            color="black"
                                        />: {vehicle.numberOfSuitcases}
                                    </li>
                                    <li>
                                        <Icon path={mdiCarShiftPattern}
                                            title="Gearbox type"
                                            size={1}
                                            color="black"
                                        />: {vehicle.gearboxType}
                                    </li>
                                    <li>
                                        <Icon path={mdiAirConditioner}
                                            title="Air cooling"
                                            size={1}
                                            color="black"
                                        />: {vehicle.isAirCondition ? "Air condition" : "Air cooling"}
                                    </li>
                                    <li>



                                    </li>
                                </ul>
                                <h6 className={classes.modalHeaders}>Customer Ratings:</h6>
                                <Box component="fieldset" mb={3} borderColor="transparent" textAlign={"center"}>
                                    <Rating value={vehicle.averageCarGrade} readOnly />
                                </Box>
                            </div>
                        </div>
                    </div>
                    <div className={classes.priceButtonSectionModal}>
                        <h4 className={classes.modalHeaders}>Choose vehicle</h4>
                        <h4 >{vehicle.priceADay}$</h4>
                        <Button
                            variant="contained"
                            onClick={onPurchaseOverlayModal}
                            color="primary"
                            size="large"
                            className={classes.orderButton}
                            endIcon={<SendRoundedIcon />}
                        >
                            Order
                </Button>

                    </div>
                </div>
                <animated.div style={spring} className={classes.PurchaseOverlayContainer} ref={purchaseOverlayModalRef} onClick={off}>
                    
                    <TableContainer component={Paper} style={{ width: '90%' }}>
                        <Table className={classes.table} aria-label="customized table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell>Service</StyledTableCell>
                                    <StyledTableCell align="right">Car Model</StyledTableCell>
                                    <StyledTableCell align="right">Pick up date&nbsp;</StyledTableCell>
                                    <StyledTableCell align="right">Drop off date&nbsp;</StyledTableCell>
                                    <StyledTableCell align="right">Total Price&nbsp;($)</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>

                                <StyledTableRow key={vehicle.carModel}>
                                    <StyledTableCell component="th" scope="row">
                                        {selectedServiceName}
                                    </StyledTableCell>
                                    <StyledTableCell align="right">{vehicle.carModel}</StyledTableCell>
                                    <StyledTableCell align="right">
                                        {dateConversion(orderDetails.pickUpDate)}
                                    </StyledTableCell>
                                    <StyledTableCell align="right">
                                        {dateConversion(orderDetails.returnDate)}
                                    </StyledTableCell>
                                    <StyledTableCell align="right">{totalPrice}</StyledTableCell>

                                </StyledTableRow>

                            </TableBody>
                        </Table>
                    </TableContainer>
                    <div className={classes.placesFinishDiv}>
                        <p><h4 className={classes.modalHeaders}>Puck up place:</h4>{orderDetails.pickupPlaceId}</p>
                        <p><h4 className={classes.modalHeaders}>Drop off place:</h4>{orderDetails.returnPlaceId}</p>
                    </div>
                    <Link
                        variant="body2"
                        color="inherit"
                        to={(isEmpty(LoggedInUser.userId)) ? "/signin" : "/cars"}
                        component={RouterLink}
                    >
                        <Button
                            variant="contained"
                            onClick={onFinishOrder}
                            color="primary"
                            size="large"
                            style={{ margin: "10px", backgroundColor: "#ff4d07", width: "200px", }}
                            endIcon={<SendRoundedIcon />}
                        >
                            FINISH
                        </Button>
                    </Link>
                </animated.div>

            </div>

        </>
    )

}


const mapStateToProps = (state) => ({
    LoggedInUser: state.userReducer.LoggedInUser
})

const mapDispatchToProps = (dispatch) => ({
    carOrderToProfile: (order, userEmail) => dispatch(carOrderToProfile(order, userEmail))
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(CarOrdersModal))
