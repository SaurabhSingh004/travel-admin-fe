import axios from "axios";
import "primeflex/primeflex.css";
import { Card } from "primereact/card";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Spinner } from "./Spinner"; // import the Spinner component

const SosCallDetailsCard = () => {
  const [data, setData] = useState([]); // initialize an empty array to store API data
  const [loading, setLoading] = useState(true); // add a loading state to track when data is being fetched
  const sessionToken = useSelector((state) => state.auth?.user?.sessionID);
  const newsessionToken = useSelector((state) => state.auth?.user);
  useEffect(() => {
    console.log(sessionToken);
    // make API request to fetch SOS call data
    axios
      .get("http://localhost:3002/travelserver/v1/sos/sos-calls", {
        headers: {
          Authorization: `Bearer ${sessionToken}`,
        },
      }) // replace with your API URL
      .then((response) => {
        setData(response.data.data);
        console.log(response.data);
        setLoading(false); // set loading to false when data is received
      })
      .catch((error) => {
        console.error(error);
        setLoading(false); // set loading to false even if there's an error
      });
  }, []);
  return (
    <div className="grid grid-nogutter">
      {loading ? (
        <Spinner /> // display the Spinner component while data is being fetched
      ) : (
        data?.map((item) => (
          <div key={item.id} className="col-12 p-4 ">
            <Card
              title={item.title}
              subTitle={item.subTitle}
              style={{
                marginBottom: "2em",
                backgroundColor: "#f7f7f7",
                boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
                borderRadius: "10px",
                transition: "all 0.3s ease-in-out",
              }}
              className="shadow-2 w-full shadow-6 border-3 border-solid border-red-500"
            >
              <div className="flex col-12  ">
                <div className=" col-4 shadow-3 ">
                  <div className="flex justify-content-center">
                    <h3
                      className="text-bold text-uppercase"
                      style={{ color: "#2196f3" }}
                    >
                      Call Details:
                    </h3>
                  </div>
                  <div className="flex flex-wrap justify-content-between">
                    <div className="flex-1">
                      <div className="flex flex-column">
                        <p className="text-bold" style={{ color: "#666" }}>
                          Call Type:
                        </p>
                        <p style={{ color: "#333" }}>{item.callType}</p>
                      </div>
                      <div className="flex flex-column">
                        <p className="text-bold" style={{ color: "#666" }}>
                          Call Time:
                        </p>
                        <p style={{ color: "#333" }}>{item.callTime}</p>
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-column">
                        <p className="text-bold" style={{ color: "#666" }}>
                          Call Status:
                        </p>
                        <p style={{ color: "#333" }}>{item.callStatus}</p>
                      </div>
                      <div className="flex flex-column">
                        <p className="text-bold" style={{ color: "#666" }}>
                          Call Location:
                        </p>
                        <p style={{ color: "#333" }}>{item.callLocation}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className=" col-4 shadow-3 ">
                  <div className="flex justify-content-center">
                    <h4
                      className="text-bold text-uppercase"
                      style={{ color: "#2196f3" }}
                    >
                      Caller Information:
                    </h4>
                  </div>

                  <div className="flex flex-wrap justify-content-between">
                    <div className="flex-1">
                      <div className="flex flex-column">
                        <p className="text-bold" style={{ color: "#666" }}>
                          Name:
                        </p>
                        <p style={{ color: "#333" }}>{item.callerName}</p>
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-column">
                        <p className="text-bold" style={{ color: "#666" }}>
                          Phone Number:
                        </p>
                        <p style={{ color: "#333" }}>
                          {item.callerPhoneNumber}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className=" col-4 shadow-3 ">
                  <div className="flex justify-content-center">
                    <h4
                      className="text-bold text-uppercase"
                      style={{ color: "#2196f3" }}
                    >
                      Responder Information:
                    </h4>
                  </div>
                  <div className="flex flex-wrap justify-content-between">
                    <div className="flex-1">
                      <div className="flex flex-column">
                        <p className="text-bold" style={{ color: "#666" }}>
                          Name:
                        </p>
                        <p style={{ color: "#333" }}>{item.responderName}</p>
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-column">
                        <p className="text-bold" style={{ color: "#666" }}>
                          Phone Number:
                        </p>
                        <p style={{ color: "#333" }}>
                          {item.responderPhoneNumber}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        ))
      )}
    </div>
  );
};

export default SosCallDetailsCard;
