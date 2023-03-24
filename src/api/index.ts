import {progressItems} from '../mock-data/progressItems';
import {ICredentials, IUserInfo} from '../features/login/authSlice';
import {IProgressItem} from '../features/progress/progressSlice';

// todo: replace with real API calls using axios, add error handling
const api = {
    fetchProgressItems: () => {
        return new Promise((resolve, reject) => {
            const existingItems = JSON.parse(localStorage.getItem('progressItems'));

            setTimeout(() => {
                resolve(existingItems.length ? existingItems : progressItems);
                // reject();
            }, 2000);
        });
    },

    deleteProgressItem: (id: string): Promise<{success: boolean}> => {
        const existingItems: IProgressItem[] = JSON.parse(localStorage.getItem('progressItems'));
        const updatedItems = existingItems.filter(item => item.id !== id);
        localStorage.setItem('progressItems', JSON.stringify(updatedItems));

        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve({
                    success: true
                });
                // reject();
            }, 2000);
        });
    },

    addNewProgressItem: (data: IProgressItem): Promise<{success: boolean; data: IProgressItem}> => {
        return new Promise(async (resolve, reject) => {
            const existingItems = JSON.parse(localStorage.getItem('progressItems'));
            localStorage.setItem('progressItems', JSON.stringify([...(existingItems || []), data]));

            setTimeout(() => {
                resolve({
                    success: true,
                    data
                });
                // reject();
            }, 2000);
        });
    },

    login: (credentials: ICredentials): Promise<{success: boolean; user: IUserInfo}> => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve({
                    success: true,
                    user: {
                        name: 'Alex',
                        id: '12345-678910'
                    }
                });
                // reject();
            }, 2000);
        });
    }
};

export default api;
