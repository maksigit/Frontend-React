import React, { Component } from 'react';
import { connect } from 'react-redux';
import './form.scss';


const validate = {
  email: {
    pattern: /^\b[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b$/i,
    message: {
      empty: 'Введите ваш Email',
      error: 'Email не валидный'
    }
  },
  name: {
    pattern: /.{2,}/i,
    mask: /^[a-zA-Z\s]*$/,
    message: {
      empty: 'Введите ваше имя',
      error: 'Не меньше 2 символов'
    }
  },
  tel: {
    pattern: /.{2,}/i,
    mask: /^[\d]*$/,
    message: {
      empty: 'Введите ваш телефон',
      error: 'Телефон не валидный'
    }
  },
  description: {
    pattern: /.{2,}/i,
    message: {
      empty: 'Введите ваш запрос',
      error: 'Не меньше 10 и не больше 100 символов'
    }
  },
  check(message) {
    const errors = {};
    let valid = true;

    const form = { ...message };
    delete form.errors;

    for (const key in form) {
      const field = [this[key]][0];

      if (form[key].length === 0) {
        errors[key] = field.message.empty;
        valid = false;
      } else if (!field.pattern.test(form[key])) {
        valid = false;
        errors[key] = field.message.error;

      } else {
        errors[key] = '';
      }
    }

    return { errors, valid };
  }
};


class Forma extends Component {
  state = {
    email: '',
    tel: '',
    name: '',
    description: '',
    errors: {}
  }


  componentDidMount() {
    // init
  }

  handleChange = e => {
    const { name, value } = e.target;

    if (!value.match(validate[name].mask)) {
      return;
    }

    this.setState({ [name]: value });

  }

  // валидация формы
  validation = () => {
    const check = validate.check(this.state);

    this.setState({ errors: check.errors });
    return check.valid;
  }

  onBlur = ({target}) => {
    const check = validate.check({[target.name]: this.state[target.name]});
    const copy = {...this.state.errors};
    const field = Object.keys(check.errors)[0];
    copy[field] = check.errors[field];
    this.setState({ errors: copy });
  }

  handleSubmit = e => {
    e.preventDefault();
    const valid = this.validation();

    if (valid) {
      const data = { ...this.state };
      delete data.errors;
    }
  }


  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div>
            <input value={this.state.name} onBlur={this.onBlur} onChange={this.handleChange} type="text" name="name" placeholder="name" />
            {this.state.errors.name && <span>{this.state.errors.name}</span>}
          </div>
          <div>
            <input value={this.state.tel} onBlur={this.onBlur} onChange={this.handleChange} type="text" name="tel" placeholder="tel" />
            {this.state.errors.tel && <span>{this.state.errors.tel}</span>}
          </div>
          <div>
            <input value={this.state.email} onBlur={this.onBlur} onChange={this.handleChange} type="text" name="email" placeholder="email" />
            {this.state.errors.email && <span>{this.state.errors.email}</span>}
          </div>
          <div>
            <input value={this.state.description} onBlur={this.onBlur} onChange={this.handleChange} type="text" name="description" placeholder="description" />
            {this.state.errors.description && <span>{this.state.errors.description}</span>}
          </div>
          <button>Отправить</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {

  };
};

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(Forma);
