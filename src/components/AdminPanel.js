import "primeflex/primeflex.css";
import { Badge } from "primereact/badge";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { MegaMenu } from "primereact/megamenu";
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/saga-blue/theme.css";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../features/auth/authSlice";
import NotificationCard from "./NotificationCard";
import SosCallDetailsCard from "./SosCallDetailsCard";
import UserCard from "./UserCard";
import ModelForm from "./ModelForm";

const AdminPanel = () => {
  const dispatch = useDispatch();
  const [showNotification, setShowNotification] = useState(false);
  const [showSos, setShowSos] = useState(false);
  const [showUsers, setShowUsers] = useState(true);
  const [showUserForm, setshowUserForm] = useState(false);
  const sessionToken = useSelector((state) => state.auth?.user?.user);

  const handleLogout = () => {
    dispatch(logoutUser(sessionToken));
  };

  const data = {
    labels: ["January", "February", "March", "April"],
    datasets: [
      {
        label: "Sales",
        backgroundColor: "#42A5F5",
        data: [65, 59, 80, 81],
      },
    ],
  };

  const pieData = {
    labels: ["Product A", "Product B", "Product C"],
    datasets: [
      {
        data: [300, 50, 100],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      },
    ],
  };

  const megaMenuItems = [
    {
      label: "Users",
      command: () => {
        setShowNotification(false);
        setShowSos(false);
        setShowUsers(true);
        setshowUserForm(false);
      },
    },
    {
      label: "Notifications",
      command: () => {
        setShowNotification(true);
        setShowSos(false);
        setShowUsers(false);
        setshowUserForm(false);
      },
    },
    {
      label: "Add User",
      command: () => {
        setShowSos(false);
        setShowNotification(false);
        setShowUsers(false);
        setshowUserForm(true);
      },
    },
    {
      label: "SOS",
      command: () => {
        setShowSos(true);
        setShowNotification(false);
        setShowUsers(false);
        setshowUserForm(false);
      },
    },
    {
      separator: true,
    },
  ];

  return (
    <div className="p-p-4">
      <div className="p-d-inline col-12 flex">
        <h2 className="col-11">Admin Panel</h2>
        <span className="col-1 pt-5">
          <i className="pi pi-bell" style={{ fontSize: "2rem" }} />
          <Badge className="-mt-9" value={5} severity="danger" />
        </span>
      </div>

      <MegaMenu
        model={megaMenuItems}
        end={
          <Button
            label="Logout"
            icon="pi pi-sign-out"
            className="p-button-danger p-button-outlined"
            onClick={handleLogout}
          />
        }
      />
      <div className="p-grid">
        {showUsers && (
          <div className="p-col-12 p-md-6">
            <UserCard />
          </div>
        )}
        {showUserForm && (
          <div className="p-col-12 p-md-6">
            <ModelForm />
          </div>
        )}
        {showNotification && (
          <div className="p-col-12 p-md-6">
            <NotificationCard />
          </div>
        )}
        {showSos && (
          <div className="p-col-12 p-md-6">
            <SosCallDetailsCard />
          </div>
        )}

        <div className="p-col-12 p-md-4">
          <Card title="Users" className="p-mb-4">
            <h3>3,500</h3>
            <p>Active users this month</p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
