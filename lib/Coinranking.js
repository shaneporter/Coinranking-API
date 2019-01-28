'use strict';

//Modules
const https = require('https');
const querystring = require('querystring');

//Helpers
const Utils = require('./helpers/utilities');
const Constants = require('./helpers/constants');
const ReturnObject = require('./helpers/ReturnObject');

/**
 * @class Coinranking
 * @author Mark Miscavage <markmiscavage@protonmail.com>
 * @description A Node.js wrapper for the Coinranking API with no dependencies. For more information, visit: https://docs.coinranking.com
 * @example
 *     const Coinranking = require('coinranking-api');
 *     const CoinrankingClient = new Coinranking();
 * @public
 * @version 1.0.0
 * @license MIT
 * @kind class
 */
class Coinranking {

    /**
     * @description Calls related to coins
     */
    get coins() {
        const pathPrefix = 'coin';

        return {

            /**
             * @description List all coins with data (name, price, history, rank, etc) - paginated by 50
             * @function coins.all()
             * @async
             * @param {object} params - Parameters to pass through to the request
             * @param {string} params.base [default: USD] - Base currency
             * @param {string} params.timePeriod [default: 24h]- One of Coinranking.TIME_PERIODS
             * @param {string} params.prefix - Search to filter the list on. Only one of prefix, symbols, slugs or IDs parameters can be used at once
             * @param {string} params.symbols - Symbols to filter the list on. Separated by comma. Only one of prefix, symbols, slugs or IDs parameters can be used at once
             * @param {string} params.slugs - Slugs to filter the list on. Separated by comma. Only one of prefix, symbols, slugs or IDs parameters can be used at once
             * @param {string} params.ids - IDs to filter the list on. Separated by comma. Only one of prefix, symbols, slugs or IDs parameters can be used at once
             * @param {string} params.sort [default: coinranking] - One of Coinranking.SORT
             * @param {string|number} params.limit [default: 50] - Limit. Used for pagination. Range: 0-100
             * @param {string|number} params.offset [default: 0] - Offset. Used for pagination
             * @param {string} params.order [default: desc] - One of Coinranking.ORDER
             * @returns {ReturnObject}
             */
            all: async(params) => {
                const method = 'GET';
                let path = `/${pathPrefix}s`;

                //Build options
                let options = this._buildRequestOptions(method, path, params);

                //Return request
                return this._request(options);
            },

            /**
             * @description Get current data (name, price, history, rank, etc.) for a coin.
             * @function coins.fetch()
             * @async
             * @param {string|number} coinId - (Required) The coin id (can be obtained from coins.all()) eg. 1
             * @param {object} params - Parameters to pass through to the request
             * @param {string} params.base [default: USD] - Base currency
             * @param {string} params.timePeriod [default: 24h]- One of Coinranking.TIME_PERIODS
             * @returns {ReturnObject}
             */
            fetch: async(coinId, params) => {
                //If coinId is number, convert to string
                if (Utils.isNumber(coinId)) coinId = coinId.toString();
                //Must have coinId
                if (!Utils.isString(coinId) || Utils.isStringEmpty(coinId)) Utils._WARN_('Invalid parameter', 'coinId must be of type: String or Number and greater than 0 characters.');

                const method = 'GET';
                let path = `/${pathPrefix}/${coinId}`;

                //Build options
                let options = this._buildRequestOptions(method, path, params);

                //Return request
                return this._request(options);
            },

            /**
             * @description Get pricing history for a given coin.
             * @function coins.history()
             * @async
             * @param {string|number} coinId - (Required) The coin id (can be obtained from coins.all()) eg. 1
             * @param {object} params - Parameters to pass through to the request
             * @param {string} params.base [default: USD] - Base currency
             * @param {string} params.timeframe [default: 24h]- One of Coinranking.TIME_PERIODS
             * @returns {ReturnObject}
             */
            history: async(coinId, params) => {
                //If coinId is number, convert to string
                if (Utils.isNumber(coinId)) coinId = coinId.toString();
                //Must have coinId
                if (!Utils.isString(coinId) || Utils.isStringEmpty(coinId)) Utils._WARN_('Invalid parameter', 'coinId must be of type: String or Number and greater than 0 characters.');

                //If no params, create
                if (!Utils.isObject(params)) params = {};
                //If timeframe, must be string - in order to append to path
                if (!Utils.isString(params.timeframe)) {
                    //Set and continue
                    params.timeframe = Coinranking.TIME_PERIODS.HOUR_24;
                }

                const method = 'GET';
                let path = `/${pathPrefix}/${coinId}/history/${params.timeframe}`;

                //Build options
                let options = this._buildRequestOptions(method, path, params);

                //Return request
                return this._request(options);
            },
        };
    };

    /**
     * @description Calls related to global stats
     */
    get stats() {
        const pathPrefix = 'stats';

        return {

            /**
             * @description Get global stats - total coins, markets, market cap, 24 hour volume
             * @function stats.global()
             * @async
             * @param {object} params - Parameters to pass through to the request
             * @param {string} params.base [default: USD] - Base currency
             * @returns {ReturnObject}
             */
            global: async(params) => {
                const method = 'GET';
                let path = `/${pathPrefix}`;

                //Build options
                let options = this._buildRequestOptions(method, path, params);

                //Return request
                return this._request(options);
            },
        };
    };

