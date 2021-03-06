import React, {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import './ProfileCard.css'
import { NavLink } from 'react-router-dom'
import { getAllHomes } from '../store/actions/homes'
import {deleteSavedHome} from '../store/actions/savedHomesAction'
import Button from '@material-ui/core/Button';

const ProfileCard = ({ savedHome, homes, getAllHomes}) => {
    const dispatch = useDispatch()
    useEffect(() => {
        getAllHomes();
    }, [])

    const onDelete = async (id) => {

        await dispatch(deleteSavedHome(id))
        alert('Reservation Successfully Canceled')
    
    };


    return (
        <>
         {homes.map((home) => {
             if(home.id === savedHome.homeId) {
                 return (

                     <NavLink to={`/homes/${home.id}`} style={{ textDecoration: 'none' }}>
                <div className="profile-card">
                    <img src={home.image} alt=""></img>
                    <div className="profile-card__info">
                        <h1 className='home-detail__link'>{home.name}</h1>
                        {/* <h4>{home.description}</h4> */}
                        <h2 className='home-detail__link'>{`$${home.price}`}</h2>
                                 <h3>{`From: ${savedHome.startDate.split('T')[0]}`}</h3>
                                  <h3> {`To: ${savedHome.endDate.split('T')[0]}`}</h3>
                    </div>
                    <div className="cancel-review__button">  
                                 <Button onClick={() => onDelete(savedHome.id)} variant="contained" color="secondary" size="large" className="cancel-review__buttonn">
                        Cancel
                    </Button>

                    </div>
                </div>
            </NavLink>
                 )
             }
         })}
        </>

    )
}

const ProfileCardContainer = ({savedHome}) => {
    const homes = useSelector((state) => Object.values(state.homes))
    const dispatch = useDispatch()
    return (
        <ProfileCard 
            savedHome={savedHome}
            homes={homes}
            getAllHomes={() => dispatch(getAllHomes())}
        />
    )
}

export default ProfileCardContainer
