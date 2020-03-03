import React from 'react';
import {STATIC_FILE, replace_path} from '../../helpers/constants';

import './img-full-with.scss';


const ImgFullWith = ({item}) => {


  const {description, title, data} = item;
  return (
    <div className="img-full-with">
      <div className="img-full-with__top">
        <div className="img-full-with__title title-section">{title}</div>
        <div className="img-full-with__desc font-medium" dangerouslySetInnerHTML={{ __html: description }} />
      </div>
      <div className="img-full-with__bottom">
        <img src={replace_path(`${STATIC_FILE}${data[0].path}`)} alt="img-full-with"/>
      </div>
    </div>

  );
};
export default ImgFullWith;
