export const navbarLinks = [
    {
        id: 1,
        path: '/',
        title: 'home',
    },
    {
        id: 2,
        path: '/movies',
        title: 'movies',
    },
    {
        id: 3,
        path: '/tv',
        title: 'TV shows',
    },
    {
        id: 4,
        path: '/people',
        title: 'people',
    },
    {
        id: 5,
        path: '/about',
        title: 'about',
    },
    {
        id: 6,
        path: '/watchlist',
        title: 'watchlist',
        isAuthRequired: true,
    },
    {
        id: 7,
        path: '/ratings',
        title: 'rated',
        isAuthRequired: true,
    },
];

export const profilePageLinks = [
    {
        id: 1,
        path: '/profile',
        title: 'view profile',
    },
    {
        id: 2,
        path: 'edit_profile',
        title: 'edit profile',
    },
    {
        id: 3,
        path: 'update_email',
        title: 'update email',
    },
    {
        id: 4,
        path: 'update_password',
        title: 'update password',
    },
    {
        id: 5,
        path: 'watchlist',
        title: 'watchlist',
    },
];

export const sortOptions = {
    movie: [
        {
            id: 1,
            value: '-release_date',
            name: 'Release date (desc)',
        },
        {
            id: 2,
            value: 'release_date',
            name: 'Release date (asc)',
        },
        {
            id: 3,
            value: '-title',
            name: 'Title (desc)',
        },
        {
            id: 4,
            value: 'title',
            name: 'Title (asc)',
        },
        {
            id: 5,
            value: '-popularity',
            name: 'Popularity (desc)',
        },
        {
            id: 6,
            value: 'popularity',
            name: 'Popularity (asc)',
        },
    ],
    tv: [
        {
            id: 1,
            value: '-first_air_date',
            name: 'First air date (desc)',
        },
        {
            id: 2,
            value: 'first_air_date',
            name: 'First air date (asc)',
        },
        {
            id: 3,
            value: '-name',
            name: 'Name (desc)',
        },
        {
            id: 4,
            value: 'name',
            name: 'Name (asc)',
        },
        {
            id: 5,
            value: '-popularity',
            name: 'Popularity (desc)',
        },
        {
            id: 6,
            value: 'popularity',
            name: 'Popularity (asc)',
        },
    ],
    seasons: [
        {
            id: 1,
            name: 'Season number (asc)',
            value: 'season_number',
        },
        {
            id: 2,
            name: 'Season number (desc)',
            value: '-season_number',
        },
        {
            id: 3,
            name: 'Air date (asc)',
            value: 'air_date',
        },
        {
            id: 4,
            name: 'Air date (desc)',
            value: '-air_date',
        },
    ],
    episodes: [
        {
            id: 1,
            name: 'Episode number (asc)',
            value: 'episode_number',
        },
        {
            id: 2,
            name: 'Episode number (desc)',
            value: '-episode_number',
        },
        {
            id: 3,
            name: 'Air date (asc)',
            value: 'air_date',
        },
        {
            id: 4,
            name: 'Air date (desc)',
            value: '-air_date',
        },
    ],
    videos: [
        {
            id: 1,
            name: 'Published at (asc)',
            value: 'published_at',
        },
        {
            id: 2,
            name: 'Published at (desc)',
            value: '-published_at',
        },
    ],
};

export const tmdbSortOptions = [
    {
        id: 1,
        value: 'popularity.desc',
        name: 'Popularity (desc)',
    },
    {
        id: 2,
        value: 'popularity.asc',
        name: 'Popularity (asc)',
    },
    {
        id: 3,
        value: 'revenue.desc',
        name: 'Revenue (desc)',
    },
    {
        id: 4,
        value: 'revenue.asc',
        name: 'Revenue (asc)',
    },
    {
        id: 5,
        value: 'primary_release_date.desc',
        name: 'Release date (desc)',
    },
    {
        id: 6,
        value: 'primary_release_date.asc',
        name: 'Release date (asc)',
    },
    {
        id: 7,
        value: 'original_title.desc',
        name: 'Original title (desc)',
    },
    {
        id: 8,
        value: 'original_title.asc',
        name: 'Original title (asc)',
    },
];

export const tmdbTVSortOptions = [
    {
        id: 1,
        value: 'popularity.desc',
        name: 'Popularity (desc)',
    },
    {
        id: 2,
        value: 'popularity.asc',
        name: 'Popularity (asc)',
    },
    {
        id: 3,
        value: 'first_air_date.desc',
        name: 'First air date (desc)',
    },
    {
        id: 4,
        value: 'first_air_date.asc',
        name: 'First air date (asc)',
    },
];

export const tmdbTVStatusOptions = [
    {
        id: 1,
        value: '',
        name: 'All',
    },
    {
        id: 2,
        value: 0,
        name: 'Returning series',
    },
    {
        id: 3,
        value: 1,
        name: 'Planned',
    },
    {
        id: 4,
        value: 2,
        name: 'In production',
    },
    {
        id: 5,
        value: 3,
        name: 'Ended',
    },
    {
        id: 6,
        value: 4,
        name: 'Cancelled',
    },
    {
        id: 7,
        value: 5,
        name: 'Pilot',
    },
];

