import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';

import AppBars from '../Components/ComonComponent/AppBar';
import Drawers from '../Components/ComonComponent/Drawers';


import { DrawerHeader, Main } from "../Components/Page_Comon_Components/Page_Comon_Component"
import EditQualityForm from '../Components/QualityComponent/EditQualityForm';



export default function EditQuality() {
  return (
    <Box sx={{ display: 'flex' }}>

      <CssBaseline/>
      <AppBars haddings="Quality" />
      <Drawers/>

      <Main open={true}>
        <DrawerHeader />
        <EditQualityForm/>
      </Main>
    </Box>
  );
}