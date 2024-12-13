const AWS = require("aws-sdk");

exports.deleteBook = async (event) => {
  const dynamodb = new AWS.DynamoDB.DocumentClient();
  const { bookId } = event.pathParameters; // Usamos 'id' ya que es la clave primaria en DynamoDB

  try {
    await dynamodb
      .delete({
        TableName: "libraryTableVB",  // Asegúrate de que el nombre de la tabla es correcto
        Key: {
          id: bookId // La clave primaria en la tabla es 'id'
        },
      })
      .promise();

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Libro Eliminado",
      }),
    };
  } catch (error) {
    console.error("Error al eliminar el libro:", error);

    return {
      status: 500,
      body: JSON.stringify({
        message: "Hubo un error al eliminar el libro",
        error: error.message,
      }),
    };
  }
};
