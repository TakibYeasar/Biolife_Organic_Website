import React, { useState } from 'react';
import "./Articlecomments.scss";
import "../../../../node_modules/bootstrap/dist/css/bootstrap.css";
import { FaAngleRight, FaComment, FaFileImage, FaPaperclip, FaSmile, FaThumbsDown, FaThumbsUp} from "react-icons/fa";
import author02 from "../../../../../assets/images/blogpost/author-02.png";
import author03 from "../../../../../assets/images/blogpost/author-03.png";
import viewer from "../../../../../assets/images/blogpost/viewer-avt.png";
import { useDispatch, useSelector } from "react-redux";
import { selectIsLoading, selectIsError, commentArticleAsync } from "../../../features/article/articleSlice";

const Articlecomments = ({ articleId }) => {

    const dispatch = useDispatch();
    const isLoading = useSelector(selectIsLoading);
    const isError = useSelector(selectIsError);

    const [commentData, setCommentData] = useState({
        comment: "",
        image: "",
        link: "",
    });

    const handleChange = (e) => {
        setCommentData({ ...commentData, comment: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(commentArticleAsync(articleId, commentData));
    };


    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error occurred while commenting on article....</div>;
    }


    return (
        <div className="post-comments">
            <h3 className="cmt-title">Comments<sup>(26)</sup></h3>

            <div className="comment-form">
                <form action="#" method="post" name="frm-post-comment" onSubmit={handleSubmit}>
                    <p className="form-row">
                        <textarea name="txt-comment" id="txt-comment" placeholder="Write your comment" value={commentData.comment} onChange={handleChange}></textarea>
                    </p>
                    <div className="form-row-btns">
                        <button type="submit" className="btn-style">post a comment</button>
                        <div className="d-flex">
                            <a href="#" className="btn btn-fn-1"><FaSmile aria-hidden="true" /></a>
                            <a href="#" className="btn btn-fn-1" value={commentData.link} onChange={handleChange}><FaPaperclip aria-hidden="true" /></a>
                            <a href="#" className="btn btn-fn-1" value={commentData.image} onChange={handleChange}><FaFileImage aria-hidden="true" /></a>
                        </div>
                    </div>
                </form>
            </div>

            <div className="comment-list">

                <ol className="post-comments lever-0">
                    <li className="comment-elem">
                        <div className="wrap-post-comment">

                            <div className="cmt-inner">
                                <div className="auth-info">
                                    <a href="#" className="author-contact"><img src={author02} alt="" width={29} height={28} />Christiano Bale</a>
                                    <span className="cmt-time">4 days ago</span>
                                </div>
                                <div className="cmt-content">
                                    <p>Nam sed eleifend dui, eu eleifend leo.Mauris ornare eros quis placerat mollis. Duis ornare euismod risus at dictum. Proin<br />
                                        at porttitor metus. Nunc luctus nisl suscipit, hendrerit ligula non.</p>
                                </div>
                                <div className="cmt-fooot">
                                    <a href="#" className="btn btn-response"><FaComment aria-hidden="true" />Comment</a>
                                    <a href="#" className="btn btn-like"><FaThumbsUp aria-hidden="true" />9</a>
                                    <a href="#" className="btn btn-dislike"><FaThumbsDown aria-hidden="true" />1</a>
                                </div>
                            </div>

                            <div className="comment-resposes">
                                <ol className="post-comments lever-1">
                                    <li className="comment-elem">
                                        <div className="wrap-post-comment">
                                            <div className="cmt-inner">
                                                <div className="auth-info">
                                                    <a href="#" className="author-contact"><img src={author03} alt="" width="29" height="28" />Samuel Godi</a>
                                                    <span className="cmt-time">4 days ago</span>
                                                </div>
                                                <div className="cmt-content">
                                                    <p>Ut pellentesque gravida justo non rhoncus. Nunc ullamcorper tortor id aliquet luctus. Proin varius aliquam<br />
                                                        consequat.Curabitur a commodo diam, vitae pellentesque urna.</p>
                                                </div>
                                                <div className="cmt-fooot">
                                                    <a href="#" className="btn btn-response"><FaComment aria-hidden="true" />Comment</a>
                                                    <a href="#" className="btn btn-like"><FaThumbsUp aria-hidden="true" />9</a>
                                                    <a href="#" className="btn btn-dislike"><FaThumbsDown aria-hidden="true" />1</a>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                </ol>
                            </div>

                        </div>
                    </li>
                </ol>

                <div className="biolife-panigations-block">
                    <ul className="panigation-contain d-flex">
                        <li><span className="current-page">1</span></li>
                        <li><a href="#" className="link-page">2</a></li>
                        <li><a href="#" className="link-page">3</a></li>
                        <li><span className="sep">....</span></li>
                        <li><a href="#" className="link-page">20</a></li>
                        <li><a href="#" className="link-page next"><FaAngleRight aria-hidden="true" /></a></li>
                    </ul>
                </div>
            </div>

        </div>
    )
}

export default Articlecomments