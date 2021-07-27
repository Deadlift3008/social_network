import * as React from 'react';
import * as queryString from 'query-string';
import { createUsersLink } from '../utils/createUsersLink';

export class UsersFilterForm extends React.Component {
    constructor(props) {
        super(props);

        const { name = '', secondName = '' } = queryString.parse(window.location.search);

        this.state = {
            name,
            secondName
        }
    }

    handleInput = (field) => (e) => {
        this.setState({
            [field]: e.target.value,
        });
    }

    render() {
        const { name, secondName } = this.state;
        const link = createUsersLink({
            name,
            secondName
        });

        return (
            <div className="container">
                <div className="search-form">
                    <h2>Поиск</h2>
                    <div className="search-inputs">
                        <input
                            type="text"
                            name="name"
                            className="form-control search-input"
                            placeholder="Имя"
                            onChange={this.handleInput('name')}
                            value={name}
                        />

                        <input
                            type="text"
                            name="secondName"
                            className="form-control search-input"
                            placeholder="Фамилия"
                            onChange={this.handleInput('secondName')}
                            value={secondName}
                        />
                    </div>
                    <a href={link}>
                        <button type="button" className="submit-btn form-control search-button">Найти</button>
                    </a>
                </div>
            </div>
        )
    }
}