    /**
     * @description Calls related to markets
     */
    get markets() {
        const pathPrefix = 'markets';

        return {

            /**
             * @description List all markets for currencies - paginated by 50
             * @function markets.all()
             * @async
             * @param {object} params - Parameters to pass through to the request
             * @param {string|number} params.refCurrencyId [default: 1509] - Id of currency in which prices are calculated, defaults to USD
             * @param {string|number} params.currencyId - Filter markets with specific currency as either base or quote.
             *                                            Specifying a currencyId will also alter how prices are shown:
             *                                            By default all the markets will show the price of the base in the refCurrency (e.g. an ETH/BTC market will show the price of ETH).
             *                                            By specifying a currencyId the prices of this currency will always be shown, disregarding whether or not this currency represents the base or the quote in the market
             *                                            (e.g. by specifying BTC as currency, both ETH/BTC as BTC/USD markets will show prices of BTC)
             * @param {string} params.toCurrencyId - Filter markets with specific currency as either base or quote. The toCurrencyId will not alter how the prices will be shown, but will keep the base price.
             *                                       This can be combined with the currencyId variable to get specific markets.
             * @param {string} params.baseCurrencyId - Filter markets with specific currency as base
             * @param {string} params.quoteCurrencyId - Filter markets with specific currency as quote
             * @param {string} params.sourceId - Filter markets from specific source
             * @param {string|number} params.limit [default: 50] - Limit. Used for pagination. Range: 0-100
             * @param {string|number} params.offset [default: 0] - Offset. Used for pagination
             * @param {string} params.order [default: volume] - Sort by either volume or price.
             * @param {string} params.orderDirection [default: desc] - One of Coinranking.ORDER
             * @returns {ReturnObject}
             */
            all: async(params) => {
                const method = 'GET';
                let path = `/${pathPrefix}`;

                //Build options
                let options = this._buildRequestOptions(method, path, params);

                //Return request
                return this._request(options);
            },
        };
    };

    /**
     * @description Calls related to exchanges
     */
    get exchanges() {
        const pathPrefix = 'exchanges';

        return {

            /**
             * @description List all exchanges - paginated by 50
             * @function exchanges.all()
             * @async
             * @param {object} params - Parameters to pass through to the request
             * @param {string|number} params.refCurrencyId [default: 1509] - Id of currency in which prices are calculated, defaults to USD
             * @param {string|number} params.limit [default: 50] - Limit. Used for pagination. Range: 0-100
             * @param {string|number} params.offset [default: 0] - Offset. Used for pagination
             * @param {string} params.order [default: volume] - Sort by either volume, numberOfMarkets or lastTickerCreatedAt
             * @param {string} params.orderDirection [default: desc] - One of Coinranking.ORDER
             * @returns {ReturnObject}
             */
            all: async(params) => {
                const method = 'GET';
                let path = `/${pathPrefix}`;

                //Build options
                let options = this._buildRequestOptions(method, path, params);

                //Return request
                return this._request(options);
            },
        };
    };

    /**
     * @description Build options for https.request
     * @function _buildRequestOptions
     * @protected
     * @param {string} method - One of Coinranking.ACCEPTED_METHODS
     * @param {string} path - Relative path for API
     * @param {object} params - Object representing query strings for url parameters
     * @returns {Object} - {path, method, host, port} Options for request
     */
    _buildRequestOptions(method, path, params) {
        //Transform to uppercase
        method = method.toUpperCase();

        //Stringify object params if exist
        if (Utils.isObject(params)) params = querystring.stringify(params);
        else params = undefined;

        //Make relative path
        //Check if has params, append accordingly
        if (params == undefined) path = `/v${Constants.API_VERSION}/public/${path}`;
        else path = `/v${Constants.API_VERSION}/public/${path}?${params}`;

        //Create options
        let options = {
            path,
            method,
            host: Constants.HOST,
            port: 443,
        };

        //Return options
        return options;
    };

    /**
     * @description Perform https request
     * @function _request
     * @protected
     * @param {object} options - https.request options (from _buildRequestOptions())
     * @returns {Promise} Body of https request data results
     */
    _request(options) {
        return new Promise((resolve, reject) => {
            //Perform request
            let req = https.request(options, (res) => {
                let body = [];

                //Set body on data
                res.on('data', (chunk) => {
                    body.push(chunk);
                });

                //On end, end the Promise
                res.on('end', () => {
                    try {
                        body = Buffer.concat(body);
                        body = body.toString();

                        //Check if page is returned instead of JSON
                        if (body.startsWith('<!DOCTYPE html>')) Utils._WARN_('Invalid request', 'There was a problem with your request. The parameter(s) you gave are missing or incorrect.');

                        //Attempt to parse
                        body = JSON.parse(body);
                    }
                    catch (error) {
                        reject(error);
                    };

                    //Create return object
                    resolve(
                        ReturnObject(
                            !(res.statusCode < 200 || res.statusCode >= 300),
                            res.statusMessage,
                            res.statusCode,
                            body,
                        )
                    );
                });
            });

            //On error, reject the Promise
            req.on('error', (error) => reject(error));

            //End request
            req.end();
        });
    };
};

//Set Constants
Coinranking.API_VERSION = Constants.API_VERSION;
Coinranking.ACCEPTED_METHODS = Constants.ACCEPTED_METHODS;
Coinranking.TIME_PERIODS = Constants.TIME_PERIODS;
Coinranking.SORT = Constants.SORT;
Coinranking.ORDER = Constants.ORDER;

//

module.exports = exports = Coinranking;
