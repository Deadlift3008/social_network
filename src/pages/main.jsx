import * as React from 'react';
import { AppHOC } from '../components/AppHOC';
import { PersonInfo } from '../components/PersonInfo';
import { renderPage } from '../utils/renderPage';

class MainPage extends React.Component {
    render() {
        return (
            <div>
                <div className="container">
                    <h2>Информация обо мне</h2>
                </div>
                <PersonInfo />
            </div>
        )
    }
}

const MainPageApp = AppHOC(MainPage, { isAuthenticated: true });

renderPage(<MainPageApp />);