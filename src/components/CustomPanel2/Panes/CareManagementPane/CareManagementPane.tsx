import PaneHeader from "../PaneHeader/PaneHeader";
import { CareManagementPaneContentStyles, CareManagementPaneStyles } from "./CareManagementPane.Styles";
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import { teal, tealHover } from "../../../../CustomTheme";

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

const CareManagementPane = (props: { classes: any; }) => {
  const { classes } = props;
  return (
    <CareManagementPaneStyles>
      <PaneHeader text="Care Management Programs"/>
      <div className="intro-text">{"The patient is eligible for the following care management programs: "}</div>
      <CareManagementPaneContentStyles>
        <div className="checkboxes">
          <input className="check-item" type="checkbox" id="Diabetes Management" name="fav_language" value="HTML"/>
          <label> Diabetes Management </label><br/>
          <input className="check-item" type="checkbox" id="css" name="fav_language" value="CSS"/>
          <label> Healthy Eating Habits </label><br/>
          <input className="check-item" type="checkbox" id="javascript" name="fav_language" value="JavaScript"/>
          <label> Exercise Made Easy </label>
        </div>
        <Button className={classes.button} color="primary" variant="contained">Enroll</Button>
      </CareManagementPaneContentStyles>
    </CareManagementPaneStyles>
  );
}

export default withStyles(styles)(CareManagementPane);
