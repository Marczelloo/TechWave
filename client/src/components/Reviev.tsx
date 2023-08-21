import React from 'react'
import '../style/Reviev.css';
import { useState, useEffect } from 'react';

type Props = {
    uid: number,
}

function Reviev({ uid : number }: Props) {
    const [userAvatar, setUserAvatar] = useState<string | undefined>(undefined);
    const [userName, setUserName] = useState<string | null>(null);
    const [userRevievNumber, setUserRevievNumver] = useState<number | null>(null);
    const [userRevievText, setUserRevievText] = useState<string | null>(null);
  return (
    <div>
        <div className='user-info'>
            <img src={userAvatar} alt='user-avatar'/>
            <p> {userName} </p> 
        </div>
        <div className='reviev'>
            <p> {userRevievNumber} </p>
            <p> {userRevievText}</p>
        </div>
    </div>
  )
}

export default Reviev