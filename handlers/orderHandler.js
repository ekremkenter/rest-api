'use strict';
require('dotenv').config({ path: './variables.env' });
const connectToDatabase = require('../db');
const Order = require('../models/Order');

module.exports.create = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;

    connectToDatabase()
        .then(() => {
            Order.create(JSON.parse(event.body))
                .then(order => callback(null, {
                    statusCode: 200,
                    body: JSON.stringify(order)
                }))
                .catch(err => callback(null, {
                    statusCode: err.statusCode || 500,
                    headers: { 'Content-Type': 'text/plain' },
                    body: 'Could not create the order.'
                }));
        });
};
module.exports.getOne = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;

    connectToDatabase()
        .then(() => {
            Order.findById(event.pathParameters.id)
                .then(order => callback(null, {
                    statusCode: 200,
                    body: JSON.stringify(order)
                }))
                .catch(err => callback(null, {
                    statusCode: err.statusCode || 500,
                    headers: { 'Content-Type': 'text/plain' },
                    body: 'Could not fetch the order.'
                }));
        });
};

module.exports.getAll = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;

    connectToDatabase()
        .then(() => {
            Order.find()
                .then(orders => callback(null, {
                    statusCode: 200,
                    body: JSON.stringify(orders)
                }))
                .catch(err => callback(null, {
                    statusCode: err.statusCode || 500,
                    headers: { 'Content-Type': 'text/plain' },
                    body: 'Could not fetch the orders.'
                }))
        });
};

module.exports.update = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;

    connectToDatabase()
        .then(() => {
            Order.findByIdAndUpdate(event.pathParameters.id, JSON.parse(event.body), { new: true })
                .then(order => callback(null, {
                    statusCode: 200,
                    body: JSON.stringify(order)
                }))
                .catch(err => callback(null, {
                    statusCode: err.statusCode || 500,
                    headers: { 'Content-Type': 'text/plain' },
                    body: 'Could not fetch the orders.'
                }));
        });
};

module.exports.delete = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;

    connectToDatabase()
        .then(() => {
            Order.findByIdAndRemove(event.pathParameters.id)
                .then(order => callback(null, {
                    statusCode: 200,
                    body: JSON.stringify({ message: 'Removed order with id: ' + order._id, order: order })
                }))
                .catch(err => callback(null, {
                    statusCode: err.statusCode || 500,
                    headers: { 'Content-Type': 'text/plain' },
                    body: 'Could not fetch the orders.'
                }));
        });
};