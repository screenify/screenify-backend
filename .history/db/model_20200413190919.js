const redis = require('redis');
const shortid = require('shortid');
const _ = require('lodash');
// const config = require("../config/config")
// Create Redis Client
let client = redis.createClient(
    /**
     * @Note
     *  Change the url to your database
     *  Default:
     *    port: 6979
     *    Host: localhost
     *    url: null
     */
);

/**
 * Redis on connection log.
 */
client.on('connect', function () {
    console.log('Connected to Redis...');
});

/**
 * Redis on error log.
 */
client.on('error', function (error) {
    console.log('error happedned on', error);
});

/**
 * @returns redis connection
 */
function getRedisClient() {
    return client
}

/**
 * expSeconds calulates the time to live of the data(TTL)
 * @param {Number} days
 * @returns {Number} seconds
 */
function expSeconds(days = 30) {
    const secondsPerDay = 86400;
    return days * secondsPerDay;
}
/**
 * @returns random short id
 * @returns {String}
 */
function buildId() {
    return shortid.generate();
}



/**
 * Stringify Object with methods for each specific data type
 * @returns {String}
 */
const stringify = {
    string: data => data,
    number: data => data.toString(),
    date: data => new Date(data).toISOString(),
    time: data => new Date(data).toISOString(),
    object: data => JSON.stringify(data),
};

/**
 * Redis Model 
 */
module.exports = class RedisModel {
    constructor(schema) {
        this.props = {
            schema,
            client: getRedisClient(),
        };
    }

    /**
     * Hash Builder
     * @param {Sting} data 
     * @returns {Array} hashValues
     */
    _buildHashValues(data) {
        const {
            schema: {
                attributes
            }
        } = this.props;
        const hashValues = [];

        _.each(data, (value, key) => {
            const type = (attributes[key] || {}).kind;
            const stringValue = stringify[type] ? stringify[type](value) : undefined;
            if (!type || !stringValue) return null;

            return hashValues.push(key, stringValue);
        });

        return _.isEmpty(hashValues) ? undefined : hashValues;
    }

    _buildRedisKey(id) {
        const {
            schema
        } = this.props;
        return `${schema.namespace}:${id}`;
    }
    /**
     * Create takes the data and insert as a key value pair based on the schema
     * @param {Object} data 
     */
    create(data) {
        const {
            client
        } = this.props;

        return new Promise((resolve, reject) => {
            const multi = client.multi();
            const id = buildId();
            const redisKey = this._buildRedisKey(id);

            const hashValues = this._buildHashValues(data);
            if (hashValues) {
                multi.hmset(redisKey, hashValues);
                multi.hmset(redisKey, 'EX', expSeconds());
                multi.exec((err) => {
                    if (err) return reject(err);
                    return resolve({
                        key: redisKey,
                        _id: id,
                        ...data
                    });
                });
            } else {
                reject(new Error('Empty redis hash data'));
            }
        });
    }
}