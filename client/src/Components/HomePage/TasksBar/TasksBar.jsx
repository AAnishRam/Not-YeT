import React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Overview from "../Overview/Overview";
import TaskBoard from "../Lists/TaskBoard";
import DocsBot from "../../DocsPage/ChatBot/DocsBot";
import Messages from "../Messages/Messages";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Overview" {...a11yProps(0)} />
          <Tab label="List" {...a11yProps(1)} />
          <Tab label="Dashboard" {...a11yProps(2)} />
          <Tab label="Calendar" {...a11yProps(3)} />
          <Tab label="Workflow" {...a11yProps(4)} />
          <Tab label="Messages" {...a11yProps(5)} />
          <Tab label="Files" {...a11yProps(6)} />
          <Tab label="Docs" {...a11yProps(7)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <Overview />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <TaskBoard />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        Dashboard
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        Calendar
      </CustomTabPanel>
      <CustomTabPanel value={value} index={4}>
        Workflow
      </CustomTabPanel>
      <CustomTabPanel value={value} index={5}>
        <Messages />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={6}>
        Files
      </CustomTabPanel>
      <CustomTabPanel value={value} index={7}>
        <DocsBot></DocsBot>
      </CustomTabPanel>
    </Box>
  );
}
