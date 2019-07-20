const functions = require('firebase-functions');
var admin = require("firebase-admin");

admin.initializeApp(functions.config().firebase);

var firestore = admin.firestore();


// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//

exports.webhook = functions.https.onRequest((request, response) => {

    switch (request.body.queryResult.action) {

        case 'bookRoom':
            console.log("request.body.result.parameters: ", request.body.queryResult.parameters);

            var params = request.body.queryResult.parameters;
            firestore.collection("orders").add(params)
                .then(() => {
                    response.send({
                        fulfillmentText:
                            `${params.name} your hotel booking request for ${params.persons} persons, we will contact you on ${params.email} soon - type of room: ${params.roomType}`
                    });

                    return res.status(200);
                })
                .catch((e) => {
                    response.send({
                        fulfillmentText: "Something went wrong when writing in database."
                    });
                });
            break;

        case 'countBooking':
            firestore.collection('orders').get()
                .then((querySnapshot) => {

                    var orders = [];
                    querySnapshot.forEach((doc) => { orders.push(doc.data()) });

                    response.send({
                        fulfillmentText: `You have ${orders.length} orders, wiuld you like to see them? (Yes/No) \n`
                    });
                    return res.status(200);
                })
                .catch((err) => {
                    console.log('Error ', err);

                    response.send({
                        speech: "something went wrong."
                    })
                })



            // firestore.collection('orders').get()
            //     .then((querySnapshot) => {

            //         var orders = [];
            //         querySnapshot.forEach((doc) => { orders.push(doc.data()) });

            //         var speech = `You have ${orders.length} orders \n`;

            //         orders.forEach((eachOrder, index) => {
            //             speech += `number ${index + 1} is ${eachOrder.roomType} room for ${eachOrder.persons} persons, ordered by ${eachOrder.name} and contact email is ${params.email} \n`;
            //         })

            //         response.send({
            //             fulfillmentText: speech
            //         });
            //         return res.status(200);
            //     })
            //     .catch((err) => {
            //         console.log('Error in reading data from database.', err);
            //         response.send({
            //             fulfillmentText: "Something went wrong while reading data."
            //         })
            //     })

            break;

        case 'showBooking':
            firestore.collection('orders').get()
                .then((querySnapshot) => {

                    var orders = [];
                    querySnapshot.forEach((doc) => { orders.push(doc.data()) });

                    var speech = `Here is your orders \n`;

                    orders.forEach((eachOrder, index) => {
                        speech += `/n Number ${index + 1} is ${eachOrder.RoomType} room for ${eachOrder.persons} persons, ordered by ${eachOrder.name} contact email is ${eachOrder.email} \n`
                    })

                    response.send({
                        fulfillmentText: speech
                    });
                    return res.status(200);
                })
                .catch((err) => {
                    console.log('Error getting documents', err);

                    response.send({
                        speech: "something went wrong when reading from database"
                    })
                })

            break;

        default:
            response.send({
                fulfillmentText: 'No action matched in webHook.'
            });
    }




});
