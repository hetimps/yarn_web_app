import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import AppBars from '../Components/ComonComponent/AppBar/index';
import Drawers from '../Components/ComonComponent/Drawer/index';
import { DrawerHeader, Main } from "../Components/PageComonComponents/PageComonComponent"
import ViewQualityForm from '../Components/QualityComponent/ViewQualityForm';

export default function ViewQuality() {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline/>
      <AppBars haddings="Quality" />
      <Drawers/>
      <Main open={true}>
        <DrawerHeader />
        <ViewQualityForm/>
      </Main>
    </Box>
  );
}