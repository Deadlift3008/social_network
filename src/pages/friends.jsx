import * as React from 'react';
import { AppHOC } from '../components/AppHOC';
import { PeopleList, LIST_TYPE } from '../components/PeopleList';
import { renderPage } from '../utils/renderPage';
import { getRenderedData } from '../utils/get-rendered-data';

class FriendsPage extends React.Component {
    render() {
        const { friends } = this.props;

        return (
            <div>
                <div className="container">
                    <h2>Мои друзья:</h2>
                </div>
                <PeopleList list={friends} listType={LIST_TYPE.FRIENDS_LIST} />
            </div>
        )
    }
}

const FriendsPageApp = AppHOC(FriendsPage, { isAuthenticated: true });
const { friends } = getRenderedData();

renderPage(<FriendsPageApp friends={friends} />);