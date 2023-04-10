const reducer = (state, action) => {
    switch (action.type) {
        case 'SET_USER':
            return { ...state, user: action.payload };
        case 'TOGGLE_SEARCH':
            return { ...state, isSearchEnabled: !state.isSearchEnabled };
        case 'UPDATE_RECENTLY_VIEWED':
            const recent = { ...action.payload, media_type: action.payload.title ? 'movie' : 'tv' };
            const recentlyViewed = [
                recent,
                ...state.recentlyViewed.filter(
                    ({ id, media_type }) => media_type !== recent.media_type || id !== recent.id
                ),
            ].slice(0, 20);
            localStorage.setItem('recently_viewed', JSON.stringify(recentlyViewed));
            return { ...state, recentlyViewed };
        case 'CLEAR_RECENTLY_VIEWED':
            localStorage.removeItem('recently_viewed');
            return { ...state, recentlyViewed: [] };
        default:
            throw Error(`Unknown action: ${action.type}`);
    }
};

export default reducer;
