const AWS = require("aws-sdk");

exports.getBookId = async (event) => {
    const dynamodb = new AWS.DynamoDB.DocumentClient();
    
    const { bookId } = event.pathParameters;  // 'bookId' es el parámetro de la URL

    try {
        const result = await dynamodb.get({
            TableName: "libraryTableVB",  // Asegúrate de que el nombre de la tabla es correcto
            Key: {
                id: bookId,  // Utilizamos 'id' como la clave primaria en DynamoDB
            },
        }).promise();

        if (!result.Item) {
            return {
                statusCode: 404,
                body: JSON.stringify({
                    message: "Libro no encontrado",
                }),
            };
        }

        return {
            statusCode: 200,
            body: JSON.stringify({
                message: "Libro encontrado",
                book: result.Item,
            }),
        };
    } catch (error) {
        console.error("Error al obtener el libro:", error);

        return {
            statusCode: 500,
            body: JSON.stringify({
                message: "Hubo un error al obtener el libro",
                error: error.message,
            }),
        };
    }
};
