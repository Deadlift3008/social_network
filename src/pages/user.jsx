import * as React from 'react';
import { AppHOC } from '../components/AppHOC';
import { PersonInfo } from '../components/PersonInfo';
import { renderPage } from '../utils/renderPage';

class UserPage extends React.Component {
    render() {
        return (
            <div>
                <div className="container">
                    <h2>Информация о пользователе:</h2>
                </div>
                <PersonInfo />
            </div>
        )
    }
}

const UserPageApp = AppHOC(UserPage);

renderPage(<UserPageApp />);