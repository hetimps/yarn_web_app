import styled from '@emotion/styled';
import MuiAppBar from '@mui/material/AppBar';

// AppBar

const drawerWidth = 240;

 export const AppBar = styled(MuiAppBar, {

    shouldForwardProp: (prop) => prop !== 'open',

})(({ theme, open }) => ({
    transition: theme.transitions?.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions?.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

//Drawer

export const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));