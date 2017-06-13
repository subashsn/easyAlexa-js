"use strict";

module.exports = function(sequelize, DataTypes) {
    var someTable = sequelize.define("someTable", {
        // Some data
    });
    return someTable;
};