import PaneHeader from "../PaneHeader/PaneHeader";
import { CareManagementPaneContentStyles, CareManagementPaneStyles } from "./CareManagementPane.Styles";
import Button from '@material-ui/core/Button';

interface CareManagementPaneProps {}

const CareManagementPane = ({}: CareManagementPaneProps) => {
  return (
    <CareManagementPaneStyles>
      <PaneHeader text="Care Management Programs"/>
      <CareManagementPaneContentStyles>
        <div>{"The patient is eligible for the following care management programs: "}</div>
        <div className="checkboxes">
          <input className="check-item" type="checkbox" id="Diabetes Management" name="fav_language" value="HTML"/>
          <label> Diabetes Management</label><br/>
          <input className="check-item" type="checkbox" id="css" name="fav_language" value="CSS"/>
          <label> Healthy Eating Habits</label><br/>
          <input className="check-item" type="checkbox" id="javascript" name="fav_language" value="JavaScript"/>
          <label> Exercise Made Easy</label>
        </div>
        <Button className="enroll-btn" color="primary" variant="contained">Enroll</Button>
      </CareManagementPaneContentStyles>
    </CareManagementPaneStyles>
  );
}

export default CareManagementPane;
