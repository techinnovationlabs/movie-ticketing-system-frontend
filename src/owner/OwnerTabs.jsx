import React from "react";
import { useHistory } from "react-router";
import { Tabs } from "antd";
import Screens from "./List/Screens";
import ShowTimings from "./List/ShowTimings";
import Users from "./List/Users";

const { TabPane } = Tabs;

const OwnerTabs = () => {
  const history = useHistory();
  const { pathname, search } = history.location;

  const changeHandler = (key) => {
    history.push({
      pathname,
      search: `?tab=${key}`,
    });
  };

  return (
    <Tabs
      defaultActiveKey={search.replace("?tab=", "")}
      onChange={changeHandler}
    >
      <TabPane tab="Screens" key="screen">
        <Screens />
      </TabPane>
      <TabPane tab="Shows" key="showtime">
        <ShowTimings />
      </TabPane>
      <TabPane tab="Users" key="users">
        <Users />
      </TabPane>
    </Tabs>
  );
};

export default OwnerTabs;
