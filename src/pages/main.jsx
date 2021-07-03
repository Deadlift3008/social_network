import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { transformRenderedData } from '../utils/transform-rendered-data';

class MainPage extends React.Component {
    render() {
        const {test} = this.props.testData;

        return (
            <div className="wrapper">
                <section className="navbar custom-navbar navbar-fixed-top" role="navigation">
                    <div className="container">

                        <div className="navbar-header">
                            <button className="navbar-toggle">
                                <span className="icon icon-bar"/>
                                <span className="icon icon-bar"/>
                                <span className="icon icon-bar"/>
                            </button>

                            <a href="#" className="navbar-brand">Соцсеть</a>
                        </div>

                        <div className="collapse navbar-collapse">
                            <ul className="nav navbar-nav navbar-nav-first">
                                <li><a href="#team" className="smoothScroll">Моя страница</a></li>
                                <li><a href="#team" className="smoothScroll">Регистрация</a></li>
                                <li><a href="#top" className="smoothScroll">Авторизация</a></li>
                                <li><a href="#about" className="smoothScroll">Друзья</a></li>
                            </ul>
                        </div>

                    </div>
                </section>
                <section>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6 col-sm-12">
                                <div className="about-info">
                                    <h2>Информация о человеке</h2>

                                    <figure>
                                        <figcaption>
                                            <h3>Имя</h3>
                                            <p>Вася</p>
                                        </figcaption>
                                    </figure>

                                    <figure>
                                        <figcaption>
                                            <h3>Фамилия</h3>
                                            <p>Васильев</p>
                                        </figcaption>
                                    </figure>

                                    <figure>
                                        <figcaption>
                                            <h3>Возраст</h3>
                                            <p>26</p>
                                        </figcaption>
                                    </figure>

                                    <figure>
                                        <figcaption>
                                            <h3>Пол</h3>
                                            <p>Вертосексуал</p>
                                        </figcaption>
                                    </figure>

                                    <figure>
                                        <figcaption>
                                            <h3>Интересы</h3>
                                            <p>Дышать, ходить, двигаться</p>
                                        </figcaption>
                                    </figure>

                                    <figure>
                                        <figcaption>
                                            <h3>Город</h3>
                                            <p>Аэдд Гинваэль</p>
                                        </figcaption>
                                    </figure>
                                </div>
                            </div>

                            <div className="col-md-offset-1 col-md-4 col-sm-12">
                                <div className="entry-form">
                                    <form action="#" method="post">
                                        <h2>Регистрация</h2>
                                        <input type="text" name="login" className="form-control" placeholder="Логин"
                                               required=""/>

                                        <input type="password" name="password" className="form-control"
                                               placeholder="Пароль" required=""/>

                                        <input type="text" name="full name" className="form-control"
                                               placeholder="Имя" required=""/>

                                        <input type="text" name="second_name" className="form-control"
                                               placeholder="Фамилия" required=""/>

                                        <input type="text" name="age" className="form-control"
                                               placeholder="Возраст" required=""/>

                                        <input type="text" name="gender" className="form-control"
                                               placeholder="Пол" required=""/>

                                        <input type="text" name="interests"
                                               className="form-control" placeholder="Интересы"
                                               required=""/>

                                        <input type="text" name="city"
                                               className="form-control" placeholder="Город"
                                               required=""/>

                                        <button
                                            className="submit-btn form-control">Отправить
                                        </button>
                                    </form>
                                </div>
                            </div>

                            <div className="col-md-offset-1 col-md-4 col-sm-12">
                                <div className="entry-form">
                                    <form action="#" method="post">
                                        <h2>Авторизация</h2>
                                        <input type="text" name="login" className="form-control" placeholder="Логин"
                                               required=""/>

                                        <input type="password" name="password" className="form-control"
                                               placeholder="Пароль" required=""/>

                                        <button className="submit-btn form-control">Отправить</button>
                                    </form>
                                </div>
                            </div>

                        </div>
                    </div>
                </section>
                <h2>{test}</h2>
                <section id="testimonial">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12 col-sm-12">
                                <div className="section-title">
                                    <h2>Список пользователей</h2>
                                </div>

                                <div className="people">
                                    <div className="people__item">
                                        <div className="item">
                                            <div className="tst-author">
                                                <h4>Jackson</h4>
                                                <span>Shopify Developer</span>
                                            </div>
                                            <p>You really do help young creative minds to get quality education and
                                                professional job search assistance. I’d recommend it to everyone!</p>
                                        </div>

                                        <div className="people__button-wrapper">
                                            <button className="form-control people__button">Подружиться</button>
                                        </div>
                                    </div>

                                    <div className="people__item">
                                        <div className="item">
                                            <div className="tst-author">
                                                <h4>Camila</h4>
                                                <span>Marketing Manager</span>
                                            </div>
                                            <p>Trying something new is exciting! Thanks for the amazing law course and
                                                the great teacher who was able to make it interesting.</p>
                                        </div>

                                        <div className="people__button-wrapper">
                                            <button className="form-control people__button">Подружиться</button>
                                        </div>
                                    </div>

                                    <div className="people__item">
                                        <div className="item">
                                            <div className="tst-author">
                                                <h4>Barbie</h4>
                                                <span>Art Director</span>
                                            </div>
                                            <p>Donec erat libero, blandit vitae arcu eu, lacinia placerat justo. Sed
                                                sollicitudin quis felis vitae hendrerit.</p>
                                        </div>

                                        <div className="people__button-wrapper">
                                            <button className="form-control people__button">Подружиться</button>
                                        </div>
                                    </div>

                                    <div className="people__item">
                                        <div className="item">
                                            <div className="tst-author">
                                                <h4>Andrio</h4>
                                                <span>Web Developer</span>
                                            </div>
                                            <p>Nam eget mi eu ante faucibus viverra nec sed magna. Vivamus viverra
                                                sapien ex, elementum varius ex sagittis vel.</p>
                                        </div>

                                        <div className="people__button-wrapper">
                                            <button className="form-control people__button">Подружиться</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="container">
                            <div className="row">
                                <div className="col-md-12 col-sm-12">
                                    <div className="section-title">
                                        <h2>Список друзей</h2>
                                    </div>

                                    <div className="people">
                                        <div className="people__item">
                                            <div className="item">
                                                <div className="tst-author">
                                                    <h4>Jackson</h4>
                                                    <span>Shopify Developer</span>
                                                </div>
                                                <p>You really do help young creative minds to get quality education and
                                                    professional job search assistance. I’d recommend it to
                                                    everyone!</p>
                                            </div>

                                            <div className="people__button-wrapper">
                                                <button className="form-control people__button">Удалить из друзей
                                                </button>
                                            </div>
                                        </div>

                                        <div className="people__item">
                                            <div className="item">
                                                <div className="tst-author">
                                                    <h4>Camila</h4>
                                                    <span>Marketing Manager</span>
                                                </div>
                                                <p>Trying something new is exciting! Thanks for the amazing law course
                                                    and the great teacher who was able to make it interesting.</p>
                                            </div>

                                            <div className="people__button-wrapper">
                                                <button className="form-control people__button">Удалить из друзей
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}

const {data} = window;
const testData = transformRenderedData(data);

ReactDOM.render(
    <MainPage testData={testData}/>,
    document.querySelector('.root')
);