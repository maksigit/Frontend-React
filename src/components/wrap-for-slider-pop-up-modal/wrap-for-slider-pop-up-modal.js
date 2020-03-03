import React, {useState} from 'react';
import {withTranslation} from "react-i18next";
import SliderOnSingle from "../slider-on-single";
import Modal from "../modal";
import Welcome from "../welcome";


const WrapForSliderPopUpModal = (props) => {

    const {sliderId, data} = props;

    const [modal, setModal] = useState(false);
    const [currentSlide, setCurrentSlide] = useState(0);

    const openModalGallery = (index) => {
        document.querySelector('html').classList.add('scroll-off');
        setCurrentSlide(index);
        setModal(true);
    };

    const closeModalGallery = () => {
        document.querySelector('html').classList.remove('scroll-off');
        setModal(false)
    };

    return (
        <div>
            <SliderOnSingle sliderId={sliderId} data={data}
                            openGallery={openModalGallery}/>
            {modal &&
            <Modal bg="gall" modalClose={closeModalGallery}>
                <Welcome popUp={true} currentIndex={currentSlide} sliderId={sliderId} data={data.data}/>
            </Modal>}
        </div>
    );
};
export default withTranslation()(WrapForSliderPopUpModal);