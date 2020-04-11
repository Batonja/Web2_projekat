import React, { useState, useEffect, useRef } from 'react'

import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";

import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const styles = (theme) => ({

    searchBoxFlexContainer: {

        display: "flex",
        [theme.breakpoints.down("xs", "sm", "md")]: {
            width: "95%",
            height: "400px"
        },
        width: "60%",
        height: "400px",
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

        height: '40%',
        margin: "10px",
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: "center",
        borderRadius: '5px',
        backgroundColor: "#e5e5e5",

    },
    searchFormField: {
        width: "90%",
    }

})




const CarServiceSearch = (props) => {
    const { rentACarServices } = props
    let locationField = null
    const [location, setLocation] = useState('');
    const [selectedService, setSelectedService] = useState({});
    const [availableServices, setAvailableSerrvice] = useState(null);
    const distinct = (value, index, self) => {
        return self.indexOf(value) === index
    }
    const defaultPropsLocation = {
        //Get distinct values
        options: [...new Set(rentACarServices.map(x => x.City))],
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
    const onClick = (e) => {
        e.preventDefault();
        this.locationField.focus();
    }
    useEffect(() => {
        var services = [];
        const { rentACarServices } = props
        console.log(location)
        if (location !== '')
            setAvailableSerrvice(
                rentACarServices.filter((service) => {
                    //console.log(service)
                    return (service.City === location)
                })
            )
    }, [location])
    useEffect(() => {
        console.log(availableServices)
    }, [availableServices])
    useEffect(() => {
        locationField.focus()
    })
    const { classes } = props

    return (
        <div className={classes.searchBoxFlexContainer}>

            <div className={classes.SearchSectionFlexContainerBox}>
            <InputLabel id="demo-simple-select-label">Choose Location</InputLabel>
                <Autocomplete
                    className={classes.searchFormField}
                    {...defaultPropsLocation}
                    id="controlled-demo"
                    inputValue={location}
                    onChange={(event, newValue) => {
                        console.log(newValue)
                        if(newValue === null){
                            setAvailableSerrvice(null)
                            setLocation("")
                        }else
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
                                value={selectedService}
                                onChange={handleChange}
                                label="Location"
                                
                            
                            >
                                {
                                    availableServices.map((service, index) =>
                                        <MenuItem value={service.Title} key={index} >{service.Title}</MenuItem>
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



            </div>
            <div className={classes.SearchSectionFlexContainerBox}>

            </div>
        </div>
    )
}





const mapStateToProps = (state) => ({
    rentACarServices: state.carsReducer.rentACarServices
});



export default connect(mapStateToProps)(withStyles(styles)(CarServiceSearch))



