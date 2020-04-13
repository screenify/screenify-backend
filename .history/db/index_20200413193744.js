const redisModel = require("./model")

/** 
 * Upoload Scema
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