// src/pages/DashboardPage.tsx
import React, { useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import {
  Grid, Card, CardContent, Typography, Button, Box,
  List, ListItem, ListItemText
} from '@mui/material';
import { PostAdd, People, Assessment, EditNote } from '@mui/icons-material';
import { gsap } from 'gsap';

const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const cardsRef: any = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animate cards on mount
    gsap.fromTo(
      cardsRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, stagger: 0.15, duration: 0.6, ease: 'power2.out' }
    );
  }, []);

  const renderAuthorContent = () => (
    <>
      <Grid size={{xs:12, sm:6, md:4}}>
        <Card>
          <CardContent>
            <PostAdd sx={{ fontSize: 40, color: 'primary.main', mb: 2 }} />
            <Typography variant="h6">Your Drafts</Typography>
            <Typography variant="h4">3</Typography>
            <Button variant="contained" sx={{ mt: 2 }}>View Drafts</Button>
          </CardContent>
        </Card>
      </Grid>
      <Grid size={{xs:12, sm:6, md:4}}>
        <Card>
          <CardContent>
            <Assessment sx={{ fontSize: 40, color: 'secondary.main', mb: 2 }} />
            <Typography variant="h6">Total Views</Typography>
            <Typography variant="h4">12,543</Typography>
            <Typography variant="body2" color="text.secondary">+20% from last month</Typography>
          </CardContent>
        </Card>
      </Grid>
    </>
  );

  const renderEditorContent = () => (
    <>
      <Grid size={{xs:12, md:6}}>
        <Card>
          <CardContent>
            <EditNote sx={{ fontSize: 40, color: 'warning.main', mb: 2 }} />
            <Typography variant="h6">Posts Awaiting Review</Typography>
            <List>
              <ListItem><ListItemText primary="The Future of AI" secondary="by Jane Doe" /></ListItem>
              <ListItem><ListItemText primary="GSAP vs. Framer Motion" secondary="by John Smith" /></ListItem>
            </List>
            <Button variant="outlined">Review All</Button>
          </CardContent>
        </Card>
      </Grid>
      <Grid size={{xs:12, md:6}}>
        <Card>
          <CardContent>
            <People sx={{ fontSize: 40, color: 'info.main', mb: 2 }} />
            <Typography variant="h6">Manage Authors</Typography>
            <Typography variant="body2">View and manage all content creators.</Typography>
            <Button variant="contained" sx={{ mt: 2 }}>Go to Authors</Button>
          </CardContent>
        </Card>
      </Grid>
    </>
  );

  const renderAdminContent = () => (
    <Grid size={{xs:12}}>
      <Card>
        <CardContent>
          <Typography variant="h5" gutterBottom>Admin Overview</Typography>
          <Typography variant="body1">Welcome, {user?.name}. Here's a quick look at your platform.</Typography>
          <Box sx={{ mt: 3, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <Button variant="contained" color="primary" href="/admin">Open Full Admin Panel</Button>
            <Button variant="outlined">View Site Analytics</Button>
            <Button variant="outlined">Manage Settings</Button>
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Welcome back, {user?.name}!
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" gutterBottom>
        Role: {user?.role}
      </Typography>

      <Grid container spacing={3} ref={cardsRef}>
        {/* Admins see everything */}
        {user?.role === 'Admin' && renderAdminContent()}
        {user?.role === 'Admin' && renderEditorContent()}
        {user?.role === 'Admin' && renderAuthorContent()}

        {/* Editors see Editor and Author content */}
        {user?.role === 'Editor' && renderEditorContent()}
        {user?.role === 'Editor' && renderAuthorContent()}

        {/* Authors only see Author content */}
        {user?.role === 'Author' && renderAuthorContent()}
      </Grid>
    </Box>
  );
};

export default DashboardPage;