import { initialState } from '../pages/PersonCredits';
import { dynamicSort } from '../utils/helpers';

const reducer = (state, action) => {
    switch (action.type) {
        case 'SET_CREDITS':
            const credits = [...action.payload.cast, ...action.payload.crew].reduce((acc, item) => {
                if (item.character || item.character === '') {
                    acc.Acting ? acc.Acting.push(item) : (acc.Acting = [item]);
                }
                if (item.department) {
                    acc[item.department]
                        ? acc[item.department].push(item)
                        : (acc[item.department] = [item]);
                }
                return acc;
            }, {});
            return {
                ...state,
                credits,
                filters: { ...state.filters, department: Object.keys(credits)[0] },
            };
        case 'UPDATE_FILTERS':
            return {
                ...state,
                filters: { ...state.filters, [action.payload.name]: action.payload.value },
                offset: 0,
                page: 0,
            };
        case 'CLEAR_FILTERS':
            return {
                ...state,
                filters: { ...initialState.filters, department: Object.keys(state.credits)[0] },
                offset: 0,
                page: 0,
            };
        case 'FILTER_ITEMS':
            let items = state.credits[state.filters.department].sort(
                dynamicSort(state.filters.sort)
            );
            if (state.filters.genre)
                items = items.filter(({ genre_ids }) => genre_ids.includes(+state.filters.genre));
            return { ...state, items, pageCount: Math.ceil(items.length / state.itemsPerPage) };
        case 'SWITCH_PAGE':
            return { ...state, page: action.payload, offset: action.payload * state.itemsPerPage };
        default:
            throw Error(`There is no action with type: ${action.type}`);
    }
};

export default reducer;
