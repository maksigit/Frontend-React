const MODE = 'production'; // production | developer
const build = false;


const api = () => {
    if (MODE === 'developer' && !build) {
        return 'http://192.168.0.107:5500/api';
    } else if (MODE === 'production' && !build) {
        return 'http://167.71.43.86:5500/api';
    } else if (MODE === 'production' && build) {
        return '/api';
    }
};

const api_static = () => {
    if (MODE === 'developer' && !build) {
        return 'http://192.168.0.107:5500/';
    } else if (MODE === 'production' && !build) {
        return 'http://167.71.43.86:5500/';
    } else if (MODE === 'production' && build) {
        return '/';
    }
};

export const replace_path = static_path => static_path.replace('/.', '');

export const API_ROOT = api();
export const STATIC_FILE = api_static();
