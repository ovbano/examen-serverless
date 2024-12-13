const {v4} = require('uuid');
const AWS = require('aws-sdk');;
exports.createBook = async (event) => {
    const dynamodb = new AWS.DynamoDB.DocumentClient();
    const {title, author, publishedyear, genre} = JSON.parse(event.body);
    const id= v4();
    const newLibro = {
        id,
        title,
        author,
        publishedyear,
        genre
    };
    await dynamodb
        .put({
            TableName: 'libraryTableVB',
            Item: newLibro
        })
        .promise();
    return {
        statusCode: 200,
        body: JSON.stringify(newLibro),
    };
};