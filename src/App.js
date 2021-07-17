import React, {useEffect, useState} from "react";
import './App.scss';
import TinderCard from "./components/TinderCard";
import SwipeComponent from "./lib/SwipeComponent";
import {
    IoIosHeartEmpty,
    IoIosCloseCircleOutline
} from "react-icons/io";
import {get} from "lodash";
import FavoriteList from "./components/FavoriteList";


function App() {

    const favorite = JSON.parse(localStorage.getItem('favorite')) || [];

    const [people, setPeople] = useState([]);
    const [tabActive, setTabActive] = useState('swipe');

    useEffect(() => {

        fetch('https://randomuser.me/api/0.4/?randomapi')
            .then(response => response.json())
            .then(data => {

                setPeople([get(data, 'results.0')]);
            });
    }, []);

    const onSwipe = (direction, user) => {
        if (direction === 'right') {
            localStorage.setItem('favorite', JSON.stringify([...favorite, user]));
        }


        fetch('https://randomuser.me/api/0.4/?randomapi')
            .then(response => response.json())
            .then(data => {

                setPeople([get(data, 'results.0')]);
            });
    };

    const onCardLeftScreen = (myIdentifier) => {
        console.log(myIdentifier + ' left the screen')
    }

    return (
        <div>
            <div className="tinderCards__cardContainer">
                <div className='headerContainer'>
                    <button onClick={() => {
                        setTabActive("favor")
                    }}>Favorite</button>

                    <button onClick={() => {
                        setTabActive("swipe")
                    }}>Swipe</button>
                </div>
                {
                    tabActive === 'swipe' && <div>
                        <div className='cardContainer'>
                            {people.map((person) => {
                                let user = person.user;
                                let seed = person.seed;
                                return <SwipeComponent
                                    key={user.username}
                                    flickOnSwipe={true}
                                    className="swipe"
                                    preventSwipe={["up", "down"]}
                                    onSwipe={(direction) => {
                                        onSwipe(direction, user)
                                    }}
                                    onCardLeftScreen={() => onCardLeftScreen('')}
                                >
                                    <TinderCard user={user}/>
                                </SwipeComponent>
                            })}
                        </div>
                        <div className='buttons'>
                            <button onClick={() => onSwipe('left')}><IoIosCloseCircleOutline/></button>
                            <button onClick={() => onSwipe('right', get(people,'0.user'))}><IoIosHeartEmpty/></button>
                        </div>
                    </div>
                }


                {
                    tabActive === 'favor' && <div>
                        <FavoriteList favoriteList={favorite}/>
                    </div>
                }
            </div>


        </div>
    );
}

export default App;
