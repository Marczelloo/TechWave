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
  }, [product]);

  console.log(product?.specification);


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
                  <a  href='#specification' className='see-full-spec'>
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
          <div className='info-container'>
              <div className='description-contaienr'>

              </div>
              <div className='specification-container' id='specification'>
                
              </div>
            </div>
            <div className='rating-container'>

            </div>
          </div>
        </div> 
        <Footer/>
    </div>
  )
}

export default Product