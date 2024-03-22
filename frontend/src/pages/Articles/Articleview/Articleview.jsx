import React, { useEffect, useState} from 'react';
import "./Articleview.scss";
import "../../../../node_modules/bootstrap/dist/css/bootstrap.css";
import { FaComment, FaEye, FaFacebook, FaInstagram, FaPinterest, FaSearch, FaTwitter, FaYoutube } from "react-icons/fa";
import bg from "../../../../../assets/images/home/biolife-banner__style-01.jpg";
import author2 from "../../../../../assets/images/blogpost/author-02.png";
import { useSelector, useDispatch } from "react-redux";
import { getSingleArticleAsync } from "../../../features/article/articleService";
import { selectIsLoading, selectIsError, selectArticle } from "../../../features/article/articleSlice";
import { useParams } from 'react-router-dom';
import Recentcomments from '../Recentcomments/Recentcomments';
import Recentpost from '../Recentprost/Recentpost';
import Articletags from '../Articletags/Articletags';
import Articlecomments from '../Articlecomments/Articlecomments';
import Articlecategory from '../Articlecategory/Articlecategory';

const Articleview = () => {

  const { id } = useParams();
  const article = useSelector(selectArticle);
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const isError = useSelector(selectIsError);
  const [value, setValue] = useState("");

  useEffect(() => {
    dispatch(getSingleArticleAsync(id));
  }, []);

  // console.log("Article:", article);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error occurred while fetching article details.</div>;
  }

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <div className="blogview-sec">
      <div className="breadcrumb">
        <img src={bg} alt="" className='img-fluid' />
        <h1 className='title'>Organic Fruits</h1>
      </div>
      <div className="container">
        <div className="row d-flex">


          <div className="col-lg-9 col-md-8 col-sm-12 col-xs-12">
            <div className="single-post-contain ">
              <div className="post-head">
                <div className="thumbnail">
                  <figure><img src={article?.image} width="870" height="635" alt="" /></figure>
                </div>
                <h2 className="post-name">{article?.title}</h2>
                <p className="post-archive"><span className="post-date">{article?.date}</span><span className="author">Posted By: {article?.author_name || "Admin"}</span></p>
              </div>

              <div className="post-content">{article?.description}</div>

              <div className="post-foot">

                <Articletags article={article} />

                <div className="auth-info d-flex">
                  <div className="auth">
                    <a href="#" className="avatar"><img src={author2} width={29} height={28} /><span>Christian Doe</span></a>
                    <span className="count-item viewer"><FaEye className="icon" aria-hidden="true" />630</span>
                    <span className="count-item commented"><FaComment className="icon" aria-hidden="true" />26</span>
                  </div>
                  <div className="socials-connection d-flex">
                    <span className="title">Share:</span>
                    <ul className="social-list d-flex">
                      <li><a href="#" className="socail-link"><FaTwitter aria-hidden="true" /></a></li>
                      <li><a href="#" className="socail-link"><FaFacebook aria-hidden="true" /></a></li>
                      <li><a href="#" className="socail-link"><FaPinterest aria-hidden="true" /></a></li>
                      <li><a href="#" className="socail-link"><FaYoutube aria-hidden="true" /></a></li>
                      <li><a href="#" className="socail-link"><FaInstagram aria-hidden="true" /></a></li>
                    </ul>
                  </div>
                </div>

              </div>

              <Articlecomments articleId={id} />
            </div>

          </div>


          <div className="col-lg-3 col-md-4 col-sm-12 col-xs-12">
            <div className="blog-sidebar">

              <div className="sidebar-heading">
                <span className="main-title">Sidebar</span>
              </div>

              <div className="sidebar-contain">
                <div className="search-widget">
                  <div className="search-content">
                    <form action="#" name="frm-search" method="get" className="frm-search">
                      <input type="text" name="s" value={value} onChange={handleChange} placeholder="SEACH..." className="input-text" />
                      <button type="submit" name="ok"><FaSearch /></button>
                    </form>
                  </div>
                </div>

                <Articlecategory article={article} />

                <Recentpost />

                <Recentcomments />

              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Articleview