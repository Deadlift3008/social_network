import * as React from 'react';

export class Authorization extends React.Component {
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-4 col-sm-12">
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
        )
    }
}