import React, { useEffect } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';

const styles = (theme) => ({
    dashboardItem: {
        [theme.breakpoints.down("xs", "sm")]: {
            width: '80%'
        },
        display: 'flex',
        flexDirection: 'column',
        width: '25%',
        height: '80%',
        background: '#27293D',
        borderRadius: '10px',

        marginLeft: "40px"
    },
    dashboarItemInfoContent: {
        width: '100%',
        height: '60%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#9A9A9A',
        borderRadius: '10px 10px 0 0',
    },
    itemInfo: {
        width: '70%',
        fontSize: '2.3vh',
        display: 'flex',
        alignText: 'right',
        justifyContent: 'right',
        margin: '20px'
    },
    avatarContainer: {
        //width: '30%',
        //display: 'flex',
        // alignText: 'right',
        // justifyContent: 'left',
        // alignItems: 'top'
    },
    avatarStyle: {
        width: theme.spacing(7),
        height: theme.spacing(7),
        backgroundColor: 'red',
        margin: '20px'
    },

    deshboarItemDescription: {
        width: '100%',
        height: '40px',
        textAlign: 'left',
        alignItems: 'center',
        margin: '0 0 0 0',
        borderRadius: '0 0 10px 10px',

    },
    descriptionText: {
        margin: '0 0 0 20px',
        color: '#9A9A9A',
        //fontWeight: 'bold',
    },
    divider: {
        background: '#9A9A9A'
    },
})

const AdminDashboardItem = (props) => {


    const { itemInfo } = props
    const { classes } = props

    return (

        <div className={classes.dashboardItem} style={{ width: itemInfo.width, height: itemInfo.height, background: "black", marginLeft: "10px", position:"relative", left: "30px" }}>
            <div className={classes.dashboarItemInfoContent}>
                <div className={classes.avatarContainer}>
                    <Avatar className={classes.avatarStyle}>
                        {props.MainInfoAvatar}
                    </Avatar>
                </div>
                <div className={classes.itemInfo}>
                    <p>
                        {itemInfo.infoTitle}<br />
                        <h2 style={{ color: 'white' }}><b>{itemInfo.info}</b></h2>
                    </p>
                </div>
            </div>

            <div className={classes.deshboarItemDescription}>
                <Divider variant="middle" className={classes.divider} />
                <p className={classes.descriptionText}>
                    {props.DescriptionAvatar}{itemInfo.infoDescription}</p>
            </div>
        </div>
    )
}

export default withStyles(styles)(AdminDashboardItem)
