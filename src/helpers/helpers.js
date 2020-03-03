export const getLang = () => localStorage.getItem('lang');

export const GOOGLE_API_KEY = 'AIzaSyCdOy4EnB7x-v40GF_uQ59logxM1BRJLvo';

export const MOBILE = 415;
export const TABLETS = 768;
export const TABLET_END = 1024;

export const URLS = {
    business_center: 'БИЗНЕС ЦЕНТРЫ',
    shopping_center: 'ТОРГОВЫЕ ЦЕНТРЫ',
    commerce: 'КОММЕРЦИЯ',
    Secondary: 'ВТОРИЧНАЯ',
    living_complex: 'ЖИЛЫЕ КОМПЛЕКСЫ',
};


export const categories = {
    ru: {
        business_center: 'БИЗНЕС ЦЕНТРЫ',
        shopping_center: 'ТОРГОВЫЕ ЦЕНТРЫ',
        commerce: 'КОММЕРЦИЯ',
        Secondary: 'ВТОРИЧНАЯ',
        living_complex: 'ЖИЛЫЕ КОМПЛЕКСЫ',
    },
    en: {
        business_center: 'business center',
        shopping_center: 'shopping center',
        commerce: 'commerce',
        Secondary: 'Secondary',
        living_complex: 'living complex',
    },
    ua: {
        business_center: 'БІЗНЕС ЦЕНТРИ',
        shopping_center: 'ТОРГОВІ ЦЕНТРИ',
        commerce: 'КОМЕРЦІЯ',
        Secondary: 'ВТОРИННА',
        living_complex: 'ЖИТЛОВІ КОМПЛЕКСИ',
    }
};

export const categories_path = {
    "living_complex": /living_complex/,
    "quarters": /quarters/,
    "commerce": /commerce/,
    "business_center": /business_center/,
    "shopping_center": /shopping_center/,
};
export const language_path = {
    ru: 'ru',
    ua: 'ua',
    en: 'en'
};

export const CITY = {
    ru: {
        kyiv: 'КИЕВ',
        odessa: 'ОДЕССА',
    },
    eng: {
        business_center: 'business center',
        shopping_center: 'shopping center',
        commerce: 'commerce',
        Secondary: 'Secondary',
        living_complex: 'living complex',
    },
    ukr: {
        business_center: 'БІЗНЕС ЦЕНТРИ',
        shopping_center: 'ТОРГОВІ ЦЕНТРИ',
        commerce: 'КОМЕРЦІЯ',
        Secondary: 'ВТОРИННА',
        living_complex: 'ЖИТЛОВІ КОМПЛЕКСИ',
    }
};

export const translate_language = language => {
    const languages = {
        ru: 'ru',
        ua: 'ukr',
        en: 'eng'
    };
    return languages[language];
};

export const isMobile = () => {
    return window.innerWidth <= MOBILE;
};

export const isDevice = () => {
    const screen = window.innerWidth;
    if (screen >= TABLETS && screen <= TABLET_END) {
        return 'tablet';
    } else if (isMobile()) {
        return 'mobile';
    } else {
        return  'desktop';
    }
};