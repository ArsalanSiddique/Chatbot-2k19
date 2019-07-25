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

                    // response.send({
                    //     fulfillmentText: `You have ${orders.length} orders. would you like to see them ? (yes/no)\n`
                    // });

                    // response.send({
                    //     "payload": {
                    //       "google": {
                    //         "expectUserResponse": true,
                    //         "richResponse": {
                    //           "items": [
                    //             {
                    //               "simpleResponse": {
                    //                 "textToSpeech": `You have ${orders.length} orders. would you like to see them ?\n`
                    //               }
                    //             }
                    //           ],
                    //           "suggestions": [
                    //             {
                    //               "title": "Yes"
                    //             },
                    //             {
                    //               "title": "No"
                    //             }
                    //           ]

                    //         }
                    //       }
                    //     }
                    //   })

                    response.send({
                        "fulfillmentText": `You have ${orders.length} orders. would you like to see them ? (yes/no)\n`,
                        "fulfillmentMessages": [],
                        "source": "example.com",
                        "payload": {
                            "google": {
                                "expectUserResponse": true,
                                "richResponse": {
                                    "items": [
                                        {
                                            "simpleResponse": {
                                                "textToSpeech": `You have ${orders.length} orders. would you like to see them ?\n`
                                            }
                                        }
                                    ],
                                    "suggestions": [
                                        {
                                            "title": "Yes"
                                        },
                                        {
                                            "title": "No"
                                        }
                                    ]

                                }
                            }
                        }
                    })


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
                        speech += `\n Number ${index + 1} is ${eachOrder.RoomType} room for ${eachOrder.persons} persons, ordered by ${eachOrder.name} contact email is ${eachOrder.email} \n`
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

        case 'images':
            response.send({


                // working with web , facebook
                "fulfillmentMessages": [
                    {
                        "card": {
                            "title": "card title",
                            "subtitle": "card text",
                            "imageUri": "https://assistant.google.com/static/images/molecule/Molecule-Formation-stop.png",
                            "buttons": [
                                {
                                    "text": "button text",
                                    "postback": "https://assistant.google.com/"
                                }
                            ]
                        }
                    }
                ]


                // "fulfillmentText": "Here is basic card \n",
                // "fulfillmentMessages": [],
                // "source": "example.com",
                //     "payload": {
                //       "google": {
                //         "expectUserResponse": true,
                //         "richResponse": {
                //           "items": [
                //             {
                //               "simpleResponse": {
                //                 "textToSpeech": "This is a basic card example."
                //               }
                //             },
                //             {
                //               "basicCard": {
                //                 "title": "Title: this is a title",
                //                 "subtitle": "This is a subtitle",
                //                 "formattedText": "This is a basic card.  Text in a basic card can include \"quotes\" and\n        most other unicode characters including emoji 📱.  Basic cards also support\n        some markdown formatting like *emphasis* or _italics_, **strong** or\n        __bold__, and ***bold itallic*** or ___strong emphasis___ as well as other\n        things like line  \nbreaks",
                //                 "image": {
                //                   "url": "https://example.com/image.png",
                //                   "accessibilityText": "Image alternate text"
                //                 },
                //                 "buttons": [
                //                   {
                //                     "title": "This is a button",
                //                     "openUrlAction": {
                //                       "url": "https://assistant.google.com/"
                //                     }
                //                   }
                //                 ],
                //                 "imageDisplayOptions": "CROPPED"
                //               }
                //             }
                //           ]
                //         }
                //       }
                //     }
            });
            break;


        case "carousel":


            //not working
            response.send({
                // "fulfillmentMessages": [
                //     {
                //         "carousel": {
                //             "title": "Here is title",
                //             "description": "description goes here",
                //             "footer": "footer appears here",
                //             "image": "https://assistant.google.com/static/images/molecule/Molecule-Formation-stop.png",
                //             "openUrlAction": "https://www.google.com/"
                //           }
                //     }
                // ]

                // "fulfillmentText": "Here is basic carousel \n",
                // "fulfillmentMessages": [
                //     {
                //       "items": [
                //         {
                //           "description": "Option One Description",
                //           "image": {
                //             "url": "https://assistant.google.com/static/images/molecule/Molecule-Formation-stop.png",
                //             "accessibilityText": "Image description for screen readers"
                //           },
                //           "optionInfo": {
                //             "key": "itemOne",
                //             "synonyms": [
                //               "thing one",
                //               "object one"
                //             ]
                //           },
                //           "title": "Option One Title"
                //         },
                //         {
                //           "description": "Option Two Description",
                //           "image": {
                //             "url": "https://assistant.google.com/static/images/molecule/Molecule-Formation-stop.png",
                //             "accessibilityText": "Image description for screen readers"
                //           },
                //           "optionInfo": {
                //             "key": "itemTwo",
                //             "synonyms": [
                //               "thing two",
                //               "object two"
                //             ]
                //           },
                //           "title": "Option Two Title"
                //         }
                //       ],
                //       "platform": "google",
                //       "type": "carousel_card"
                //     }
                //   ]

            })

            break;



        default:
            response.send({
                fulfillmentText: 'No action matched in webHook.'
            });
    }




});
