import React, {useState, useEffect} from 'react';
import classNames from 'classnames';
import {STATIC_FILE, replace_path} from '../../helpers/constants';
import {MOBILE} from '../../helpers/helpers';

import './img-text.scss';

const ImgText = ({item}) => {
  const {description, title, text_right, data} = item;
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (window.innerWidth < MOBILE && description.length > 150) {
      setOpen(true);
    }
  }, []);

  const toggleHeight = () => {
    setOpen(open => {

      return !open;

    });
  };


  return (
    <div className={classNames('img-text', {'img-text__revert': text_right})}>
      <div className="img-text__item-content">
        <h2 className="img-text__item-title title-section">{title}</h2>
        <h3 className={classNames('img-text__item-desc', {'img-text__item-desc-short': open})} dangerouslySetInnerHTML={{__html: description}}/>
        <div onClick={toggleHeight} className="img-text__more">
        </div>
      </div>
      <div className="img-text__item-img">
        <img src={replace_path(`${STATIC_FILE}${data[0].path}`)} alt=""/>
      </div>

    </div>

  );
};
export default ImgText;
