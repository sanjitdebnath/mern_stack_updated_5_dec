const express = require("express");
const app = express();
const cors = require('cors');
const { MongoClient, ObjectId } = require('mongodb');

app.use(express.json());
app.use(cors());

// const uri = 'mongodb://localhost:27017';
const uri = "mongodb+srv://mernStackProject:mernproject123@mernstackproject.b0tlawo.mongodb.net/?retryWrites=true&w=majority";
const dbName = 'mernstackproject';
const collectionName = 'userdata';
const client = new MongoClient(uri);

async function insertData(name, age, email) {
  try {
    const dataToInsert = { name, age, email };
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    const result = await collection.insertOne(dataToInsert);
    console.log(result.insertedId);
  } catch (err) {
    console.error('Error inserting data:', err);
  } finally {
    await client.close();
  }
}

async function fetchData() {
  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    const documents = await collection.find({}).toArray();
    return documents;
  } catch (err) {
    console.error('Error fetching data:', err);
  } finally {
    await client.close();
  }
}

async function fetchSingleData(documentId) {
  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    const documents = await collection.findOne({_id: new ObjectId(documentId)});
    return documents;
  } catch (err) {
    console.error('Error fetching data:', err);
  } finally {
    await client.close();
  }
}

async function UpdateData(id,data) {
  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    const result = await collection.updateOne(
      {_id: new ObjectId(id)},
      { $set: data }
    );

    if (result.modifiedCount > 0) {
      console.log('Document updated successfully');
      return 'success';
    } else {
      console.log('No document matched the filter criteria');
      return 'failed';
    }
  } catch (err) {
    console.error('Error updating data:', err);
    return 'failed'; // Return 'failed' in case of an error
  } finally {
    await client.close();
  }
}


async function deleteData(documentId) {
  
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    // Delete a document based on the specified username
    const result = await collection.deleteOne({ _id: new ObjectId(documentId) });
    if (result.deletedCount > 0) {
      return "success";
      console.log('Document deleted successfully');
    } else {
      return 'No document match ed the filter criteria';
      console.log('No document matched the filter criteria');
    }
  } catch (err) {
    console.error('Error: ', err);
  } finally {
    // Close the connection
    await client.close();
  }
}


app.post('/fetch_single_user', async (req, res) => {
  const {val } = req.body;
  const result = await fetchSingleData(val);
  res.send({ status: "success", data: result });
});

app.post('/insert_user', async (req, res) => {
  const { name, age, email } = req.body;
  await insertData(name, age, email);
  res.send({ status: "ok" });
});

app.get('/fetch_user', async (req, res) => {
  const result = await fetchData();
  res.send({ status: "success", data: result });
});

app.put('/update_user', async (req, res) => {
  const {id,body} = req.body;
  const result = await UpdateData(id,body);
  res.send({ status: "success", message : result });
});

app.post('/delete_user', async (req, res) => {
  const { id } = req.body;
  // console.log(id);
  $result = await deleteData(id);
  res.send({ status: "ok",message : $result });
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});


