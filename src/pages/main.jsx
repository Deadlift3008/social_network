import * as React from 'react';
import { AppHOC } from '../components/AppHOC';
import { PersonInfo } from '../components/PersonInfo';
import { renderPage } from '../utils/renderPage';
import { getRenderedData } from '../utils/get-rendered-data';

class MainPage extends React.Component {
    render() {
        const { user } = this.props;
        const { age, gender, name, city, interests, second_name: secondName } = user;

        return (
            <div>
                <div className="container">
                    <h2>Информация обо мне</h2>
                </div>
                <PersonInfo
                    age={age}
                    gender={gender}
                    name={name}
                    city={city}
                    interests={interests}
                    secondName={secondName}
                />
            </div>
        )
    }
}

const MainPageApp = AppHOC(MainPage, { isAuthenticated: true });
const { user } = getRenderedData();

renderPage(<MainPageApp user={user} />);