import React from 'react';
import { Link } from 'react-router-dom';
import parse from 'html-react-parser';
import Card from 'components/Card';
import Text from 'components/Text';
import type { RecipeModel } from 'store/models/api/Recipe';
import Loader from 'components/Loader';
import arrayTop from 'components/icons/arrayTop.svg'
import s from './Products.module.scss';




interface ProductsProps {
  data: RecipeModel[];
  loading: boolean;
  onPageSize: (value: number) => void;
  pageSize: number;
  total: number;
  isArray: boolean;
  onArray: () => void;
  
}

const Products: React.FC<ProductsProps> = ({ data, loading, isArray, onArray}) => {

//   const [load, setLoad] = useState(false);
//   const [hasMore, setHasMore] = useState(true);
//   const [isArray, setIsArray] = useState<boolean>(false)

//   const scrollPositionRef = useRef(0);

//   const loadMore = useCallback(() => {
//     if (load || !hasMore) return;

//     scrollPositionRef.current = window.pageYOffset || document.documentElement.scrollTop;


//     setLoad(true);
//     onPageSize(pageSize + 9);

//     if(pageSize > total-9 && total>0){
//       setHasMore(false)
//     }
    
//   }, [load, hasMore, pageSize, onPageSize, total, setLoad]);

// useEffect(() => {
//   if (scrollPositionRef.current !== 0) {
//     window.scrollTo({ top: scrollPositionRef.current, behavior: 'auto' });
//   }
// }, [data]); 



//   const handleScroll = useCallback(() => {
    
//     const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
//     const windowHeight = window.innerHeight;
//     const fullHeight = document.documentElement.offsetHeight;

//     if (scrollTop + windowHeight >= fullHeight - 50 ) {
//       loadMore();
//     }
//   }, [loadMore]);

//   useEffect(() => {
//     window.addEventListener('scroll', handleScroll);
//     return () => {
//       window.removeEventListener('scroll', handleScroll);
//     };
//   }, [handleScroll]);

//     useEffect(() => {
//     if (load) {
//       const timeout = setTimeout(() => {
//         setLoad(false);
//       }, 500);
//       return () => clearTimeout(timeout);
//     }
//   }, [load]);

//   const handleArray = useCallback(()=>{
//         onPageSize(9);
//         window.scrollTo(0, 0);
//      setTimeout(() => {
//         setHasMore(true);
//       }, 1000); 
//   }, [onPageSize])

//   useEffect(() => {
//   const handleScroll = () => {
//     const scrollPosition = window.scrollY; 
//     const triggerPosition = 2500;

//     if (scrollPosition > triggerPosition) {
//       setIsArray(true);
//     } else {
//       setIsArray(false);
//     }
//   };

//   window.addEventListener('scroll', handleScroll);
  
//   return () => {
//     window.removeEventListener('scroll', handleScroll);
//   };
// }, []);


  return(
    <>

     <div className={`${s.ProductsElements} ${data.length === 0 || loading ? s.ProductsElementsNull : '' }`}>
      {loading && <div className={s.loader}><Loader className={s.loader__svg}/></div>}
      {!loading && data.length === 0 && <Text className={s.recipesNull}>According to these parameters, no recipes were found</Text>}
      {!loading && data.map((item, index)=>{

        const cleanedSummary = item.summary
          .replace(/<a[^>]*>(.*?)<\/a>/g, '<span>$1</span>')
         .replace(/<p[^>]*>(.*?)<\/p>/g, '<div>$1</div>');
          return(
              <Link key={index} to={`/${item.documentId}`} style={{ textDecoration: 'none' }}>
                <Card
                  image={item.images }
                  title={item.name}
                  subtitle={parse(cleanedSummary)}
                  contentSlot={<p className={s.slot}>{item.calories} kcal</p>}
                />
              </Link>
        )})}
        {isArray && <div className={s.arrayTop}><img src={arrayTop} alt="" onClick={onArray} /></div>} 
    </div>


    </>
)
};

export default React.memo(Products);
