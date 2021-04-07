// @ts-nocheck
import React, { useState, useEffect } from 'react'

import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import Slider from "@material-ui/core/Slider";
import { Link } from "react-router-dom";
//ANIMATION
import { useSpring, animated } from 'react-spring'
//ACTIONS
import searchAvailableCars from "../../../actions/Renting/searchAvailableCars";

import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    DateTimePicker,


} from "@material-ui/pickers";



import CarOrdersModal from '../Utilities/CarOrdersModal'
import { RentACarService } from 'app/models/rentACarService';
import { Renting } from 'app/models/renting';
import { SearchParametars } from 'app/models/renting';
import agent from 'app/api/agent';




const styles = (theme) => ({

    componentSearchFlexContainer: {
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: "center",
    },
    searchBoxFlexContainer: {

        display: "flex",
        [theme.breakpoints.down("xs", "sm", "md")]: {
            width: "95%",
            height: "900px"
        },
        width: "55%",
        height: "650px",
        flexDirection: "column",
        borderRadius: '30px',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: "center",
        backgroundColor: "#3f51b5",
    },
    SearchSectionFlexContainerBox: {
        display: "flex",
        flexDirection: "column",
        [theme.breakpoints.down("xs", "sm", "md")]: {

            margin: "5px",
            width: "95%"
        },
        width: "80%",
        height: '80%',
        //margin: "10px",
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: "center",
        borderRadius: '30px',
        backgroundColor: "#e5e5e5",
    },

    DatePickerSearch: {
        display: "flex",
        flexDirection: "column",
        [theme.breakpoints.down("xs", "sm", "md")]: {

            margin: "5px",
            width: "95%"
        },
        width: "40%",

        height: '40%',
        margin: "10px",
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: "center",
        borderRadius: '30px',
        backgroundColor: "#e5e5e5",

    },
    searchFormField: {
        width: "90%",
        textAlign: "left"
    },
    modalHeaders: {
        textAlign: "center",
        fontWeight: "bold",
        color: "#ff4d07",
    },
    orderButton: {
        backgroundColor: "#ff4d07",
        width: "50%",
        margin: "10px"
    },
    searchHeaders: {
        textAlign: "center",
        fontWeight: "bold",
        color: "#ff4d07",

    },
    facilitySearchFlex: {
        display: "flex",
        [theme.breakpoints.down("xs", "sm", "md")]: {
            flexDirection: "column",
            width: "95%",


        },
        width: "95%",
        justifyContent: 'center',
        alignItems: 'top',
        textAlign: "center",
    },
    facilityBox: {
        margin: '20px'
    },
    serviceBox: {
        displey: "flex",
        flexDirection: "column",
        width: "100%",
        justifyContent: 'left',
        alignItems: 'left',
        textAlign: "center",
    }


})




