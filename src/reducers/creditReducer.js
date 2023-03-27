const reducer = (state, action) => {
    switch (action.type) {
        case 'SETUP_INITIALS':
            const { id: _, ...credits } = action.payload;
            const allTypes = Object.keys(credits).map((key) => ({
                name: key === 'guest_stars' ? 'guests' : key,
                value: key,
            }));
            return {
                ...state,
                credits,
                allTypes,
                type: allTypes[0].value,
                allDepartments: [
                    ...new Set([
                        ...state.allDepartments,
                        ...credits.crew.map(({ department }) => department).sort(),
                    ]),
                ],
            };
        case 'UPDATE_TYPE':
            return { ...state, type: state.allTypes[action.payload].value };
        case 'UPDATE_DEPARTMENT':
            return { ...state, department: action.payload };
        case 'FILTER_ITEMS':
            let items = state.credits[state.type];
            if (state.type === 'crew' && state.department) {
                items = items.filter(({ department: dep }) => dep === state.department);
            }
            return {
                ...state,
                items,
                paginatedItems: items.slice(0, state.itemsPerPage),
                page: 0,
                pageCount: Math.ceil(items.length / state.itemsPerPage),
            };
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
