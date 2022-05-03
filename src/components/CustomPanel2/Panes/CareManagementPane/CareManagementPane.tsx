import { CareManagementPaneStyles } from "./CareManagementPane.Styles";
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import React, { useState } from "react";
import { Manager } from "@twilio/flex-ui";

const CareManagementPane = (props: { classes: any; manager: Manager;}) => {
  const {  manager } = props;

  const [diabetes, setDiabetes] = useState<string>("");
  const [eatingHabits, setEatingHabits] = useState<string>("");
  const [exercise, setExercise] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const enrollPatient = async (event: React.MouseEvent<HTMLButtonElement>) => {
    // Here we will do the enrollment
    setIsLoading(true);
    const body = {
      Token: manager.user.token,
      textBody: diabetes + eatingHabits + exercise,
      phoneNumber: phoneNumber // Need to get this phoneNumber to send to patient
    }
    event.preventDefault();
    await fetch(`https://${process.env.REACT_APP_BACKEND_URL!}/send-care-management`, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(body),
    })
    .then(resp => resp.json())
    .then(res => {
      console.log("response: ", res);
      setIsLoading(false);
    })
    .catch(err => {
      console.error(err);
      setIsLoading(false);
    });
  }

  const handleDiabetes = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setDiabetes(e.target.value);
    } else {
      setDiabetes("");
    }
  }

  const handleEating = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setEatingHabits(e.target.value);
    } else {
      setEatingHabits("");
    }
  }

  const handleExercise = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setExercise(e.target.value);
    } else {
      setExercise("");
    }
  }

  return (
    <CareManagementPaneStyles>
      <div className="title-block">
        <p className="title">Care Management Programs</p>
        <span className="sub-title">The patient is eligible for the following care management programs</span>
      </div>

        <div className="checkboxes">
          <div className="checkbox-wrapper">
            <input className="check-item" type="checkbox" id="Diabetes Management" name="fav_language" value="Diabetes Management" onChange={handleDiabetes}/>
            <label> Diabetes Management </label>
          </div>
          <div className="checkbox-wrapper">
            <input className="check-item" type="checkbox" id="Healthy Eating Habits" name="fav_language" value="Healthy Eating Habits " onChange={handleEating}/>
            <label> Healthy Eating Habits </label>
          </div>
         <div className="checkbox-wrapper">
           <input className="check-item" type="checkbox" id="Exercise Made Easy " name="fav_language" value="Exercise Made Easy" onChange={handleExercise}/>
           <label> Exercise Made Easy </label>
         </div>

        </div>

        {!isLoading ?
          <Button className="enroll-btn"
            disabled={!(diabetes || exercise || eatingHabits)}
            onClick={enrollPatient} 
            >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M13.2458 0.754184C13.4043 0.912639 13.458 1.14786 13.3839 1.35937L9.3006 13.026C9.22158 13.2518 9.01277 13.4064 8.77379 13.4162C8.53481 13.4259 8.3141 13.2888 8.21696 13.0702L5.97474 8.02527L0.929766 5.78305C0.711202 5.68591 0.574082 5.4652 0.583831 5.22622C0.593581 4.98724 0.748225 4.77842 0.973975 4.69941L12.6406 0.616079C12.8522 0.54205 13.0874 0.595728 13.2458 0.754184ZM2.74814 5.31452L6.65359 7.05027C6.78556 7.10893 6.89108 7.21445 6.94974 7.34642L8.68549 11.2519L11.8825 2.11748L2.74814 5.31452Z" fill="#AEB2C1"/>
            </svg>
              Enroll
          </Button> 
          :
          <CircularProgress disableShrink />
        }
    </CareManagementPaneStyles>
  );
}

export default CareManagementPane;
