import axios from "axios";
import { Card } from "primereact/card";
import React, { useEffect, useState } from "react";
import { Spinner } from "./Spinner"; // import the Spinner component
import { useSelector } from "react-redux";

export default function AdvancedDemo() {
  const [userData, setUserData] = useState([]); // initialize an empty array to store user data
  const [loading, setLoading] = useState(true); // add a loading state to track when data is being fetched
  const sessionToken = useSelector((state) => state.user?.user?.sessionToken);
  useEffect(() => {
    // make API request to fetch user data
    axios
      .get("http://localhost:3002/travelserver/v1/auth/users", {
        headers: {
          Authorization: `Bearer ${sessionToken}`,
        },
      }) // replace with your API URL
      .then((response) => {
        setUserData(response.data.data);
        setLoading(false); // set loading to false when data is received
      })
      .catch((error) => {
        console.error(error);
        setLoading(false); // set loading to false even if there's an error
      });
  }, []);

  return (
    <div className="card flex justify-content-center w-full ">
      {loading ? (
        <Spinner /> // display the Spinner component while data is being fetched
      ) : (
        userData.map((user) => (
          <Card
            key={user.id}
            title={user.name}
            subTitle={user.email}
            header={<img alt="Card" src={user.image} />}
            className=" w-full m-2 border-rounded-xl shadow-6 "
          >
            <p className="m-0">
              Phone: {user.phone}
              <br />
              Address: {user.address}
            </p>
          </Card>
        ))
      )}
    </div>
  );
}
