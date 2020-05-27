import React from 'react'
import { withStyles } from '@material-ui/core/styles'

//ICONS AND AVATAR
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';

import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import AssignmentIcon from '@material-ui/icons/Assignment';
import InfoIcon from '@material-ui/icons/Info';
import StarIcon from '@material-ui/icons/Star';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import EmojiTransportationIcon from '@material-ui/icons/EmojiTransportation';
import HomeIcon from '@material-ui/icons/Home';


import AdminDashboardItem from '../Utilities/AdminDashboardItem'
import BarChart from '../Utilities/BarChart'
import LineChart from '../Utilities/LineChart'


const styles = (theme) => ({
    adminHome: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        alignText: 'center'
       
    },
    generalProfitModal: {
        [theme.breakpoints.down("xs", "sm", 'md', 'lg')]: {
            flexDirection: 'column',
            width: '100%',
        },
        width: '90%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        //background: '#3F51B5',
        borderRadius: '20px',
        margin: '10px'
    },
    adminHomeHeader: {
        textAlign: 'left',
        margin: '0 0 0 80px',
        fontSize: '4vh'
    },
})


const CarAdminHome = (props) => {

    const { classes } = props
    const profitItemInfo = {
        infoTitle: 'Total profit',
        info: '1000$',
        infoDescription: 'Total profit of the car service',
    }
    const gradeItemInfo = {
        infoTitle: 'Average grade',
        info: '4.7',
        infoDescription: 'Customer feedback',
    }
    const rentedCarsItemInfo = {
        infoTitle: 'Cars rented',
        info: '3',
        infoDescription: 'Number of rented vehicles',
    }
    const stockItemInfo = {
        infoTitle: 'Cars on stock',
        info: '8',
        infoDescription: 'Number of garaged wehicles',
    }

    return (
        <div>
            <div className={classes.adminHomeHeader}>
                <p><strong>Dashboard</strong> Admin Control panel</p>
            </div>
            <div className={classes.adminHome}>
                <BarChart chartTitle={'Yearly profit report'} />
                <div className={classes.generalProfitModal}>
                    <AdminDashboardItem
                        MainInfoAvatar={<AttachMoneyIcon fontSize='large' />}
                        DescriptionAvatar={<InfoIcon fontSize='small' />}
                        itemInfo={profitItemInfo}
                    />
                    <AdminDashboardItem
                        MainInfoAvatar={<StarIcon fontSize='large' />}
                        DescriptionAvatar={<InfoIcon fontSize='small' />}
                        itemInfo={gradeItemInfo}
                    />
                    <AdminDashboardItem
                        MainInfoAvatar={<EmojiTransportationIcon fontSize='large' />}
                        DescriptionAvatar={<InfoIcon fontSize='small' />}
                        itemInfo={rentedCarsItemInfo}
                    />
                    <AdminDashboardItem
                        MainInfoAvatar={<HomeIcon fontSize='large' />}
                        DescriptionAvatar={<InfoIcon fontSize='small' />}
                        itemInfo={stockItemInfo}
                    />
                </div>
                <LineChart
                    chartTitle={'Rented Cars weekly report'}
                    sygnalType={"weekly"}
                />
                <LineChart
                    chartTitle={'Rented Cars monthly report'}
                    sygnalType={"monthly"}
                />
                <LineChart
                    chartTitle={'Rented Cars yearly report'}
                    sygnalType={"yearly"}
                />


            </div>
        </div>
    )
}

export default withStyles(styles)(CarAdminHome)
