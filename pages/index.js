// import { useState } from "react";
// import { useEffect } from "react/cjs/react.development";
import { MongoClient } from "mongodb";
import MeetupList from "../components/meetups/MeetupList";

// const DUMMY_MEETUPS = [
//   {
//     id: "m1",
//     title: "A First Meetup",
//     image:
//       "http://k3y.4a3.myftpupload.com/wp-content/uploads/2020/02/RanchoVistosoMonument-0058_59_60.jpg",
//     address: "Some address 2, 234345 some city",
//     description: "This is a first meetup",
//   },
//   {
//     id: "m2",
//     title: "A Second Meetup",
//     image:
//       "http://k3y.4a3.myftpupload.com/wp-content/uploads/2020/02/RanchoVistosoMonument-0058_59_60.jpg",
//     address: "Watchate, 234345 some city",
//     description: "This is a second meetup",
//   },
// ];

function HomePage(props) {
  console.log("--Line26 HomePage()");
  //console.log(props);

  return <MeetupList meetups={props.meetups} />;
}

// Used when you need data changed a few times every second or when you need access to the complete server side object.
// export async function getServerSideProps(context) {
//   const req = context.req;
//   const res = context.res;

//   // fetch data from an API
//   return {
//     props: DUMMY_MEETUPS,
//   };
// }

// This never executes on client machine. can be used for server stuffs. faster than getServerSideProps. Fetch data from an API, DB, or files
export async function getStaticProps() {
  console.log("--Line42 getStaticProps()");
  //needs a trycatch
  const client = await MongoClient.connect(
    "mongodb+srv://Chimuelo:12345@cluster0.jvc3z.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetupsCollection = db.collection("meetups");
  //let meetups = await meetupsCollection.find({}, { _id: 0 });
  //const meetups = await meetupsCollection.find({}).project({ _id: 0 }).toArray();
  const meetups = await meetupsCollection.find().toArray();

  console.log("--Line 56 meetups");
  console.log(meetups);

  //const meetups = await meetupsCollection.find().toArray(function (err, //array) {resizeBy.send(array);
  //});
  //const meetups = await meetupsCollection.find();
  client.close();

  // let t = meetups[0].title.text();
  // let a = toString(meetup.address);
  // let i = toString(meetup.image);
  console.log("--Line63 testsfasdfas");
  return {
    props: {
      meetups: meetups.map((meetup) => ({
        // address: meetup.address,
        // title: meetup.title,
        // image: meetup.image,
        // description: meetup.description,
        // id: meetup._id.toString(),

        // id: meetup._id.toString(),
        // title: toString(meetup.title),
        // address: toString(meetup.address),
        // image: toString(meetup.image),

        id: meetup._id.toString(),
        title: String(JSON.stringify(meetup.title)),
        address: String(JSON.stringify(meetup.address)),
        image: String(JSON.stringify(meetup.image)),
      })),
    },
    // Used for things that update a lot. Unlocks Incremental Static Generation. Regenerates per seconds you put in.
    revalidate: 1,
  };
  console.log("--Line86 HomePage()");
  console.log(props);
  // console.log(meetup._id.toString());
  // console.log(meetup.title);
  // console.log(meetup.address);
  // console.log(meetup.image);

  // console.log(meetup._id.toString());
  // console.log(String(JSON.stringify(meetup.title)));
  // console.log(String(JSON.stringify(meetup.address)));
  // console.log(String(JSON.stringify(meetup.image)));

  // return {
  //   props: {
  //     meetups: meetups,
  //   },
  //   revalidate: 1, // Used for things that update a lot. Unlocks Incremental Static Generation. Regenerates per seconds you put in.
  // };
}

export default HomePage;
