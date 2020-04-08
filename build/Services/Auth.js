"use strict";
module.exports = {
    getUser: function (_a, connection) {
        var username = _a.username;
        return new Promise(function (resolve, reject) {
            var result = null;
            var queryString = "\n      SELECT Users.*\n      FROM Users\n      WHERE Users.Username = '" + username + "'\n    ";
            var query = connection.query(queryString);
            query.on('result', function (row) {
                result = row;
            }).on('end', function () {
                resolve(result);
            });
        });
    },
};
