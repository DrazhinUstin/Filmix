import { initialState } from '../components/PersonCredits';
import { sortOptions } from '../utils/localData';
import { dynamicSort } from '../utils/helpers';

const reducer = (state, action) => {
    switch (action.type) {
        case 'SET_CREDITS':
            const credits = [...action.payload.cast, ...action.payload.crew].reduce((acc, item) => {
                if (!acc[item.media_type]) acc[item.media_type] = {};
                if (item.character || item.character === '') {
                    acc[item.media_type].Acting
                        ? acc[item.media_type].Acting.push(item)
                        : (acc[item.media_type].Acting = [item]);
                }
                if (item.department) {
                    acc[item.media_type][item.department]
                        ? acc[item.media_type][item.department].push(item)
                        : (acc[item.media_type][item.department] = [item]);
                }
                return acc;
            }, {});
            const media_type = Object.keys(credits)[0];
            return {
                ...state,
                credits,
                media_type,
                filters: {
                    ...state.filters,
                    department: Object.keys(credits[media_type] || {})[0],
                },
                sort: sortOptions[media_type]?.[0].value,
            };
        case 'SWITCH_MEDIA_TYPE':
            return {
                ...state,
                media_type: action.payload,
                filters: {
                    ...initialState.filters,
                    department: Object.keys(state.credits[action.payload])[0],
                },
                sort: sortOptions[action.payload][0].value,
            };
        case 'UPDATE_FILTERS':
            return {
                ...state,
                filters: { ...state.filters, [action.payload.name]: action.payload.value },
            };
        case 'UPDATE_SORT':
            return { ...state, sort: action.payload };
        case 'FILTER_ITEMS':
            let items = state.credits[state.media_type][state.filters.department].sort(
                dynamicSort(state.sort)
            );
            if (state.filters.genre)
                items = items.filter(({ genre_ids }) => genre_ids.includes(+state.filters.genre));
            return {
                ...state,
                items,
                offset: 0,
                page: 0,
                pageCount: Math.ceil(items.length / state.itemsPerPage),
            };
        case 'SWITCH_PAGE':
            return { ...state, page: action.payload, offset: action.payload * state.itemsPerPage };
        case 'RESET':
            return {
                ...state,
                filters: {
                    ...initialState.filters,
                    department: Object.keys(state.credits[state.media_type])[0],
                },
            };
        default:
            throw Error(`There is no action with type: ${action.type}`);
    }
};

export default reducer;
