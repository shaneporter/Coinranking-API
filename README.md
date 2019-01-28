# Coinranking API Client for Node.js

A Node.js wrapper for the Coinranking API with no dependencies.

## • Installation

Latest version: 1.0.0

`npm install coinranking-api`

https://www.npmjs.com/package/coinranking-api

## • Coinranking API Documentation

For complete API documentation, up-to-date parameters, responses and errors, please refer to https://docs.coinranking.com.

## • Quick Start Example

```javascript
//1. Import coinranking-api
const Coinranking = require('coinranking-api');

//2. Initiate the Coinranking API Client
const CoinrankingClient = new Coinranking();

//3. Make calls
var func = async() => {
  let data = await Coinranking.stats.global();
};
```

## • Constants

This module provides helper constants for use in calls.

___
#### • `Coinranking.SORT`
Sort results in specific calls by using one of the following values.

| Key | Usage | Description |
| --- | --- | --- |
`COINRANKING` | `Coinranking.SORT.COINRANKING` | Sort results by Coinranking's system
`PRICE` | `Coinranking.SORT.PRICE` | Sort results by price
`MARKET_CAP` | `Coinranking.SORT.MARKET_CAP` | Sort results by market cap
`CHANGE` | `Coinranking.SORT.CHANGE` | Sort results by change

___
#### • `Coinranking.ORDER`
Order results in specific calls by using one of the following values.

| Key | Usage | Description |
| --- | --- | --- |
`DESC` | `Coinranking.ORDER.DESC` | Order results by _descending_ `Coinranking.SORT` values
`ASC` | `Coinranking.ORDER.ASC` | Order results by _ascending_ `Coinranking.SORT` values

___
#### • `Coinranking.TIME_PERIODS`
Time period where the change and history are based on.

| Key | Usage | Description |
| --- | --- | --- |
`HOUR_24` | `Coinranking.TIME_PERIODS.HOUR_24` | 24 Hours
`DAY_7` | `Coinranking.TIME_PERIODS.DAY_7` | 7 days
`DAY_30` | `Coinranking.TIME_PERIODS.DAY_30` | 30 days
`YEAR_1` | `Coinranking.TIME_PERIODS.YEAR_1` | 1 year
`YEAR_5` | `Coinranking.TIME_PERIODS.YEAR_5` | 5 years

___
## • Making Calls
All calls using the CoinrankingClient are asynchronous.

All calls are returned in the following format:
```javascript
{
    success: Boolean,
    message: String,
    code: Number,
    data: Object
}
```

The CoinrankingClient splits up the currently available calls outline in the official Coinranking API documentation into 4 parts.

| Namespace | Usage | Description |
| --- | --- | --- |
`coins` | `Coinranking.coins[...]` | Calls related to coins
`stats` | `Coinranking.stats[...]` | Calls related to global stats
`markets` | `Coinranking.markets[...]` | Calls related to markets
`exchanges` | `Coinranking.exchanges[...]` | Calls related to exchanges

___
### • Coins
Calls related to coins.


#### `coins.all()`
List all coins with data (name, price, history, rank, etc) - paginated by 50

Params:

- `params`: `Object` - Parameters to pass through to the request
- `params.base`: `{String}` - [default: `USD`] - Base currency
- `params.timePeriod`: `{String}` - [default: `24h`] - One of `Coinranking.TIME_PERIODS`
- `params.prefix`: `{String}` - Search to filter the list on. Only one of prefix, symbols, slugs or IDs parameters can be used at once
- `params.symbols`: `{String}` - Symbols to filter the list on. Separated by comma. Only one of prefix, symbols, slugs or IDs parameters can be used at once
- `params.slugs`: `{String}` - Slugs to filter the list on. Separated by comma. Only one of prefix, symbols, slugs or IDs parameters can be used at once
- `params.ids`: `{String}` - IDs to filter the list on. Separated by comma. Only one of prefix, symbols, slugs or IDs parameters can be used at once
- `params.sort`: `{String}` - [default: `coinranking`] - One of `Coinranking.SORT`
- `params.limit`: `{String|Number}` - [default: `50`] - Limit. Used for pagination. Range: `0-100`
- `params.offset`: `{String|Number}` - [default: `0`] - Offset. Used for pagination
- `params.order`: `{String}` - [default: `desc`] - One of `Coinranking.ORDER`

Usage Example:
```javascript
let data = await CoinrankingClient.coins.all({});
```

