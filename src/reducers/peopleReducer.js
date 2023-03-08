const reducer = (state, action) => {
    switch (action.type) {
        case 'UPDATE_QUERY':
            return { ...state, query: action.payload, page: 1 };
        case 'SWITCH_PAGE':
            return { ...state, page: action.payload };
        default:
            throw Error(`Unknown action: ${action.type}`);
    }
};

export default reducer;
