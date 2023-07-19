import { Typography, Container, Button, Grid, TextField, Box, Snackbar, Alert } from '@mui/material'
import { useTheme } from '@mui/material/styles';
import useLocalStroge from '../../hooks/useLocalStorage';
import { useState } from 'react';
import { nanoid } from 'nanoid'

// import { motion } from 'framer-motion';

interface ISnackBarData {
  open: boolean
  severity: 'error' | 'success' | 'warning',
  message: string
}


function Home() {
  const [urlText, setUrlText] = useState('')
  const [snackBarData, setSnackBarData] = useState<ISnackBarData>({
    open: false,
    severity: 'error',
    message: ''
  })
  const [locatStore, setLocalStore] = useLocalStroge('urls', [])

  const theme = useTheme()
  const colorSecondary = theme.palette.secondary.main

  const handleOnchange = (e: any) => {
    setUrlText(e.target.value)
  }

  /*Check url valid or not */
  const isUrlValid = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch (err) {
      return false;
    }
  }

  /*Check url already existance of long url*/
  const isUrlAlreadyExist = (store: [], url: string) => {
    const founded = store.find(({ originalUrl }) => originalUrl === url)
    if (founded) {
      return true
    }
    else {
      return false
    }
  }

  /*Short url and set to the store*/
  const shortenUrl = () => {

    if (!isUrlValid(urlText)) {
      setSnackBarData({ open: true, severity: 'error', message: 'URL is not valid!' })
      return
    }

    if (isUrlAlreadyExist(locatStore, urlText)) {
      setUrlText('')
      setSnackBarData({ open: true, severity: 'warning', message: 'Already added!'})
      return
    }

    const newNanoId = nanoid(6)
    const newElement = {
      id: newNanoId,
      originalUrl: urlText,
      shortUrl: `shortly.com/${newNanoId}`,
      clicked: 0,
      createdAt: new Date()
    }
    setLocalStore([newElement, ...locatStore])
    setUrlText('')
    setSnackBarData({ open: true, severity: 'success', message: 'Shorten url added!' })
  }

  /*Handle manual snackbar close*/
  const handleClose = () => {
    setSnackBarData((prev) => ({ ...prev, open: false }))
  }

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
              onChange={handleOnchange}
              variant="outlined"
              fullWidth
              value={urlText}
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
              onClick={shortenUrl}
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
        <Typography textAlign={'center'}>www.facebook.com</Typography>
        <Typography textAlign={'center'}>www.facebook.com</Typography>
        <Typography textAlign={'center'}>www.facebook.com</Typography>
      </Box>
      <Snackbar
        open={snackBarData?.open}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center"
        }}>
        <Alert
          onClose={handleClose}
          severity={snackBarData.severity}
          variant="filled"
          elevation={6}
          sx={{ width: '100%' }}
        >
          {snackBarData?.message}
        </Alert>
      </Snackbar>
    </Box>
  )
}

export default Home
