import PaneHeader from '../PaneHeader/PaneHeader';
import { TelehealthPaneStyles } from './TelehealthPane.Styles';

interface TelehealthPaneProps {

}

const TelehealthPane = ({}: TelehealthPaneProps) => {
  return (
    <TelehealthPaneStyles>
      <PaneHeader text="Telehealth"/>
      <iframe className="telehealth"  allow="camera; microphone" src="https://telehealth-v2-6571-dev.twil.io/provider/index.html?token=l8jzBqohnTK1LEkukQvz7NBKG-jeemtY9uy3ST7xCvE"></iframe>
    </TelehealthPaneStyles>
  );
}

export default TelehealthPane;