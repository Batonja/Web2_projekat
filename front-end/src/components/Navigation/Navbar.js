import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { Link as RouterLink } from "react-router-dom";
import Link from "@material-ui/core/Link";
import AccountNavbarCollapse from "./AccountNavbarCollapse";
import MenuNavbarCollapse from "./MenuNavbarCollapse";

const styles = (theme) => ({
    root: {
        flexGrow: 1,
    },
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },

    navigation: {},
    toggleDrawer: {},
    appTitle: {
        [theme.breakpoints.down("sm")]: {
            display: "none",
            textAlign: 'right'
        },
        //flexGrow: 1,
        width: "100%",
        height: "100%",
        textAlign: "center",
        fontFamily: "Charmonman", //"Impact, Charcoal, sans-serif",
    },
    logo: {
        flexGrow: 1,
        position: "absolute",
        margin: "auto",
        left: "5%",
        maxWidth: "100%",
        maxHeight: "100%",
        zIndex: "-1",
        opacity: "0.5",
    },
    customizeToolbar: {
        minHeight: 60,
        maxHeight: 80,
    },
});

function Navbar(props) {
    const { classes } = props;
    //const logo = <img style={{ marginTop: 10 }} src={require('./logo.png')} alt="logo" className={classes.logo} />
    return (
        <div>
            <AppBar position="fixed" className={classes.navigation}>
                <Toolbar className={classes.customizeToolbar}>
                    {/* {logo} */}
                    <MenuNavbarCollapse />
                    <Typography variant="h3" color="inherit" className={classes.appTitle}>
                        <Link component={RouterLink} to="/" color="inherit">
                            Doom Travel
            </Link>
                    </Typography>
                    <AccountNavbarCollapse />
                </Toolbar>
            </AppBar>
        </div>
    );
}

Navbar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Navbar);
