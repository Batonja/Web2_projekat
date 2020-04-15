import React, { Component } from "react";
import { connect } from "react-redux";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import { Collapse } from "react-collapse";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import { withStyles } from "@material-ui/core/styles";
import Rating from '@material-ui/lab/Rating';
import CarPresentationModal from './CarPresentationModal'

const styles = theme => ({
    componentServicesContainer: {
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: "center",
    },

    tabeleServices: {
        width: "80%",
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: "center",
        beckgroungColor: "#3F51B5",
        color: "#3F51B5"
    },
    modalHeaders: {
        textAlign: "left",
        fontWeight: "bold",
        color: "#ff4d07"
    },

})

class RentACarServices extends Component {
    constructor(props) {
        super(props);

        this.state = {
            openedCollapsed: []
        };
        console.log(this.props.rentACarServices)
    }

    isOpened(index) {
        if (this.state.openedCollapsed.includes(index)) return true;

        return false;
    }

    openClose(index) {
        if (this.state.openedCollapsed.includes(index)) {
            var filteredArray = this.state.openedCollapsed.filter(
                item => item !== index
            );
            this.setState({ openedCollapsed: filteredArray });
            return;
        }
        this.setState({ openedCollapsed: [...this.state.openedCollapsed, index] });
    }
    render() {
        const { classes } = this.props
        const { rentACarServices } = this.props



        return Array.from(rentACarServices).length !== 0 ? (
            <div className={classes.componentServicesContainer}>
                <Table className={classes.tabeleServices}>

                    <TableCell>
                        <h5 style = {{fontWeight: "bold",}}>{Array.from(Object.keys(rentACarServices[0]))[6]}</h5>
                    </TableCell>
                    <TableCell>
                    <h3 style = {{fontWeight: "bold",}}> {Array.from(Object.keys(rentACarServices[0]))[1]}</h3>
                    </TableCell>
                    <TableCell>
                    <h5 style = {{fontWeight: "bold",}}>State</h5>
                    </TableCell>
                    <TableCell>
                    <h5 style = {{fontWeight: "bold",}}>City</h5>
                    </TableCell>
                    <TableCell>
                    <h5 style = {{fontWeight: "bold",}}>Average Grade</h5>
                    </TableCell>
                   


                    {Array.from(rentACarServices).map((service, i) => {
                        return (
                            <TableBody>
                                <TableRow onClick={() => this.openClose(i)}>
                                    <TableCell><h6 className={classes.modalHeaders}>{service.Description}</h6></TableCell>
                                    <TableCell><h4 className={classes.modalHeaders}>{service.Title}</h4></TableCell>
                                    <TableCell><h6 className={classes.modalHeaders}>{service.State}</h6></TableCell>
                                    <TableCell><h6 className={classes.modalHeaders}>{service.City}</h6></TableCell>
                                    <TableCell><h6 className={classes.modalHeaders}><Rating value={service.AverageGrade} readOnly /></h6></TableCell>
                                    <TableCell>
                                        {this.isOpened(i) ? (
                                            <KeyboardArrowUpIcon />
                                        ) : (
                                                <KeyboardArrowDownIcon />
                                            )}
                                    </TableCell>
                                </TableRow>
                                <Collapse isOpened={this.isOpened(i)} eventKey={i}>

                                    <h3 style={{ textAlign: "center", fontWeight: "bold", }}>OFFERED CARS:</h3>{" "}
                                    {Array.from(rentACarServices[i].Vehicles).map(
                                        (vehicle, i) => {
                                            return (
                                                <TableRow >
                                                    <TableCell colSpan={6}>
                                                        <CarPresentationModal vehicle={vehicle} />
                                                    </TableCell>
                                                </TableRow>
                                            )
                                        }
                                    )}


                                </Collapse>
                            </TableBody>
                        );
                    })}
                </Table>
            </div>
        ) : (
                ""
            );
    }
}

const mapStateToProps = state => ({
    airlines: state.flightReducer.airlines,
    rentACarServices: state.carsReducer.rentACarServices,
});

export default connect(mapStateToProps)(withStyles(styles)(RentACarServices));
