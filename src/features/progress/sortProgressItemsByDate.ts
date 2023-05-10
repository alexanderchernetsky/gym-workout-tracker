import {IProgressItem} from './progressSlice';

function sortProgressItemsByDate(items: IProgressItem[]) {
    if (!items) {
        return [];
    }

    return [...items].sort((a, b) => {
        const date2 = Date.parse(b.date);
        const date1 = Date.parse(a.date);

        return date2 - date1;
    });
}

export default sortProgressItemsByDate;
