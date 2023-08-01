import Navbar from "./Navbar";
import Footer from "./Footer";
import '../style/Product.css';
import { useLocation } from 'react-router-dom';
import { useEffect, useState  } from 'react';

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
        const test = ['http://localhost:8080/images/products/2/image1.png',
        'http://localhost:8080/images/products/2/image2.png','http://localhost:8080/images/products/2/image1.png',
        'http://localhost:8080/images/products/2/image2.png','http://localhost:8080/images/products/2/image1.png',
        'http://localhost:8080/images/products/2/image2.png','http://localhost:8080/images/products/2/image1.png',
        'http://localhost:8080/images/products/2/image2.png','http://localhost:8080/images/products/2/image1.png',
        'http://localhost:8080/images/products/2/image2.png','http://localhost:8080/images/products/2/image1.png',
        'http://localhost:8080/images/products/2/image2.png'];
        setProduct(data);
        setImageList(data.images);
        setMainImage(data.images[0]);
        setImageList(test);
        setImagesCount(test.length);   
        setOnSale(data.on_sale === 1 ? true : false);  
        setYouSave(data.price - data.sale_price);
      
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
                  { onSale && <p className='you-save'>  youSave </p> }
                  { onSale && <p className='sale-price'> product?.sale_price </p>}
                  <p> { product?.price }</p>
                  <div className='add-to-cart'>
                    <p> Add to cart </p>
                  </div>
                  <div className='quantity'>
                    <input type='number' name='quantity' value={1}/> 
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