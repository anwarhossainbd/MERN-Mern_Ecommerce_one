import React,{Fragment, useEffect,useState} from 'react'
import "./Products.css"
import { useSelector, useDispatch } from 'react-redux';
import { clearErrors,getProduct } from '../../actions/productActions';
import Loader from '../layout/Loader/Loader';
import ProductCard from "../Home/ProductCard" ;
import Pagination from "react-js-pagination";
import { Slider, Typography } from '@material-ui/core';
import {useAlert} from "react-alert"
import MetaData from '../layout/MetaData';

     


const categories=[
  "Mobile",
  "Laptop",
  "Electronics",
  "Sports",
  "Cloth",
  "Foods",
]


const Products = ({match}) => {

    const dispatch =useDispatch();
    const alert = useAlert()

    const [currentPage,setCurrentPage] = useState(1) ;
    const [price,setPrice]= useState([0,250000]);
    const [category,setCategory]= useState("");
    const [ratings,setRatings]=useState(0)


    const {products ,loading ,error, productsCount,resultPerPage} = useSelector(state=>state.products)

    const keyword =match.params.keyword ;

    const setCurrentPageNo=(e)=>{
      setCurrentPage(e)
    }


    const PriceHandler=(event,newPrice)=>{
      setPrice(newPrice)
    }

    useEffect(() => {

      if(error){
        alert.error(error);
        dispatch(clearErrors())
      }

       dispatch(getProduct(keyword, currentPage,price,category,ratings))
    }, [dispatch,keyword,currentPage,price,category,ratings,alert,error])


  return (
    <Fragment>
       {loading? <Loader /> :
        <Fragment>

        <MetaData title="PRODUCTS" />

         <h2 className='productsHeading'> Products </h2>  
         
         <div className='products'>
           { products && products.map((product)=>(
             <ProductCard key={product._id} product={product} />
           ))}
         </div>

         <div className='filterBox'>
             <Typography>Price</Typography>
             <Slider  
                  value={price}
                  onChange={PriceHandler}
                  valueLabelDisplay ="auto"
                  aria-labelledby='range-slider'
                  min={0}
                  max={250000}
              /> 


               <Typography>Categories</Typography>
               <ul className='categoryBox'>
                   {categories.map(category=>(
                     <li className='category-link' key={category} onClick={()=>setCategory(category)} > {category} </li>
                   ))}
               </ul>

               <fieldset className='space'>
                  <Typography component="legend">Rating Above</Typography>

                  <Slider value={ratings} onChange={(e,newRating)=>{
                    setRatings(newRating) ;
                  }}
                  aria-labelledby="continuous-slider"
                  min={0}
                  max={5}
                  valueLabelDisplay="auto" />

               </fieldset>


         </div>
         
         {resultPerPage < productsCount && (
             <div className='paginationBox'>
                <Pagination 
                  activePage={currentPage}
                  itemsCountPerPage ={resultPerPage}
                  totalItemsCount={productsCount}
                  onChange={setCurrentPageNo}
                  nextPageText="Next"
                  prevPageText="Prev"
                  firstPageText="First"
                  lastPageText="Last"
                  itemClass="page-item"
                  linkClass="page-link"
                  activeClass="pageItemActive"
                  activeLinkClass="pageLinkActive"
                />
              </div>
         )}

        

       </Fragment>}
     
    </Fragment>
  )
}

export default Products




