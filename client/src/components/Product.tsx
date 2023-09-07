import Navbar from "./Navbar";
import Footer from "./Footer";
import '../style/Product.css';
import { useLocation } from 'react-router-dom';
import { useEffect, useState  } from 'react';
import cart from '../assets/cart.png';
import avaible_icon from '../assets/avaible.png';
import addToList from '../assets/addList.png';
import shipping from '../assets/shipping.png';
import installment from '../assets/installment.png';
import goBackArrow from '../assets/goBackArrow.png';
import star from '../assets/star.png';
import Review from "./Review";
import Popup from "./Popup";

// #TODO:
// - Seperate this element into smaller ones
//

interface Product {
  name: string,
  price: number,
  sale_price: number,
  images: string[],
  image_count: number,
  description: string,
  specification: string,
}

interface Reviews {
  id_product: number, 
  id_user: number, 
  review_rate: number, 
  review_text: string,
  review_date: Date,
}

type Props = {}

function Product({}: Props) {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get('product_id');

  const [product, setProduct] = useState<Product | null>(null);

  const [specification, setSpecification] = useState<string[] | undefined>(undefined);

  const [imageList, setImageList] = useState<string[] | undefined>(undefined);
  const [mainImage, setMainImage] = useState<string | undefined>(undefined);

  const [nextImgBtnVis, setNextImgBtnVis] = useState<boolean>(false);
  const [prevImgBtnVis, setPrevImgBtnVis] = useState<boolean>(true);

  const [imagesCount, setImagesCount] = useState<number>(0);
  const [imagePage, setImagePage] = useState<number>(0);

  const [onSale, setOnSale] = useState<boolean>(false);
  const [youSave, setYouSave] = useState<number | null>(null);

  const [avaible, setAvaible] = useState<boolean>(false);

  const [reviews, setReviews] = useState<Reviews[] | null>(null);  
  const [reviewAvergeRate, setReviewAvergeRate] = useState<number | null>(null);
  const [reviewRatesFor5, setReviewRatesFor5] = useState<number | null>(null);
  const [reviewRatesFor4, setReviewRatesFor4] = useState<number | null>(null);
  const [reviewRatesFor3, setReviewRatesFor3] = useState<number | null>(null);
  const [reviewRatesFor2, setReviewRatesFor2] = useState<number | null>(null);
  const [reviewRatesFor1, setReviewRatesFor1] = useState<number | null>(null);

  
  const [reviewText, setReviewText] = useState<string | null>(null);
  const [reviewRate, setReviewRate] = useState<number | null>(null);

  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [popupInfo, setPopupInfo] = useState<string | null>(null);
  
  useEffect(() => {
    updateVis();
  }, [imagePage, imageList]);

  const PreviousPage = () => {
    if (imagePage > 0) {
      setImagePage((prevPage) => prevPage - 1);
    }
  };

  const NextPage = () => {
    if (imagePage + 5 < imagesCount) {
      setImagePage((prevPage) => prevPage + 1);
    }
  };

  const updateVis = () => {
    setNextImgBtnVis(imagePage > 0);
    setPrevImgBtnVis(imagePage + 5 < imagesCount);
  };
  
  useEffect(() => {
    const fetchDataProduct = async () => {
      try
      {
        const response = await fetch(`http://localhost:8080/products/${id}`);
        if(!response.ok)
        {
          throw new Error('Request failed');
        }

        const data = await response.json();
        setProduct(data);
        setImageList(data.images);
        setMainImage(data.images[0]);
        setImagesCount(data.images.length);   
        setOnSale(data.on_sale === 1 ? true : false);  
        setYouSave(data.price - data.sale_price);
        setAvaible(data.avaible === 1 ? true : false);
        setAvaible(true);
      
      }
      catch(error)
      {
        console.error(error);
      }
    };

    const fetchDatareviews = async () => {
      try
      {
        const response = await fetch(`http://localhost:8080/reviews/${id}`);
        if(!response.ok)
        {
          throw new Error('Request failed');
        }

        const data = await response.json();
        if(data.success === 0)
        {
          setReviews(null);
        }
        else if(data.success === 1)
        {
          setReviews(data.review);
        }
      }
      catch(error)
      {
        console.error(error);
      }
    }

    fetchDataProduct();
    fetchDatareviews();
  }, [id, showPopup]);

  useEffect(() => {
    const countReviewAvergeRate = () => {
      let rateSum: number = 0;

      reviews?.forEach(element => {
        rateSum += element.review_rate;
      });

      const avergeRate = rateSum / reviews?.length;
      
      setReviewAvergeRate(avergeRate);
    }

    const counrReviewRates = () => {
      const rateCounts = {};

      reviews?.forEach(element => {
        const rate = element.review_rate;
        rateCounts[rate] = (rateCounts[rate] || 0) + 1;
      })

      setReviewRatesFor1(rateCounts[1])
      setReviewRatesFor2(rateCounts[2])
      setReviewRatesFor3(rateCounts[3])
      setReviewRatesFor4(rateCounts[4])
      setReviewRatesFor5(rateCounts[5])
    }

    counrReviewRates();
    countReviewAvergeRate();
  }, [reviews])

  useEffect(() => {
    if (product && product.specification) {
      const lines = product.specification.split('\r\n');
      setSpecification(lines);
    }
  }, [product]);

  const handleReviewTextChange = (event: any) => {
    setReviewText(event.target.value);
  }
  
  const handleReviewRateChange = (event: any) => {
    setReviewRate(event.target.value);
  }

  const handleSubmit = async (event: any) => {
    event.preventDefault();
  
    const getUserId = async () => {
      try {
        const response = await fetch('http://localhost:8080/protected',{
          method: 'GET',
          credentials: 'include',
        });
  
        if (!response.ok) {
          throw new Error('Request failed');
        }
  
        const data = await response.json();
  
        return data.userId;
      } 
      catch (error) 
      {
        console.error(error);
      }
    }
  
    const userId = await getUserId();
    const date = Date.now();

    try
    {
      const response = await fetch('http://localhost:8080/post_review', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id_product: id,
          id_user: userId,
          review_rate: reviewRate,
          review_text: reviewText,
          review_date: date,
        })
      });

      if(!response.ok)
      {
        throw new Error('Request failed');
      }

      const data = await response.json();    

      if(data.success === 1)
      {
        console.log('test');
        setPopupInfo('Review successfully sent!');
        setShowPopup(true);

        setTimeout(() => {
          setShowPopup(false);
        }, 4000)
      }
      else
      {
        console.log('test not');
        setPopupInfo('Error, reviev not sent! Try again later!');
        setShowPopup(true);

        setTimeout(() => {
          setShowPopup(false);
        }, 4000)
      }
    }
    catch(error)
    {
      console.error(error);
    }
    
}

  return (
    <div className="wrapper">
        <Navbar/>
        <Popup 
        visible={showPopup}
        info={popupInfo} />
        <div className='product-wrapper'>
          <h1 className='product-title'> {product?.name} </h1>
          <div className='product-section'> 
            <div className='product-image-container'>
              <div className='main-image'>
                <img src={mainImage} alt='main image'/> 
              </div>
              <div className='list-image'>
                { nextImgBtnVis && (
                  <div className='prev-img' onClick={PreviousPage}>
                  { "<" }
                  </div>
                )}
                {
                  imageList?.map((img: string, index: number) =>{
                    return <div 
                    key={"div" + img}
                    className="img-list-container" 
                    onClick={() => setMainImage(img)}
                    style={{ transform: `translateX(${ -(imagePage) * 100}%)`}}
                    >
                      <img 
                      key={img} 
                      src={img} 
                      alt={'Image ' + index} 
                      />
                    </div>
                  })
                }
                { prevImgBtnVis && (
                  <div className='next-img' onClick={NextPage}>
                  { ">"}
                  </div>
                )}
                
              </div>
            </div>
            <div className='spec-container'>
                  <h4> Specification: </h4>
                  <div className='short-spec-text'>
                  {
                    specification?.map((line, index) =>{
                      const [label] = line.split(':');

                      return(
                      <p key={'spec: ' + index}> 
                        <span>{label}: </span>{line}
                      </p>
                      )
                    })
                  }
                  </div>
                  <a  href='#specification-linker' className='see-full-spec'>
                    <p> See full specification <span>&#10140;</span> </p>
                  </a>
                  
            </div>
            <div className='buy-container'>
                  <div className='wishlist'>
                    <img src={addToList} alt='add to list icon'/>
                  </div>
                  { onSale ? ( <div className='onSale'>
                      <p className='you-save'> You're saving {youSave} $</p>
                      <p className='sale-price'> {product?.sale_price} $ </p>
                      <p className='regular-price'> Regular price: <span> {product?.price} $ </span></p>
                    </div> )
                    : ( <p className='price'> { product?.price } $</p> )
                  } 
                  <div className='buy-buttons-container'>
                    <select className='quantity' name="quantity" id="quantity">
                      <option value="1"> 1 </option>
                      <option value="2"> 2 </option>
                      <option value="3"> 3 </option>
                      <option value="4"> 4 </option>
                      <option value="5"> 5 </option>
                      <option value="10"> 10 </option>
                    </select>
                    <div className='add-to-cart'>
                      <img src={cart} alt='add-to-cart-image'/>
                      <p> Add to cart </p>
                    </div>
                  </div>
                  <div className='other'>
                    <div> <img src={avaible_icon} alt="avaible icon"/> { avaible ? (<p> Product avaible and ready to be shipped </p>) : (<p> Product unavaible to buy</p>) } </div>
                    <div> <img src={shipping}  alt='shipping icon'/>  <span> <p> Free shipping </p>  <p> Check details </p></span> </div>
                    <div> <img src={installment} alt='installment icon'/> <span> <p> Installments from x $</p> <p> Calculate your installments </p></span> </div>
                  </div>
            </div>
          </div>
          <div className='info-section'>
            <div className='info-menu-bar'>
                  <a href="#top">
                    <img src={goBackArrow} alt='back to top arrow'/>
                  </a>
                  <a href="#description-linker" className='info-menu-element'>
                    <p> Description </p>
                  </a>
                  <a href="#specification-linker" className='info-menu-element'>
                    <p> Specification </p>
                  </a>
                  <a href="#reviews-linker" className='info-menu-element'>
                    <p> Reviews </p>
                  </a>
            </div>
            <div className='info-container'>
              <div className='description-container' id="description">
                <div id='description-linker'></div>
                <h2> Description </h2>
                <p>
                  { product?.description }
                </p>
              </div>
              <div className='specification-container' id='specification'>
                <div id='specification-linker'></div>
                <h2> Specification </h2>
                <div className='specification-list'>
                {
                    specification?.map((line, index) =>{
                      const [label] = line.split(':');

                      return(
                      <div className='spec-element' key={'spec: ' + index}> 
                        <p className='spec-left'> {label} </p>
                        <p className='spec-right'> {line} </p>
                      </div>
                      )
                    })
                  }
                </div>
              </div>
            </div>
            <div className='rating-container' id='reviews'>
              <div id='reviews-linker'></div>
              <h2> reviews </h2>
                  <div className='review-give-container'>
                    <div className='reviews-counts'>
                      <div className='averge-reviews'>
                        <p className='review-count'>
                          { reviewAvergeRate } / 5 <img src={star} />
                        </p>
                        <div className='review-stars-vis'>
                          <img src={star} />
                          <img src={star} />
                          <img src={star} />
                          <img src={star} />
                          <img src={star} />
                  
                        </div>
                        <p className='review-gave-count'> reviews: {'55'} </p>
                      </div>
                      <div className='reviews-rate-list'>
                        <div className='rate-elem'> <p> <img src={star} /> <p> 5 </p></p> <div className='rate-elem-spacer'></div> <p> { reviewRatesFor5 ? reviewRatesFor5 : 0 } </p> </div>
                        <div className='rate-elem'> <p> <img src={star} /> <p> 4 </p></p> <div className='rate-elem-spacer'></div> <p> { reviewRatesFor4 ? reviewRatesFor4 : 0 } </p> </div>
                        <div className='rate-elem'> <p> <img src={star} /> <p> 3 </p></p> <div className='rate-elem-spacer'></div> <p> { reviewRatesFor3 ? reviewRatesFor3 : 0 } </p> </div>
                        <div className='rate-elem'> <p> <img src={star} /> <p> 2 </p></p> <div className='rate-elem-spacer'></div> <p> { reviewRatesFor2 ? reviewRatesFor2 : 0 } </p> </div>
                        <div className='rate-elem'> <p> <img src={star} /> <p> 1 </p></p> <div className='rate-elem-spacer'></div> <p> { reviewRatesFor1 ? reviewRatesFor1 : 0 } </p> </div>
                      </div>
                    </div>
                    <form className='reviews-submit' onSubmit={handleSubmit}>
                      <textarea 
                      placeholder='Your review. . .' 
                      id='review-text'
                      name='review-text'
                      onChange={handleReviewTextChange}
                      />
                      <div className='review-star'>
                        <div className='review-radio-elem'>
                          <input 
                          type="radio" 
                          id="star-1" 
                          name="star-review" 
                          value={5} 
                          onChange={handleReviewRateChange}/>
                          <label> 5 <img src={star} /></label>
                        </div>
                        <div className='review-radio-elem'>
                          <input 
                          type="radio" 
                          id="star-1" 
                          name="star-review" 
                          value={4}
                          onChange={handleReviewRateChange} />
                          <label> 4 <img src={star} /></label>
                        </div>
                        <div className='review-radio-elem'>
                          <input 
                          type="radio" 
                          id="star-1" 
                          name="star-review" 
                          value={3}
                          onChange={handleReviewRateChange} />
                          <label> 3 <img src={star} /></label>
                        </div>
                        <div className='review-radio-elem'>
                          <input 
                          type="radio" 
                          id="star-1" 
                          name="star-review" 
                          value={2}
                          onChange={handleReviewRateChange} />
                          <label> 2 <img src={star} /></label>
                        </div>
                        <div className='review-radio-elem'>
                          <input 
                          type="radio" 
                          id="star-1" 
                          name="star-review"
                          value={1}
                          onChange={handleReviewRateChange} />
                          <label> 1 <img src={star} /></label>
                        </div>
                      </div>
                      <button className='review-submit-btn' type='submit' onClick={handleSubmit}> Submit </button>
                    </form>
                  </div>
                  <div className='customers-reviews-container'>
                    {
                      reviews === null ? <p className='no-reviews'> No reviews found for this product <br/> 
                      Be the first one to review this product! </p> :
                      reviews.map(element => {
                        return <Review 
                        key = {"Review" +  element.id_user + element.review_date}
                        uid = { element.id_user}
                        reviewRate = { element.review_rate}
                        reviewText = { element.review_text}
                        reviewDate = {element.review_date}
                        />
                      })
                    }
                  </div>
            </div>
          </div>
        </div> 
        <Footer/>
    </div>
  )
}

export default Product