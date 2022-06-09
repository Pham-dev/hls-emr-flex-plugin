import { NoTasksPanel2Styles } from "./NoTasksPanel2.Styles";
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { MuiThemeProvider, createTheme } from '@material-ui/core/styles';
import { black, twilioRed } from "../../CustomTheme";

const theme = createTheme({
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
            <img width="30%" src="https://hls-site-4115-dev.twil.io/owlhealth/images/logoOwlHealth.png"/>
            <Typography component="h4" color="secondary">
              No Assigned Tasks, please wait for a task or accept one.
            </Typography>
          </Paper>
        </NoTasksPanel2Styles>
      </MuiThemeProvider>
  )
}

export default NoTasksPanel2
