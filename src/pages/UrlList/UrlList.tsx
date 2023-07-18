import { Container, Typography } from "@mui/material"
import { styled, useTheme } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    color: theme.palette.common.white,
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  [`&.${tableCellClasses.body}`]: {
    color: theme.palette.common.white,
  },
  [theme.breakpoints.down('sm')]: {
    display: 'block',
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    backgroundColor: '#212630',
  },
  // '&:nth-of-type(odd)': {
  //   backgroundColor: theme.palette.action.hover,
  // },
  // hide last border
  // '&:last-child td, &:last-child th': {
  //   border: 0,
  // },
}));

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number,
) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

function UrlList() {
  const theme = useTheme()
  const secondaryColor = theme.palette.primary.main
  return (
    <TableContainer component={Paper} sx={{ background: 'transparent', color: 'white' }}>
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
            <StyledTableCell>Dessert (100g serving)</StyledTableCell>
            <StyledTableCell align="left">Calories</StyledTableCell>
            <StyledTableCell align="left">Fat&nbsp;(g)</StyledTableCell>
            <StyledTableCell align="left">Carbs&nbsp;(g)</StyledTableCell>
            <StyledTableCell align="left">Protein&nbsp;(g)</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.name} style={{ borderBottom: '4px solid #111826' }}>
              <StyledTableCell component="th" scope="row">
                {row.name}
              </StyledTableCell>
              <StyledTableCell align="left"><Typography variant="caption">Calories: </Typography>{row.calories}</StyledTableCell>
              <StyledTableCell align="left">{row.fat}</StyledTableCell>
              <StyledTableCell align="left">{row.carbs}</StyledTableCell>
              <StyledTableCell align="left">{row.protein}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default UrlList