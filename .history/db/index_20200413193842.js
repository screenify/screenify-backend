const redisModel = require("./model")

/** 
 * Upoload Schema
 * Redis Database Schema  
 */
const uploadSchema = {
    namespace: 'uploads',
    indexes: [{
        getName: () => 'createdAt',
        shouldIndex: () => true,
        addNonTenantIndex: () => true,
        getValue: data => new Date(data.createdAt).getTime(),
    }, ],
    attributes: {
        url: {
            kind: 'string'
        },
        cdnType: {
            kind: 'string'
        },
        createdAt: {
            kind: 'time'
        },
    },
};
module.exports = new redisModel(uploadSchema)