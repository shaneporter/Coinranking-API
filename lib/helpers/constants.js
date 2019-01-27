/**
 * @description The base url for the Coinranking API
 * @kind constant
 */
const BASE = 'https://api.coinranking.com';

/**
 * @description The host of the Coinranking API
 * @kind constant
 */
const HOST = 'api.coinranking.com';

/**
 * @description The current version for the Coinranking API
 * @kind constant
 */
const API_VERSION = '1';

/**
 * @description The Coinranking URI according to base and current version
 * @kind constant
 */
const URI = `${BASE}v${API_VERSION}/public`;

/**
 * @description The current accepted methods for Coinranking API calls
 * @kind constant
 */
const ACCEPTED_METHODS = [
    'GET',
];

/**
 * @description Available options to sort results by
 * @kind constant
 */
const SORT = {
    COINRANKING: 'coinranking',
    PRICE: 'price',
    MARKET_CAP: 'marketCap',
    CHANGE: 'change',
};

/**
 * @description Available options to order results by
 * @kind constant
 */
const ORDER = {
    DESC: 'desc',
    ASC: 'asc',
};

/**
 * @description Time period where the change and history are based on
 * @kind constant
 */
const TIME_PERIODS = {
    HOUR_24: '24h',
    DAY_7: '7d',
    DAY_30: '30d',
    YEAR_1: '1y',
    YEAR_5: '5y',
};

//

module.exports = {
    BASE,
    HOST,
    API_VERSION,
    URI,
    ACCEPTED_METHODS,
    SORT,
    ORDER,
    TIME_PERIODS,
};
