import React from 'react';
import "./Recentcomments.scss";

const Recentcomments = () => {
  return (
      <div className="comment-widget">
          <h4 className="main-title">Recent Comments</h4>
          <div className="comment-content">
              <ul className="comment-list">
                  <li>
                      <p className="cmt-item"><a href="#" className="auth-name"><i className="biolife-icon icon-conversation"></i>Jessica Alba</a><a href="#" className="link-post">on Healthy Organics</a></p>
                  </li>
                  <li>
                      <p className="cmt-item"><a href="#" className="auth-name"><i className="biolife-icon icon-conversation"></i>Jessica Alba</a><a href="#" className="link-post">on Best Organics</a></p>
                  </li>
                  <li>
                      <p className="cmt-item"><a href="#" className="auth-name"><i className="biolife-icon icon-conversation"></i>Jessica Alba</a><a href="#" className="link-post">on Healthy Organics</a></p>
                  </li>
                  <li>
                      <p className="cmt-item"><a href="#" className="auth-name"><i className="biolife-icon icon-conversation"></i>Jessica Alba</a><a href="#" className="link-post">on Healthy Organics</a></p>
                  </li>
              </ul>
          </div>
      </div>
  )
}

export default Recentcomments