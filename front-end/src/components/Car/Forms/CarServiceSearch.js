import React, { useState, useEffect, Component } from 'react'

import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Button from "@material-ui/core/Button";

import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-dates/initialize'
import 'react-dates/lib/css/_datepicker.css'
import { DateRangePicker } from 'react-dates';
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
// /import DatePickerWithFormik from "./date-picker";
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

        height: '70%',
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


const DatePickerWithFormik = ({
    startDateId,
    endDateId,
    form: { setFieldValue, setFieldTouched, values },
    field,
    ...props
}) => {


    const [focusedInput, setFocusedInput] = useState(null);

const DatePickerWithFormik = ({
    startDateId,
    endDateId,
    form: { setFieldValue, setFieldTouched, values },
    field,
    ...props
}) => {
    console.log(values);
    const [focusedInput, setFocusedInput] = useState(null);



    return (
        <DateRangePicker
            style={{ width: "90%" }}
            startDate={values.startDate}
            startDateId="tata-start-date"
            endDate={values.endDate}
            endDateId="tata-end-date"
            onDatesChange={({ startDate, endDate }) => {
                setFieldValue("startDate", startDate);
                setFieldValue("endDate", endDate);
            }}
            focusedInput={focusedInput}
            onFocusChange={focusedInput => setFocusedInput(focusedInput)}
        />
    );
};


const formInitialValues = {
    // DatePickerWithFormik: null
    startDate: null,
    endDate: null
};

const handleSubmit = formValues => {

    console.log(formValues);
};

const validatedFormFields = Yup.object().shape({
    // simpleDate: ,
});



    return (
        <DateRangePicker
            style={{ width: "90%" }}
            startDate={values.startDate}
            startDateId="tata-start-date"
            endDate={values.endDate}
            endDateId="tata-end-date"
            onDatesChange={({ startDate, endDate }) => {
                setFieldValue("startDate", startDate);
                setFieldValue("endDate", endDate);
            }}
            focusedInput={focusedInput}
            onFocusChange={focusedInput => setFocusedInput(focusedInput)}
        />
    );
};

const formInitialValues = {
    // DatePickerWithFormik: null
    startDate: null,
    endDate: null
};

const handleSubmit = formValues => {
    console.log(formValues);
};

const validatedFormFields = Yup.object().shape({
    // simpleDate: ,
});

var today = new Date()
var tomorrow = new Date()
var theDayAfterTomorrow = new Date()
tomorrow.setDate(today.getDate() + 1)
theDayAfterTomorrow.setDate(today.getDate() + 2)

const availabilityDates = [today, tomorrow, theDayAfterTomorrow]

console.log(availabilityDates)

const CarServiceSearch = (props) => {

    let locationField = null;
    const [location, setLocation] = useState('');
    const [selectedService, setSelectedService] = useState({});
    const [availableServices, setAvailableSerrvice] = useState(null);
    const [dates, setDates] = useState({
        startDate: null,
        endDate: null,
    })
    const [focusedInput, setFocusedInput] = useState(null)
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
    const handleChange = (event) => {
        setSelectedService(event.target.value);
    };
    const setLocationRefernce = (inputElement) => {
        locationField = inputElement;
    }

    const handleSearch = () => {
        setToggleSearch(true)
        setLocation('');
        //setSelectedService({});
        setDates({
            startDate: null,
            endDate: null,
        })
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
        console.log(dates)
    }, [dates])
    useEffect(() => {
        locationField.focus()

        let tommorow = new Date()
        let theDayAfter = new Date()
        theDayAfter.setDate(tommorow.getDate() + 1)
        console.log(selectedService)
    })

    const { classes } = props
    const { rentACarServices } = props


    return (
        <div className={classes.componentSearchFlexContainer}>
            <div className={classes.searchBoxFlexContainer}>
                <div>
                    <h4 className={classes.searchHeaders}>Search for Rent A Car Service at specific location</h4>
                </div>
                <div className={classes.SearchSectionFlexContainerBox}>
                    <InputLabel id="demo-simple-select-label">Choose Location</InputLabel>
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
                                <InputLabel id="demo-simple-select-label">Available Rent A Car Services</InputLabel>
                                <Select
                                    className={classes.searchFormField}
                                    labelId="demo-simple-select-outlined-label"
                                    id="demo-simple-select-outlined"
                                    value={selectedService.Title}
                                    onChange={handleChange}
                                    label="Location"


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
                                <InputLabel id="demo-simple-select-label">Available Rent A Car Services  (enter location first)</InputLabel>
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
                    <br /><br />
                    <Formik
                        initialValues={formInitialValues}
                        onSubmit={handleSubmit}
                        validationSchema={validatedFormFields}
                        style={{ width: "90%" }}
                    >
                        {props => (
                            <Form>

                                <InputLabel id="demo-simple-select-label">Choose Dates For which you need a car</InputLabel>
                                <Field

                                    component={DatePickerWithFormik}
                                    style={{ width: "90%" }}
                                />
                                <ErrorMessage name="DatePickerWithFormik">
                                    {msg => <div style={{ color: "red" }}>{msg}</div>}
                                </ErrorMessage>

                            </Form>
                        )}
                    </Formik>

                </div>

                <Button
                    variant="contained"
                    onClick={handleSearch}
                    className={classes.orderButton}
                    disabled={
                        (location !== '' &&
                            !(Object.keys(selectedService).length === 0 && selectedService.constructor === Object) //&&
                            //DATES LOGIC ELIMINATION - Todo

                        ) ? (false) : (true)}>
                    Search
                </Button>
            </div >

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