const CarServiceSearch = (props) => {

    let locationField = null;
    const [location, setLocation] = useState('');
    const [selectedService, setSelectedService] = useState(new RentACarService("", "", "", 0, 0, "", "", "", 0, [], [], []));
    const [availableServices, setAvailableSerrvice] = useState([]);
    const [datesForLease, setdatesForLease] = useState({
        startDate: null,
        endDate: null,
        tommorowFromStartDate: null,
    })
    const [numberOfPessangers, setNumberOfPessangers] = useState(5)
    const [priceRange, setPriceRange] = useState([100, 200])
    const [stations, setStations] = useState({
        pickUpStation: {
            id: null,
            name: null,
        },
        dropOffStation: {
            id: null,
            name: null
        },

    })



    const [orderDetails, setOrderDetails] = useState({})
    const spring = useSpring({

        config: {
            duration: 2000
        },
        from: { opacity: 0 },
        to: { opacity: 1 },
    })


    const [toggleSearch, setToggleSearch] = useState(false)
    const [filteredCars, setFilteredCars] = useState([])
    const [selectedServiceName, setSelectedServiceName] = useState("");


    const filteringCars = (car) => {
        if (car.numberOfSeats == numberOfPessangers && car.priceADay >= priceRange[0] && car.priceADay <= priceRange[1])
            return true;
        // else if(priceRange[0] > car.PriceADay && priceRange[0] < car.PriceADay)
        //     return true
        else {
            return false
        }

    }

    const handleChangeSelectedService = (event) => {
        setSelectedServiceName(event.target.value.name)
        setSelectedService(event.target.value);
    };
    const setLocationRefernce = (inputElement) => {
        locationField = inputElement;
    }

    const handleSearch = () => {

        //var filtered = selectedService.vehicles.filter(filteringCars);

        //setFilteredCars(filtered);
        var searchParams = new SearchParametars(selectedService.rentACarServiceId,
            datesForLease.startDate,
            datesForLease.endDate,
            priceRange[0],
            priceRange[1],
            numberOfPessangers
        )

        console.log(searchParams)
        props.SearchAvailableCars(searchParams)
        setFilteredCars(props.AvailableCars)
        //setSelectedServiceName(selectedService.name);
        //setToggleSearch(true)

        // setLocation(null);
        // setSelectedService(new RentACarService("", "", "", 0, 0, "", "", "", 0, [], [], []));
        // setStations({
        //     pickUpStation: {
        //         id: null,
        //         name: null,
        //     },
        //     dropOffStation: {
        //         id: null,
        //         name: null
        //     },
        // })
        // setdatesForLease({
        //     startDate: null,
        //     tommorowFromStartDate: null,
        //     endDate: null,
        // })
    }
    const handleChangeStartDate = (date) => {
        let tommorowFromStartDate = new Date()
        tommorowFromStartDate.setDate(date.getDate() + 1)
        setdatesForLease({ ...datesForLease, startDate: date, tommorowFromStartDate });
    }
    const handleChangeEndtDate = (date) => {
        setdatesForLease({ ...datesForLease, endDate: date });
    }

    useEffect(() => {
        const { rentACarServices } = props
        console.log(location)
        if (location !== '')
            setAvailableSerrvice(
                rentACarServices.filter((service) => {

                    return (service.city === location.split(':')[1] && service.state === location.split(':')[0])
                })
            )
    }, [location])

    useEffect(() => {

    }, [selectedService])

    useEffect(() => {
        locationField.focus()

    })
    useEffect(() => {
        const diffTime = Math.abs(datesForLease.endDate - datesForLease.startDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    }, [datesForLease])


    useEffect(() => {
        setToggleSearch(true)

    }, [filteredCars])

    useEffect(() => {
        const { rentACarServices } = props
        const { loggedInUser } = props
        const { AvailableCars } = props

        if (AvailableCars.length > 0)
            setFilteredCars(AvailableCars)


    }, [props.AvailableCars, props.rentACarServices, props.loggedInUser])



    useEffect(() => {
        setPriceRange([100, 200])
        setLocation("")
        setToggleSearch(false)
    }, [])

    const { classes } = props
    const todayDate = new Date()



    return (
        <animated.div style={spring} className={classes.componentSearchFlexContainer}>
            <div className={classes.searchBoxFlexContainer}>
                <div>
                    <h4 className={classes.searchHeaders}>Search for Rent A Car Service at specific location</h4>
                </div>

                <div className={classes.SearchSectionFlexContainerBox} style={{ margin: "5px" }}>

                    <h6 className={classes.searchHeaders}><br />Step 1: Choose Rent A Car Service</h6>
                    {/* <div className={classes.serviceBox}> */}
                    <>
                        <InputLabel >Choose Location</InputLabel>
                        <Autocomplete
                            className={classes.searchFormField}
                            options={props.rentACarServices}
                            getOptionLabel={(option) => option.state + ":" + option.city}

                            id="controlled-demo"

                            onChange={(event, newValue) => {

                                if (newValue == null) {
                                    setAvailableSerrvice(null)
                                    setLocation("")
                                } else
                                    setLocation(newValue.state + ":" + newValue.city)
                            }}

                            renderInput={(params) =>
                                <TextField {...params} ref={setLocationRefernce} label="" margin="normal" />
                            }
                        />
                        {(availableServices !== null)
                            ? (
                                <>
                                    <InputLabel >Available Rent A Car Services</InputLabel>
                                    <Select
                                        className={classes.searchFormField}
                                        labelId="demo-simple-select-outlined-label"
                                        id="demo-simple-select-outlined"
                                        value={selectedService["name"]}
                                        onChange={handleChangeSelectedService}
                                        label="Service"
                                        renderValue={(val) => {

                                            return val
                                        }
                                        }
                                    >
                                        {
                                            availableServices.map((service, index) =>
                                                <MenuItem value={service} key={service.rentACarServiceId} >{service.name + ":" + service.description}</MenuItem>
                                            )
                                        }
                                    </Select>
                                </>
                            ) : (
                                <>
                                    <InputLabel>Available Rent A Car Services  (enter location first)</InputLabel>
                                    <Select
                                        className={classes.searchFormField}
                                        labelId="demo-simple-select-outlined-label"
                                        id="demo-simple-select-outlined"
                                        value={location}

                                        label="Location"
                                        disabled
                                    >
                                        <MenuItem value="" disabled>
                                            <em>Rent A Car Services</em>
                                        </MenuItem>

                                    </Select>
                                </>
                            )
                        }
                        {/* </div> */}
                    </>
                    <Divider />
                    <br />
                    <h6 className={classes.searchHeaders}>Step 2: About order</h6>

                    <div className={classes.facilitySearchFlex}>


                        <div className={classes.facilityBox}>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>

                                <InputLabel>Pick up date</InputLabel>
                                <DateTimePicker
                                    placeholder="dd/MM/yyyy/hh:mm a"
                                    format={"dd/MM/yyyy/hh:mm a"}
                                    mask={value =>
                                        value
                                            ? [/\d/, /\d/, "/", /\d/, /\d/, "/", /\d/, /\d/, /\d/, /\d/]
                                            : []
                                    }
                                    value={datesForLease.startDate}
                                    onChange={handleChangeStartDate}
                                    disableOpenOnEnter
                                    minDate={todayDate}
                                    animateYearScrolling={false}
                                    autoOk={true}
                                    clearable
                                    onInputChange={e => console.log("Keyboard:", e.target.value)}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                />
                                <InputLabel>Drop off date</InputLabel>
                                <DateTimePicker
                                    //keyboard
                                    placeholder="dd/MM/yyyy/hh:mm a"
                                    format={"dd/MM/yyyy/hh:mm a"}
                                    // handle clearing outside => pass plain array if you are not controlling value outside
                                    mask={value =>
                                        value
                                            ? [/\d/, /\d/, "/", /\d/, /\d/, "/", /\d/, /\d/, /\d/, /\d/]
                                            : []
                                    }
                                    value={datesForLease.endDate}
                                    onChange={handleChangeEndtDate}
                                    disableOpenOnEnter
                                    minDate={(datesForLease.startDate !== null) ? datesForLease.tommorowFromStartDate : todayDate}
                                    animateYearScrolling={false}
                                    autoOk={true}
                                    clearable
                                    onInputChange={e => console.log("Keyboard:", e.target.value)}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                />

                            </MuiPickersUtilsProvider>
                        </div>

                        <div className={classes.facilityBox}>
                            <InputLabel >Number of pessangers (max 10)</InputLabel>
                            <TextField
                                id="standard-number"
                                type="number"

                                defaultValue={numberOfPessangers}
                                onChange={(e) => {
                                    setNumberOfPessangers(e.target.value)

                                }}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                            <InputLabel >Price Range: initial (100-200)</InputLabel>
                            <Slider
                                onChange={(e, val) => {
                                    setPriceRange(val)
                                }}

                                orientation="horizontal"
                                min={0}
                                step={10}
                                max={500}
                                scale={(x) => x}
                                defaultValue={[100, 200]}
                                valueLabelDisplay="auto"
                                aria-labelledby="vertical-slider"


                            />
                        </div>
                    </div>

                    <div className={classes.SearchSectionFlexContainerBox}>
                        {(selectedService.branchOffices != null)
                            ? (
                                <>
                                    <InputLabel >Available pick up stations</InputLabel>
                                    <Select
                                        className={classes.searchFormField}
                                        labelId="demo-simple-select-outlined-label"
                                        id="demo-simple-select-outlined"
                                        value={stations.pickUpStation}
                                        onChange={(e) => {

                                            setStations({
                                                ...stations, pickUpStation: {
                                                    id: e.target.value.branchOfficeId,
                                                    name: e.target.value.city + ": " + e.target.value.place
                                                }
                                            })
                                        }}

                                        label="Service"
                                        renderValue={() => { return stations.pickUpStation.name }}
                                    >
                                        {
                                            selectedService.branchOffices.map((office, index) =>
                                                <MenuItem value={office} key={office.branchOfficeId} >{office.city + ": " + office.place}</MenuItem>
                                            )
                                        }
                                    </Select>
                                </>
                            ) : (
                                <>
                                    <InputLabel >Available pick up stations (fill Step1 first)</InputLabel>
                                    <Select
                                        className={classes.searchFormField}
                                        labelId="demo-simple-select-outlined-label"
                                        id="demo-simple-select-outlined"
                                        value={location}

                                        label="Location"
                                        disabled
                                    >
                                        <MenuItem value="" disabled>
                                            <em>Rent A Car Services</em>
                                        </MenuItem>

                                    </Select>
                                </>
                            )
                        }

                        {(selectedService.branchOffices != null)
                            ? (
                                <>
                                    <InputLabel >Available drop off stations</InputLabel>
                                    <Select
                                        className={classes.searchFormField}
                                        labelId="demo-simple-select-outlined-label"
                                        id="demo-simple-select-outlined"
                                        value={stations.dropOffStation}
                                        onChange={(e) => {

                                            setStations({
                                                ...stations, dropOffStation: {
                                                    id: e.target.value.branchOfficeId,
                                                    name: e.target.value.city + ": " + e.target.value.place
                                                }
                                            })
                                        }}

                                        label="Service"
                                        renderValue={() => { return stations.dropOffStation.name }}
                                    >
                                        {
                                            selectedService.branchOffices.map((office, index) =>
                                                <MenuItem value={office} key={office.branchOfficeId} >{office.city + ": " + office.place}</MenuItem>
                                            )
                                        }
                                    </Select>
                                </>
                            ) : (
                                <>
                                    <InputLabel >Available drop off stations (fill Step1 first)</InputLabel>
                                    <Select
                                        className={classes.searchFormField}
                                        labelId="demo-simple-select-outlined-label"
                                        id="demo-simple-select-outlined"
                                        value={location}

                                        label="Location"
                                        disabled
                                    >
                                        <MenuItem value="" disabled>
                                            <em>Rent A Car Services</em>
                                        </MenuItem>

                                    </Select>
                                </>
                            )
                        }
                    </div>

                    <Button
                        variant="contained"
                        onClick={() => {
                            handleSearch()
                            setToggleSearch(true)
                        }}
                        className={classes.orderButton}
                        disabled={
                            (location !== '' &&
                                !(Object.keys(selectedService).length === 0 && selectedService.constructor === Object) &&
                                //datesForLease LOGIC ELIMINATION - Todo
                                ((datesForLease.startDate !== null && datesForLease.endDate !== null)) &&
                                numberOfPessangers <= 10 &&
                                (stations.pickUpStation.id != null && stations.dropOffStation.id != null)
                            ) ? (false) : (true)}>
                        Search
                </Button>

                </div>
                <Button
                    variant="contained"
                    color="primary"
                    className={classes.orderButton}
                    to="/carservices"
                    component={Link}
                >
                    Rent A Car Services
                </Button>
            </div>

            <div className={classes.componentSearchFlexContainer}>
                {(toggleSearch)
                    ? (
                        filteredCars.map((car, index) => {

                            return (
                                <CarOrdersModal key={car.id} vehicle={car} orderDetails={new Renting(
                                    (props.loggedInUser.userId != null) ? props.loggedInUser.userId : null,
                                    car.id,
                                    datesForLease.startDate,
                                    datesForLease.endDate,
                                    stations.pickUpStation.id,
                                    stations.dropOffStation.id
                                )} setToggleSearch={setToggleSearch} selectedServiceName={selectedServiceName} selectedService={selectedService} />
                            )
                        }, selectedService.vehicles)
                    ) : (<></>)

                }
            </div>
        </animated.div>
    )
}

const mapStateToProps = (state) => ({
    rentACarServices: state.carsReducer.rentACarServices,
    loggedInUser: state.userReducer.LoggedInUser,
    AvailableCars: state.rentingReducer.AvailableCars
});

const mapDispatchToProps = (dispatch) => ({
    SearchAvailableCars: (email, password, history) => dispatch(searchAvailableCars(email, password, history)),

});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(CarServiceSearch))



