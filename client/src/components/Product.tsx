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
import Reviev from "./Reviev";

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

  const [revievsUids, setRevievsUids] = useState<number[] | null>([1]);

  
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
    const fetchData = async () => {
      try
      {
        const response = await fetch(`http://localhost:8080/products/${id}`);
        if(!response.ok)
        {
          throw new Error('Request failed');
        }

        const data = await response.json();;
        setProduct(data);
        setImageList(data.images);
        setMainImage(data.images[0]);
        setImagesCount(data.images.length);   
        setOnSale(data.on_sale === 1 ? true : false);  
        setOnSale(true);
        setYouSave(data.price - data.sale_price);
        setAvaible(data.avaible === 1 ? true : false);
        setAvaible(true);
      
      }
      catch(error)
      {
        console.error(error);
      }
    };
    fetchData();
  }, [id]);

  useEffect(() => {
    if (product && product.specification) {
      const lines = product.specification.split('\r\n');
      setSpecification(lines);
    }

    if(product && product.description) {
      const desc = product.description.replace('\r\n', '<br>');

      console.log(desc);
    }

  }, [product]);

  console.log(product?.specification);
  console.log(product?.description);
  
  return (
    <div className="wrapper">
        <Navbar/>
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
                      const [label, value] = line.split(':');

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
                  <a href="#revievs-linker" className='info-menu-element'>
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
                      const [label, value] = line.split(':');

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
            <div className='rating-container' id='revievs'>
              <div id='revievs-linker'></div>
              <h2> Revievs </h2>
                  <div className='reviev-give-container'>
                    <div className='revievs-counts'>
                      <div className='averge-revievs'>
                        <p className='reviev-count'>
                          { 5 } / 5 <img src={star} />
                        </p>
                        <div className='reviev-stars-vis'>
                          <img src={star} key='star 1'/>
                          <img src={star} key='star 2'/>
                          <img src={star} key='star 2'/>
                          <img src={star} key='star 2'/>
                          <img src={star} key='star 2'/>
                  
                        </div>
                        <p className='reviev-gave-count'> Revievs: {'55'} </p>
                      </div>
                      <div className='revievs-rate-list'>
                        <div className='rate-elem'> <p> <img src={star} /> <p> 5 </p></p> <div className='rate-elem-spacer'></div> <p> { 15 } </p> </div>
                        <div className='rate-elem'> <p> <img src={star} /> <p> 4 </p></p> <div className='rate-elem-spacer'></div> <p> { 9 } </p> </div>
                        <div className='rate-elem'> <p> <img src={star} /> <p> 3 </p></p> <div className='rate-elem-spacer'></div> <p> { 5 } </p> </div>
                        <div className='rate-elem'> <p> <img src={star} /> <p> 2 </p></p> <div className='rate-elem-spacer'></div> <p> { 2 } </p> </div>
                        <div className='rate-elem'> <p> <img src={star} /> <p> 1 </p></p> <div className='rate-elem-spacer'></div> <p> { 0 } </p> </div>
                      </div>
                    </div>
                    <div className='revievs-submit'>
                      <textarea placeholder='Your reviev. . .' id='reviev-text'/>
                      <div className='reviev-star'>
                        <div className='reviev-radio-elem'>
                          <input type="radio" id="star-1" name="star-reviev" value={5} />
                          <label> 5 <img src={star} /></label>
                        </div>
                        <div className='reviev-radio-elem'>
                          <input type="radio" id="star-1" name="star-reviev" value={4} />
                          <label> 4 <img src={star} /></label>
                        </div>
                        <div className='reviev-radio-elem'>
                          <input type="radio" id="star-1" name="star-reviev" value={3} />
                          <label> 3 <img src={star} /></label>
                        </div>
                        <div className='reviev-radio-elem'>
                          <input type="radio" id="star-1" name="star-reviev" value={2} />
                          <label> 2 <img src={star} /></label>
                        </div>
                        <div className='reviev-radio-elem'>
                          <input type="radio" id="star-1" name="star-reviev" value={1} />
                          <label> 1 <img src={star} /></label>
                        </div>
                      </div>
                      <button className='reviev-submit-btn'> Submit </button>
                    </div>
                  </div>
                  <div className='customers-revievs-container'>
                    {

                    }
                    <Reviev
                      key={'reviev' + revievsUids[0]}
                      uid={revievsUids[0]}
                    />
                  </div>
            </div>
          </div>
        </div> 
        <Footer/>
    </div>
  )
}

export default Product