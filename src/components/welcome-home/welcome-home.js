import React, {Component} from 'react';
import {connect} from 'react-redux';
import './welcome-home.scss';
import {STATIC_FILE, replace_path} from '../../helpers/constants';
import AwesomeSliderNew from "../awesome-slider-new";

class WelcomeHome extends Component {
    state = {
        loading: false
    };

    shouldComponentUpdate(prevProps) {
        return (JSON.stringify(prevProps.data) !== JSON.stringify(this.props.data)
        || prevProps.categories !== this.props.categories
        || prevProps.language !== this.props.language
        );
    }

    componentDidUpdate() {
        if (this.props.data.length > 0 && this.state.loading === false) {

            for (let i = 0; i < this.props.data.length; i++) {
                const img = new Image();
                const url = replace_path(`${STATIC_FILE}${this.props.data[i].content.mediaDesktop[0].path}`);
                img.src = url;
                console.log(img)
            }

            this.setState({loading: true})
        }
    }

    render() {
        const {data, categories, t, click, openForm} = this.props;

        const filter = data.filter(slide => slide.categories.value === categories).sort((a, b) => b.order - a.order);

        return (
            <div className="home-welcome">
                <AwesomeSliderNew
                    click={click}
                    loadedImgWelcome={this.props.loadedImgWelcome}
                    t={t}
                    data={filter}
                    categories={categories}
                    openForm={openForm}
                />
            </div>
        );
    }
}

const mapStateToProps = ({headerReducer}) => ({
    categories: headerReducer.currentCategory,
    language: headerReducer.language
})

export default connect(mapStateToProps, null)(WelcomeHome);