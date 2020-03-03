import React from "react";
import Slider from "react-slick";
import {STATIC_FILE} from "../../helpers/constants";

class TestSlick extends React.Component {
    render() {
        const data = this.props.asd;

        const settings = {
      
            infinite: true,
            speed: 500,
            slidesToShow: 3,
            slidesToScroll: 1,
            swipeToSlide: true,
        };
        return (
            <Slider {...settings}>
                {
                    data.map((item, index) => {
                        return (
                            <div key={item._id}
                                 >
                                <div className='tabs__item-intro'>
                                    <div className='tabs__item-intro-img'>
                                        <img src={`${STATIC_FILE}${item.icon[0].path}`} alt=""/>
                                    </div>
                                    <div className='font-small'>
                                        {item.title}
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </Slider>
        );
    }
}

export default TestSlick