import { NoTasksPanel2Styles } from "./NoTasksPanel2.Styles";
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
const theme = createMuiTheme({
  palette: {
    secondary: {
      main: '#FFFFFF'
    },
    primary: {
      main: '#F22F46'
    }
  }
});

const NoTasksPanel2 = () => {
  return (
    <NoTasksPanel2Styles>
      <MuiThemeProvider theme={theme} >
        <Paper className="paper" elevation={1}>
          <Typography variant="h3" component="h3" color="secondary">
            Owl Health
          </Typography>
          <Typography component="p" color="secondary">
            No Assigned Tasks, please wait for a task or accept one.
          </Typography>
        </Paper>
      </MuiThemeProvider>
    </NoTasksPanel2Styles>
  )
}

export default NoTasksPanel2
