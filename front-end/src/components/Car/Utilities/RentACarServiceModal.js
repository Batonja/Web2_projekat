import React, { useEffect, useState } from 'react'
import { withStyles } from '@material-ui/core/styles'
import CarPresentationModal from './CarPresentationModal';
import templateCar from "../template-images/rent-a-car-service-template.png"
import InfoIcon from '@material-ui/icons/Info';
import StarIcon from '@material-ui/icons/Star';
import AdminDashboardItem from '../Utilities/AdminDashboardItem'
const styles = (theme) => ({

    rentACarModal: {
        width: "60%",
        height: "300px",
        display: "flex",
        justifyContent: "center",
        marginTop: "50px",
        marginBottom: "50px",
        borderRadius: "10px",

    },
    logoContainer: {
        width: "30%",
        background: "black",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "10px 0 0 10px",
        cursor: "pointer"
    },
    infoContainer: {
        width: "100%",
        background: "gray",
        display: "flex",
        flexDirection: "column",
        alignItems: "top",
        justifyContent: "center",
        borderRadius: "0 10px 10px 0"
    },

    OfficesContainer:{
        marginLeft:"100px",
        color: "9A9A9A"
    },
    gradeContained:{
        background: "black",
        width: "95%",
        display:"flex",
        justifyContent: "center",
        margin: "0 10px 0 10px",
        borderRadius: "10px"

    }
})

const black = "black";
const green = "#3F51B5"

const RentACarServiceModal = (props) => {

    const [toggleCars, setToggleCars] = useState(true)
    const [backgroundColor, setBackgroundColor] = useState(black);

    const { classes } = props

    useEffect(() => {
        setToggleCars(true);
        setBackgroundColor(black);
    }, [])
    const { rentACarService } = props
    console.log(rentACarService)

    const gradeItemInfo = {
        infoTitle: 'Average grade',
        info: rentACarService.averageGrade,
        infoDescription: 'Customer feedback',
        width: "280px",
        height: "170px"
    }
    return (
        <>
            <div aria-label="click to expand" className={classes.rentACarModal}>
                <div className={classes.logoContainer} style={{ background: backgroundColor }} onClick={() => { setToggleCars(!toggleCars); setBackgroundColor(toggleCars ? green : black); }} >
                    <img src={templateCar} alt="car aimage" style={{ height: "50%" }} />
                </div>
                <div className={classes.infoContainer}>
                    <div className={classes.titleContainer}>
                        <h2 style={{ fontSize: "3em", fontWeigh: "bold", color: backgroundColor, fontFamily: "Charmonman", textShadow: "2px 1px black" }}>{rentACarService.name}</h2>
                        <h3 style={{ fontSize: "2em", fontWeigh: "bold", color: "#ff4d07", fontFamily: "Charmonman", textShadow: "2px 2px black" }}>{rentACarService.description}</h3>                    </div>
                    <br />
                    <div className={classes.gradeContained}>
                        <AdminDashboardItem
                            MainInfoAvatar={<StarIcon fontSize='large' />}
                            DescriptionAvatar={<InfoIcon fontSize='small' />}
                            itemInfo={gradeItemInfo}
                        />
                        <div className={classes.OfficesContainer}>
                            <h2 style={{ fontSize: "2em", fontWeigh: "bold", color: "#ff4d07", fontFamily: "Charmonman", textShadow: "2px 2px black", marginTop:"10px" }}> Branch offices</h2>
                            <ul style={{color: "#9A9A9A", textAlign: "left"}}>
                               {rentACarService.branchOffices.map(office => <li>{office.city + ":" + office.place}</li>)} 
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            { (!toggleCars)
                ?
                rentACarService.vehicles.map(vehicle =>
                    <CarPresentationModal key={vehicle.id} vehicle={vehicle} />
                )
                : <></>
            }
        </>
    )
}

export default withStyles(styles)(RentACarServiceModal)
