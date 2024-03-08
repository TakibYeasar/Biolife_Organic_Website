import React from 'react';
import "./Articlecategory.scss";

const Articlecategory = ({article}) => {
  return (
      <div className="category-widget">
          <h4 className="main-title">Categories</h4>
          <div className="category-content">
              {article?.category?.map((item, i) => (
                  <ul className="cat-list" key={i} item="true">
                      <li className="cat-list-item"><a href="#" className="cat-link">{item?.cat_name}</a></li>
                  </ul>
              ))}
          </div>
      </div>
  )
}

export default Articlecategory