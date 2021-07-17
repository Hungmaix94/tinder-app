import style from './index.module.scss';
import React, {useState} from "react";
import {get} from 'lodash'
import moment from 'moment';
import {
    IoIosMap,
    IoIosCall,
    IoIosLock,
    IoMdCalendar,
    IoIosPerson,

} from "react-icons/io";

const Info = ({user, activeTab}) => {

    switch (activeTab) {
        case 'person':
            return (
                <div className={style.tinderInfoWrapper}>
                      <span className={style.tinderInfoTitle}>
                    My name is:
                </span>
                    <span className={style.tinderInfoDetail}>
                     {Object.values(get(user, "name", {})).join(" ")}
                </span>
                </div>
            )

        case 'dob' :
            return (
                <div className={style.tinderInfoWrapper}>
                      <span className={style.tinderInfoTitle}>
                    My birthday is:
                </span>
                    <span className={style.tinderInfoDetail}>
                     {moment(get(user, 'dob') * 1000).format("DD/MM/YYYY")}
                </span>
                </div>
            )

        case 'address' :
            return (
                <div className={style.tinderInfoWrapper}>
                <span className={style.tinderInfoTitle}>
                My address is:
                </span>
                    <span className={style.tinderInfoDetail}>
                     {get(user, "location.street")}
                </span>
                </div>)

        case 'phone' :
            return (
                <div className={style.tinderInfoWrapper}>
                      <span className={style.tinderInfoTitle}>
                    My phone is:
                </span>
                    <span className={style.tinderInfoDetail}>
                     {get(user, "phone")}
                </span>
                </div>

            )
        case 'password' :
            return (
                <div className={style.tinderInfoWrapper}>
                      <span className={style.tinderInfoTitle}>
                    My password is:
                </span>
                    <span className={style.tinderInfoDetail}>
                     {get(user, "password")}
                </span>
                </div>
            )
        default :
            return <div className={style.tinderInfoWrapper}>
                      <span className={style.tinderInfoTitle}>
                    My profile is:
                </span>
                <span className={style.tinderInfoDetail}>
                    not active
                </span>
            </div>
    }

};

const InfoTab = ({activeTab, setActiveTab}) => {

    const icons = [
        {
            iconComponent: <IoIosPerson/>,
            label: "person",
        },
        {
            iconComponent: <IoMdCalendar/>,
            label: "dob",
        },
        {
            iconComponent: <IoIosMap/>,
            label: "address",
        },
        {
            iconComponent: <IoIosCall/>,
            label: "phone",
        },
        {
            iconComponent: <IoIosLock/>,
            label: "password",
        },
    ];


    return (
        <div className={style.tabButtonWrapper}>
            {icons.map(icon => {

                return (
                    <div
                        className={`tab-button ${icon.label === activeTab ? "active" : ""}`}
                        onClick={()=> {
                            setActiveTab(icon.label)
                        }}
                    >
                        {icon.iconComponent}
                    </div>
                )
            })}
        </div>
    )
};

const TinderCard = ({user}) => {
    const [activeTab, setActiveTab] = useState('person');
    return (
        <>
            <div className={style.tinderCard}>
                <div className={style.tinderImageWrapper}>
                    <img className={style.tinderImage} src={get(user, "picture")} alt={get(user, "picture")}/>
                </div>
                <Info user={user} activeTab={activeTab}/>
                <InfoTab activeTab={activeTab} setActiveTab={setActiveTab}/>
            </div>
        </>
    );
};

export default TinderCard;