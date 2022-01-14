import PaneHeader from '../PaneHeader/PaneHeader';
import { TelehealthPaneStyles } from './TelehealthPane.Styles';

interface TelehealthPaneProps {

}

const TelehealthPane = ({}: TelehealthPaneProps) => {
  return (
    <TelehealthPaneStyles>
      <PaneHeader text="Telehealth"/>
      <iframe className="telehealth"  allow="camera; microphone" src="https://telehealth-v2-2798-dev.twil.io/provider/index.html?token=gAyD3_Ezz4lPnenZE9nw7CbhfTJjMA75r5xQD5YD9FU"></iframe>
    </TelehealthPaneStyles>
  );
}

export default TelehealthPane;