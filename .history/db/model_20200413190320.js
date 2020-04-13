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
 * Time To Live (TTL)
 * @param {Number} days
 * @returns {Number} seconds
 */
function expSeconds(days = 30) {
    const secondsPerDay = 86400;
    return days * secondsPerDay;
}
/**
 * @returns random short id
 */
function buildId() {
    return shortid.generate();
}



/**
 * Stringify Object with methods for specific data type
 */
const stringify = {
    string: data => data,
    number: data => data.toString(),
    date: data => new Date(data).toISOString(),
    time: data => new Date(data).toISOString(),
    object: data => JSON.stringify(data),
};


module.exports = class RedisModel {
    constructor(schema) {
        this.props = {
            schema,
            client: getRedisClient(),
        };
    }


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

    create(data) {
        const {
            client
        } = this.props;

        return new Promise((resolve, reject) => {
            const multi = client.multi();
            const id = buildId();
            const redisKey = this._buildRedisKey(id);

            // Handle the hash values
            const hashValues = this._buildHashValues(data);
            if (hashValues) {
                multi.hmset(redisKey, hashValues);
                multi.hmset(redisKey, 'EX', expSeconds());
                multi.exec((err) => {
                    if (err) return reject(err);
                    console.log("Image Uploaded!")
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