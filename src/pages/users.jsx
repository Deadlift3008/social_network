import * as React from 'react';
import { AppHOC } from '../components/AppHOC';
import { PeopleList, LIST_TYPE } from '../components/PeopleList';
import { Pagination } from '../components/Pagination';
import { renderPage } from '../utils/renderPage';
import { getRenderedData } from '../utils/get-rendered-data';

class UsersPage extends React.Component {
    render() {
        const { users, pageNumber, prevOffsetToShow, nextOffsetToShow } = this.props;

        return (
            <div>
                <div className="container">
                    <h2>Список пользователей:</h2>
                </div>
                <PeopleList list={users} listType={LIST_TYPE.PEOPLE_LIST} />
                <Pagination pageNumber={pageNumber} prevOffset={prevOffsetToShow} nextOffset={nextOffsetToShow} />
            </div>
        )
    }
}

const UsersPageApp = AppHOC(UsersPage, { isAuthenticated: true });
const { users, pageNumber, prevOffsetToShow, nextOffsetToShow } = getRenderedData();
renderPage(
    <UsersPageApp
        users={users}
        pageNumber={pageNumber}
        prevOffsetToShow={prevOffsetToShow}
        nextOffsetToShow={nextOffsetToShow}
    />
);