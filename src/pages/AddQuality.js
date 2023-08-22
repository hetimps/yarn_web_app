import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';

import AppBars from '../Components/ComonComponent/AppBar';
import Drawers from '../Components/ComonComponent/Drawers';


import { DrawerHeader, Main } from "../Components/Page_Comon_Components/Page_Comon_Component"
import AddQualityForm from '../Components/QualityComponent/AddQualityForm';


export default function AddQuality() {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBars haddings="Quality" />
      <Drawers />

      <Main open={true}>
        <DrawerHeader />
        <AddQualityForm />
      </Main>
    </Box>
  );
}