import React, { useState, useEffect, Component } from 'react'

import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Button from "@material-ui/core/Button";
import NativeSelect from '@material-ui/core/NativeSelect';

import MomentUtils from "@date-io/moment";
import {
    MuiPickersUtilsProvider,
    //TimePicker,
    DatePicker,
    KeyboardDatePicker
} from "@material-ui/pickers";

import CarOrdersModal from '../CarOrdersModal'


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
            height: "400px"
        },
        width: "55%",
        height: "450px",
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
        margin: "10px",
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
})




const CarServiceSearch = (props) => {

    let locationField = null;
    const [location, setLocation] = useState('');
    const [selectedService, setSelectedService] = useState({});
    const [availableServices, setAvailableSerrvice] = useState(null);
    const [datesForLease, setdatesForLease] = useState({
        startDate: null,
        tommorowFromStartDate: null,
        endDate: null,
    })
    const [toggleSearch, setToggleSearch] = useState(false)


    const defaultPropsLocation = {
        //Get distinct values
        options: [...new Set(props.rentACarServices.map(x => x.City))],
        getOptionLabel: (option) => option,
    }



    const defaultPropsServices = {
        options: props.rentACarServices,
        getOptionLabel: (option) => option.City,
    }
    const handleChangeSelectedService = (event) => {
        console.log(event.target.value.Title)
        setSelectedService(event.target.value);
    };
    const setLocationRefernce = (inputElement) => {
        locationField = inputElement;
    }
    const handleSearch = () => {
        console.log(selectedService)
        setToggleSearch(true)
        setLocation('');
        //setSelectedService({});
        setdatesForLease({
            startDate: null,
            tommorowFromStartDate: null,
            endDate: null,
        })
    }

    const handleChangeStartDate = (date) => {
        let tommorowFromStartDate = new Date()
        tommorowFromStartDate.setDate(date._d.getDate() + 1)
        console.log(tommorowFromStartDate, date._d)
        console.log((date._d > tommorowFromStartDate))
        setdatesForLease({ ...datesForLease, startDate: date._d, tommorowFromStartDate });
    }

    const handleChangeEndtDate = (date) => {
        console.log(date, typeof (date))
        setdatesForLease({ ...datesForLease, endDate: date._d });
    }


    useEffect(() => {
        var services = [];
        const { rentACarServices } = props
        //console.log(location)
        if (location !== '')
            setAvailableSerrvice(
                rentACarServices.filter((service) => {
                    //console.log(service)
                    return (service.City === location)
                })
            )
    }, [location])
    useEffect(() => {
        //console.log(availableServices)
    }, [availableServices])

    useEffect(() => {
        locationField.focus()
    })

    const { classes } = props
    const { rentACarServices } = props



    const todayDate = new Date()

    return (
        <div className={classes.componentSearchFlexContainer}>
            <div className={classes.searchBoxFlexContainer}>
                <div>
                    <h4 className={classes.searchHeaders}>Search for Rent A Car Service at specific location</h4>
                </div>
                <div className={classes.SearchSectionFlexContainerBox}>

                    <InputLabel >Choose Location</InputLabel>
                    <Autocomplete
                        className={classes.searchFormField}
                        {...defaultPropsLocation}
                        id="controlled-demo"
                        inputValue={location}
                        onChange={(event, newValue) => {
                            //console.log(newValue)
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
                                            <MenuItem value={service} key={index} >{service.Title}</MenuItem>
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
                    <div className={classes.datesSearchFlex}>
                        <InputLabel>Choose pick up and  drop off dates</InputLabel>
                        <MuiPickersUtilsProvider utils={MomentUtils}>
                            <div className={classes.dateBox}>
                                <KeyboardDatePicker
                                    placeholder="MM/DD/YYYY"
                                    format={"MM/DD/YYYY"}
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
                            </div>
                            <div>
                                <KeyboardDatePicker
                                    //keyboard
                                    placeholder="MM/DD/YYYY"
                                    format={"MM/DD/YYYY"}
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
                            </div>
                        </MuiPickersUtilsProvider>
                    </div>
                    <Button
                        variant="contained"
                        onClick={handleSearch}
                        className={classes.orderButton}
                        disabled={
                            (location !== '' &&
                                !(Object.keys(selectedService).length === 0 && selectedService.constructor === Object) &&
                                //datesForLease LOGIC ELIMINATION - Todo
                                ((datesForLease.startDate !== null && datesForLease.endDate !== null))
                            ) ? (false) : (true)}>
                        Search
                </Button>


                </div>


            </div>

            <div className={classes.componentSearchFlexContainer}>
                {(toggleSearch === true)
                    ? (
                        selectedService.Vehicles.map((car, index) => (
                            <CarOrdersModal key={index} vehicle={car} />
                        ), selectedService.Vehicles)
                    ) : (<></>)

                }
            </div>
        </div>
    )
}



const mapStateToProps = (state) => ({
    rentACarServices: state.carsReducer.rentACarServices
});



export default connect(mapStateToProps)(withStyles(styles)(CarServiceSearch))



