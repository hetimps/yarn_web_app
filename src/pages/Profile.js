import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import AppBars from '../Components/ComonComponent/AppBar';
import Drawers from '../Components/ComonComponent/Drawers';
import QualityTable from '../Components/QualityComponent/QualityTable';
import { DrawerHeader, Main } from "../Components/Page_Comon_Components/Page_Comon_Component"
import { useProfileQuery } from '../api/Auth';
import ProfilePage from '../Components/ProfileComponent/ProfilePage';

export default function Profile() {
  const { data: Userdata, isFetchings: UserisFetching, refetch: userRefetch } = useProfileQuery({}, { refetchOnMountOrArgChange: true });
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBars haddings="Profile" Userdata={Userdata} />
      <Drawers />
      <Main open={true} >
        <DrawerHeader />
        <ProfilePage Userdata={Userdata?.result} UserisFetching={UserisFetching} userRefetch={userRefetch} />
      </Main>
    </Box>
  );
}