// src/pages/AdminPanel.tsx
import React, { useState, useEffect, useRef } from 'react';
import { Box, Tabs, Tab, Typography, Container, Paper } from '@mui/material';
import { People, Article, Settings, BarChart } from '@mui/icons-material';
import { gsap } from 'gsap';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (value === index) {
      gsap.fromTo(panelRef.current, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.4 });
    }
  }, [value, index]);

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`admin-tabpanel-${index}`}
      aria-labelledby={`admin-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }} ref={panelRef}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `admin-tab-${index}`,
    'aria-controls': `admin-tabpanel-${index}`,
  };
}

const AdminPanel: React.FC = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Container maxWidth="lg">
      <Paper sx={{ mt: 4, p: 2 }}>
        <Typography variant="h4" sx={{ p: 2 }}>Admin Panel</Typography>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="admin panel tabs">
            <Tab icon={<Article />} label="Content Management" {...a11yProps(0)} />
            <Tab icon={<People />} label="User Management" {...a11yProps(1)} />
            <Tab icon={<BarChart />} label="Analytics" {...a11yProps(2)} />
            <Tab icon={<Settings />} label="Site Settings" {...a11yProps(3)} />
          </Tabs>
        </Box>
        
        <TabPanel value={value} index={0}>
          <Typography variant="h6">Content Management</Typography>
          <Typography>This is where you'll manage all blog posts. The "Upload & Convert" feature will be built here.</Typography>
          {/* Placeholder for the upload feature */}
        </TabPanel>
        
        <TabPanel value={value} index={1}>
          <Typography variant="h6">User Management</Typography>
          <Typography>View, edit, and manage user roles and permissions.</Typography>
          {/* Placeholder for user management table */}
        </TabPanel>
        
        <TabPanel value={value} index={2}>
          <Typography variant="h6">Analytics</Typography>
          <Typography>View site-wide statistics, traffic sources, and popular content.</Typography>
          {/* Placeholder for analytics charts */}
        </TabPanel>
        
        <TabPanel value={value} index={3}>
          <Typography variant="h6">Site Settings</Typography>
          <Typography>Configure site name, logo, theme, and integrations.</Typography>
          {/* Placeholder for site settings form */}
        </TabPanel>
      </Paper>
    </Container>
  );
};

export default AdminPanel;