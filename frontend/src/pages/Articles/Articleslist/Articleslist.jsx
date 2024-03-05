import React, { useEffect } from 'react';
import "./Articleslist.scss";
import "../../../../node_modules/bootstrap/dist/css/bootstrap.css";
import { FaAngleRight, FaComment, FaHeart } from "react-icons/fa";
import bg from "../../../../../assets/images/home/biolife-banner__style-01.jpg";
import { useSelector, useDispatch } from "react-redux";
import { selectIsLoading, selectIsError, selectAllArticles, getAllArticlesAsync } from '../../../features/article/articleSlice';
import { Singlearticle } from '../../../components';

const Articleslist = () => {

  const dispatch = useDispatch();
  const articles = useSelector(selectAllArticles);
  const loading = useSelector(selectIsLoading);
  const error = useSelector(selectIsError);
  // const [showAllArticles, setShowAllArticles] = useState(false);

  useEffect(() => {
    dispatch(getAllArticlesAsync());
  }, []);

  // const toggleShowAllArticles = () => {
  //   setShowAllArticles(!showAllArticles);
  // };

  console.log("Articles:", articles);

  return (
    <div className="allblog-sec">
      <div className="breadcrumb">
        <img src={bg} alt="" className='img-fluid' />
        <h1 className='title'>Organic Fruits</h1>
      </div>
      <div className="container">
        <div className="boillife-nav d-flex">
          <a href="/">Home</a>
          <span>/</span>
          <a href="/Articleslist">Our Blog</a>
        </div>

        <div className="page-contain blog-page">
          <div className="posts-elem main-post-list d-flex flex-wrap">
            {loading && <div>Loading articles...</div>}
            {error && <div>Error fetching articles: {error.message}</div>}

            {articles?.map((item, i) => (
              <div key={i} item="true" className="articles-item">
                <Singlearticle item={item} />
              </div>
            ))}
          </div>

          <div className="biolife-panigations-block text-center">
            <div className="panigation-contain d-flex">
              <div><span className="current-page">1</span></div>
              <div><a href="#" className="link-page">2</a></div>
              <div><a href="#" className="link-page">3</a></div>
              <div><span className="sep">....</span></div>
              <div><a href="#" className="link-page">20</a></div>
              <div><a href="#" className="link-page next"><FaAngleRight aria-hidden="true" /></a></div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Articleslist