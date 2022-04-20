import React from 'react';
import { PreventativeCarePaneStyles } from './PreventativeCarePane.Styles';
import PropTypes from 'prop-types';
import { Icon } from '@twilio/flex-ui';

const PreventativeCarePane = (props: any) => {
  // const { classes } = props;
  return (
    <PreventativeCarePaneStyles>
      <p className="title">Preventative Care:</p>

      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Last Date</th>
          </tr>
        </thead>
        <tr>
          <td>Flu shot</td>
          <td>10-08-21</td>
        </tr>
        <tr>
          <td>Covid-19 Vaccine</td>
          <td>
            <span className="outdated">
              <Icon icon="Alert"/>&nbsp;01-05-22
              <span className="date-warning">(outdated)</span>
            </span>
          </td>
        </tr>
        <tr>
          <td>Mammogram</td>
          <td>01-20-21</td>
        </tr>
        <tr>
          <td>Colonoscopy</td>
          <td>
            <span className="outdated">
              <Icon icon="Alert"/>&nbsp;12-04-15
              <span className="date-warning">(outdated)</span>
            </span>
          </td>
        </tr>
      </table>
      <div>

      </div>

    </PreventativeCarePaneStyles>
  );
};

PreventativeCarePane.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default PreventativeCarePane;
