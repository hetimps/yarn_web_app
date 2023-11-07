import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';

import AppBars from '../Components/ComonComponent/AppBar';
import Drawers from '../Components/ComonComponent/Drawers';


import { DrawerHeader, Main } from "../Components/Page_Comon_Components/Page_Comon_Component"
import AddQualityForm from '../Components/QualityComponent/AddQualityForm';
import { useProfileQuery } from '../api/Auth';


export default function AddQuality() {
  const { data: Userdata, isFetchings: UserisFetching, refetch: userRefetch } = useProfileQuery({}, { refetchOnMountOrArgChange: true });
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBars haddings="Quality"  Userdata={Userdata} />
      <Drawers />
      <Main open={true}>
        <DrawerHeader />
        <AddQualityForm />
      </Main>
    </Box>
  );
}