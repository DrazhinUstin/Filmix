import { initialState } from '../contexts/WatchlistContext';

const reducer = (state, action) => {
    switch (action.type) {
        case 'UPDATE_FILTERS':
            return {
                ...state,
                filters: { ...state.filters, [action.payload.name]: action.payload.value },
            };
        case 'RESTORE_FILTERS':
            return { ...state, filters: initialState.filters };
        default:
            throw Error(`Unknown action: ${action.type}`);
    }
};

export default reducer;
