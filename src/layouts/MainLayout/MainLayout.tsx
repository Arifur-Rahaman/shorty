import { Typography, Container, AppBar, Toolbar, Button, Box, Stack } from '@mui/material'
import { useTheme } from '@mui/material/styles';
import { BiCollapse, BiLogoFacebook, BiLogoTwitter, BiCopyright } from "react-icons/bi";
import { Link, useNavigate } from 'react-router-dom';

interface Props {
    children: JSX.Element[] | JSX.Element
}

function MainLayout({ children }: Props) {
    const navigate = useNavigate()
    const theme = useTheme()
    const colorPrimary = theme.palette.primary.main
    return (
        <Container
            maxWidth='xl'
            sx={{
                pb: '1rem',
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
            }}
        >
            <Box>
                {/* --------Header Start------- */}
                <AppBar position="static" elevation={0} sx={{ background: 'transparent', mb: { xs: '2rem', sm: '5rem' } }}>
                    <Toolbar disableGutters={true} sx={{gap:'2rem'}}>
                        <Link to={'/'} style={{textDecoration:'none', flexGrow:1 }}>
                            <Stack direction={'row'} alignItems={'center'}>
                                <BiCollapse size={36} style={{ marginRight: '0.5rem', color: `${colorPrimary}` }} />
                                <Typography color={'secondary'} variant="h6" component="div">
                                    Shortly
                                </Typography>
                            </Stack>
                        </Link>
                        <Button
                            onClick={() => navigate('/')}
                            color="secondary"
                        >
                            Home
                        </Button>
                        <Button
                            onClick={() => navigate('/urls')}
                            color="secondary"
                        >
                            All links
                        </Button>
                    </Toolbar>
                </AppBar>
                {/* --------Header End------- */}

                {children}
            </Box>

            {/* --------Footer Start------- */}
            <Box>
                <Stack
                    direction={'row'}
                    gap={'0.75rem'}
                    alignItems={'center'}
                    justifyContent={'center'}
                    sx={{
                        padding: { xs: '0.5rem 0', sm: '1rem 0' },
                    }}
                >
                    <BiCollapse size={36} style={{ color: `${colorPrimary}` }} />
                    <Typography color={'secondary'} variant="h6" component="div">
                        Shortly
                    </Typography>
                    <Box sx={{
                        height: '2rem',
                        width: '0.0625rem',
                        background: '#fff',
                        display: {
                            xs: 'none',
                            sm: 'block'
                        }
                    }}
                    />
                    <Stack
                        direction={'row'}
                        gap={'0.125rem'}
                        alignItems={'center'}
                        sx={{ flexGrow: 1, display: { xs: 'none', sm: 'flex' } }}>
                        <BiCopyright size={14} />
                        <Typography variant='body2'>
                            2023 Shortly - <span style={{ color: `${colorPrimary}` }}>@arifur2023</span>
                        </Typography>
                    </Stack>
                    <BiLogoFacebook size={22} />
                    <BiLogoTwitter size={22} />
                </Stack>

                {/* For Mobile*/}
                <Stack
                    direction={'row'}
                    gap={'0.125rem'}
                    alignItems={'center'}
                    justifyContent={'center'}
                    sx={{ flexGrow: 1, display: { sm: 'none' } }}
                >
                    <BiCopyright size={14} />
                    <Typography variant='body2'>
                        2023 Shortly - <span style={{ color: `${colorPrimary}` }}>@arifur2023</span>
                    </Typography>
                </Stack>
            </Box>
            {/* --------Footer End------- */}

        </Container>
    )
}

export default MainLayout