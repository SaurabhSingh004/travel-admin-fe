import React, { useState, useEffect } from "react";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import "primeflex/primeflex.css";

function NotificationCard() {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "Notification 1",
      description: "This is the first notification.",
      type: "INFO",
    },
    {
      id: 2,
      title: "SOS Alert",
      description: "This is an SOS alert.",
      type: "SOS",
    },
    {
      id: 3,
      title: "Notification 3",
      description: "This is the third notification.",
      type: "INFO",
    },
  ]);

  return (
    <div className="grid grid-nogutter mt-5 p-4">
      {notifications.map((notification) => (
        <div key={notification.id} className="col-12">
          <Card
            title={notification.title}
            subTitle={notification.description}
            style={{
              marginBottom: "2em",
              backgroundColor:
                notification.type === "SOS" ? "#FFC080" : "#FFFFFF",
              border:
                notification.type === "SOS"
                  ? "1px solid #FF0000"
                  : "1px solid #CCCCCC",
            }}
            className={`${
              notification.type === "SOS" ? "p-shadow-2" : ""
            } w-full`}
          >
            <Button label="View" className="p-button-secondary" />
          </Card>
        </div>
      ))}
    </div>
  );
}

export default NotificationCard;
