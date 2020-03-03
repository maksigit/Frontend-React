import React, {Component} from 'react';
import classNames from 'classnames';

import './social-widget.scss';

class SocialWidget extends Component {

    state = {
        modal: false
    };

    toogleWidget = (e) => {
        this.setState({
            modal: !this.state.modal
        })
};

    render() {
        return (
            <div className={classNames("social-widget", {
                'social-widget__open': this.state.modal
            })}>
                <div className='social-widget__wrap'>
                    <div className={classNames("social-widget__wrap-items", {
                        'social-widget__open-items': this.state.modal
                    })}>
                        <div className="social-widget__items">
                            <a href="viber://pa?chatURI=mssgmesupport">
                                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g clip-path="url(#clip0)">
                                        <path d="M10.8002 0H7.19971C3.72539 0 0.898895 2.82649 0.898895 6.30081V9.00116C0.898895 11.4403 2.30564 13.6539 4.49935 14.6951V17.7023C4.49935 17.9634 4.82599 18.0999 5.01154 17.9144L7.62397 15.302H10.8001C14.2744 15.302 17.1009 12.4755 17.1009 9.00116V6.30081C17.1009 2.82649 14.2744 0 10.8002 0Z" fill="#BEA972"/>
                                        <path d="M13.5299 11.1833L13.2602 9.72199C13.2379 9.60127 13.1444 9.50631 13.024 9.48223L10.9024 9.05793C10.8039 9.03831 10.7023 9.06907 10.6314 9.13998L9.76942 10.0019C8.31719 9.35124 7.5112 8.54349 6.80203 7.02892L7.66117 6.16981C7.73208 6.09886 7.76288 5.99712 7.74323 5.89875L7.31893 3.77714C7.29485 3.6568 7.19989 3.56322 7.07916 3.54093L5.61786 3.27121C5.57785 3.26386 5.53665 3.26463 5.49692 3.27367C5.11108 3.36131 4.75903 3.55573 4.4788 3.83603C3.99357 4.32126 3.80812 5.0293 3.94256 5.88363C4.16822 7.31822 4.87107 9.31467 6.16781 10.6166L6.18553 10.6342C7.48645 11.93 9.48294 12.6329 10.9176 12.8586C11.0983 12.8871 11.2724 12.9012 11.4393 12.9012C12.0614 12.9012 12.5826 12.705 12.9653 12.3224C13.2455 12.0421 13.44 11.69 13.5276 11.3043C13.5365 11.2645 13.5373 11.2234 13.5299 11.1833Z" fill="white"/>
                                        <path d="M9.60007 5.10071C9.43438 5.10071 9.30005 5.23504 9.30005 5.40073C9.30005 5.56642 9.43438 5.70075 9.60007 5.70075C10.2619 5.70075 10.8002 6.23914 10.8002 6.90092C10.8002 7.0644 10.9368 7.20094 11.1003 7.20094C11.2637 7.20094 11.4003 7.0644 11.4003 6.90092C11.4003 5.90825 10.5927 5.10071 9.60007 5.10071Z" fill="white"/>
                                        <path d="M9.60013 3.90063C9.48914 3.90063 9.37713 3.90679 9.26716 3.91892C9.10245 3.93709 8.98366 4.08535 9.00184 4.25009C9.02001 4.41483 9.16858 4.53331 9.33301 4.51541C9.42118 4.50567 9.51104 4.50072 9.60013 4.50072C10.9237 4.50072 12.0004 5.57748 12.0004 6.90101C12.0004 6.99013 11.9955 7.07999 11.9857 7.16816C11.9678 7.33062 12.0885 7.48144 12.251 7.49934C12.4135 7.51723 12.5643 7.39654 12.5822 7.23401C12.5943 7.12404 12.6005 7.01203 12.6005 6.90101C12.6005 5.24663 11.2545 3.90063 9.60013 3.90063Z" fill="white"/>
                                        <path d="M9.60054 2.70044C9.49331 2.70044 9.38471 2.70452 9.27784 2.71264C9.1126 2.72515 8.98878 2.86929 9.0013 3.03449C9.01378 3.19973 9.15841 3.32355 9.32315 3.31103C9.41502 3.30404 9.50836 3.30052 9.60054 3.30052C11.5858 3.30052 13.201 4.91567 13.201 6.90098C13.201 7.18188 13.1686 7.46151 13.1047 7.73207C13.068 7.88711 13.1635 8.04827 13.3172 8.09038C13.479 8.13468 13.6501 8.03326 13.6887 7.87009C13.7633 7.55436 13.8011 7.22832 13.8011 6.90098C13.8011 4.58478 11.9167 2.70044 9.60054 2.70044Z" fill="white"/>
                                    </g>
                                    <defs>
                                        <clipPath id="clip0">
                                            <rect width="18" height="18" fill="white"/>
                                        </clipPath>
                                    </defs>
                                </svg>
                            </a>
                        </div>
                        <div className="social-widget__items">
                            <a href="https://m.me/mssg.me">
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M8.00159 0C3.61694 0 0.0625 3.31641 0.0625 7.40735C0.0625 9.72388 1.20215 11.7922 2.98682 13.1504V16L5.65125 14.4852C6.39404 14.6992 7.18347 14.8148 8.00159 14.8148C12.3865 14.8148 15.9406 11.4982 15.9406 7.40747C15.9406 3.31641 12.3865 0 8.00159 0V0Z" fill="#BEA972"/>
                                    <path d="M8.80469 9.91174L6.7688 7.7738L2.87231 9.91174L7.15381 5.37854L9.20862 7.479L13.0619 5.37854L8.80469 9.91174Z" fill="white"/>
                                </svg>
                            </a>
                        </div>
                        <div className="social-widget__items">
                            <a href="tg://resolve?domain=mssgmebot">
                                <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M0.282729 6.71437L3.96945 8.09037L5.39644 12.6795C5.48774 12.9735 5.84716 13.0821 6.08572 12.8871L8.14076 11.2118C8.35617 11.0362 8.663 11.0275 8.88812 11.1909L12.5947 13.8819C12.8499 14.0674 13.2114 13.9276 13.2754 13.6192L15.9907 0.558373C16.0605 0.221519 15.7296 -0.059494 15.4088 0.0645593L0.278409 5.90141C-0.0949774 6.04541 -0.0917241 6.57405 0.282729 6.71437ZM5.16646 7.35789L12.3717 2.92019C12.5012 2.84067 12.6344 3.01576 12.5232 3.11891L6.57681 8.64637C6.3678 8.84093 6.23297 9.10131 6.19478 9.38392L5.99222 10.885C5.9654 11.0855 5.68385 11.1054 5.62854 10.9114L4.8495 8.17405C4.76028 7.86184 4.8903 7.52835 5.16646 7.35789Z" fill="#BEA972"/>
                                </svg>
                            </a>
                        </div>
                        <div className="social-widget__items">
                            <a href="tel:+(123) 456-78-90">
                                <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M15.9924 11.046C16.0263 11.2733 15.9471 11.4709 15.7552 11.6389L13.5025 13.5951C13.4008 13.6939 13.2682 13.778 13.1044 13.8471C12.9407 13.9163 12.7798 13.9607 12.6218 13.9805C12.6105 13.9805 12.5765 13.983 12.5201 13.988C12.4637 13.9929 12.3903 13.9954 12.2999 13.9954C12.0853 13.9954 11.7381 13.9633 11.2582 13.899C10.7783 13.8348 10.1911 13.6767 9.49669 13.4248C8.80212 13.1728 8.01453 12.7948 7.13378 12.291C6.25303 11.7871 5.31576 11.0954 4.32206 10.2161C3.53162 9.5343 2.87668 8.88218 2.35724 8.25973C1.83781 7.63723 1.42 7.06169 1.10383 6.53308C0.78762 6.00448 0.550487 5.52527 0.392399 5.09547C0.23431 4.66566 0.127036 4.29514 0.0705753 3.9839C0.0141151 3.67267 -0.00846903 3.42812 0.00282301 3.25027C0.0141151 3.07242 0.0197611 2.97362 0.0197611 2.95386C0.0423452 2.81553 0.0931594 2.67473 0.172204 2.53146C0.251248 2.3882 0.34723 2.2721 0.460151 2.18318L2.71291 0.212008C2.871 0.0736804 3.05168 0.0045166 3.25493 0.0045166C3.40173 0.0045166 3.53159 0.0415686 3.64451 0.115673C3.75743 0.189777 3.85341 0.281172 3.93246 0.389858L5.74483 3.39848C5.84646 3.55657 5.87469 3.72948 5.82952 3.91721C5.78435 4.10494 5.68837 4.26303 5.54157 4.39148L4.71161 5.1177C4.68902 5.13746 4.66926 5.16957 4.65232 5.21403C4.63539 5.25849 4.62692 5.29555 4.62692 5.32519C4.67208 5.53268 4.77371 5.76981 4.9318 6.03659C5.06731 6.27372 5.27621 6.56273 5.55851 6.9036C5.84081 7.24448 6.24168 7.63721 6.76111 8.08183C7.26926 8.53639 7.72094 8.88957 8.11616 9.14157C8.5113 9.39343 8.8417 9.57876 9.10706 9.69733C9.37243 9.81589 9.57568 9.88753 9.71681 9.91216L9.92848 9.94923C9.95106 9.94923 9.98784 9.9418 10.0386 9.927C10.0894 9.91216 10.1261 9.89489 10.1487 9.8751L11.1142 9.0155C11.3175 8.85743 11.5546 8.77839 11.8256 8.77839C12.0176 8.77839 12.17 8.80801 12.2829 8.86731H12.2998L15.5688 10.5569C15.806 10.6854 15.9472 10.8484 15.9924 11.046Z" fill="#BEA972"/>
                                </svg>
                            </a>
                        </div>
                    </div>
                    <div className="social-widget__item" onClick={this.toogleWidget}>
                        <div>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M8.00159 0C3.61694 0 0.0625 3.31641 0.0625 7.40735C0.0625 9.72388 1.20215 11.7922 2.98682 13.1504V16L5.65125 14.4852C6.39404 14.6992 7.18347 14.8148 8.00159 14.8148C12.3865 14.8148 15.9406 11.4982 15.9406 7.40747C15.9406 3.31641 12.3865 0 8.00159 0V0Z"
                                    fill="#474747"/>
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default SocialWidget;