import * as React from 'react';
import { AppHOC } from '../components/AppHOC';
import { renderPage } from '../utils/renderPage';
import { PeopleList } from '../components/PeopleList';

class FriendRequestsPage extends React.Component {
    render() {
        return (
            <div>
                <div className="container">
                    <h2>Входящие заявки:</h2>
                </div>
                <PeopleList />
                <div className="container">
                    <h2>Исходящие заявки:</h2>
                </div>
                <PeopleList />
            </div>
        )
    }
}

const FriendRequestsPageApp = AppHOC(FriendRequestsPage);

renderPage(<FriendRequestsPageApp />);