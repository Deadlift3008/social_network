import * as React from 'react';
import axios from "axios";

export class Authorization extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            login: '',
            password: '',
            errorMessage: ''
        };
    }

    handleInput = (field) => (e) => {
        this.setState({
            [field]: e.target.value,
            errorMessage: ''
        });
    }

    handleSubmit = (e) => {
        const { login, password } = this.state;

        axios.post('/api/login', {
            login,
            password
        }).then((res) => {
            const { data } = res;
            if (data.status === 'ok') {
                window.location.replace('/');
                return;
            }

            this.setState({
                errorMessage: data.message || 'Произошла ошибка сервера'
            });
        }).catch(err => {
            this.setState({
                errorMessage: 'Произошла ошибка сервера'
            });
        })
    }

    render() {
        const { login, password, errorMessage } = this.state;

        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-4 col-sm-12">
                        <div className="entry-form">
                            <form action="#" method="post">
                                <h2>Авторизация</h2>
                                <input
                                    type="text"
                                    name="login"
                                    className="form-control"
                                    placeholder="Логин"
                                    required=""
                                    onChange={this.handleInput('login')}
                                    value={login}
                                />

                                <input
                                    type="password"
                                    name="password"
                                    className="form-control"
                                    placeholder="Пароль"
                                    required=""
                                    onChange={this.handleInput('password')}
                                    value={password}
                                />

                                {errorMessage && <div className="form-error">{errorMessage}</div>}

                                <button type="button" className="submit-btn form-control" onClick={this.handleSubmit}>Отправить</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}