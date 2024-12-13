const AWS = require("aws-sdk");

exports.updateBook = async (event) => {
  const dynamodb = new AWS.DynamoDB.DocumentClient({ region: "us-east-1" });
  const { id } = event.pathParameters;

  try {
    const { title, author, publishedyear, genre } = JSON.parse(event.body);

    const result = await dynamodb
      .update({
        TableName: "libraryTableVB",
        Key: { id },
        UpdateExpression:
          "set title = :title, author = :author, publishedyear = :publishedyear, genre = :genre",
        ExpressionAttributeValues: {
          ":title": title,
          ":author": author,
          ":publishedyear": publishedyear,
          ":genre": genre,
        },
        ReturnValues: "ALL_NEW",
      })
      .promise();

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Libro Actualizado",
        updatedBook: result.Attributes,
      }),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Error al actualizar el libro",
        error: error.message,
      }),
    };
  }
};
