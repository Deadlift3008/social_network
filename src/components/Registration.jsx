import * as React from 'react';

export class Registration extends React.Component {
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-4 col-sm-12">
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

                                <button className="submit-btn form-control">Отправить</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
