import * as ReactDOM from 'react-dom';

export function renderPage(page) {
    ReactDOM.render(
        page,
        document.querySelector('.root')
    );
}