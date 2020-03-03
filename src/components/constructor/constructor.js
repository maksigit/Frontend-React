import React, {Component} from 'react';
import {connect} from "react-redux";
import SliderOnSingle from "../slider-on-single";
import Modal from "../modal";
import Welcome from "../welcome";
import ImgText from "../img-text";
import TitleDescModalForm from "../title-desc-modal-form";
import FormMain from "../form-main";
import Banner from "../banner";
import TitleSection from "../title-section";
import Tabs from "../tabs";

const Constructor = ({data}) => {

    return (
        <div>
            {
                data.map((item, index) => {
                    let form_index = 1;
                    form_index += item.component === 'form' ? +1 : 0;
                    switch (item.component) {
                        case 'slider-popup' : {
                            const section = item.data.length > 1 ? <div className='single-slider-section'>
                                    <SliderOnSingle data={item} openGallery={this.openModalGallery}/>
                                    {this.state.modalGallery &&
                                    <Modal bg='gall' modalClose={this.closeModalGallery}>
                                        <Welcome data={item.data}/>
                                    </Modal>}
                                </div> :
                                <div className='single-img-text-section'>
                                    <ImgText item={item}/>
                                </div>;

                            return section

                        }

                        case 'form' : {
                            return (
                                <div className='single-form-section'>
                                    <TitleDescModalForm title={item.title}
                                                        desc={item.description}/>
                                    <FormMain closeModal={this.closeModal} success={this.openModalSent}
                                              source={form_index}/>
                                </div>
                            )
                        }
                        case 'image-full-width' : {
                            return (
                                <div className='single-img-text-section'>
                                    <ImgText item={item}/>
                                </div>
                            )
                        }
                        case 'banner' : {
                            return (
                                <div className='single-banner-section'>
                                    <Banner openModal={this.props.openForm} buttonText={item.button}
                                            img={item.data[0].path}
                                            action={item.action} url=""
                                            desc={item.description}/>
                                </div>
                            )
                        }
                        case 'layout' : {
                            return (
                                <div className='single-planing-section'>
                                    <TitleSection titleSection={item.title}/>
                                    <Tabs item={item.data} arrows={false}/>
                                </div>
                            )
                        }
                    }
                })
            }
        </div>
    )
}

export default connect()(Constructor);