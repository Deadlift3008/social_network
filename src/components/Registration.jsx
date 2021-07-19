import * as React from 'react';
import axios from 'axios';

export class Registration extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            fields: {},
            errorMessage: ''
        }
    }

    handleInput = (field) => (e) => {
        this.setState({
            fields: {
                ...this.state.fields,
                [field]: e.target.value
            },
            errorMessage: ''
        });
    }

    handleSubmit = () => {
        const { fields } = this.state;

        axios
            .post('/api/register', fields)
            .then(res => {
                const { data } = res;

                if (data.status === 'ok') {
                    window.location.replace('/authorization');

                    return;
                }

                this.setState({
                    errorMessage: data.message || 'Неизвестная ошибка сервера'
                });
            }).catch(() => {
                this.setState({
                    errorMessage: 'Неизвестная ошибка сервера'
                });
            });
    }

    render() {
        const { fields, errorMessage } = this.state;
        const { login, password, name, second_name, age, gender, interests, city } = fields;

        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-4 col-sm-12">
                        <div className="entry-form">
                            <form action="#" method="post">
                                <h2>Регистрация</h2>
                                <input
                                    type="text"
                                    name="login"
                                    className="form-control"
                                    placeholder="Логин"
                                    required=""
                                    value={login}
                                    onChange={this.handleInput('login')}
                                />

                                <input
                                    type="password"
                                    name="password"
                                    className="form-control"
                                    placeholder="Пароль"
                                    required=""
                                    value={password}
                                    onChange={this.handleInput('password')}
                                />

                                <input
                                    type="text"
                                    name="name"
                                    className="form-control"
                                    placeholder="Имя"
                                    required=""
                                    value={name}
                                    onChange={this.handleInput('name')}
                                />

                                <input
                                    type="text"
                                    name="second_name"
                                    className="form-control"
                                    placeholder="Фамилия"
                                    required=""
                                    value={second_name}
                                    onChange={this.handleInput('second_name')}
                                />

                                <input
                                    type="text"
                                    name="age"
                                    className="form-control"
                                    placeholder="Возраст"
                                    value={age}
                                    onChange={this.handleInput('age')}
                                />

                                <input
                                    type="text"
                                    name="gender"
                                    className="form-control"
                                    placeholder="Пол"
                                    value={gender}
                                    onChange={this.handleInput('gender')}
                                />

                                <input
                                    type="text"
                                    name="interests"
                                    className="form-control"
                                    placeholder="Интересы"
                                    value={interests}
                                    onChange={this.handleInput('interests')}
                                />

                                <input
                                    type="text"
                                    name="city"
                                    className="form-control"
                                    placeholder="Город"
                                    value={city}
                                    onChange={this.handleInput('city')}
                                />

                                {errorMessage && <div className="form-error">{errorMessage}</div>}

                                <button
                                    onClick={this.handleSubmit}
                                    type="button"
                                    className="submit-btn form-control"
                                >
                                    Отправить
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
