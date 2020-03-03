import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';

class About extends Component {
  state = {
    data: null
  }
  componentDidMount() {
    // this.props.i18n.on('languageChanged', () => {
    //   fetch(`http://localhost:5050/api/about/${this.props.i18n.language}`)
    //     .then(response => {
    //       return response.json();
    //     })
    //     .then(data => {
    //       this.setState({ data });
    //     });
    // });
    // fetch(`http://localhost:5050/api/about/${this.props.i18n.language}`)
    //   .then(response => {
    //     return response.json();
    //   })
    //   .then(data => {
    //     this.setState({ data });
    //   });
  }

  componentWillUnmount() {
    // this.props.i18n.off('languageChanged');
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   // return JSON.stringify(nextState.data) !== JSON.stringify(this.state.data);
  // }


  render() {
    const { t } = this.props;
    return (
      <div>
        About
        {
          this.state.data ?
            <>
              <p>{this.state.data.country}</p>
              <p>{this.state.data.description}</p>
              <p>{this.state.data.name}</p>
              <p>{this.state.data.locale}</p>
            </>
            : null
        }
        <div>
          <div>123</div>
          {t('hello.label')}
          <div>{t('title')}</div>
        </div>
      </div>
    );
  }
}


export default withTranslation()(About);

