const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();


module.exports.get = async (id) => {

    const params = {
        TableName: process.env.DYNAMODB_TABLE,
        Key: {
            id: id,
        },
    };
    return await dynamoDb.get(params).promise()
};


module.exports.put = async (input) => {

    const params = {
        TableName: process.env.DYNAMODB_TABLE,
        Item: input
      };

    return await dynamoDb.put(params).promise()
};