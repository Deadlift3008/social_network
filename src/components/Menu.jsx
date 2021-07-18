import * as React from 'react';
import axios from "axios";

export class Menu extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            errorMessage: ''
        }
    }

    handleClickQuit = (e) => {
        e.preventDefault();

        this.setState({
            errorMessage: ''
        });

        axios.post('/api/logout').then(res => {
            const { data } = res;

            if (data.status === 'ok') {
                window.location.reload();
            } else {
                this.setState({
                    errorMessage: data.message || 'Произошла ошибка сервера'
                });
            }
        }).catch((err) => {
            this.setState({
                errorMessage: 'Произошла ошибка сервера'
            });
        });
    }

    render() {
        const { errorMessage } = this.state;
        const { isAuthenticated } = this.props;

        return (
            <section className="navbar custom-navbar navbar-fixed-top" role="navigation">
                <div className="container">
                    <div className="navbar-header">
                        <a href="#" className="navbar-brand">Соцсеть</a>
                    </div>
                    <div className="collapse navbar-collapse">
                        {isAuthenticated ? (
                            <ul className="nav navbar-nav navbar-nav-first">
                                <li><a href="/" className="smoothScroll">Моя страница</a></li>
                                <li><a href="/friends" className="smoothScroll">Друзья</a></li>
                                <li><a href="/users" className="smoothScroll">Пользователи</a></li>
                                <li><a href="/friend_requests" className="smoothScroll">Запросы в друзья</a></li>
                                <li><a onClick={this.handleClickQuit} href="">Выйти</a></li>
                            </ul>
                        ) : (
                            <ul className="nav navbar-nav navbar-nav-first">
                                <li><a href="/registration" className="smoothScroll">Регистрация</a></li>
                                <li><a href="/authorization" className="smoothScroll">Авторизация</a></li>
                            </ul>
                        )}

                        {errorMessage && <div className="menu-error-message">{errorMessage}</div>}
                    </div>
                </div>

            </section>
        )
    }
}