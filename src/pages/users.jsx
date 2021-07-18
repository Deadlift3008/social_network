import * as React from 'react';
import { AppHOC } from '../components/AppHOC';
import { PeopleList } from '../components/PeopleList';
import { renderPage } from '../utils/renderPage';

class UsersPage extends React.Component {
    render() {
        return (
            <div>
                <div className="container">
                    <h2>Список пользователей:</h2>
                </div>
                <PeopleList />
            </div>
        )
    }
}

const UsersPageApp = AppHOC(UsersPage, { isAuthenticated: true });

renderPage(<UsersPageApp />);