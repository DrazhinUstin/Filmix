import { initialState } from '../pages/Videos';
import { dynamicSort } from '../utils/helpers';

const reducer = (state, action) => {
    switch (action.type) {
        case 'SET_INITIAL':
            const { types, sizes, sites } = action.payload.reduce(
                (acc, { type, size, site }) => {
                    acc.types.push(type);
                    acc.sizes.push(size);
                    acc.sites.push(site);
                    return acc;
                },
                { types: [], sizes: [], sites: [] }
            );
            return {
                ...state,
                data: action.payload,
                allTypes: [...new Set([...state.allTypes, ...types.sort()])],
                allSizes: [...new Set([...state.allSizes, ...sizes.sort((a, b) => a - b)])],
                allSites: [...new Set([...state.allSites, ...sites.sort()])],
            };
        case 'SORT_DATA':
            return { ...state, data: state.data.sort(dynamicSort(state.sort)) };
        case 'UPDATE_SORT':
            return { ...state, sort: action.payload };
        case 'UPDATE_FILTERS':
            return {
                ...state,
                filters: { ...state.filters, [action.payload.name]: action.payload.value },
            };
        case 'FILTER_ITEMS':
            let items = state.data;
            if (state.filters.type) items = items.filter(({ type }) => type === state.filters.type);
            if (state.filters.size)
                items = items.filter(({ size }) => size === +state.filters.size);
            if (state.filters.site) items = items.filter(({ site }) => site === state.filters.site);
            return {
                ...state,
                items,
                page: 0,
                paginatedItems: items.slice(0, state.itemsPerPage),
                pageCount: Math.ceil(items.length / state.itemsPerPage),
            };
        case 'CLEAR_FILTERS':
            return { ...state, filters: initialState.filters };
        case 'SWITCH_PAGE':
            return {
                ...state,
                page: action.payload,
                paginatedItems: state.items.slice(
                    action.payload * state.itemsPerPage,
                    action.payload * state.itemsPerPage + state.itemsPerPage
                ),
            };
        default:
            throw Error(`Unknown action: ${action.type}`);
    }
};

export default reducer;
