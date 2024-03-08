import React, { useEffect, useState } from 'react';
import "./Recentpost.scss";
import { useSelector, useDispatch } from "react-redux";
import { getAllArticlesAsync, selectAllArticles, selectIsLoading, selectIsError} from "../../../features/article/articleSlice";

const Recentpost = () => {

    const articles = useSelector(selectAllArticles);
    const dispatch = useDispatch();
    const isLoading = useSelector(selectIsLoading);
    const isError = useSelector(selectIsError);


    useEffect(() => {
        dispatch(getAllArticlesAsync());
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error occurred while fetching article details.</div>;
    }

  return (
      <div className="posts-widget">
          <h4 className="main-title">Recent post</h4>
          <div className="post-content">
              <ul className="posts">

                  {articles.slice(0, 5).map((item, i) => (
                      <li key={i} item="true">
                          <div className="post-item d-flex">
                              <div className="thumb">
                                  <a href="#"><img src={item?.image} alt="" /></a>
                              </div>
                              <div className="detail">
                                  <h4 className="post-name"><a href="#">{item?.title}</a></h4>
                                  <p className="post-archive">{item?.date}</p>
                              </div>
                          </div>
                      </li>
                  ))}

              </ul>
          </div>
      </div>
  )
}

export default Recentpost