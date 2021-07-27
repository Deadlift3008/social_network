import * as queryString from 'query-string';

export const createUsersLink = (queryParams) => {
    let link = '/users';

    const currentSearchParams = queryString.parse(window.location.search);
    delete currentSearchParams.offset;

    const searchParams = {
        ...currentSearchParams,
        ...queryParams,
    };

    if (Object.values(searchParams).some(Boolean)) {
        link += '?' + queryString.stringify(searchParams, {
            skipEmptyString: true
        });
    }

    return link;
}