const AWS = require("aws-sdk");
exports.getBook = async (event) => {
  const dynamo = new AWS.DynamoDB.DocumentClient();
  const result = await dynamo
    .scan({
      TableName: "libraryTableVB",
    })
    .promise();
    const libro = result.Items;
  return {
    status: 200,
    body: {libro, },
  };
  
};