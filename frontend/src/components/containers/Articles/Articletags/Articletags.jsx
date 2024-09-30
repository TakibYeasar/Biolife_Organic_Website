import React from 'react';
import "./Articletags.scss";

const Articletags = ({article}) => {
  return (
      <div className="post-tags d-flex">
          <span className="tag-title">Tags:</span>
          <ul className="tags d-flex">
              {article?.tags?.slice(0, 5).map((item, i) => (
                  <li key={i} item="true"><a href="#" className="tag-link">{item?.title}</a></li>
              ))}
          </ul>
      </div>
  )
}

export default Articletags