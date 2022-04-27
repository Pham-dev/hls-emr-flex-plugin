import PaneHeader from "../PaneHeader/PaneHeader";
import { CareManagementPaneContentStyles, CareManagementPaneStyles } from "./CareManagementPane.Styles";
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import { teal, tealHover } from "../../../../CustomTheme";
import CircularProgress from '@material-ui/core/CircularProgress';
import { useState } from "react";
import { Manager } from "@twilio/flex-ui";

const styles = () => ({
  button: {
    background: teal,
    '&:hover': {
      background: tealHover,
    },
    margin: "22px 0px 0px 0px",
    width: "80%"
  }
});

const CareManagementPane = (props: { classes: any; manager: Manager;}) => {
  const { classes, manager } = props;
  console.log("hello", manager.user.token);

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
      <PaneHeader text="Care Management Programs"/>
      <div className="intro-text">{"The patient is eligible for the following care management programs: "}</div>
      <CareManagementPaneContentStyles>
        <div className="checkboxes">
          <input className="check-item" type="checkbox" id="Diabetes Management" name="fav_language" value="Diabetes Management" onChange={handleDiabetes}/>
          <label> Diabetes Management </label><br/>
          <input className="check-item" type="checkbox" id="Healthy Eating Habits" name="fav_language" value="Healthy Eating Habits " onChange={handleEating}/>
          <label> Healthy Eating Habits </label><br/>
          <input className="check-item" type="checkbox" id="Exercise Made Easy " name="fav_language" value="Exercise Made Easy" onChange={handleExercise}/>
          <label> Exercise Made Easy </label>
        </div>
        {!isLoading ?
          <Button 
            className={classes.button} 
            color="primary" 
            variant="contained"
            disabled={diabetes || exercise || eatingHabits ? false : true}
            onClick={enrollPatient} 
            >
              Enroll
          </Button> 
          :
          <CircularProgress disableShrink />
        }
      </CareManagementPaneContentStyles>
    </CareManagementPaneStyles>
  );
}

export default withStyles(styles)(CareManagementPane);
