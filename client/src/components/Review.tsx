import '../style/Review.css';
import { useState, useEffect } from 'react';
import personIcon from '../assets/personIcon.png';
import star from '../assets/star.png';

type Props = {
    uid: number,
    reviewRate: number,
    reviewText: string
    reviewDate: Date,
}

function review({ uid, reviewRate, reviewText, reviewDate }: Props) {
    const userId = uid;
    const userReviewNumber = reviewRate;
    const userReviewText = reviewText;
    const userReviewDate = reviewDate;

    const [userAvatar, setUserAvatar] = useState<string | undefined>(personIcon);
    const [userName, setUserName] = useState<string | null>(null);
    const [reviewDateAgo, setReviewDateAgo] = useState<string | null>(null);
    const [stars, setStars] = useState<JSX.Element[] | null>(null);

    

    useEffect(() =>{
        const manageStarsImg = () => {
            const starsArray: JSX.Element[] = [];
        
            for(let i = 0; i < 5; i++){
                if (i < userReviewNumber!) {
                    starsArray.push(<img key={'star' + userId + i} src={star} alt='rate-star' />);
                } else {
                    starsArray.push(
                      <img key={'star' + userId + i} src={star} alt='rate-star' className='gray-star' />
                    );
                }
            }
    
            setStars(starsArray);
        }

        const calcreviewDateAgo = () => {
            const formatedDate = new Date(userReviewDate);

            const timeDifference: number = Math.floor((Date.now() - formatedDate.getTime()) / 1000);

            function formatTimeDifference(timeDifference: number) {
                if (timeDifference < 60) {
                  return `${timeDifference} seconds ago`;
                } else if (timeDifference < 3600) {
                  const minutes = Math.floor(timeDifference / 60);
                  return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
                } else if (timeDifference < 86400) {
                  const hours = Math.floor(timeDifference / 3600);
                  return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
                } else if (timeDifference < 604800) {
                  const days = Math.floor(timeDifference / 86400);
                  return `${days} ${days === 1 ? 'day' : 'days'} ago`;
                } else if (timeDifference < 2592000) {
                  const weeks = Math.floor(timeDifference / 604800);
                  return `${weeks} ${weeks === 1 ? 'week' : 'weeks'} ago`;
                } else if (timeDifference < 31536000) {
                  const months = Math.floor(timeDifference / 2592000);
                  return `${months} ${months === 1 ? 'month' : 'months'} ago`;
                } else {
                  const years = Math.floor(timeDifference / 31536000);
                  return `${years} ${years === 1 ? 'year' : 'years'} ago`;
                }
              }
              
              const formattedTimeDifference = formatTimeDifference(timeDifference);

              setReviewDateAgo(formattedTimeDifference);
        }

        const fetchData = async () => {
            //dodanie frontu dla dashboardu
            try 
            {
                const response = await fetch(`http://localhost:8080/user/${userId}`)
                if(!response.ok)
                {
                    throw new Error('Request failed');
                }

                const data = await response.json();
                setUserAvatar(data.icon);
                setUserName(data.username);
            }
            catch(error)
            {
                console.error(error);
            }
        }

        calcreviewDateAgo();
        manageStarsImg();
        fetchData();
    }, [userId]);
    

  return (
    <div className='review-container'>
        <div className='user-info'>
            <div className='user-img-container'>
                <img src={userAvatar} alt='user-avatar'/>
            </div>
            <p> {userName} </p> 
        </div>
        <div className='review'>
            <div className='review-info'>
                <div className='review-rate'>                    
                    { stars }
                    <p> {reviewDateAgo} </p>
                </div>
            </div>
            <p className='review-text'>{userReviewText}</p>
        </div>
    </div>
  )
}

export default review