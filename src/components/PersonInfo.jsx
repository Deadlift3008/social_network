import * as React from 'react';

export class PersonInfo extends React.Component {
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-6 col-sm-12">
                        <div className="about-info">
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
                </div>
            </div>
        )
    }
}