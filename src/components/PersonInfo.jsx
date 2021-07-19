import * as React from 'react';

export class PersonInfo extends React.Component {
    render() {
        const { age, gender, name, city, interests, secondName } = this.props;

        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-6 col-sm-12">
                        <div className="about-info">
                            <figure>
                                <figcaption>
                                    <h3>Имя</h3>
                                    <p>{name}</p>
                                </figcaption>
                            </figure>

                            <figure>
                                <figcaption>
                                    <h3>Фамилия</h3>
                                    <p>{secondName}</p>
                                </figcaption>
                            </figure>

                            <figure>
                                <figcaption>
                                    <h3>Возраст</h3>
                                    <p>{age}</p>
                                </figcaption>
                            </figure>

                            <figure>
                                <figcaption>
                                    <h3>Пол</h3>
                                    <p>{gender}</p>
                                </figcaption>
                            </figure>

                            <figure>
                                <figcaption>
                                    <h3>Интересы</h3>
                                    <p>{interests}</p>
                                </figcaption>
                            </figure>

                            <figure>
                                <figcaption>
                                    <h3>Город</h3>
                                    <p>{city}</p>
                                </figcaption>
                            </figure>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}