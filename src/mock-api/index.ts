import {IProgressItem} from '../features/progress/progressSlice';

// todo: replace with real API calls using RTK Query
const api = {
    deleteProgressItem: (id: string): Promise<{success: boolean}> => {
        const existingItems: IProgressItem[] | null = JSON.parse(localStorage.getItem('progressItems'));
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
    }
};

export default api;
