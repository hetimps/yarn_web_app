import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import AppBars from '../Components/ComonComponent/AppBar/index';
import Drawers from '../Components/ComonComponent/Drawer/index';
import { DrawerHeader, Main } from "../Components/PageComonComponents/PageComonComponent"
import { useProfileQuery } from '../api/Auth';
import YarnTable from '../Components/YarnComponent/YarnTable';

export default function Profile() {
  const { data: Userdata, isFetchings: UserisFetching} = useProfileQuery({}, { refetchOnMountOrArgChange: true });
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBars haddings="Yarn" Userdata={Userdata} />
      <Drawers />
      <Main open={true}>
        <DrawerHeader />
        <YarnTable Userdata={Userdata} UserisFetching={UserisFetching} />
      </Main>
    </Box>
  );
}