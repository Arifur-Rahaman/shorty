import { styled, useTheme } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import useLocalStroge from "../../hooks/useLocalStorage";
import { Button, Stack, Typography } from '@mui/material';
import { GoLinkExternal } from "react-icons/go";
import moment from 'moment';
import { AiOutlineEye } from "react-icons/ai";
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { useNavigate } from 'react-router-dom';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    color: theme.palette.common.white,
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  },
  [`&.${tableCellClasses.body}`]: {
    color: theme.palette.common.white,
  },
  [theme.breakpoints.down('md')]: {
    display: 'block',
  }
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    backgroundColor: '#212630',
  },
}));


function UrlList() {
  const [store, setStore] = useLocalStroge('urls', [])
  const theme = useTheme()
  const navigate = useNavigate()
  const colorSecondary = theme.palette.secondary.main

  /*Handle click on open url */
  const handleOpenUrl = (url: string, id: string) => {
    setStore(store.map((element: any) => element.id === id ? { ...element, clicked: element.clicked + 1 } : element))
    window.open(url, "_blank")
  }

  return (
    <TableContainer component={Paper} sx={{ background: 'transparent', color: 'white' }}>
      <Typography variant='h6' sx={{ mb: '1rem', pl: '1rem' }}>Shorted URLs</Typography>
      <Table
        aria-label="customized table"
        sx={{
          [`& .${tableCellClasses.root}`]: {
            borderBottom: "none",
            borderCollapse: 'separate',
            borderSpacing: '0px 100px'
          }
        }}
      >
        <TableHead>
          <TableRow>
            <StyledTableCell>Short Link</StyledTableCell>
            <StyledTableCell align="left">Original Link</StyledTableCell>
            <StyledTableCell align="left">Clicked</StyledTableCell>
            <StyledTableCell align="left">Created At</StyledTableCell>
            <StyledTableCell align="left">Actions</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {store.map((row: any) => (
            <StyledTableRow key={row.shortUrl} style={{ borderBottom: '8px solid #111826' }}>
              <StyledTableCell component="th" scope="row">
                <Stack
                  direction={'row'}
                  alignItems={'center'}
                  gap={'0.5rem'}
                  sx={{ width: 'content-fit', mb: '0.75rem' }}
                >
                  <Typography variant='body2' align='center'>{row.shortUrl}</Typography>
                  <GoLinkExternal
                    size={12}
                    style={{ cursor: 'pointer', color: `${colorSecondary}` }}
                    onClick={() => handleOpenUrl(row.originalUrl, row.id)}
                  />
                </Stack>
              </StyledTableCell>
              <StyledTableCell align="left"
              >
                <Typography
                  sx={{
                    maxWidth: 200, // percentage also works
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis"
                  }}
                >{row.originalUrl}
                </Typography>
              </StyledTableCell>
              <StyledTableCell align="left">
                <Stack direction={'row'} alignItems={'center'} gap={'0.5rem'}>
                  <AiOutlineEye size={17} />
                  <span>{row.clicked}</span>
                  <Typography variant='body2' sx={{ display: { sm: 'none' } }}>Times Clicked</Typography>
                </Stack>
              </StyledTableCell>
              <StyledTableCell align="left">{moment(row.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</StyledTableCell>
              <StyledTableCell align="left">
                <Stack direction={'row'} spacing={'1rem'}>
                  <Button
                    endIcon={<OpenInNewIcon fontSize='small' />}
                    variant='contained'
                    size='small'
                    fullWidth={true}
                    onClick={() => handleOpenUrl(row.originalUrl, row.id)}
                  >
                    Open
                  </Button>
                  <Button
                    variant='contained'
                    color='secondary'
                    onClick={() => navigate(`${row.id}`)}
                    size='small'
                    fullWidth={true}
                  >
                    Details
                  </Button>
                </Stack>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default UrlList