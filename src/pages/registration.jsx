import * as React from 'react';
import { AppHOC } from '../components/AppHOC';
import { Registration } from '../components/Registration';
import { renderPage } from '../utils/renderPage';

class RegistrationPage extends React.Component {
    render() {
        return (
            <div>
                <div className="container">
                    <h2>Зарегистрироваться:</h2>
                </div>
                <Registration />
            </div>
        )
    }
}

const RegistrationPageApp = AppHOC(RegistrationPage, { isAuthenticated: false });

renderPage(<RegistrationPageApp />);