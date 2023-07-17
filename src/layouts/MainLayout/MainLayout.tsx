import { Typography, Container, AppBar, Toolbar, Button, Box, Stack } from '@mui/material'
import { useTheme } from '@mui/material/styles';
import { BiCollapse, BiLogoFacebook, BiLogoTwitter, BiCopyright } from "react-icons/bi";

interface Props {
    children: JSX.Element[] | JSX.Element
  }

function MainLayout({children}:Props) {
    const theme = useTheme()
    const colorPrimary = theme.palette.primary.main
    return (
        <Container maxWidth='xl'>
            <Box sx={{ minHeight: '100vh' }}>
                {/* --------Header Start------- */}
                <AppBar position="static" elevation={0} sx={{ background: 'transparent', mb: '5rem' }}>
                    <Toolbar disableGutters={true}>
                        <BiCollapse size={36} style={{ marginRight: '0.5rem', color: `${colorPrimary}` }} />
                        <Typography color={'secondary'} variant="h6" component="div" sx={{ flexGrow: 1, }}>
                            Shortly
                        </Typography>
                        <Button color="secondary">All links</Button>
                    </Toolbar>
                </AppBar>
                {/* --------Header End------- */}
                {children}
            </Box>

            {/* --------Footer Start------- */}
            <Stack direction={'row'} gap={'0.75rem'} alignItems={'center'} sx={{ padding: '1rem 0' }}>
                <BiCollapse size={36} style={{ color: `${colorPrimary}` }} />
                <Typography color={'secondary'} variant="h6" component="div">
                    Shortly
                </Typography>
                <Box sx={{ height: '2rem', width: '0.0625rem', background: '#fff' }} />
                <Stack direction={'row'} gap={'0.125rem'} alignItems={'center'} sx={{ flexGrow: 1, }}>
                    <BiCopyright size={14} />
                    <Typography variant='body2'>
                        2023 Shortly - <span style={{ color: `${colorPrimary}` }}>@arifur2023</span>
                    </Typography>
                </Stack>
                <BiLogoFacebook size={22} />
                <BiLogoTwitter size={22} />
            </Stack>
            {/* --------Footer End------- */}
        </Container>
    )
}

export default MainLayout