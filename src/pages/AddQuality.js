import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import AppBars from '../Components/ComonComponent/AppBar/index';
import Drawers from '../Components/ComonComponent/Drawer/index';
import { DrawerHeader, Main } from "../Components/PageComonComponents/PageComonComponent"
import AddQualityForm from '../Components/QualityComponent/AddQualityForm';
import { useProfileQuery } from '../api/Auth';

export default function AddQuality() {
  const { data: Userdata } = useProfileQuery({}, { refetchOnMountOrArgChange: true });
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBars haddings="Quality" Userdata={Userdata} />
      <Drawers />
      <Main open={true}>
        <DrawerHeader />
        <AddQualityForm />
      </Main>
    </Box>
  );
}