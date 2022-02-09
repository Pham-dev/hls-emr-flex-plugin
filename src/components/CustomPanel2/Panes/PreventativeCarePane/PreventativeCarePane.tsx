import { Divider, Typography } from '@material-ui/core';
import React from 'react';
import PaneHeader from '../PaneHeader/PaneHeader';
import { PreventativeCarePaneStyles } from './PreventativeCarePane.Styles';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const styles = () => ({
});

let id = 0;
function createData(name: any, calories: any, fat: any, carbs: any, protein: any) {
  id += 1;
  return { id, name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

const PreventativeCarePane = (props: any) => {
  const { classes } = props;
  return (
    <PreventativeCarePaneStyles>
      <PaneHeader text="Preventative Care" />
      <table>
        <tr className="header">
          <th>Item</th>
          <th>Last Date</th>
          <th></th>
        </tr>
        <tr>
          <td>Flu shot</td>
          <td>10-08-21</td>
          <td>DUE</td>
        </tr>
        <tr>
          <td>Covid-19 Vaccine</td>
          <td>01-05-22</td>
          <td></td>
        </tr>
        <tr>
          <td>Mammogram</td>
          <td>01-20-21</td>
          <td>DUE</td>
        </tr>
        <tr>
          <td>Colonoscopy</td>
          <td>12-04-15</td>
          <td></td>
        </tr>
      </table>
      

      {/* <div className="check-list">
        <div className="content">
          <input type="checkbox" id="Diabetes Management" name="fav_language" value="HTML"/>
          <label className="input-item">ID Verification</label><br/>
        </div>
        <div className="content">
          <input type="checkbox" id="css" name="fav_language" value="CSS"/>
          <label className="input-item">Updated contact info (phone number, address, email)</label><br/>
        </div>
        <div className="content">
          <input type="checkbox" id="javascript" name="fav_language" value="JavaScript"/>
          <label className="input-item">Insurance Eligibility Check </label>
        </div>
        <div className="content">
          <input type="checkbox" id="hello" name="fav_food" value="Foo"/>
          <label className="input-item">Flu Shot check</label>
        </div>
      </div> */}
      {/* <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell align="center">Item</TableCell>
            <TableCell align="center">Latest Value</TableCell>
            <TableCell align="center"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.id}>
              <TableCell align="center" component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="center">{row.calories}</TableCell>
              <TableCell align="center">{row.fat}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper> */}
    </PreventativeCarePaneStyles>
  );
};

PreventativeCarePane.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(PreventativeCarePane);