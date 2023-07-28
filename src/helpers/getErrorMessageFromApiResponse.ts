const GENERIC_ERROR_MSG = 'something went wrong';

function getErrorMessage(response: unknown): string {
    let errorFromResponse;

    if (typeof response === 'object') {
        if ('data' in response && typeof response.data === 'object') {
            if ('error' in response.data && typeof response.data.error === 'object') {
                if ('message' in response.data.error && typeof response.data.error.message === 'string') {
                    errorFromResponse = response.data.error.message;
                }
            } else if ('message' in response.data && typeof response.data.message === 'string') {
                errorFromResponse = response.data.message;
            }
        }
    }

    return errorFromResponse || GENERIC_ERROR_MSG;
}

export default getErrorMessage;
