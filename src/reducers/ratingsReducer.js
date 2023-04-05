import { initialState } from '../contexts/RatingsContext';

const reducer = (state, action) => {
    switch (action.type) {
        case 'UPDATE_FILTERS':
            return {
                ...state,
                filters: { ...state.filters, [action.payload.name]: action.payload.value },
            };
        case 'CLEAR_FILTERS':
            return { ...state, filters: initialState.filters };
        case 'UPDATE_ORDER':
            return { ...state, order: action.payload };
        default:
            throw Error(`Unknown action: ${action.type}`);
    }
};

export default reducer;
