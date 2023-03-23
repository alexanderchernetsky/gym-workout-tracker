import {progressItems} from '../mock-data/progressItems';
import {ICredentials, IUserInfo} from '../features/login/authSlice';

// todo: replace with real API calls using axios, add error handling
const api = {
    fetchProgressItems: () => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(progressItems);
                // reject();
            }, 2000);
        });
    },

    deleteProgressItem: (id: number): Promise<{success: boolean}> => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve({
                    success: true
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
