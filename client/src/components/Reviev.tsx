import React from 'react'
import '../style/Reviev.css';
import { useState, useEffect } from 'react';
import personIcon from '../assets/personIcon.png';
import star from '../assets/star.png';

type Props = {
    uid: number,
}

function Reviev({ uid : number }: Props) {
    const [userAvatar, setUserAvatar] = useState<string | undefined>(personIcon);
    const [userName, setUserName] = useState<string | null>("Marcel Moskwa");
    const [userRevievNumber, setUserRevievNumver] = useState<number | null>(4);
    const [userRevievText, setUserRevievText] = useState<string | null>("some text lol shit happens gonna kys someday hate niggers hate niggers stare baby jebac pradem lol");
    const [revievDateAgo, setRevievDateAgo] = useState<string | null>('2 months ago');
    
    const [stars, setStars] = useState<JSX.Element[] | null>(null);

    

    useEffect(() =>{
        const starsArray: JSX.Element[] = [];
        
        for(let i = 0; i < 5; i++){
            if (i < userRevievNumber!) {
                starsArray.push(<img key={'star' + i} src={star} alt='rate-star' />);
            } else {
                starsArray.push(
                  <img key={'star' + i} src={star} alt='rate-star' className='gray-star' />
                );
            }
        }

        setStars(starsArray);

    }, [userRevievNumber]);
    
  return (
    <div className='reviev-container'>
        <div className='user-info'>
            <div className='user-img-container'>
                <img src={userAvatar} alt='user-avatar'/>
            </div>
            <p> {userName} </p> 
        </div>
        <div className='reviev'>
            <div className='reviev-info'>
                <div className='reviev-rate'>
                    {/* <img src={star} alt='rate-star'/>
                    <img src={star} alt='rate-star'/>
                    <img src={star} alt='rate-star'/>
                    <img src={star} alt='rate-star'/>
                    <img src={star} alt='rate-star'/> */}
                    
                    {
                        stars
                    }

                    <p> {revievDateAgo} </p>
                </div>
            </div>
            <p className='reviev-text'>{userRevievText}</p>
        </div>
    </div>
  )
}

export default Reviev