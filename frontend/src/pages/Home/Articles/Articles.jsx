import React, { useEffect, useState } from 'react';
import "./Articles.scss";
import "../../../../node_modules/bootstrap/dist/css/bootstrap.css";
import { useSelector, useDispatch } from "react-redux";
import { selectIsLoading, selectIsError, selectAllArticles, getAllArticlesAsync } from '../../../features/article/articleSlice';
import {Singlearticle} from '../../../components';

const Articles = () => {

  const dispatch = useDispatch();
  const articles = useSelector(selectAllArticles);
  const loading = useSelector(selectIsLoading);
  const error = useSelector(selectIsError);
  const [showAllArticles, setShowAllArticles] = useState(false);

  useEffect(() => {
    dispatch(getAllArticlesAsync());
  }, []);

  const toggleShowAllArticles = () => {
    setShowAllArticles(!showAllArticles);
  };

  console.log("Articles:", articles);

  return (
    <div className="article-sec">
      <div className="container">
        <div className="section-heading d-flex">
          <h3 className="main-title">Our Latest Articles</h3>
          <a href="/allarticles" className="blog-link" onClick={toggleShowAllArticles}>
            View All Articles
          </a>
        </div>

        <ul className="articles-container d-flex">

          {loading && <div>Loading brands...</div>}
          {error && <div>Error fetching brands: {error.message}</div>}

          {articles.slice(0, showAllArticles ? articles.length : 3).map((item, i) => (
            <li key={i} item="true" className="articles-item">
              <Singlearticle item={item} />
            </li>
          ))}

        </ul>
      </div>
    </div>
  )
}

export default Articles