import { Fragment } from "react/cjs/react.production.min";

function MeetupDetails() {
  return (
    <Fragment>
      <img
        src="http://k3y.4a3.myftpupload.com/wp-content/uploads/2020/02/RanchoVistosoMonument-0058_59_60.jpg"
        alt="A First Meetup"
      />
      <h1>A First Meetup</h1>
      <address>Some Street</address>
      <p>The meetup description</p>
    </Fragment>
  );
}

// needed if its a dynamic page and using getstaticprops.
// generates the dynamic paths during build to be used by user. error if wrong path used.
export async function getStaticPaths() {
  return {
    // fallback tells whether your paths array contains all supported paramater values or just some.
    // Allows you to generate some values in JS code. ex. Pre generate most popular pages
    // False = contains all supported paths.
    fallback: false,
    paths: [
      {
        params: {
          meetupID: "m1",
        },
      },
      {
        params: {
          meetupID: "m2",
        },
      },
    ],
  };
}

export async function getStaticProps(context) {
  //fetch data for a single meetup

  // gets the dynamic values encoded in the URL. In this case, the [meetupID]
  const meetupID = context.params.meetupID;

  console.log(meetupID);

  return {
    props: {
      meetupData: {
        image:
          "http://k3y.4a3.myftpupload.com/wp-content/uploads/2020/02/RanchoVistosoMonument-0058_59_60.jpg",
        id: meetupID,
        title: "First Meetup",
        address: "Some street 4, some city",
        description: "This is a dummy meetup",
      },
    },
    revalidate: 1,
  };
}
export default MeetupDetails;
