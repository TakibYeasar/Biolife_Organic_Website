import React from 'react';
import "./Singleprod.scss";
import "../../../node_modules/bootstrap/dist/css/bootstrap.css";
import { FaEye, FaHeart, FaRandom, FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import { toggleLike, deletePost } from "../../actions/post";

// const PostItem = ({ post, showActions }) => {
const Singleprod = ({ item }) => {
    // const { post, loading } = useSelector(state => state.post);
    // const dispatch = useDispatch();

    // useEffect(() => {
    //     dispatch(getPost(match.params.id));
    // }, [dispatch, match.params.id]);

    // const auth = useSelector(state => state.auth);
    
    const navigate = useNavigate();
    const proddetails = () => {
        navigate(`/prodview-${item?.title}-${item?.id}`);
    }

    const addtocart = () => {
        navigate(`/cart-${item?.title}-${item?.id}`);
    }


  return (
      <div className="product-contain">
          <div className="prod-thumb">
              <a href="#" className="link-to-prod" onClick={proddetails}><img src={item?.photo_main} alt="" height={270} width={270} /></a>
          </div>
          <div className="prod-info text-center">
              <b className="categories">{item?.category}</b>
              <h4 className="prod-title"><a href="#">{item?.title}</a></h4>
              <div className="price ">
                  <ins><span className="price-amount"><span className="currencySymbol">£</span>{item?.price}</span></ins>
                  <del><span className="price-amount"><span className="currencySymbol">£</span>{item?.old_price}</span></del>
              </div>
              <div className="slide-down-box">
                  {/* <p className="message">{item?.description}</p> */}
                  <div className="buttons d-flex">
                      <a href="#" className="btn wishlist-btn"><FaHeart className="icon" /></a>
                      <a href="#" className="btn-style add-to-cart-btn" onClick={addtocart}>add to cart</a>
                      <a href="#" className="btn wishlist-btn" onClick={proddetails}><FaEye className="icon" /></a>
                  </div>
                  {/* {showActions && (
                      <Fragment>
                          <button
                              type="button"
                              className="btn btn-light"
                              onClick={e => {
                                  dispatch(toggleLike(post.id));
                              }}
                          >
                              <i className="fas fa-thumbs-up"></i>
                              {post.likes.length > 0 && <span> {post.likes.length}</span>}
                          </button>

                          <Link to={`/posts/${post.id}`} className="btn btn-primary">
                              Discussion{" "}
                              {post.post_comments.length > 0 && (
                                  <span className="comment-count">
                                      {post.post_comments.length}
                                  </span>
                              )}
                          </Link>
                          {!auth.loading && auth.user.id === post.user && (
                              <button
                                  type="button"
                                  className="btn btn-danger"
                                  onClick={() => dispatch(deletePost(post.id))}
                              >
                                  <i className="fas fa-times"></i>
                              </button>
                          )}
                      </Fragment>
                  )} */}
              </div>
          </div>
      </div>
  )
}

// PostItem.defaultProps = {
//     showActions: true
// };

export default Singleprod