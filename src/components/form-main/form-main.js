import React, {Component} from 'react';

import './form-main.scss';
import Input from "../input";
import Textarea from "../textarea";
import Button from "../button";
import Select from 'react-select'
import {API_ROOT} from "../../helpers/constants";

const validate = {
    name: {
        regExp: /^[a-zA-Zа-яА-Я'][a-zA-Zа-яА-Я-' ]+[a-zA-Zа-яА-Я']?$/
    },
    email: {
        regExp: /^\b[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b$/i
    },
    phone: {
        regExp: /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){9}(\s*)?$/
    },
    message: {
        regExp: /\w{10,100}/ // ot 10 do 100 символов
    }
};

class FormMain extends Component {

    state = {
        name: '',
        city: '',
        phone: null,
        email: '',
        message: '',
        valid: true,
        errors: {
            name: false,
            phone: false,
            email: false,
            message: false
        }
    };

    getName = name => {
        this.setState({name: name.target.value})
    };
    getMail = mail => {
        this.setState({email: mail.target.value})
    };
    getPhone = phone => {
        var x = phone.target.value.replace(/\D/g, '').match(/(\d{0,2})(\d{0,3})(\d{0,2})(\d{0,2})/);
       var test = phone.target.value = !x[2] ? x[1] : x[1] + ')' + x[2] + (x[3] ? '-' + x[3] + '-' + x[4] : '');
        this.setState({phone: test})
    };
    getMessage = message => {
        this.setState({message: message.target.value})
    };

    changeSelect = selectedOption => {
        this.setState({
            city: selectedOption.value
        });
    };

    check = (message) => {
        const errors = {};
        let valid = true;
        for (const key in message) {
            if (!validate[key].regExp.test(message[key])) {
                valid = false;
                errors[key] = true;
            }
        }
        return {errors, valid};
    };

    // валидация формы
    validation = () => {
        if (this.state.email.length === 0) {
            const {
                name,
                phone,
            } = this.state;

            const check = this.check({
                name,
                phone,
            });
            this.setState({
                errors: check.errors
            });

            return check;
        } else {
            const {
                name,
                phone,
                email
            } = this.state;

            const check = this.check({
                name,
                phone,
                email
            });
            this.setState({
                errors: check.errors
            });

            return check;
        }
    };

    handleSubmit = (event) => {
        event.preventDefault();

        const check = this.validation();

        if (check.valid === false) {
            return;
        }

        const {email, phone, message, name} = this.state;

        const {source} = this.props;

        const CITYES = {
            kiev : 'Киев',
            odessa : 'Одесса',
        };

        const city = this.state.city.length > 1 ? CITYES[this.state.city] : CITYES[this.props.defaultValue];

        fetch(`${API_ROOT}/appeal`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({email, phone: '+38(0'+phone, message, name, source, city})
        })
            .then(response => response.json())
            .then(data => {
                this.props.closeModal();
                this.props.success();
                this.setState({
                    name: '',
                    city: '',
                    phone: '',
                    email: '',
                    message: '',
                })
            });
    };

    customStyles = {
        option: (styles) => ({
            ...styles,
            backgroundColor: "",
            border: "none",
            color: "#474747",
            "&:hover": {
                color: "#BEA972"
            }
        }),
        control: (base) => ({
            ...base,
            border: "none",
            boxShadow: "none",
            "&:hover": {
                background: "transparent"
            }
        }),
        menu: base => ({
            ...base,
          
            borderRadius: 0,
            background: "fafafa",
   
            hyphens: "auto",
    
            marginTop: 0,
            textAlign: "left",
         
            wordWrap: "break-word",
            borderBottom: "1px solid #E1E1E1",
            boxShadow: "none"
        }),
        menuList: base => ({
            ...base,
        
            padding: 0,
            border: "none",
            background: "fafafa",
        })
    };

    render() {
        const {t} = this.props;
        return (
            <form className='wrap-form'>
                <div className='wrap-form__field'>
                    <Input
                        label={t('name')}
                        regExp={/^[a-zA-Zа-яА-Я'][a-zA-Zа-яА-Я-' ]+[a-zA-Zа-яА-Я']?$/}
                        errorMessage={t('Enter your Name')}
                        changeValue={this.getName}
                        value={this.state.name}
                        valid={this.state.errors.name}
                        name='name'
                    />
                    <Input
                        label={t('telephone')}
                        errorMessage={t('Enter your phone number')}
                        changeValue={this.getPhone}
                        valid={this.state.errors.phone}
                        name='phone'
                        value={this.state.phone}
                        maskPhone={true}
                    />
                    <Input
                        label='Email'
                        regExp={/^\b[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b$/i}
                        errorMessage={t('Enter your E-mail')}
                        changeValue={this.getMail}
                        valid={this.state.errors.email}
                        name='email'
                        value={this.state.email}
                    />
                    <Select
                        className="form-field-select"
                        classNamePrefix="select"
                        onChange={this.changeSelect}
                        options={[
                            {value: 'kiev', label: t('kiev')},
                            {value: 'odessa', label: t('odessa')}
                        ]}
                        styles={this.customStyles}
                        placeholder={t(this.props.defaultValue)}
                    />
                    <Textarea
                        label={t('your request')}
                        changeValue={this.getMessage}
                        errorMessage={t('Enter your request')}
                        valid={this.state.errors.message}
                        name='message'
                        value={this.state.message}
                    />
                </div>
                <div className='wrap-form__wrap-btn'>
                    <Button onClick={this.handleSubmit}
                            label={t('get the consultation')}
                            skew={true}
                    />
                </div>
            </form>
        )
    }
}

export default FormMain;