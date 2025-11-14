// src/pages/ProfilePage.tsx
import React, { useRef, useEffect } from 'react';
import { Grid, Avatar, Typography, Tabs, Tab, Box, Card, CardContent } from '@mui/material';
import { gsap } from 'gsap';
import { useAuth } from '../context/AuthContext';

const ProfilePage: React.FC = () => {
  const { user } = useAuth();
//   const { userId } = useParams();
  const profileData = user; // In a real app, fetch data based on userId

  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.fromTo(leftColRef.current, { x: -50, opacity: 0 }, { x: 0, opacity: 1, duration: 0.8 });
    gsap.fromTo(rightColRef.current, { x: 50, opacity: 0 }, { x: 0, opacity: 1, duration: 0.8, delay: 0.2 });
  }, []);

  // ... logic for tabs and fetching user's posts, followers, etc.

  return (
    <Grid container spacing={4} sx={{ p: 3 }}>
      <Grid size={{xs:12, md:4}} ref={leftColRef}>
        <Box sx={{ textAlign: 'center' }}>
          <Avatar sx={{ width: 128, height: 128, mx: 'auto', mb: 2 }} src={profileData?.avatarUrl} />
          <Typography variant="h4">{profileData?.name}</Typography>
          <Typography variant="body2" color="text.secondary">{profileData?.role}</Typography>
          <Typography sx={{ mt: 2 }}>{profileData?.bio}</Typography>
          {/* Add social links here */}
        </Box>
      </Grid>
      <Grid size={{xs:12, md:8}} ref={rightColRef}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs aria-label="profile tabs">
            <Tab label="Posts" />
            <Tab label="Followers" />
            <Tab label="Following" />
          </Tabs>
        </Box>
        <Box sx={{ mt: 2 }}>
          {/* TabPanel content would go here */}
          <Card>
            <CardContent>
              <Typography>Recent posts by {profileData?.name} will appear here.</Typography>
            </CardContent>
          </Card>
        </Box>
      </Grid>
    </Grid>
  );
};

export default ProfilePage;