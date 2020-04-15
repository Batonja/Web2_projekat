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

import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    DateTimePicker,


} from "@material-ui/pickers";

import CarOrdersModal from '../Utilities/CarOrdersModal'




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
    const [selectedService, setSelectedService] = useState({});
    const [availableServices, setAvailableSerrvice] = useState([]);
    const [datesForLease, setdatesForLease] = useState({
        startDate: null,
        endDate: null,
        tommorowFromStartDate: null,
    })
    const [numberOfPessangers, setNumberOfPessangers] = useState(5)
    const [priceRange, setPriceRange] = useState([100, 200])
    const [stations, setStations] = useState({
        pickUpStation: null,
        dropOffStation: null

    })
    const [service, setService] = useState('');


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

    const filteringCars = (car) => {
        if (car.NumberOfSeats == numberOfPessangers && car.PriceADay >= priceRange[0] && car.PriceADay <= priceRange[1])
            return true;
        // else if(priceRange[0] > car.PriceADay && priceRange[0] < car.PriceADay)
        //     return true
        else {
            return false
        }

    }

    const defaultPropsLocation = {
        //Get distinct values
        options: [...new Set(props.rentACarServices.map(x => x.City))],
        getOptionLabel: (option) => option,
    }

    const handleChangeSelectedService = (event) => {
        setService(event.target.value.Title)
        setSelectedService(event.target.value);
    };
    const setLocationRefernce = (inputElement) => {
        locationField = inputElement;
    }

    const handleSearch = () => {
        var filtered = selectedService.Vehicles.filter(filteringCars);
        setFilteredCars(filtered);
        setOrderDetails({
            service: selectedService.Title,
            datesForLease,
            stations
        })
        setService(selectedService.Title)
        setToggleSearch(true)
        setLocation('');
        setSelectedService({
            Title: ''
        });
        setStations({
            pickUpStation: null,
            dropOffStation: null
        })
        setdatesForLease({
            startDate: null,
            tommorowFromStartDate: null,
            endDate: null,
        })
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
        if (location !== '')
            setAvailableSerrvice(
                rentACarServices.filter((service) => {

                    return (service.City === location)
                })
            )
    }, [location])



    useEffect(() => {
        locationField.focus()

    })
    useEffect(() => {
        const diffTime = Math.abs(datesForLease.endDate - datesForLease.startDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    }, [datesForLease])



    const { classes } = props
    const todayDate = new Date()

    return (
        <animated.div style={spring} className={classes.componentSearchFlexContainer}>
            <div className={classes.searchBoxFlexContainer}>
                <div>
                    <h4 className={classes.searchHeaders}>Search for Rent A Car Service at specific location</h4>
                </div>

                <div className={classes.SearchSectionFlexContainerBox} style={{ margin: "5px" }}>
                    <h6 className={classes.searchHeaders}>Step 1: Choose Rent A Car Service</h6>
                    {/* <div className={classes.serviceBox}> */}
                    <>
                        <InputLabel >Choose Location</InputLabel>
                        <Autocomplete
                            className={classes.searchFormField}
                            {...defaultPropsLocation}
                            id="controlled-demo"
                            inputValue={location}
                            onChange={(event, newValue) => {

                                if (newValue === null) {
                                    setAvailableSerrvice(null)
                                    setLocation("")
                                } else
                                    setLocation(newValue)
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
                                        value={selectedService["Title"]}
                                        onChange={handleChangeSelectedService}
                                        label="Service"
                                        renderValue={() => { return selectedService.Title }}

                                    >
                                        {
                                            availableServices.map((service, index) =>
                                                <MenuItem value={service} key={index} >{service.Title + ":" + service.Description}</MenuItem>
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
                        {(selectedService.Stations != null)
                            ? (
                                <>
                                    <InputLabel >Available pick up stations</InputLabel>
                                    <Select
                                        className={classes.searchFormField}
                                        labelId="demo-simple-select-outlined-label"
                                        id="demo-simple-select-outlined"
                                        value={stations.pickUpStation}
                                        onChange={(e) =>
                                            setStations({ ...stations, pickUpStation: e.target.value })
                                        }

                                        label="Service"
                                        renderValue={() => { return stations.pickUpStation }}
                                    >
                                        {
                                            selectedService.Stations.map((station, index) =>
                                                <MenuItem value={station} key={index} >{station}</MenuItem>
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

                        {(selectedService.Stations != null)
                            ? (
                                <>
                                    <InputLabel >Available drop off stations</InputLabel>
                                    <Select
                                        className={classes.searchFormField}
                                        labelId="demo-simple-select-outlined-label"
                                        id="demo-simple-select-outlined"
                                        value={stations.pickUpStation}
                                        onChange={(e) =>
                                            setStations({ ...stations, dropOffStation: e.target.value })
                                        }

                                        label="Service"
                                        renderValue={() => { return stations.dropOffStation }}
                                    >
                                        {
                                            selectedService.Stations.map((station, index) =>
                                                <MenuItem value={station} key={index} >{station}</MenuItem>
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
                        onClick={handleSearch}
                        className={classes.orderButton}
                        disabled={
                            (location !== '' &&
                                !(Object.keys(selectedService).length === 0 && selectedService.constructor === Object) &&
                                //datesForLease LOGIC ELIMINATION - Todo
                                ((datesForLease.startDate !== null && datesForLease.endDate !== null)) &&
                                numberOfPessangers <= 10 &&
                                (stations.pickUpStation != null && stations.dropOffStation != null)
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
                {(toggleSearch === true)
                    ? (
                        filteredCars.map((car, index) => (
                            <CarOrdersModal key={index} vehicle={car} orderDetails={orderDetails} setToggleSearch={setToggleSearch} />
                        ), selectedService.Vehicles)
                    ) : (<></>)

                }
            </div>
        </animated.div>
    )
}

const mapStateToProps = (state) => ({
    rentACarServices: state.carsReducer.rentACarServices
});



export default connect(mapStateToProps)(withStyles(styles)(CarServiceSearch))



