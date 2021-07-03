import * as React from 'react';

export class PeopleList extends React.Component {
    render() {
        return (
            <section id="testimonial">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 col-sm-12">
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
                </div>
            </section>
        )
    }
}