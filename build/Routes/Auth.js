"use strict";
// Interfaces../../
var RequestStatus = require('../Constants').RequestStatus;
// Modules
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
// Services
var Auth = require('../Services/Auth');
module.exports = function (app, connection) {
    app.post('/api/Signin', function (req, res) {
        console.log('/api/Signin');
        var params = req.body;
        Auth.getUser(params, connection)
            .then(function (getUserResponse) {
            // username entered doesn't exist
            if (getUserResponse === null) {
                return { status: RequestStatus.FAILURE };
            }
            return bcrypt.compare(req.body.Password, getUserResponse.password)
                .then(function (matches) {
                if (matches) {
                    var token = jwt.sign({
                        userId: getUserResponse.id,
                        username: getUserResponse.username
                    }, 'SwapCast_123_$', { expiresIn: 129600 });
                    return {
                        status: RequestStatus.SUCCESS,
                        token: token,
                        payload: {
                            user: getUserResponse,
                        },
                    };
                }
                return { status: RequestStatus.FAILURE };
            });
        })
            .then(function (returnData) {
            res.send(returnData);
        });
    });
};
