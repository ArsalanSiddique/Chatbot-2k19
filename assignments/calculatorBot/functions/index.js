const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//



exports.webhook = functions.https.onRequest((request, response) => {

    switch (request.body.queryResult.action) {

        case "add":
                console.log("request.body.result.parameters: ", request.body.queryResult.parameters);

            var add_params = request.body.queryResult.parameters;
            var sum = add_params.number + add_params.number1;

            response.send({
                fulfillmentText: `Addition of ${add_params.number} and ${add_params.number1} is ${sum}`
            });

            break;

        case "divide":
            var div_params = request.body.queryResult.parameters;
            var divide = div_params.number / div_params.number1;

            response.send({
                fulfillmentText: `Division of ${div_params.number} and ${div_params.number1} is ${divide}`
            });

            break;

        case "multiply":
            var mul_params = request.body.queryResult.parameters;
            var multiply = mul_params.number * mul_params.number1;

            response.send({
                fulfillmentText: `Multiplication of ${mul_params.number} and ${mul_params.number1} is ${multiply}`
            });

            break;

        case "subtract":
            var sub_params = request.body.queryResult.parameters;
            var subtract = sub_params.number - sub_params.number1;

            response.send({
                fulfillmentText: `Subtraction of ${sub_params.number} and ${sub_params.number1} is ${subtract}`
            });

            break;

        default:
            response.send({
                fulfillmentText: `No action matched in webhook.`
            });
    }
});
