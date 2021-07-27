import * as React from 'react';
import { createUsersLink } from '../utils/createUsersLink';

export class Pagination extends React.Component {
    render() {
        const { pageNumber, prevOffset, nextOffset } = this.props;

        const leftSign = '<';
        const rightSign = '>';

        return (
            <div className="pagination-block">
                {Number.isInteger(prevOffset) ? (
                    <a href={createUsersLink({ offset: prevOffset })} className="pagination__link">
                        <div className="pagination-block__item">
                            <i className="pagination-block__angle">{leftSign}</i>
                        </div>
                    </a>
                ) : null}
                <div className="pagination-block__item pagination-block__page-number">{pageNumber}</div>
                {Number.isInteger(nextOffset) ? (
                    <a href={createUsersLink({ offset: nextOffset })} className="pagination__link">
                        <div className="pagination-block__item">
                            <i className="pagination-block__angle">{rightSign}</i>
                        </div>
                    </a>
                ) : null}
            </div>
        )
    }
}
