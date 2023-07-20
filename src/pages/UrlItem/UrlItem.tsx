import { useState } from 'react'
import { Button, Container, Grid, Typography, Snackbar, Alert } from "@mui/material"
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate, useParams } from "react-router-dom"
import useLocalStroge from "../../hooks/useLocalStorage"
import moment from "moment"
function UrlItem() {
    const [store, setStore] = useLocalStroge('urls', [])
    const [isOpenDialog, setIsOpenDialog] = useState(false)
    const [isSnackBarOpen, setIsSnackBarOpen] = useState(false)
    const navigate = useNavigate()
    const { id: currentId } = useParams()
    const current = store.find((element: any) => element.id === currentId)

    const handleCloseDialog = () => {
        setIsOpenDialog(false)
    }

    const handleOpenDialog = () => {
        setIsOpenDialog(true)
    }

    /*Handle delete url*/
    const handleDelete = () => {
        setStore([...store].filter((element: any) => element.id !== currentId))
        setIsSnackBarOpen(true)
        handleCloseDialog()
        navigate('/urls')
        
    }

    const handleSnackBarClose = ()=>{
        setIsSnackBarOpen(false)
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
            <Grid container rowGap={'1rem'}
                sx={{
                    borderRadius: { sm: '4px' },
                    p: { xs: '1rem', sm: '2rem' },
                    background: '#1f2936'
                }}
            >
                <Grid item xs={12}>
                    <Typography>{current?.shortUrl}</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography
                        variant="body2"
                        sx={{
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            display: '-webkit-box',
                            WebkitLineClamp: '2',
                            WebkitBoxOrient: 'vertical',
                        }}
                    >{current?.originalUrl}</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="body2">{current?.clicked} times clicked</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="body2">Created At:<br /> {moment(current?.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Button endIcon={<EditIcon fontSize="small" />} color="secondary" variant="contained" sx={{ mr: '1rem' }}>
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

            <Snackbar
                open={isSnackBarOpen}
                autoHideDuration={2000}
                onClose={handleSnackBarClose}
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "center"
                }}>
                <Alert
                    onClose={handleSnackBarClose}
                    severity='error'
                    variant="filled"
                    elevation={6}
                    sx={{ width: '100%' }}
                >
                    {'Deleted Successfully'}
                </Alert>
            </Snackbar>
        </Container>
    )
}

export default UrlItem