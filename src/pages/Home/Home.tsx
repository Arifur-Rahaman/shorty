import { Typography, Container, Button, Grid, TextField, Box, Stack } from '@mui/material'
import { GoLinkExternal } from "react-icons/go";
import { useTheme } from '@mui/material/styles';
import useLocalStroge from '../../hooks/useLocalStorage';
import { useState } from 'react';
import { nanoid } from 'nanoid'
import moment from 'moment';
import { toast } from 'react-toastify'
import { isUrlAlreadyAdded, isUrlValid } from '../../utils/url';

interface INewUrl {
  originalUrl: string
  shortUrl: string
  clicked: number
  id: string
  createdAt: any
}

function Home() {
  const [urlText, setUrlText] = useState('')
  const [localStore, setLocalStore] = useLocalStroge('urls', [])
  const [newUrl, setNewUrl] = useState<null | INewUrl>(null)
  const theme = useTheme()
  const colorSecondary = theme.palette.secondary.main

  const handleOnchange = (e: any) => {
    setUrlText(e.target.value)
  }

  /*Short url and set to the store*/
  const shortenUrl = () => {

    /*Check if url valid or not*/
    if (!isUrlValid(urlText)) {
      toast.error('URL is not valid!')
      return
    }

    /*Check if url already added or not*/
    if (isUrlAlreadyAdded(urlText, localStore)) {
      setUrlText('')
      toast.warning('Already added!')
      return
    }

    const newNanoId = nanoid(6)
    const newElement = {
      id: newNanoId,
      originalUrl: urlText,
      shortUrl: `www.shortly.com/${newNanoId}`,
      clicked: 0,
      createdAt: moment()
    }
    setLocalStore([newElement, ...localStore])
    setNewUrl(newElement)
    setUrlText('')
    toast.success('Shorted url added!')
  }


  /*Find recent URLs*/
  const findRecentUrl = (store: []) => {
    if (store.length > 3) {
      return store.slice(0, 3)
    }
    else {
      return store
    }
  }

  /*Handle click on open url */
  const handleOpenUrl = (url: string, id: string) => {
    setLocalStore(localStore.map((element: any) => element.id === id ? { ...element, clicked: element.clicked + 1 } : element))
    window.open(url, "_blank")
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
      <Container maxWidth='sm' sx={{ mb: '1rem' }}>
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
      </Container>

      <Box sx={{ mb: '5rem' }}>
        {
          newUrl && <Stack
            direction={'row'}
            justifyContent={'center'}
            alignItems={'center'}
            gap={'0.5rem'}
            sx={{ width: 'content-fit' }}
          >
            <Typography variant='body2' align='center'>{newUrl.shortUrl}</Typography>
            <GoLinkExternal
              size={12}
              style={{ cursor: 'pointer', color: `${colorSecondary}` }}
              onClick={() => handleOpenUrl(newUrl.originalUrl, newUrl.id)}
            />
          </Stack>
        }
      </Box>

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
            mb: '1.5rem'
          }}
        >
          Here are your <span style={{ color: `${colorSecondary}`, fontWeight: '600' }}>recent shortened URLs!</span> Now click navigate and enjoy shortly
        </Typography>
        {
          findRecentUrl(localStore).map(({ shortUrl, originalUrl, id }) => (
            <Stack
              key={id}
              direction={'row'}
              justifyContent={'center'}
              alignItems={'center'}
              gap={'0.5rem'}
              sx={{ width: 'content-fit', mb: '0.75rem' }}
            >
              <Typography variant='body2' align='center'>{shortUrl}</Typography>
              <GoLinkExternal
                size={12}
                style={{ cursor: 'pointer', color: `${colorSecondary}` }}
                onClick={() => handleOpenUrl(originalUrl, id)}
              />
            </Stack>
          ))
        }
      </Box>
    </Box>
  )
}

export default Home
