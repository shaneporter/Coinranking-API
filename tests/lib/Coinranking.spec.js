//Modules
const fs = require('fs');
const mocha = require('mocha');
const chai = require('chai');
var should = chai.should();

//Helpers
const Coinranking = require('../../lib/Coinranking');

const shared = require('../shared');

describe('Coinranking', function () {
    beforeEach(function (done) {
        this.CoinrankingClient = new Coinranking();

        done();
    });

    describe('coins', function () {

        describe('all', function () {
            beforeEach(function (done) {
                this.CoinrankingClient.coins.all().then((data) => {
                    this.data = data;
                    done();
                });
            });

            shared.shouldBeAValidRequest();
        });

        describe('fetch', function () {
            beforeEach(function (done) {
                var btc = '1';
                this.CoinrankingClient.coins.fetch(btc).then((data) => {
                    this.data = data;
                    done();
                });
            });

            shared.shouldBeAValidRequest();
        });

        describe('history', function () {
            beforeEach(function (done) {
                var btc = '1';
                this.CoinrankingClient.coins.history(btc).then((data) => {
                    this.data = data;
                    done();
                });
            });

            shared.shouldBeAValidRequest();
        });
    });

    describe('stats', function () {

        describe('global', function () {
            beforeEach(function (done) {
                this.CoinrankingClient.stats.global().then((data) => {
                    this.data = data;
                    done();
                });
            });

            shared.shouldBeAValidRequest();
        });
    });

    describe('markets', function () {

        describe('all', function () {
            beforeEach(function (done) {
                this.CoinrankingClient.markets.all().then((data) => {
                    this.data = data;
                    done();
                });
            });

            shared.shouldBeAValidRequest();
        });
    });

    describe('exchanges', function () {

        describe('all', function () {
            beforeEach(function (done) {
                this.CoinrankingClient.exchanges.all().then((data) => {
                    this.data = data;
                    done();
                });
            });

            shared.shouldBeAValidRequest();
        });
    });

});
