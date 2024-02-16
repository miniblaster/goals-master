import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {reactLocalStorage} from 'reactjs-localstorage';

import './signup.css'
import useLocalStorage from "react-use-localstorage";
import config from "../../config/config";
import {callApi} from "../../services/api";

const useStyles = makeStyles((theme) => ({
    appBar: {
        position: 'relative',
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
    background:{
        backgroundColor: '#424169'
    },
    textColor:{
        color:'#eee'
    },
    formControl: {
        margin: theme.spacing(1),
        width: '100%',
        color:'#9190a9'
    },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const Signup = (props) => {
    const classes = useStyles();

    const defaultEmailLabel = "Email Address"
    const defaultPasswordLabel = "Password"
    const defaultFirstNameLabel = "First Name"
    const defaultLastNameLabel = "Last Name"
    const defaultConfirmPasswordLabel = "Confirm Password"
    const defaultSignupButtonLabel = "Signup"
    const defaultCountryLabel = "Country"
    const [signupButtonLabel, setSignupButtonLabelLabel] = React.useState(defaultSignupButtonLabel)
    const [emailError, setErrorEmail] = React.useState(false)
    const [confirmPasswordError, setErrorConfirmPassword] = React.useState(false)
    const [passwordError, setErrorPassword] = React.useState(false)
    const [firstNameError, setErrorFirstName] = React.useState(false)
    const [lastNameError, setErrorLastName] = React.useState(false)
    const [countryError, setErrorCountry] = React.useState(false)
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [confirmPassword, setConfirmPassword] = React.useState('')
    const [country, setCountry] = React.useState('')
    const [firstName, setFirstName] = React.useState('')
    const [lastName, setLastName] = React.useState('')
    const [birthday, setBirthdayName] = React.useState('')
    const [emailLabel, setEmailLabel] = React.useState(defaultEmailLabel)
    const [countryLabel, setCountryLabel] = React.useState(defaultCountryLabel)
    const [firstNameLabel, setFirstNameLabel] = React.useState(defaultFirstNameLabel)
    const [lastNameLabel, setLastNameLabel] = React.useState(defaultLastNameLabel)
    const [confirmPasswordLabel, setConfirmPasswordLabel] = React.useState(defaultConfirmPasswordLabel)
    const [passwordLabel, setPasswordLabel] = React.useState(defaultPasswordLabel)

    const [token, setToken] = useLocalStorage('token', undefined);
    const [refresh, setRefresh] = useLocalStorage('refresh', undefined);

    const handleRegister = (e) => {
        e.preventDefault();

        const payload = {
            url: config.django_url+"api/registration/",
            method: 'POST',
            data:{
                email,
                password,
                confirm_password: confirmPassword,
                first_name: firstName,
                last_name: lastName,
                birthday,
                country
            }
        };
        setSignupButtonLabelLabel("Signing up...")
        // calling get user initial data
        callApi(payload).then(response => {
            if(response.data){
                const payload = {
                    url: config.django_url+"api/token/",
                    method: 'POST',
                    data:{
                        email,
                        password
                    }
                };
                callApi(payload).then(response => {
                    reactLocalStorage.set('token',response.data.access)
                    reactLocalStorage.set('refresh',response.data.refresh)
                })
                setToken(response.data.access)
                setRefresh(response.data.refresh)
                setSignupButtonLabelLabel(defaultSignupButtonLabel)
                props.handleClose()
                setErrorEmail(false)
                setErrorPassword(false)
                setErrorConfirmPassword(false)

                setFirstNameLabel(defaultFirstNameLabel)
                setLastNameLabel(defaultLastNameLabel)
                setEmailLabel(defaultEmailLabel)
                setPasswordLabel(defaultPasswordLabel)
                setConfirmPasswordLabel(defaultConfirmPasswordLabel)
            }
        })
            .catch((error) => {
                const errors = error.response && error.response.data ? error.response.data : undefined
                setSignupButtonLabelLabel(defaultSignupButtonLabel)
                if(errors){
                    if(errors.email){
                        setErrorEmail(true)
                        setEmailLabel(defaultEmailLabel+" ("+errors.email[0]+")")
                    }else{
                        setErrorEmail(false)
                        setEmailLabel(defaultEmailLabel)
                    }
                    if(errors.non_field_errors && errors.non_field_errors[0].includes("email already exists")){
                        setErrorEmail(true)
                        setEmailLabel(defaultEmailLabel+" ("+errors.non_field_errors[0]+")")
                    }else{
                        setErrorEmail(false)
                        setEmailLabel(defaultEmailLabel)
                    }
                    if(errors.password){
                        setErrorPassword(true)
                        setPasswordLabel(defaultPasswordLabel+" ("+errors.password[0]+")")
                    }
                    else{
                        setErrorPassword(false)
                        setPasswordLabel(defaultPasswordLabel)
                    }
                    if(errors.confirm_password){
                        setErrorConfirmPassword(true)
                        setConfirmPasswordLabel(defaultConfirmPasswordLabel+" ("+errors.confirm_password[0]+")")
                    }
                    else{
                        setErrorConfirmPassword(false)
                        setConfirmPasswordLabel(defaultConfirmPasswordLabel)
                    }
                    if(errors.non_field_errors && errors.non_field_errors[0]==="Passwords do not match."){
                        setErrorConfirmPassword(true)
                        setConfirmPasswordLabel(defaultConfirmPasswordLabel+" ("+errors.non_field_errors[0]+")")
                    }
                    else{
                        setErrorConfirmPassword(false)
                        setConfirmPasswordLabel(defaultConfirmPasswordLabel)
                    }

                    if(errors.first_name){
                        setErrorFirstName(true)
                        setFirstNameLabel(defaultFirstNameLabel+" ("+errors.first_name[0]+")")
                    }
                    else{
                        setErrorFirstName(false)
                        setFirstNameLabel(defaultFirstNameLabel)
                    }
                    if(errors.country){
                        setErrorCountry(true)
                        setCountryLabel(defaultCountryLabel+" ("+errors.country[0]+")")
                    }
                    else{
                        setErrorCountry(false)
                        setCountryLabel(defaultCountryLabel)
                    }
                    if(errors.last_name){
                        setErrorLastName(true)
                        setLastNameLabel(defaultLastNameLabel+" ("+errors.last_name[0]+")")
                    }
                    else{
                        setErrorLastName(false)
                        setLastNameLabel(defaultLastNameLabel)
                    }
                    if(errors.detail){
                        setErrorEmail(true)
                        setEmailLabel(defaultPasswordLabel+" ("+errors.detail+")")
                    }
                }
            });
    }
    return (
        <Dialog fullScreen open={props.open} onClose={props.handleClose} TransitionComponent={Transition}>
            <AppBar className={classes.appBar}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={props.handleClose} aria-label="close">
                        <CloseIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        Signup
                    </Typography>
                </Toolbar>
            </AppBar>
            <List>
                <ListItem>
                    <ListItemText className={classes.textColor} primary="Please enter accurate information. Your identity must be verified to allow continued use of your account"/>
                </ListItem>
                <Divider />
                <ListItem >
                    <FormControl className={classes.formControl}>
                        <InputLabel shrink htmlFor="age-native-label-placeholder">
                            {countryLabel}
                        </InputLabel>
                        <NativeSelect
                            error={countryError}
                            value={country}
                            onChange={(e)=> setCountry(e.target.value)}
                            inputProps={{
                                name: 'country',
                                id: 'age-native-label-placeholder',
                            }}
                        >
                            <option value="">None</option>
                            <option value="country">Select Country</option>
                            <option value="AF">Afghanistan</option>
                            <option value="AX">Aland Islands</option>
                            <option value="AL">Albania</option>
                            <option value="DZ">Algeria</option>
                            <option value="AS">American Samoa</option>
                            <option value="AD">Andorra</option>
                            <option value="AO">Angola</option>
                            <option value="AI">Anguilla</option>
                            <option value="AQ">Antarctica</option>
                            <option value="AG">Antigua and Barbuda</option>
                            <option value="AR">Argentina</option>
                            <option value="AM">Armenia</option>
                            <option value="AW">Aruba</option>
                            <option value="AU">Australia</option>
                            <option value="AT">Austria</option>
                            <option value="AZ">Azerbaijan </option>
                            <option value="BS">Bahamas</option>
                            <option value="BH">Bahrain </option>
                            <option value="BD">Bangladesh</option>
                            <option value="BB">Barbados</option>
                            <option value="BY">Belarus</option>
                            <option value="BE">Belgium</option>
                            <option value="BZ">Belize</option>
                            <option value="BJ">Benin</option>
                            <option value="BM">Bermuda</option>
                            <option value="BT">Bhutan</option>
                            <option value="BO">Bolivia</option>
                            <option value="BA">Bosnia and Herzegovina</option>
                            <option value="BW">Botswana</option>
                            <option value="BV">Bouvet Island</option>
                            <option value="BR">Brazil</option>
                            <option value="IO">British Indian Ocean Territory</option>
                            <option value="BN">Brunei</option>
                            <option value="BG">Bulgaria</option>
                            <option value="BF">Burkina Faso</option>
                            <option value="BI">Burundi</option>
                            <option value="KH">Cambodia</option>
                            <option value="CM">Cameroon</option>
                            <option value="CA">Canada</option>
                            <option value="CV">Cape Verde</option>
                            <option value="KY">Cayman Islands</option>
                            <option value="CF">Central African Republic</option>
                            <option value="TD">Chad (Tchad)</option>
                            <option value="CL">Chile</option>
                            <option value="CN">China</option>
                            <option value="CX">Christmas Island</option>
                            <option value="CC">Cocos Islands</option>
                            <option value="CO">Colombia</option>
                            <option value="KM">Comoros (Comores)</option>
                            <option value="CG">Congo</option>
                            <option value="CD">Congo, Democratic Republic of the</option>
                            <option value="CK">Cook Islands</option>
                            <option value="CR">Costa Rica</option>
                            <option value="HR">Croatia</option>
                            <option value="CU">Cuba</option>
                            <option value="CY">Cyprus</option>
                            <option value="CZ">Czech Republic</option>
                            <option value="DK">Denmark</option>
                            <option value="DJ">Djibouti</option>
                            <option value="DM">Dominica</option>
                            <option value="DO">Dominican Republic</option>
                            <option value="EC">Ecuador</option>
                            <option value="EG">Egypt</option>
                            <option value="SV">El Salvador</option>
                            <option value="GQ">Equatorial</option>
                            <option value="ER">Eritrea</option>
                            <option value="EE">Estonia</option>
                            <option value="ET">Ethiopia</option>
                            <option value="FK">Falkland Islands</option>
                            <option value="FO">Faroe Islands</option>
                            <option value="FJ">Fiji</option>
                            <option value="FI">Finland</option>
                            <option value="FR">France</option>
                            <option value="GF">French Guiana</option>
                            <option value="PF">French Polynesia</option>
                            <option value="TF">French Southern Territories</option>
                            <option value="GA">Gabon</option>
                            <option value="GM">Gambia</option>
                            <option value="GE">Georgia</option>
                            <option value="DE">Germany</option>
                            <option value="GH">Ghana</option>
                            <option value="GI">Gibraltar</option>
                            <option value="GR">Greece</option>
                            <option value="GL">Greenland</option>
                            <option value="GD">Grenada</option>
                            <option value="GP">Guadeloupe</option>
                            <option value="GU">Guam</option>
                            <option value="GT">Guatemala</option>
                            <option value="GG">Guernsey</option>
                            <option value="GN">Guinea</option>
                            <option value="GW">Guinea-Bissau</option>
                            <option value="GY">Guyana</option>
                            <option value="HT">Haiti</option>
                            <option value="HM">Heard Island and McDonald Islands</option>
                            <option value="HN">Honduras</option>
                            <option value="HK">Hong Kong</option>
                            <option value="HU">Hungary</option>
                            <option value="IS">Iceland</option>
                            <option value="IN">India</option>
                            <option value="ID">Indonesia</option>
                            <option value="IR">Iran</option>
                            <option value="IQ">Iraq</option>
                            <option value="IE">Ireland</option>
                            <option value="IM">Isle of Man</option>
                            <option value="IL">Israel</option>
                            <option value="IT">Italy</option>
                            <option value="JM">Jamaica</option>
                            <option value="JP">Japan</option>
                            <option value="JE">Jersey</option>
                            <option value="JO">Jordan</option>
                            <option value="KZ">Kazakhstan</option>
                            <option value="KE">Kenya</option>
                            <option value="KI">Kiribati</option>
                            <option value="KW">Kuwait</option>
                            <option value="KG">Kyrgyzstan</option>
                            <option value="LA">Laos</option>
                            <option value="LV">Latvia</option>
                            <option value="LB">Lebanon</option>
                            <option value="LS">Lesotho</option>
                            <option value="LR">Liberia</option>
                            <option value="LY">Libya</option>
                            <option value="LI">Liechtenstein</option>
                            <option value="LT">Lithuania</option>
                            <option value="LU">Luxembourg</option>
                            <option value="MO">Macao</option>
                            <option value="MK">Macedonia</option>
                            <option value="MG">Madagascar</option>
                            <option value="MW">Malawi</option>
                            <option value="MY">Malaysia</option>
                            <option value="MV">Maldives</option>
                            <option value="ML">Mali</option>
                            <option value="MT">Malta</option>
                            <option value="MH">Marshall Islands</option>
                            <option value="MQ">Martinique</option>
                            <option value="MR">Mauritania</option>
                            <option value="MU">Mauritius</option>
                            <option value="YT">Mayotte</option>
                            <option value="MX">Mexico</option>
                            <option value="FM">Micronesia</option>
                            <option value="MD">Moldova</option>
                            <option value="MC">Monaco</option>
                            <option value="MN">Mongolia</option>
                            <option value="ME">Montenegro</option>
                            <option value="MS">Montserrat</option>
                            <option value="MA">Morocco</option>
                            <option value="MZ">Mozambique</option>
                            <option value="MM">Myanmar</option>
                            <option value="NA">Namibia</option>
                            <option value="NR">Nauru</option>
                            <option value="NP">Nepal</option>
                            <option value="NL">Netherlands</option>
                            <option value="AN">Netherlands Antilles</option>
                            <option value="NC">New Caledonia</option>
                            <option value="NZ">New Zealand</option>
                            <option value="NI">Nicaragua</option>
                            <option value="NE">Niger</option>
                            <option value="NG">Nigeria</option>
                            <option value="NU">Niue</option>
                            <option value="NF">Norfolk Island</option>
                            <option value="MP">Northern Mariana Islands</option>
                            <option value="KP">North Korea</option>
                            <option value="NO">Norway</option>
                            <option value="OM">Oman</option>
                            <option value="PK">Pakistan</option>
                            <option value="PW">Palau</option>
                            <option value="PS">Palestinian Territories</option>
                            <option value="PA">Panama</option>
                            <option value="PG">Papua New Guinea</option>
                            <option value="PY">Paraguay</option>
                            <option value="PE">Peru</option>
                            <option value="PH">Philippines</option>
                            <option value="PN">Pitcairn</option>
                            <option value="PL">Poland</option>
                            <option value="PT">Portugal</option>
                            <option value="PR">Puerto Rico</option>
                            <option value="QA">Qatar</option>
                            <option value="RE">Reunion</option>
                            <option value="RO">Romania</option>
                            <option value="RU">Russia</option>
                            <option value="RW">Rwanda</option>
                            <option value="SH">Saint Helena</option>
                            <option value="KN">Saint Kitts and Nevis</option>
                            <option value="LC">Saint Lucia</option>
                            <option value="PM">Saint Pierre and Miquelon</option>
                            <option value="VC">Saint Vincent and the Grenadines</option>
                            <option value="WS">Samoa</option>
                            <option value="SM">San Marino</option>
                            <option value="SA">Saudi Arabia</option>
                            <option value="SN">Senegal</option>
                            <option value="RS">Serbia</option>
                            <option value="CS">Serbia and Montenegro</option>
                            <option value="SC">Seychelles</option>
                            <option value="SL">Sierra Leone</option>
                            <option value="SG">Singapore</option>
                            <option value="SK">Slovakia</option>
                            <option value="SI">Slovenia</option>
                            <option value="SB">Solomon Islands</option>
                            <option value="SO">Somalia</option>
                            <option value="ZA">South Africa</option>
                            <option value="GS">South Georgia and the South Sandwich Islands</option>
                            <option value="KR">South Korea</option>
                            <option value="ES">Spain</option>
                            <option value="LK">Sri Lanka</option>
                            <option value="SD">Sudan</option>
                            <option value="SR">Suriname</option>
                            <option value="SJ">Svalbard and Jan Mayen</option>
                            <option value="SZ">Swaziland</option>
                            <option value="SE">Sweden</option>
                            <option value="CH">Switzerland</option>
                            <option value="SY">Syria</option>
                            <option value="TW">Taiwan</option>
                            <option value="TJ">Tajikistan</option>
                            <option value="TZ">Tanzania</option>
                            <option value="TH">Thailand</option>
                            <option value="TL">Timor-Leste</option>
                            <option value="TG">Togo</option>
                            <option value="TK">Tokelau</option>
                            <option value="TO">Tonga</option>
                            <option value="TT">Trinidad and Tobago</option>
                            <option value="TN">Tunisia)</option>
                            <option value="TR">Turkey</option>
                            <option value="TM">Turkmenistan</option>
                            <option value="TC">Turks and Caicos Islands</option>
                            <option value="TV">Tuvalu</option>
                            <option value="UG">Uganda</option>
                            <option value="UA">Ukraine</option>
                            <option value="AE">United Arab Emirates</option>
                            <option value="GB">United Kingdom</option>
                            <option value="US">United States</option>
                            <option value="UM">United States minor outlying islands</option>
                            <option value="UY">Uruguay</option>
                            <option value="UZ">Uzbekistan</option>
                            <option value="VU">Vanuatu</option>
                            <option value="VA">Vatican City</option>
                            <option value="VE">Venezuela</option>
                            <option value="VN">Vietnam</option>
                            <option value="VG">Virgin Islands, British</option>
                            <option value="VI">Virgin Islands, U.S.</option>
                            <option value="WF">Wallis and Futuna</option>
                            <option value="EH">Western Sahara</option>
                            <option value="YE">Yemen</option>
                            <option value="ZM">Zambia</option>
                            <option value="ZW">Zimbabwe</option>
                        </NativeSelect>
                    </FormControl>
                </ListItem>
                <Divider />
                <ListItem>
                    <TextField required className={classes.formControl}
                               value={firstName}
                               error={firstNameError}
                               onChange={(e)=> setFirstName(e.target.value)}
                               id="first-name-required" label={firstNameLabel} placeholder="First Name"/>
                </ListItem>
                <ListItem>
                    <TextField required
                               error={lastNameError}
                               value={lastName}
                               onChange={(e)=> setLastName(e.target.value)}
                               className={classes.formControl} id="last-name-required" label={lastNameLabel} placeholder="Last Name"/>
                </ListItem>
                <ListItem>
                    <TextField
                        onChange={(e)=> setBirthdayName(e.target.value)}
                        value={birthday}
                        id="date"
                        label="Birthday"
                        type="date"
                        defaultValue="1990-01-01"
                        className={classes.formControl}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </ListItem>
                <ListItem>
                    <TextField type="email"
                               error={emailError}
                               value={email}
                               onChange={(e)=> setEmail(e.target.value)}
                               required className={classes.formControl} id="email-required" label={emailLabel} placeholder="Email Address"/>
                </ListItem>
                <ListItem>
                    <TextField type="password"
                               error={passwordError}
                               onChange={(e)=> setPassword(e.target.value)}
                               value={password}
                               required className={classes.formControl} id="password-required" label={passwordLabel} placeholder="Password"/>
                </ListItem>
                <ListItem>
                    <TextField type="password"
                               error={confirmPasswordError}
                               onChange={(e)=> setConfirmPassword(e.target.value)}
                               value={confirmPassword}
                               required className={classes.formControl} id="confirm-password-required" label={confirmPasswordLabel} placeholder="Confirm Password"/>
                </ListItem>
                <ListItem>
                    <Button variant="contained" color="primary" className={classes.formControl} onClick={handleRegister}>
                        {signupButtonLabel}
                    </Button>
                </ListItem>
            </List>
        </Dialog>
    );
}


export default Signup