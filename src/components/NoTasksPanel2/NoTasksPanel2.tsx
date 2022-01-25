import { NoTasksPanel2Styles } from "./NoTasksPanel2.Styles";
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { black, twilioRed } from "../../CustomTheme";

const theme = createMuiTheme({
  palette: {
    secondary: {
      main: black
    },
    primary: {
      main: twilioRed
    }
  }
});

const NoTasksPanel2 = () => {
  return (
      <MuiThemeProvider theme={theme}>
        <NoTasksPanel2Styles>
          <Paper className="paper">
            <img width="30%" src="https://code.hq.twilio.com/raw/salesengineering/owl-health/master/app/src/images/logoOwlHealthLg.png?token=AAABIT7DURXTJWI32VHOKJDB7BCPY"/>
            <Typography component="h4" color="secondary">
              No Assigned Tasks, please wait for a task or accept one.
            </Typography>
          </Paper>
        </NoTasksPanel2Styles>
      </MuiThemeProvider>
  )
}

export default NoTasksPanel2
