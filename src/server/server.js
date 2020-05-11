// server.js

const express = require("express");
const server = express();
var cors = require('cors')

const body_parser = require("body-parser");

// parse JSON (application/json content-type)
server.use(body_parser.json());
server.use(cors())

const port = procces.env.PORT || 4000;

// << db setup >>
const db = require("./db");
const dbName = "data";



db.initialize(dbName, function (dbObject) { // successCallback
   // << db CRUD routes >>

   server.get("/order/:id", async (request, response) => {
      const orderId = request.params.id;
      const result = await dbObject.collection('orders').findOne({ orderId: orderId });
         response.json(result);
   });

   server.get("/orders/:sortType", async (request, response) => {
      // return updated list
      const sortType = request.params.sortType;
      const result = await dbObject.collection('orders').find().toArray();
      sortResults(sortType, false, result);
      response.json(result);
   });

   server.put("/order/:id/:status", async (request, response) => {
      const orderId = request.params.id;
      const newStatus = request.params.id;
      const order = request.body;
      request.body.orderId = orderId;
      console.log("Editing item: ", orderId, " to be ", order);

      const result = await dbObject.collection('orders').updateOne({ orderId: orderId }, { $set: order });
      response.json(result);
   });

   server.delete("/order/:id", async (request, response) => {
    const orderId = request.params.id;
    request.body.orderId = orderId;
      console.log("Delete item with id: ", orderId);

      const deleteResult = await dbObject.collection('orders').deleteOne({ orderId: orderid });
         // send back entire updated list after successful request
        //  const findResult = await dbObject.collection('orders').find().toArray(response.json(_result));
        //  });
        response.json(deleteResult);
      });

  //  Cart
  server.get("/cart/:id", async (request, response) => {
    const cartId = request.params.id;

    const result = await dbObject.collection('carts').findOne({ cartId: cartId })
       response.json(result);
  });

  server.post("/cart/:id", async (request, response) => {
    const cartId = request.params.id;
    request.body.cartId = cartId;
    delete request.body._id;
    const result = await dbObject.collection('carts').updateOne({ cartId: cartId },{ $set : request.body}, { upsert: true });
    response.json(result);
  });

//   server.put("/cart/:id", async (request, response) => {
//     const cartId = request.params.id;
//     const cart = request.body;
//     request.body.cartId = cartId;
//     const result = await dbObject.collection('carts').updateOne({ cartId: cartId }, { $set: cart });
//     response.json(result);
//  });

  // Products
  server.get("/products/:sortType", async (request, response) => {
    // return updated list
    const sortType = request.params.sortType;
    const result = await dbObject.collection('products').find().toArray();
    sortResults(sortType, true, result);
    response.json(result);
 });

 server.get("/product/:id", async (request, response) => {
  const productId = request.params.id;
  const result = await dbObject.collection('products').findOne({ productId: parseInt(productId) })
     response.json(result);
});

function sortResults(prop, asc, result) {
  result.sort(function(a, b) {
      if (asc) {
          return (a[prop] > b[prop]) ? 1 : ((a[prop] < b[prop]) ? -1 : 0);
      } else {
          return (b[prop] > a[prop]) ? 1 : ((b[prop] < a[prop]) ? -1 : 0);
      }
  });
}

}, function (err) { // failureCallback
   throw (err);
});

server.listen(port, () => {
   console.log(`Server listening at ${port}`);
});
