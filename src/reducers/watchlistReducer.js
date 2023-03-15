import { initialState } from '../contexts/WatchlistContext';

const reducer = (state, action) => {
    switch (action.type) {
        case 'SET_GENRES':
            const [movie, tv] = action.payload.map(
                (item) => item?.value?.data?.genres?.map(({ name }) => name) || []
            );
            return { ...state, genres: { movie, tv } };
        case 'SWITCH_MEDIA_TYPE':
            let genre = state.filters.genre;
            if (action.payload) {
                const currentGenres = state.genres[action.payload];
                genre = currentGenres.includes(genre) ? genre : '';
            }
            return {
                ...state,
                media_type: action.payload,
                filters: { ...state.filters, genre },
            };
        case 'UPDATE_FILTERS':
            return {
                ...state,
                filters: { ...state.filters, [action.payload.name]: action.payload.value },
            };
        case 'RESET':
            return { ...initialState, genres: state.genres };
        default:
            throw Error(`Unknown action: ${action.type}`);
    }
};

export default reducer;
