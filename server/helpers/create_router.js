const express = require('express');
const ObjectID = require('mongodb').ObjectID;

const createRouter = function(collection) {

  const router = express.Router();
  // show
  router.get('/:id', (req, res) => {
    const id = req.params.id;

    collection
    .findOne({_id: ObjectID(id)})
    .then((doc) => res.json(doc))
    .catch((err) => {
      console.error(err);
      res.status(500);
      res.json({status: 500, error: err});
    });
  });
  //create
  router.post('/', (req, res) => {
    const newData = req.body;

    collection
    .insertOne(newData)
    .then((result) => {
      res.json(result.ops[0]);
    })
    .catch((err) => {
      console.error(err);
      res.status(500);
      res.json({status: 500, error: err});
    });
  });
  //update
  router.put('/:id', (req, res) => {
    const id = req.params.id;
    const updatedData = req.body;
    delete updatedData._id;

    collection
    .findOneAndUpdate({_id: ObjectID(id)}, {
      $set: updatedData})
      .then(result => {
        res.json(result.value);
      })
      .catch((err) => {
        res.status(500);
        res.json({status: 500, error: err});
      });
    });
    return router;
  };

module.exports = createRouter;