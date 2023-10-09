import {useEffect, useState} from 'react';
import '../style/DashboardReviewsCard.css';
import star from '../assets/star.png';

import delete_img from '../assets/trash.png';
import edit_img from '../assets/edit.png';

import { usePopup } from "./PopupProvider";


type Props = {
    id: number,
    id_product: number,
    review_rate: number,
    review_text: string,
    review_date: Date,
}

function DashboardReviewsCard({ id, id_product, review_rate, review_date, review_text }: Props) {
    const [prodImg, setProdImg] = useState<string>();
    const [prodName, setProdName] = useState<string>();
    const [prodPrice, setProdPrice] = useState<number>();

    const [stars, setStars] = useState<JSX.Element[] | null>(null);
    const [reviewDateAgo, setReviewDateAgo] = useState<string | null>();

    const { showPopup } = usePopup();

    
    useEffect(() => {
        const fetchData = async () => {
            try
            {
                const response = await fetch(`http://localhost:8080/products/${id_product}`, {
                    method: 'GET'
                })

                if(!response.ok)
                {
                    throw new Error('Request failed');
                }

                const data = await response.json();

                console.log(data);
                setProdImg(data.images[0]);
                setProdName(data.name);
                setProdPrice(data.price);                
            }
            catch(error)
            {
                console.error(error);
            }
            
        }

        const manageStarsImg = () => {
            const starsArray: JSX.Element[] = [];
        
            for(let i = 0; i < 5; i++){
                if (i < review_rate!) {
                    starsArray.push(<img key={'star' + id + i} src={star} alt='rate-star' />);
                } else {
                    starsArray.push(
                      <img key={'star' + id + i} src={star} alt='rate-star' className='gray-star' />
                    );
                }
            }
    
            setStars(starsArray);
        }

        const calcreviewDateAgo = () => {
            const formatedDate = new Date(review_date);

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

        calcreviewDateAgo();
        manageStarsImg();
        fetchData();
    }, [])

    const handleDeleteReview = async () => {
      console.log("Delete Review id: ", id);

      try
      {
        const response = await fetch(`http://localhost:8080/delete_review`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            review_id: id
          })
        });

        if(!response.ok)
        {
          showPopup("There was error with deleting review! Try again later");
          throw new Error('Request failed');
        }

        const data = await response.json();

        console.log(data);
        if(data.success === 1)
        {
          showPopup("Review deleted successfully");
        }
        else
        {
          showPopup("There was an error anwith deleting review! Try again later");
        }
      }
      catch(error)
      {
        console.error(error);
      }
    }

    const handleEditReview = () => {

    }
  return (
    <div className='reviews-card-container'>   
        <div className='reviews-card-product-container'>
            <h4> {prodName} </h4>
            <img src={prodImg} alt="review product image"/>
            <p> {prodPrice} $</p>
        </div>
        <div className='reviews-review-info-container'>
          <div className='review-rate'>
              { stars }
              <p> { reviewDateAgo } </p>
          </div>
          <div className='review-text'>
            <p> { review_text } </p> 
          </div>
          <div className='review-buttons'>
            <button className='edit' onClick={handleEditReview}> <img src={edit_img} alt='edit button image'/> Edit </button>
            <button className='delete'onClick={handleDeleteReview}> <img src={delete_img} alt='delete button image'/> Delete </button>
          </div>  
        </div>
    </div>
  )
}

export default DashboardReviewsCard;