import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';

import AppBars from '../Components/ComonComponent/AppBar';
import Drawers from '../Components/ComonComponent/Drawers';
import QualityTable from '../Components/QualityComponent/QualityTable';

import {DrawerHeader, Main } from "../Components/Page_Comon_Components/Page_Comon_Component"


export default function Profile() {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBars haddings="Yarn" />
      <Drawers />

      <Main open={true}>
        <DrawerHeader />
        < QualityTable />
      </Main>
    </Box>
  );
}