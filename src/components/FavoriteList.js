import React from "react";
import {get} from 'lodash'
import style from './index.module.scss';
import TinderCard from "./TinderCard";

const FavoriteList = ({favoriteList}) => {
    console.log(favoriteList,'favoriteList');
    return (
        <>
           <div className={style.favoriteList}>
               {
                   favoriteList.map(user => {
                       return (
                           <div>
                               <TinderCard user={user}/>
                           </div>
                       )

                   })
               }
           </div>
        </>
    );
};

export default FavoriteList;