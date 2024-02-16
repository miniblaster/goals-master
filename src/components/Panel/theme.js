import {createMuiTheme} from "@material-ui/core/styles";

export const theme = createMuiTheme({
    palette: {
        primary: {
            light: '#383759',
            main: '#383759',
            dark: '#323150ed',
            contrastText: '#fff'
        },
    },

});

export const sideBarStyles = {
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
    paper: {
        background: "#292946",
        color: "white",
        fontSize: "10px"
    },
    listItemText:{
        fontSize:'1.2em',//Insert your required size
    },
    dividerColor:{
        backgroundColor:"#6f6fb1"
    }
}
