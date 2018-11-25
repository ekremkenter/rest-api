'use strict';
require('dotenv').config({ path: './variables.env' });
const connectToDatabase = require('../db');
const Product = require('../models/Product');

module.exports.create = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;

    connectToDatabase()
        .then(() => {
            Product.create(JSON.parse(event.body))
                .then(product => callback(null, {
                    statusCode: 200,
                    body: JSON.stringify(product)
                }))
                .catch(err => callback(null, {
                    statusCode: err.statusCode || 500,
                    headers: { 'Content-Type': 'text/plain' },
                    body: 'Could not create the product.'
                }));
        });
};
module.exports.getOne = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;

    connectToDatabase()
        .then(() => {
            Product.findById(event.pathParameters.id)
                .then(product => callback(null, {
                    statusCode: 200,
                    body: JSON.stringify(product)
                }))
                .catch(err => callback(null, {
                    statusCode: err.statusCode || 500,
                    headers: { 'Content-Type': 'text/plain' },
                    body: 'Could not fetch the product.'
                }));
        });
};

module.exports.getAll = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;

    connectToDatabase()
        .then(() => {
            Product.find()
                .then(products => callback(null, {
                    statusCode: 200,
                    body: JSON.stringify(products)
                }))
                .catch(err => callback(null, {
                    statusCode: err.statusCode || 500,
                    headers: { 'Content-Type': 'text/plain' },
                    body: 'Could not fetch the products.'
                }))
        });
};

module.exports.update = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;

    connectToDatabase()
        .then(() => {
            Product.findByIdAndUpdate(event.pathParameters.id, JSON.parse(event.body), { new: true })
                .then(product => callback(null, {
                    statusCode: 200,
                    body: JSON.stringify(product)
                }))
                .catch(err => callback(null, {
                    statusCode: err.statusCode || 500,
                    headers: { 'Content-Type': 'text/plain' },
                    body: 'Could not fetch the products.'
                }));
        });
};

module.exports.delete = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;

    connectToDatabase()
        .then(() => {
            Product.findByIdAndRemove(event.pathParameters.id)
                .then(product => callback(null, {
                    statusCode: 200,
                    body: JSON.stringify({ message: 'Removed product with id: ' + product._id, product: product })
                }))
                .catch(err => callback(null, {
                    statusCode: err.statusCode || 500,
                    headers: { 'Content-Type': 'text/plain' },
                    body: 'Could not fetch the products.'
                }));
        });
};