import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import EmojiTransportationIcon from "@material-ui/icons/EmojiTransportation";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import FlightIcon from "@material-ui/icons/Flight";
import HomeIcon from "@material-ui/icons/Home";
import IconButton from "@material-ui/core/IconButton";
import { Link as RouterLink } from "react-router-dom";

const useStyles = makeStyles({
  list: {
    width: 200,
  },
  fullList: {
    width: "auto",
  },

  toggleDrawer: {},
});

export default function DrowerNavbarCollapsed() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    left: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "top" || anchor === "bottom",
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <ListItem
          button
          key={"Airlines"}
          to={"/flights"}
          component={RouterLink}
        >
          <ListItemIcon>
            <FlightIcon />
          </ListItemIcon>
          <ListItemText primary={"Airlines"} />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem button key={"RentACar"} to={"/cars"} component={RouterLink}>
          <ListItemIcon>
            <EmojiTransportationIcon />
          </ListItemIcon>
          <ListItemText primary={"Rent A Car"} />
        </ListItem>
      </List>
    </div>
  );

  return (
    <div>
      {["left"].map((anchor) => (
        <React.Fragment key={anchor}>
          <IconButton
            onClick={toggleDrawer(anchor, true)}
            color="inherit"
            aria-label="Menu"
            className={classes.toggleDrawer}
          >
            <HomeIcon />
          </IconButton>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
