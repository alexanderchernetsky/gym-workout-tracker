function getErrorMessage(isCreateError: boolean, isEditError: boolean, isFetchError: boolean): string {
    switch (true) {
        case isCreateError:
            return 'New progress item upload failed. Please try again.';
        case isEditError:
            return 'Failed to edit progress item. Please try again.';
        case isFetchError:
            return 'Failed to fetch progress item. Please try again.';
        default:
            return 'Something went wrong!';
    }
}

export default getErrorMessage;
