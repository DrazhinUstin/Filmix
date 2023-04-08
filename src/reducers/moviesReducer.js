import { initialState } from '../contexts/MoviesContext';

const reducer = (state, action) => {
    switch (action.type) {
        case 'UPDATE_FILTERS':
            return {
                ...state,
                filters: { ...state.filters, [action.payload.name]: action.payload.value },
                page: 0,
            };
        case 'RESTORE_FILTERS':
            return { ...state, filters: initialState.filters, page: 0 };
        case 'UPDATE_SORT':
            return { ...state, sort: action.payload, page: 0 };
        case 'SWITCH_PAGE':
            return { ...state, page: action.payload };
        default:
            throw Error(`Unknown action: ${action.type}`);
    }
};

export default reducer;
