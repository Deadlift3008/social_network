import * as React from 'react';
import axios from 'axios';

export const LIST_TYPE = {
    PEOPLE_LIST: 'PEOPLE_LIST',
    FRIENDS_LIST: 'FRIENDS_LIST',
    FRIENDS_REQUESTS_INCOMING: 'FRIENDS_REQUESTS_INCOMING',
    FRIENDS_REQUESTS_OUTGOING: 'FRIENDS_REQUESTS_OUTGOING',
}

const PeopleListRightField = ({ id, isFriend, sendRequest, alreadyRequested }) => (
    alreadyRequested ? 'Запрос уже отправлен' : (
        isFriend ?
            'Уже в друзьях' :
            <button
                type="button"
                className="form-control people__button"
                onClick={() => sendRequest(id)}
            >
                Подружиться
            </button>
    )
);

const FriendsListRightField = () => (<div/>);

const FriendsRequestsIncomingRightField = ({ id, approve, reject }) => (
    <React.Fragment>
        <button className="form-control people__button" onClick={() => approve(id)}>Принять</button>
        <button className="form-control people__button" onClick={() => reject(id)}>Отклонить</button>
    </React.Fragment>
);

const FriendsRequestsOutgoingRightField = () => (
    <div>Ожидает подтверждения</div>
)

const listTypeConfig = {
    [LIST_TYPE.PEOPLE_LIST]: PeopleListRightField,
    [LIST_TYPE.FRIENDS_LIST]: FriendsListRightField,
    [LIST_TYPE.FRIENDS_REQUESTS_INCOMING]: FriendsRequestsIncomingRightField,
    [LIST_TYPE.FRIENDS_REQUESTS_OUTGOING]: FriendsRequestsOutgoingRightField,
};

export class PeopleList extends React.Component {
    renderItem({ user_id, name, second_name: secondName, city, isFriend, alreadyRequested }) {
        const { listType } = this.props;

        const params = {
            id: user_id,
            approve: this.approve,
            reject: this.reject,
            sendRequest: this.sendRequest,
            alreadyRequested,
            isFriend
        }

        const RightFieldComponent = listTypeConfig[listType];

        const href = `/user/${params.id}`;

        return (
            <div key={params.id} className="people__item">
                <div className="item">
                    <div className="tst-author">
                        <h4>{name}</h4>
                        <span>{secondName}</span>
                    </div>
                    <p>{city}</p>

                </div>

                <div className="people__button-wrapper">
                    <RightFieldComponent {...params} />
                    <a href={href}>
                        <button
                            className="form-control people__button"
                            style={{marginTop: '5px'}}
                        >
                            Перейти на профиль
                        </button>
                    </a>
                </div>
            </div>
        )
    }

    approve = (userId) => {
        axios.post('/api/approve-friend-request', {
            userId
        }).then(res => {
            const { data } = res;
            if (data.status === 'ok') {
                alert('Запрос успешно подтвержден!');
                window.location.reload();

                return;
            }

            alert(data.message || 'Произошла неизвестная ошибка');
        }).catch(() => {
            alert('Произошла ошибка сервера')
        });
    }

    reject = (userId) => {
        axios.post('/api/reject-friend-request', {
            userId
        }).then(res => {
            const { data } = res;
            if (data.status === 'ok') {
                alert('Запрос успешно отклонен!');
                window.location.reload();

                return;
            }

            alert(data.message || 'Произошла неизвестная ошибка');
        }).catch(() => {
            alert('Произошла ошибка сервера')
        });
    }

    sendRequest = (userId) => {
        axios.post('/api/friend-request', {
            userId
        }).then(res => {
            const { data } = res;
            if (data.status === 'ok') {
                alert('Запрос успешно отправлен!');
                window.location.reload();

                return;
            }

            alert(data.message || 'Произошла неизвестная ошибка');
        }).catch(() => {
            alert('Произошла ошибка сервера')
        });
    }

    render() {
        const { list = [] } = this.props;

        return (
            <section id="testimonial">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 col-sm-12">
                            <div className="people">
                                {list.length === 0 ?
                                    'Список пуст' :
                                    list.map((props) => {
                                        return this.renderItem(props);
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}