import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import AppBars from '../Components/ComonComponent/AppBar/index';
import Drawers from '../Components/ComonComponent/Drawer/index';
import { DrawerHeader, Main } from "../Components/PageComonComponents/PageComonComponent"
import UserList from '../Components/UserComponent/UserList';
import { useProfileQuery } from '../api/Auth';

export default function User() {
  const { data: Userdata, isFetchings: UserisFetching} = useProfileQuery({}, { refetchOnMountOrArgChange: true });
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBars haddings="User" Userdata={Userdata} />
      <Drawers />
      <Main open={true}>
        <DrawerHeader />
        < UserList Userdata={Userdata} UserisFetching={UserisFetching} />
      </Main>
    </Box>
  );
}