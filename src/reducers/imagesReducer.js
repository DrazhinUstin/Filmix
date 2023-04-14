const reducer = (state, action) => {
    switch (action.type) {
        case 'SET_INITIAL':
            const { id: _, ...images } = action.payload;
            const allTypes = Object.keys(images).filter((key) => images[key].length);
            return { ...state, allTypes, type: allTypes[0], images };
        case 'SWITCH_TYPE':
            return { ...state, type: action.payload };
        default:
            throw Error(`Unknown action: ${action.type}`);
    }
};

export default reducer;
