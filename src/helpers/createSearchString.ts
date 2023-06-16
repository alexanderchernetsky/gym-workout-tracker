interface ICreateSearchStringParams {
    muscle?: string;
    type?: string;
    name?: string;
}

const createSearchString = (params: ICreateSearchStringParams): string => {
    let searchString: string = '';

    Object.entries(params).forEach(item => {
        const [key, value] = item;
        if (value) {
            searchString += `${key}=${value}&`;
        }
    });

    if (searchString.at(-1) === '&') {
        searchString = searchString.slice(0, -1);
    }

    return searchString;
};

export default createSearchString;
