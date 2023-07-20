import { useState } from 'react'
import { Button, Container, Grid, Typography, TextField, Box, Stack } from "@mui/material"
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import EditIcon from '@mui/icons-material/Edit';
import { GoLinkExternal } from "react-icons/go";
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate, useParams } from "react-router-dom"
import useLocalStroge from "../../hooks/useLocalStorage"
import moment from "moment"
import { toast } from 'react-toastify';
import { useTheme } from '@mui/material/styles'
import { isUrlAlreadyAdded, isUrlValid } from '../../utils/url';

function UrlItem() {
    const [store, setStore] = useLocalStroge('urls', [])
    const [isOpenDialog, setIsOpenDialog] = useState(false)
    const [isInEditMode, setIsInEditMode] = useState(false)
    const { id: currentId } = useParams()
    const current = store.find((element: any) => element.id === currentId)
    const [longUrl, setLongUrl] = useState(current.originalUrl)
    const navigate = useNavigate()
    const theme = useTheme()
    const colorSecondary = theme.palette.secondary.main

    const handleCloseDialog = () => {
        setIsOpenDialog(false)
    }

    const handleOpenDialog = () => {
        setIsOpenDialog(true)
    }

    const handleUrlChange = (e: any) => {
        setLongUrl(e.target.value)
    }

    /*hanlde update url*/
    const updateUrl = () => {
        if (!isUrlValid(longUrl)) {
            toast.error('Url is not valid!')
            return
        }
        if (isUrlAlreadyAdded(longUrl, store)) {
            toast.error('Url already added!')
            return
        }
        setStore(store.map((element: any) => element.id == currentId ? { ...element, originalUrl: longUrl } : element))
        toast.success('Updated successfully!')
        setIsInEditMode(false)
    }

    /*Handle delete url*/
    const handleDelete = () => {
        setStore(store.filter((element: any) => element.id !== currentId))
        toast.success('Deleted Successfully!')
        handleCloseDialog()
        navigate('/urls')
    }

    /*Handle click on open url */
    const handleOpenUrl = (url: string, id: any) => {
        setStore(store.map((element: any) => element.id === id ? { ...element, clicked: element.clicked + 1 } : element))
        window.open(url, "_blank")
    }

    return (
        <Container maxWidth={'sm'}
            sx={{
                padding: 0,
                position: { sm: 'absolute' },
                top: '50%',
                left: '50%',
                transform: { sm: 'translate(-50%, -50%)' },
            }}
        >
            <Typography variant='h5'
                sx={{ mb: '0.5rem', fontWeight: '600' }}
                align='center'
                color={'primary'}
            >
                Update <span style={{ color: `${colorSecondary}` }}>OR</span> Delete
            </Typography>
            <Typography
                align='center'
                sx={{ mb: '2rem' }}
                variant='body2'
            >
                Your url is not working!<br />Feel free to update as you want
            </Typography>
            <Grid container rowGap={'1rem'}
                sx={{
                    borderRadius: { sm: '4px' },
                    p: { xs: '1rem', sm: '2rem' },
                    background: '#1f2936'
                }}
            >
                <Grid item xs={12}>
                    <Stack direction={'row'} alignItems={'center'} gap={'0.5rem'}>
                        <Typography>{current?.shortUrl}</Typography>
                        <GoLinkExternal
                            size={14}
                            style={{ cursor: 'pointer', color: `${colorSecondary}` }}
                            onClick={() => handleOpenUrl(current.originalUrl, currentId)}
                        />
                    </Stack>
                </Grid>
                <Grid item xs={12}>
                    {
                        isInEditMode ? (
                            <TextField
                                autoFocus
                                value={longUrl}
                                fullWidth
                                variant='standard'
                                onChange={handleUrlChange}
                                sx={{
                                    "& .MuiInputBase-root": {
                                        color: '#d8dbdf'
                                    },
                                    '&:focus-within fieldset, &:focus-visible fieldset': {
                                        border: 'none !important',
                                    },
                                    // background: '#374150',
                                    borderRadius: '8px'
                                }}
                                inputProps={{
                                    autoComplete: 'off',
                                }}
                            />
                        ) : (
                            <Typography
                                variant="body2"
                                sx={{
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    display: '-webkit-box',
                                    WebkitLineClamp: '2',
                                    WebkitBoxOrient: 'vertical',
                                }}
                            >{current?.originalUrl}
                            </Typography>
                        )
                    }
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="body2">{current?.clicked} times clicked</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="body2">Created At:<br /> {moment(current?.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</Typography>
                </Grid>
                <Grid item xs={12}>
                    {
                        isInEditMode ? (
                            <Box>
                                <Button
                                    color="secondary"
                                    variant="contained"
                                    sx={{ mr: '1rem' }}
                                    onClick={updateUrl}
                                >
                                    Save
                                </Button>
                                <Button
                                    color="error"
                                    variant="contained"
                                    onClick={() => setIsInEditMode(false)}
                                >
                                    Cancel
                                </Button>
                            </Box>
                        ) : (
                            <Box>
                                <Button
                                    endIcon={<EditIcon fontSize="small" />}
                                    color="secondary"
                                    variant="contained"
                                    sx={{ mr: '1rem' }}
                                    onClick={() => setIsInEditMode(true)}
                                >
                                    Edit
                                </Button>
                                <Button
                                    color="error"
                                    variant="contained"
                                    endIcon={<DeleteIcon />}
                                    onClick={handleOpenDialog}
                                >
                                    Delete
                                </Button>
                            </Box>
                        )
                    }
                </Grid>
            </Grid>

            {/* Delete Confirmation Dialog */}
            <Dialog
                open={isOpenDialog}
                onClose={handleCloseDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Are you really want to delete?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Once you delete, you will never be able to restore it.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} variant='contained' color='secondary'>No</Button>
                    <Button variant='contained' color='error' onClick={handleDelete} autoFocus>
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
        </Container >
    )
}

export default UrlItem