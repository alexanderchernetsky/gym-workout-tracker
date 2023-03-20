import {progressItems} from "../data/progressItems";

const api = {
    fetchProgressItems: () => {
        return new Promise(resolve => {
            resolve(progressItems);
        })
    }
}

export default api;
