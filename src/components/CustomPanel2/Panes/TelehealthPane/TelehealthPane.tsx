import PaneHeader from '../PaneHeader/PaneHeader';
import { TelehealthPaneStyles } from './TelehealthPane.Styles';

interface TelehealthPaneProps {
  nurseName: string;
}

const TelehealthPane = ({ nurseName }: TelehealthPaneProps) => {
  return (
    <TelehealthPaneStyles>
      <PaneHeader text="Telehealth"/>
      <iframe className="telehealth"  allow="camera; microphone" src={`https://telehealth-v2-6571-dev.twil.io/provider/index.html?token=InHvwJHNi0lW_a0lSV8WzP0qXzt4biyH5H-Q_g80QQM&name=${nurseName}`}></iframe>
    </TelehealthPaneStyles>
  );
}

export default TelehealthPane;