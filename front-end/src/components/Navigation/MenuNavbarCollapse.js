/**
 * Code from the below medium post, only updated for latest material UI, using a
 * Menu for the popup and with breakpoints that work.
 *
 * https://medium.com/@habibmahbub/create-appbar-material-ui-responsive-like-bootstrap-1a65e8286d6f
 */
import React from "react";
//import { Button } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import HomeIcon from "@material-ui/icons/Home";
import IconButton from "@material-ui/core/IconButton";
import DrowerNavbarCollapsed from './DrowerNavbarCollapsed'
import { Link as RouterLink } from "react-router-dom";
import Link from '@material-ui/core/Link';



const styles = theme => ({
    menu: {
        position: "absolute",
        left: 0
    },
    buttonBar: {
        [theme.breakpoints.down("xs")]: {
            display: "none"
        },
        margin: "0",
        paddingLeft: "16px",
        right: 0,
        position: "relative",
        width: "100%",
        background: "transparent"
    },
    buttonCollapse: {
        [theme.breakpoints.up("sm")]: {
            display: "none"
        },
        margin: "0",
        boxShadow: "none"
    },
    toggleDrawer: {}
});

const MenuNavbarCollapse = props => {
    const { classes } = props;

    return (
        <div className={classes.menu}>
            <div className={classes.buttonCollapse}>
                <DrowerNavbarCollapsed />
            </div>

            <div className={props.classes.buttonBar} id="menu-uncollapsed">
                <IconButton
                    color="inherit"
                    aria-label="Menu"
                    className={classes.toggleDrawer}
                >
                    <HomeIcon />
                </IconButton>
                <Link
                    component="button"
                    variant="body2"
                    color="inherit"
                    to={"/signin"}
                    component={RouterLink}
                >
                    Airlines
                </Link>
                <Link
                    component="button"
                    variant="body2"
                    color="inherit"
                    to={"/signin"}
                    component={RouterLink}
                >
                    Rent A Car
                </Link>

            </div>

        </div>
    )
};

export default withStyles(styles)(MenuNavbarCollapse);
