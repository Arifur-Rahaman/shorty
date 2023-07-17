import { Typography, Container, Button, Grid, TextField, Box } from '@mui/material'
import { useTheme } from '@mui/material/styles';
// import { motion } from 'framer-motion';

function Home() {
  const theme = useTheme()
  const colorSecondary = theme.palette.secondary.main
  return (
    <Box>
      <Typography
        variant='h3'
        align='center'
        color={'primary'}
        sx={{ fontWeight: '700', mb: '0.5rem', fontSize: { xs: '2rem', sm: '3.25rem' } }}
      >
        Shorten your <span style={{ color: `${colorSecondary}` }}>loooooong</span> URLs <br /> like never before!
      </Typography>
      <Typography
        variant="body2"
        align='center'
        color={'white'}
        sx={{
          display: 'block',
          fontWeight: 400,
          fontSize: '0.85rem',
          mb: '3rem'
        }}
      >
        Copy your long boring url. Paste it below. Then you got it, right?
      </Typography>
      <Container maxWidth='sm' sx={{ mb: '5rem' }}>
        <Grid container spacing={2} alignItems={'center'}>
          <Grid item xs={12} sm={8} md={8}>
            <TextField
              variant="outlined"
              fullWidth
              sx={{
                "& .MuiInputBase-root": {
                  color: '#d8dbdf'
                },
                '&:focus-within fieldset, &:focus-visible fieldset': {
                  border: 'none !important',
                },
                background: '#374150',
                borderRadius: '8px'
              }}
              inputProps={{
                autoComplete: 'off',
              }}
              placeholder='Enter url here'
            />
          </Grid>
          <Grid item xs={12} sm={4} md={4}>
            <Button
              fullWidth
              variant='contained'
              color={'primary'}
              size='large'
              sx={{ paddingTop: '12px', paddingBottom: '12px' }}
            >
              Shorten url
            </Button>
          </Grid>
        </Grid>
        {/* <motion.a
          href="https://example.com"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            animation: 'blinking 1s infinite',
          }}
        >
          Click Me!
        </motion.a> */}
      </Container>
      <Box sx={{ mb: '2rem' }}>
        <Typography
          variant='h4'
          align='center'
          color={'secondary'}
          sx={{ fontWeight: 600, mb: '0.5rem' }}
        >
          Hoho!
        </Typography>
        <Typography
          align='center'
          variant="body2"
          color={'white'}
          sx={{
            display: 'block',
            fontWeight: 400,
            fontSize: '0.85rem',
            mb: '1rem'
          }}
        >
          Here are your recent shortened URLs! Now click navigate and enjoy shortly
        </Typography>
        {/* <Typography textAlign={'center'}>www.facebook.com</Typography>
        <Typography textAlign={'center'}>www.facebook.com</Typography>
        <Typography textAlign={'center'}>www.facebook.com</Typography> */}
      </Box>
    </Box>
  )
}

export default Home
