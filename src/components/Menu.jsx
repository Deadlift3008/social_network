import * as React from 'react';

export class Menu extends React.Component {
    render() {
        return (
            <section className="navbar custom-navbar navbar-fixed-top" role="navigation">
                <div className="container">
                    <div className="navbar-header">
                        <a href="#" className="navbar-brand">Соцсеть</a>
                    </div>
                    <div className="collapse navbar-collapse">
                        <ul className="nav navbar-nav navbar-nav-first">
                            <li><a href="/" className="smoothScroll">Моя страница</a></li>
                            <li><a href="/registration" className="smoothScroll">Регистрация</a></li>
                            <li><a href="/authorization" className="smoothScroll">Авторизация</a></li>
                            <li><a href="/friends" className="smoothScroll">Друзья</a></li>
                            <li><a href="/users" className="smoothScroll">Пользователи</a></li>
                            <li><a href="/friend_requests" className="smoothScroll">Запросы в друзья</a></li>
                        </ul>
                        {/*TODO: Добавить кнопку выхода*/}
                    </div>
                </div>
            </section>
        )
    }
}