export const tmdbRuntimeOptions = [
    {
        id: 1,
        value: '',
        name: 'All',
    },
    {
        id: 2,
        value: { gte: 1, lte: 30 },
        name: '0min - 30min',
    },
    {
        id: 3,
        value: { gte: 30, lte: 60 },
        name: '30min - 60min',
    },
    {
        id: 4,
        value: { gte: 60, lte: 90 },
        name: '60min - 90min',
    },
    {
        id: 5,
        value: { gte: 90, lte: 120 },
        name: '90min - 120min',
    },
    {
        id: 6,
        value: { gte: 120, lte: 150 },
        name: '120min - 150min',
    },
    {
        id: 7,
        value: { gte: 150, lte: 180 },
        name: '150min - 180min',
    },
];

export const tmdbSearchOptions = [
    {
        id: 1,
        value: 'multi',
        name: 'all',
    },
    {
        id: 2,
        value: 'movie',
        name: 'movies',
    },
    {
        id: 3,
        value: 'tv',
        name: 'TV',
    },
    {
        id: 4,
        value: 'person',
        name: 'people',
    },
];

export const watchlistMediaTypeOptions = [
    {
        id: 1,
        value: '',
        name: 'All',
    },
    {
        id: 2,
        value: 'movie',
        name: 'Movie',
    },
    {
        id: 3,
        value: 'tv',
        name: 'TV Show',
    },
];

export const watchlistOrderOptions = [
    {
        id: 1,
        value: ['timestamp', 'desc'],
        name: 'Time of addition (desc)',
    },
    {
        id: 2,
        value: ['timestamp'],
        name: 'Time of addition (asc)',
    },
    {
        id: 3,
        value: ['title', 'desc'],
        name: 'Title (desc)',
    },
    {
        id: 4,
        value: ['title'],
        name: 'Title (asc)',
    },
    {
        id: 5,
        value: ['release_date', 'desc'],
        name: 'Release date (desc)',
    },
    {
        id: 6,
        value: ['release_date'],
        name: 'Release date (asc)',
    },
];

export const watchlistLimitOptions = [5, 10, 15, 20, 25];

export const ratingsOrderOptions = [
    {
        id: 1,
        value: ['timestamp', 'desc'],
        name: 'Date rated (desc)',
    },
    {
        id: 2,
        value: ['timestamp'],
        name: 'Date rated (asc)',
    },
    {
        id: 3,
        value: ['rating', 'desc'],
        name: 'Rating (desc)',
    },
    {
        id: 4,
        value: ['rating'],
        name: 'Rating (asc)',
    },
];

export const faqList = [
    {
        id: 1,
        title: 'Where does your data come from?',
        content:
            'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quo eligendi obcaecati provident. Reprehenderit, nesciunt laudantium pariatur saepe quas sapiente sequi at culpa. Blanditiis numquam deleniti repudiandae non, autem odio quibusdam.',
    },
    {
        id: 2,
        title: 'How can I use the data?',
        content:
            'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quo eligendi obcaecati provident. Reprehenderit, nesciunt laudantium pariatur saepe quas sapiente sequi at culpa. Blanditiis numquam deleniti repudiandae non, autem odio quibusdam.',
    },
    {
        id: 3,
        title: 'How many movies are on FILMIX?',
        content:
            'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quo eligendi obcaecati provident. Reprehenderit, nesciunt laudantium pariatur saepe quas sapiente sequi at culpa. Blanditiis numquam deleniti repudiandae non, autem odio quibusdam.',
    },
    {
        id: 4,
        title: "Why can't I find what I am looking for?",
        content:
            'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quo eligendi obcaecati provident. Reprehenderit, nesciunt laudantium pariatur saepe quas sapiente sequi at culpa. Blanditiis numquam deleniti repudiandae non, autem odio quibusdam.',
    },
    {
        id: 5,
        title: 'Can I watch videos on FILMIX?',
        content:
            'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quo eligendi obcaecati provident. Reprehenderit, nesciunt laudantium pariatur saepe quas sapiente sequi at culpa. Blanditiis numquam deleniti repudiandae non, autem odio quibusdam.',
    },
    {
        id: 6,
        title: 'Where do I signup?',
        content:
            'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quo eligendi obcaecati provident. Reprehenderit, nesciunt laudantium pariatur saepe quas sapiente sequi at culpa. Blanditiis numquam deleniti repudiandae non, autem odio quibusdam.',
    },
    {
        id: 7,
        title: 'What are the benefits of singing up?',
        content:
            'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quo eligendi obcaecati provident. Reprehenderit, nesciunt laudantium pariatur saepe quas sapiente sequi at culpa. Blanditiis numquam deleniti repudiandae non, autem odio quibusdam.',
    },
];
