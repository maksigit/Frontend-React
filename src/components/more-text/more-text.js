import React from 'react'
import './more-text.scss'

const moreText = ({open}) => {
  return (
      <div className='more-text'>
            <div className='more-text__text font-small'>ЕЩЕ</div>

          {
              open ? <svg width="9" height="4" viewBox="0 0 9 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M8.28398 0.62614C8.4444 0.485413 8.4444 0.251194 8.28398 0.105546C8.12898 -0.035182 7.87101 -0.035182 7.71637 0.105546L4.80896 2.74526L4 2.74526L1.098 0.105546C0.937582 -0.035182 0.679249 -0.035182 0.524611 0.105546C0.364192 0.251194 0.364192 0.485741 0.524611 0.62614L4.12031 3.89076C4.27531 4.03641 4.53328 4.03641 4.68792 3.89076L8.28398 0.62614Z" fill="#BEA972"/>
              </svg> : <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 9 4" width="9" height="4">
                  <path id="Layer" className="shp0"
                        d="M0.72 3.37C0.56 3.51 0.56 3.75 0.72 3.89C0.87 4.04 1.13 4.04 1.28 3.89L4.19 1.25L5 1.25L7.9 3.89C8.06 4.04 8.32 4.04 8.48 3.89C8.64 3.75 8.64 3.51 8.48 3.37L4.88 0.11C4.72 -0.04 4.47 -0.04 4.31 0.11L0.72 3.37Z" fill="#BEA972"/>
              </svg>
          }

      </div>
  )

};

export default moreText;
