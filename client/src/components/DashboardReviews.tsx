import {useState, useEffect} from 'react'

import '../style/DashboardReviews.css';

import ReviewsCard from './DashboardReviewsCard';

type Props = {}

interface Reviews {
  id: number,
  id_product: number,
  review_rate: number,
  review_text: string,
  review_date: Date,
}

function DashboardReviews({}: Props) {
  const [reviews, setReviews] = useState<Reviews[] | undefined>();

  useEffect(() => {
    const fetchData = async() => {
        try {
          const response = await fetch('http://localhost:8080/protected',{
            method: 'GET',
            credentials: 'include',
          });
    
          if (!response.ok) {
            throw new Error('Request failed');
          }
    
          const data = await response.json();
    
          const userId = data.userId;

          try
          {
            const response = await fetch(`http://localhost:8080/userReviews/${userId}`, {
              method: 'GET'
            });
            if(!response.ok)
            {
              throw new Error('Request failder');
            }

            const data = await response.json();
            if(data.success === 0)
            {
              setReviews(undefined);
            }
            else if(data.success === 1)
            {
              setReviews(data.reviews);
            }
          }
          catch(error)
          {
            console.error(error);
          }

        } 
        catch (error) 
        {
          console.error(error);
        }    
  }

  fetchData();
  }, [])
  
  return (
    <div className='dashboard-reviews-container'>
      <h2> Reviews </h2>
      {
          (reviews === undefined || reviews.length === 0) && <p className='empty-reviews'> No reviews submitted yet! </p>
      }
      <div className='dashboard-reviews-card-container'>
        {
          reviews !== undefined && reviews.length > 0 &&
          (
            reviews.map((elem) => {
              return <ReviewsCard
              key={'review card' + elem.id}
              id={elem.id}
              id_product={elem.id_product}
              review_rate={elem.review_rate}
              review_text={elem.review_text}
              review_date={elem.review_date}
              />
            })
          )
        }
      </div>

    </div>
  )
}

export default DashboardReviews