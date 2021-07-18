import * as React from 'react';
import { AppHOC } from '../components/AppHOC';
import { PeopleList } from '../components/PeopleList';
import { renderPage } from '../utils/renderPage';

class FriendsPage extends React.Component {
    render() {
        return (
            <div>
                <div className="container">
                    <h2>Мои друзья:</h2>
                </div>
                <PeopleList />
            </div>
        )
    }
}

const FriendsPageApp = AppHOC(FriendsPage, { isAuthenticated: true });

renderPage(<FriendsPageApp />);