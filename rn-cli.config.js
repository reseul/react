'use strict';

var path = require('path');

var config = {
    getProjectRoots() {
        return getRoots();
    },
    getAssetRoots() {
        return getRoots();
    },
};

function getRoots() {
    return [
        __dirname,
        path.resolve(__dirname, 'simple/dist')
    ];
}

module.exports = config