___
#### `coins.fetch()`
Get current data (name, price, history, rank, etc.) for a coin.

- `coinId`: `{String|Number}` - (Required) The coin id (can be obtained from `coins.all()`) eg. `1`
- `params`: `{Object}` - Parameters to pass through to the request
- `params.base`: `{String}` - [default: `USD`] - Base currency
- `params.timePeriod`: `{String}` - [default: `24h`]- One of `Coinranking.TIME_PERIODS`

Usage Example:
```javascript
let btc = '1'; //Coin ID
let data = await CoinrankingClient.coins.fetch(btc, {});
```

___
#### `coins.history()`
Get pricing history for a given coin.

- `coinId`: `{String|Number}` - (Required) The coin id (can be obtained from `coins.all()`) eg. `1`
- `params`: `{Object}` - Parameters to pass through to the request
- `params.base`: `{String}` - [default: `USD`] - Base currency
- `params.timeframe`: `{String}` - [default: `24h`]- One of `Coinranking.TIME_PERIODS`

Usage Example:
```javascript
let btc = '1'; //Coin ID
let data = await CoinrankingClient.coins.history(btc, {});
```

___
### • Stats
Calls related to global stats.


#### `stats.global()`
Get global stats - total coins, markets, market cap, 24 hour volume

Params:

- `params`: `Object` - Parameters to pass through to the request
- `params.base`: `{String}` - [default: `USD`] - Base currency

Usage Example:
```javascript
let data = await CoinrankingClient.stats.global({});
```

___
### • Markets
Calls related to markets


#### `markets.all()`
List all markets for currencies - paginated by 50

Params:

- `params`: `Object` - Parameters to pass through to the request
- `params.refCurrencyId`: `{String|Number}` - [default: `1509`] - Id of currency in which prices are calculated, defaults to `USD` (i.e. CoinId: `1509`)
- `params.currencyId`: `{String|Number}` - Filter markets with specific currency as either base or quote. Specifying a `currencyId` will also alter how prices are shown: By default all the markets will show the price of the base in the `refCurrency` (e.g. an ETH/BTC market will show the price of ETH). By specifying a `currencyId` the prices of this currency will always be shown, disregarding whether or not this currency represents the base or the quote in the market (e.g. by specifying BTC as currency, both ETH/BTC as BTC/USD markets will show prices of BTC)
- `params.toCurrencyId`: `{String}`- Filter markets with specific currency as either base or quote. The `toCurrencyId` will not alter how the prices will be shown, but will keep the base price. This can be combined with the `currencyId` variable to get specific markets.
- `params.baseCurrencyId`: `{String}` - Filter markets with specific currency as base
- `params.quoteCurrencyId`: `{String}` - Filter markets with specific currency as quote
- `params.sourceId`: `{String}` - Filter markets from specific source
- `params.limit`: `{String|Number}` - [default: `50`] - Limit. Used for pagination. Range: `0-100`
- `params.offset`: `{String|Number}` - [default: `0`] - Offset. Used for pagination
- `params.order`: `{String}` - [default: `volume`] - Sort by either `volume` or `price`.
- `params.orderDirection`: `{String}` [default: `desc`] - One of `Coinranking.ORDER`

Usage Example:
```javascript
let data = await CoinrankingClient.markets.all({});
```

___
### • Exchanges
Calls related to exchanges


#### `exchanges.all()`
List all exchanges - paginated by 50

Params:

- `params`: `Object` - Parameters to pass through to the request
- `params.refCurrencyId`: `{String|Number}` - [default: `1509`] - Id of currency in which prices are calculated, defaults to `USD` (i.e. CoinId: `1509`)
- `params.limit`: `{String|Number}` - [default: `50`] - Limit. Used for pagination. Range: `0-100`
- `params.offset`: `{String|Number}` - [default: `0`] - Offset. Used for pagination
- `params.order`: `{String}` - [default: `volume`] - Sort by either `volume`, `numberOfMarkets` or `lastTickerCreatedAt`
- `params.orderDirection`: `{String}` - [default: `desc`] - One of `Coinranking.ORDER`

Usage Example:
```javascript
let data = await CoinrankingClient.exchanges.all({});
```


## • Say Hi

Find me on Gab: [@markmiscavage](https://gab.com/markmiscavage).

Tweet at me: [@markmiscavage](https://twitter.com/markmiscavage).

## • License

MIT License

Copyright (c) 2019 Mark Miscavage

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
