import { Divider, IconButton, Stack, SwipeableDrawer, Typography, Toolbar } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import DrawerList from '../DrawerList/DrawerList';
import { Link } from 'react-router-dom';
import { BiCollapse } from 'react-icons/bi';

const MobileDrawer = () => {
    const [open, setOpen] = useState(false)
    const theme = useTheme()
    const colorPrimary = theme.palette.primary.main
    return (
        <>
            <IconButton
                disableRipple
                size='large'
                onClick={() => setOpen(!open)}
                sx={{
                    color: 'primary.contrastText',
                    pl: 0,
                    display: { xs: 'block', sm: 'none' }
                }}
            >
                <MenuIcon sx={{ fontSize: 28 }} />
            </IconButton>
            <SwipeableDrawer
                anchor='left'
                open={open}
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                sx={{
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: { boxSizing: 'border-box', backgroundColor: '#111826', color: 'primary.contrastText' },
                }}
                PaperProps={{
                    sx: { width: "90%" },
                }}
            >
                <Toolbar sx={{justifyContent:'space-between'}}>
                    <Link to={'/'} style={{ textDecoration: 'none' }}>
                        <Stack direction={'row'} alignItems={'center'}>
                            <BiCollapse size={36} style={{ marginRight: '0.5rem', color: `${colorPrimary}` }} />
                            <Typography color={'secondary'} variant="h6" component="div">
                                Shortly
                            </Typography>
                        </Stack>
                    </Link>
                    <IconButton onClick={()=>setOpen(false)}>
                        <CloseIcon sx={{color:'#fff'}}/>
                    </IconButton>
                </Toolbar>
                <Divider />
                <DrawerList setOpen={setOpen} />
            </SwipeableDrawer>
        </>
    );
};

export default MobileDrawer;