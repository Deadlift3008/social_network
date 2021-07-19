import * as React from 'react';
import { AppHOC } from '../components/AppHOC';
import { renderPage } from '../utils/renderPage';
import { PeopleList, LIST_TYPE } from '../components/PeopleList';
import { getRenderedData } from '../utils/get-rendered-data';

class FriendRequestsPage extends React.Component {
    render() {
        const { incomingRequests, outgoingRequests } = this.props;

        return (
            <div>
                <div className="container">
                    <h2>Входящие заявки:</h2>
                </div>
                <PeopleList
                    list={incomingRequests}
                    listType={LIST_TYPE.FRIENDS_REQUESTS_INCOMING}
                />
                <div className="container">
                    <h2>Исходящие заявки:</h2>
                </div>
                <PeopleList
                    list={outgoingRequests}
                    listType={LIST_TYPE.FRIENDS_REQUESTS_OUTGOING}
                />
            </div>
        )
    }
}

const FriendRequestsPageApp = AppHOC(FriendRequestsPage, { isAuthenticated: true });
const { outgoingRequests, incomingRequests } = getRenderedData();

renderPage(<FriendRequestsPageApp outgoingRequests={outgoingRequests} incomingRequests={incomingRequests} />);