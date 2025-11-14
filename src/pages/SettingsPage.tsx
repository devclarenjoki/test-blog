// src/pages/SettingsPage.tsx
import React, { useRef, useEffect } from 'react';
import { List, ListItem, ListItemText, Switch, ListItemIcon, Divider } from '@mui/material';
import { DarkMode, Notifications, Lock, Person } from '@mui/icons-material';
import { gsap } from 'gsap';
import { useAuth } from '../context/AuthContext';

const SettingsPage: React.FC = () => {
  const { user } = useAuth();
  const listRef: any = useRef<HTMLUListElement | any>(null);

  useEffect(() => {
    // Stagger animation for list items
    gsap.fromTo(listRef.current, { opacity: 0, x: -20 }, { opacity: 1, x: 0, stagger: 0.1, duration: 0.5 });
  }, []);

  // ... logic to handle state changes for each setting

  return (
    <List sx={{ width: '100%', maxWidth: 600, bgcolor: 'background.paper' }} ref={listRef}>
      <ListItem>
        <ListItemIcon><Person /></ListItemIcon>
        <ListItemText primary="Edit Profile" secondary="Change your name, bio, and photo" />
      </ListItem>
      <Divider />
      <ListItem>
        <ListItemIcon><Lock /></ListItemIcon>
        <ListItemText primary="Change Password" secondary="Update your password to keep your account secure" />
      </ListItem>
      <Divider />
      <ListItem>
        <ListItemIcon><Notifications /></ListItemIcon>
        <ListItemText primary="Email Notifications" />
        <Switch edge="end" />
      </ListItem>
      <Divider />
      <ListItem>
        <ListItemIcon><DarkMode /></ListItemIcon>
        <ListItemText primary="Dark Mode" />
        <Switch edge="end" />
      </ListItem>
    </List>
  );
};

export default SettingsPage;