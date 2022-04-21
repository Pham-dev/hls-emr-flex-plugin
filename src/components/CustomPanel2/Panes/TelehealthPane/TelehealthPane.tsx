import { useEffect, useState } from 'react';
import PaneHeader from '../PaneHeader/PaneHeader';
import { TelehealthPaneStyles } from './TelehealthPane.Styles';

interface TelehealthPaneProps {
  nurseName: string;
}

const TelehealthPane = ({ nurseName }: TelehealthPaneProps) => {
  const [passcode, setPasscode] = useState<string>("");

  useEffect(() => {
    const fetchToken = async () => {
      await fetch("https://" + process.env.REACT_APP_BACKEND_URL! + "/visit/token", {
        method: "post",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          "action": "PROVIDER",
          "id": "d1000"
        })
      })
      .then(resp => resp.json())
      .then(res => setPasscode(res.passcode))
      .catch(err => console.error(err));
    };
    fetchToken();
  }, []);
  
  return (
    <div>
      {passcode ?
        <TelehealthPaneStyles>
          <PaneHeader text="Telehealth"/>
          <iframe className="telehealth"  allow="camera; microphone" src={"https://" + process.env.REACT_APP_BACKEND_URL + "/provider/index.html?" + `token=${passcode}&name=${nurseName}`}/>
        </TelehealthPaneStyles> :
        <></>
      }
    </div>
  );
}

export default TelehealthPane;