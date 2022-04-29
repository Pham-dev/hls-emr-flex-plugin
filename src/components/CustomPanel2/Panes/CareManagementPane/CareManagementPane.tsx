import { CareManagementPaneStyles } from "./CareManagementPane.Styles";
import Button from '@material-ui/core/Button';
import React from "react";

const CareManagementPane = (props: { classes: any; }) => {
  const { classes } = props;
    const authors = ['James Baldwin', 'Adrienne Maree Brown', 'Octavia Butler', 'Ta-Nehisi Coates', 'Audre Lorde', 'Nnedi Okorafor'];

    return (
    <CareManagementPaneStyles>
        <div className="title-block">
            <p className="title">Care Management Programs</p>
            <span className="sub-title">The patient is eligible for the following care management programs</span>
        </div>

        <select>
            <option value="HTML">Diabetes Management</option>
            <option value="CSS">Healthy Eating Habits</option>
            <option value="JavaScript">Exercise Made Easy</option>
        </select>

        <Button className="enroll-btn">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M13.2458 0.754184C13.4043 0.912639 13.458 1.14786 13.3839 1.35937L9.3006 13.026C9.22158 13.2518 9.01277 13.4064 8.77379 13.4162C8.53481 13.4259 8.3141 13.2888 8.21696 13.0702L5.97474 8.02527L0.929766 5.78305C0.711202 5.68591 0.574082 5.4652 0.583831 5.22622C0.593581 4.98724 0.748225 4.77842 0.973975 4.69941L12.6406 0.616079C12.8522 0.54205 13.0874 0.595728 13.2458 0.754184ZM2.74814 5.31452L6.65359 7.05027C6.78556 7.10893 6.89108 7.21445 6.94974 7.34642L8.68549 11.2519L11.8825 2.11748L2.74814 5.31452Z" fill="#AEB2C1"/>
            </svg>
            Enroll
        </Button>

    </CareManagementPaneStyles>
  );
}

export default CareManagementPane;
