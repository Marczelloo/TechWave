import {useEffect, useState} from 'react';
import '../../style/Dashboard/DashboardReviewsCard.css';
import star from '../../assets/star.png';

import delete_img from '../../assets/trash.png';
import edit_img from '../../assets/edit.png';

import { usePopup } from "../Popup/PopupProvider";


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

    const [showEditWindow, setShowEditWindow] = useState<boolean>(false);

    const [newReviewText, setNewRevievText] = useState<string | undefined>(undefined);
    const [newReviewRate, setNewReviewRate] = useState<number | undefined>(undefined);

    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState<boolean>(false);

    const { showPopup } = usePopup();

    useEffect(() => { 
      
      if(showDeleteConfirmation)
      {
        document.body.style.overflowY = 'hidden';
      }
      else
      {
        document.body.style.overflowY = 'unset';
      }

    }, [showDeleteConfirmation])

    
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
    }, [showDeleteConfirmation, showEditWindow])

    const handleDeleteReviewSubmit = async () => {
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

      setShowDeleteConfirmation(false);
    }

    const handleEditReview = (e : any) => {
      e.preventDefault();
      setShowEditWindow(true)
    }

    const handleDeleteReview = (e : any) => {
      e.preventDefault();
      setShowDeleteConfirmation(true);
    }

    const handleCancelEditeReview = (e : any) => {
      e.preventDefault();
      setShowEditWindow(false);
    }

    const handleDeleteReviewCancel = (e : any) => {
      e.preventDefault();
      setShowDeleteConfirmation(false);
    }
    
    const handleEditRevievRate = (e : number) => {
      setNewReviewRate(e);
    }

    const handleEditReviewText = (e : string) => {
      setNewRevievText(e);
    }

    const handleEditRevievSubmit = async (e : any) => {
      e.preventDefault();

      if(newReviewText === undefined || newReviewText === null || newReviewText === "")
      {
        showPopup("Review not send! Review text is empty");
        return;
      }
      else if(newReviewRate === undefined || newReviewRate === null)
      {
        showPopup("Review not send! Review rate is empty");
        return;
      }


      try
      {
        const response = await fetch('http://localhost:8080/edit_review', {
          method: 'POST',
          credentials: 'include',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              id: id,
              review_rate: newReviewRate,
              review_text: newReviewText,
          })
        });

        if(!response.ok)
        {
          throw new Error('Internal Server Error');
        }
        else
        {
          showPopup("Review was successfully edited!");
        }
      }
      catch(error)
      {
        console.error(error);
      }
      
      setShowEditWindow(false);
      setNewRevievText(undefined);
      setNewReviewRate(undefined);
    }      
  
  return (
    <div className='reviews-card-container'>   
        <div className='dashboard-review-delete-confirmation' style={{ display: showDeleteConfirmation ? 'flex' : 'none' }}>
          <div className='dashboard-review-delete-container'>
            <h3> Are you sure you want to delete your review for {prodName}? </h3>
            <div className='dashboard-review-delete-buttons'>
              <button className='dashboard-review-delete-yes'
              onClick={handleDeleteReviewSubmit}>
                Yes
              </button>
              <button className='dashboard-review-delete-no'
              onClick={handleDeleteReviewCancel}>
                No
              </button>
            </div>
          </div>        
        </div>
        <div className='dashboard-review-edit-container' style={{ display: showEditWindow ? 'flex' : 'none' }}>
          <form className='dashboard-reviews-submit' onSubmit={handleEditRevievSubmit}>
                      <p> Change your review for {prodName}</p>
                      <textarea 
                      placeholder='Your review. . .' 
                      id='review-text'
                      name='review-text'
                      onChange={(e) => handleEditReviewText(e.target.value)}
                      />
                      <div className='dashboard-review-star'>
                        <div className='dashboard-review-radio-elem'>
                          <input 
                          type="radio" 
                          id="star-1" 
                          name="star-review" 
                          value={5} 
                          onChange={(e) => handleEditRevievRate(parseInt(e.target.value))}/>
                          <label> 5 <img src={star} /></label>
                        </div>
                        <div className='dashboard-review-radio-elem'>
                          <input 
                          type="radio" 
                          id="star-1" 
                          name="star-review" 
                          value={4}
                          onChange={(e) => handleEditRevievRate(parseInt(e.target.value))}/>
                          <label> 4 <img src={star} /></label>
                        </div>
                        <div className='dashboard-review-radio-elem'>
                          <input 
                          type="radio" 
                          id="star-1" 
                          name="star-review" 
                          value={3}
                          onChange={(e) => handleEditRevievRate(parseInt(e.target.value))}/>
                          <label> 3 <img src={star} /></label>
                        </div>
                        <div className='dashboard-review-radio-elem'>
                          <input 
                          type="radio" 
                          id="star-1" 
                          name="star-review" 
                          value={2}
                          onChange={(e) => handleEditRevievRate(parseInt(e.target.value))}/>
                          <label> 2 <img src={star} /></label>
                        </div>
                        <div className='dashboard-review-radio-elem'>
                          <input 
                          type="radio" 
                          id="star-1" 
                          name="star-review"
                          value={1}
                          onChange={(e) => handleEditRevievRate(parseInt(e.target.value))}/>
                          <label> 1 <img src={star} /></label>
                        </div>
                      </div>
                      <button className='dashboard-review-submit-btn' type='submit' onClick={(e) => handleEditRevievSubmit(e)}> Submit </button>
                      <button className='dashboard-review-submit-btn' onClick={(e) => handleCancelEditeReview(e)}> Cancel </button>
            </form>
        </div>
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