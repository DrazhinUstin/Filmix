import { initialState } from '../contexts/TVShowsContext';

const reducer = (state, action) => {
    switch (action.type) {
        case 'UPDATE_FILTERS':
            return {
                ...state,
                filters: { ...state.filters, [action.payload.name]: action.payload.value },
                page: 1,
            };
        case 'CLEAR_FILTERS':
            return { ...state, filters: initialState.filters, page: 1 };
        case 'SWITCH_PAGE':
            return { ...state, page: action.payload };
        default:
            throw Error(`Unknown action: ${action.type}`);
    }
};

export default reducer;
