import { MongoClient } from "mongodb";

// /api/new-meetup

async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;

    //This is what is in 'data'
    //const { title, image, address, description } = data;

    //needs a trycatch
    const client = await MongoClient.connect(
      "mongodb+srv://Chimuelo:12345@cluster0.jvc3z.mongodb.net/meetups?retryWrites=true&w=majority"
    );
    const db = client.db();

    const meetupsCollection = db.collection("meetups");

    const result = await meetupsCollection.insertOne(data);

    console.log(result);

    client.close();

    res.status(201).json({ message: "Meetup Inserted!" });
  }
}
export default handler;
