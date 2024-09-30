import React, { useEffect, useState } from 'react';
import "./Articles.scss";
import "../../../../node_modules/bootstrap/dist/css/bootstrap.css";
import { useSelector, useDispatch } from "react-redux";
import { getAllArticlesAsync } from '../../../../features/article/articleService';
import { selectIsLoading, selectIsError, selectAllArticles } from '../../../../features/article/articleSlice';
import {Singlearticle} from '../../..';

const Articles = () => {

  const dispatch = useDispatch();
  const articles = useSelector(selectAllArticles);
  const isLoading = useSelector(selectIsLoading);
  const isError = useSelector(selectIsError);

  useEffect(() => {
    dispatch(getAllArticlesAsync());
  }, []);

  // console.log("Articles:", articles);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error occurred while fetching article details.</div>;
  }

  return (
    <div className="article-sec">
      <div className="container">
        <div className="section-heading d-flex">
          <h3 className="main-title">Our Latest Articles</h3>
          <a href="/articleslist" className="blog-link">
            View All Articles
          </a>
        </div>

        <ul className="articles-container d-flex">

          {articles.slice(0, 3).map((item, i) => (
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