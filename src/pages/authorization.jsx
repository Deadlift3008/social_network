import * as React from 'react';
import { AppHOC } from '../components/AppHOC';
import { Authorization } from '../components/Authorization';
import { renderPage } from '../utils/renderPage';

class AuthorizationPage extends React.Component {
    render() {
        return (
            <div>
                <div className="container">
                    <h2>Войти в свою учетную запись:</h2>
                </div>
                <Authorization />
            </div>
        )
    }
}

const AuthorizationPageApp = AppHOC(AuthorizationPage);

renderPage(<AuthorizationPageApp />);