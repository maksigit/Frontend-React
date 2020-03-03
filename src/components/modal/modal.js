import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './modal.scss';
import FormMain from "../form-main";
import TitleDescModalForm from "../title-desc-modal-form";


class Modal extends Component {
    el = document.createElement('div');

    static defaultProps = {
        title: ''
    };

    componentDidMount() {
        document.body.append(this.el);
    }

    componentWillUnmount() {
        document.body.removeChild(this.el);
    }

    render() {
        const {
            disablePrev,
            disableNext,
            prev,
            next,
            stream,
            streamOverlay,
            bg
        } = this.props;

        // onClick={this.props.modalClose}

        return ReactDOM.createPortal(
            <div onClick={(e) => {if (e.target.classList[0] === 'modal-overlay') { return this.props.modalClose()}}} className={(stream === 'stream' ? "modal-overlay stream dialog-modal" : "modal-overlay dialog-modal ") + (streamOverlay === 'streamOverlay' ? "stream-overlay" : "")}>
                <div className={streamOverlay === 'streamOverlay' ? "stream-lines" : "" }>
                    <div className={streamOverlay === 'streamOverlay' ? "stream-vertical-line" : "" }></div>
                    <div className={streamOverlay === 'streamOverlay' ? "stream-horizontal-line" : "" }></div>
                </div>
                <div className= { bg === 'transparent' ? "modal-transparent" : bg ==='char' ? "modal-char" : bg === "gall" ? "modal-gall" : "modal"  }>
                    <header className="modal__header">
                        <span>{this.props.title}</span>
                        <div className="modal__header-action">
                            {this.props.header}
                            <button className="modal__close" onClick={this.props.modalClose}>
                                <svg width="11" height="11" viewBox="0 0 11 11" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd"
                                          d="M6.47283 5.50011L10.7984 1.17432C11.0672 0.905793 11.0672 0.470095 10.7984 0.201568C10.5297 -0.0671892 10.0945 -0.0671892 9.82573 0.201568L5.50011 4.52736L1.17427 0.201568C0.905526 -0.0671892 0.470305 -0.0671892 0.201559 0.201568C-0.0671864 0.470095 -0.0671864 0.905793 0.201559 1.17432L4.5274 5.50011L0.201559 9.82591C-0.0671864 10.0944 -0.0671864 10.5301 0.201559 10.7987C0.335932 10.9328 0.512039 11 0.687916 11C0.863793 11 1.0399 10.9328 1.17427 10.7984L5.50011 6.47264L9.82573 10.7984C9.9601 10.9328 10.1362 11 10.3121 11C10.488 11 10.6641 10.9328 10.7984 10.7984C11.0672 10.5299 11.0672 10.0942 10.7984 9.82568L6.47283 5.50011Z"
                                          fill="black"/>
                                </svg>
                            </button>
                        </div>
                    </header>
                    <div className="modal__content">
                        {this.props.children}
                    </div>
                </div>
            </div>,
            this.el
        );
    }
}

export default Modal;
