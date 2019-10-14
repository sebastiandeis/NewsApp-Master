import * as MENU from '../constants/menu';
import * as CATEGORY from '../constants/category';

export const conf_categories = [
    { 
        value: CATEGORY.NEWS_ALL, 
        label: 'All', 
        summary: '',
        image: 'west_europe.png', 
        type: MENU.NEWS, 
        selected: true 
    },
    { 
        value: CATEGORY.ANGLOSPHERE, 
        label: 'US/UK/Can/Australia', 
        summary: 'News from the Anglosphere, wtih some translated papers from Quebec',
        image: 'anglosphere.png', 
        type: MENU.NEWS, 
        selected: true 
    },
    { 
        value: CATEGORY.GREATERCHINA, 
        label: 'Greater China', 
        summary: 'News from the People’s Republic, Taiwan, Hong Kong, Singapore',
        image: 'greater_china.png', 
        type: MENU.NEWS, 
        selected: true 
    },
    { 
        value: CATEGORY.WESTEUROPE, 
        label: 'West Europe', 
        summary: 'Translated news from Germany, Sweden, France and Spain',
        image: 'west_europe.png', 
        type: MENU.NEWS, 
        selected: true 
    },
    { 
        value: CATEGORY.EASTEUROPE, 
        label: 'East Europe', 
        summary: 'Translated news from Germany, Russia, Serbia and Romania',
        image: 'west_europe.png', 
        type: MENU.NEWS, 
        selected: true 
    },
    { 
        value: CATEGORY.RUSSIA, 
        label: 'Russia', 
        summary: 'Translated news from Russia',
        image: 'greater_china.png', 
        type: MENU.NEWS, 
        selected: true 
    },
    { 
        value: CATEGORY.LATINAMERICA, 
        label: 'Latin America', 
        summary: 'Translated news from Latin America',
        image: 'greater_china.png', 
        type: MENU.NEWS, 
        selected: true 
    },
    { 
        value: CATEGORY.MIDDLEEAST, 
        label: 'Middle East', 
        summary: 'Translated news from Middle East',
        image: 'localnews.png', 
        type: MENU.NEWS, 
        selected: true 
    },
    { 
        value: CATEGORY.EASTASIA, 
        label: 'East Asia', 
        summary: 'Translated news from East Asia',
        image: 'west_europe.png', 
        type: MENU.NEWS, 
        selected: true 
    },
    { 
        value: CATEGORY.SOUTHEASTASIA, 
        label: 'Southeast Asia', 
        summary: 'Translated news from Southeast Asia',
        image: 'west_europe.png', 
        type: MENU.NEWS, 
        selected: true 
    },
    { 
        value: CATEGORY.SOUTHASIA, 
        label: 'South Asia', 
        summary: 'Translated news from South Asia',
        image: 'west_europe.png', 
        type: MENU.NEWS, 
        selected: true 
    },
    { 
        value: CATEGORY.AFRICA, 
        label: 'Africa', 
        summary: 'Translated news from Africa',
        image: 'west_europe.png', 
        type: MENU.NEWS, 
        selected: true 
    },
    // --- Social Reddit --- //
    { 
        value: CATEGORY.REDDIT_ALL, 
        label: 'All', 
        summary: 'Translated news from All',
        image: 'west_europe.png', 
        type: MENU.REDDIT, 
        selected: true 
    },
    { 
        value: CATEGORY.RDISCUSSION, 
        label: 'Discussion', 
        summary: 'Translated news from Discussion',
        image: 'localnews.png', 
        type: MENU.REDDIT, 
        selected: true 
    },
    { 
        value: CATEGORY.RSCIENCE, 
        label: 'Science', 
        summary: 'Translated news from Science',
        image: 'west_europe.png', 
        type: MENU.REDDIT, 
        selected: true 
    },
    { 
        value: CATEGORY.RLEARNING, 
        label: 'Learning', 
        summary: 'Translated news from Learning',
        image: 'localnews.png', 
        type: MENU.REDDIT, 
        selected: true 
    },
    { 
        value: CATEGORY.RLIFESTYLE, 
        label: 'Lifestyle', 
        summary: 'Translated news from Learning',
        image: 'west_europe.png', 
        type: MENU.REDDIT, 
        selected: true 
    },
    { 
        value: CATEGORY.RHEALTH, 
        label: 'Health', 
        summary: 'Translated news from Learning',
        image: 'localnews.png', 
        type: MENU.REDDIT, 
        selected: true 
    },
    { 
        value: CATEGORY.RPLACES, 
        label: 'Places', 
        summary: 'Translated news from Learning',
        image: 'west_europe.png', 
        type: MENU.REDDIT, 
        selected: true 
    },
    { 
        value: CATEGORY.RSHORTSTORIES, 
        label: 'Short Stories', 
        summary: 'Translated news from Learning',
        image: 'localnews.png', 
        type: MENU.REDDIT, 
        selected: true 
    }
];
