import {
    makeStyles,
    Grid,
    Typography,
    FormLabel,
    TextField,
    Button,
    TextareaAutosize,
    Box,
    InputAdornment,
    Icon,
    IconButton,
    OutlinedInput
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import computerImg from '../../assets/computerImg.svg';
import { FileCopy } from '@material-ui/icons';
import { generateHash } from '../../utils';

const useStyles = makeStyles((theme) => ({
    form: {
        backgroundColor: 'white',
        maxHeight:'596px',
        maxWidth: '440px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '18px',
        boxShadow: '0px 0px 20px 0px rgba(26, 57, 108, 0.05)',
        borderRadius: '10px',
        [theme.breakpoints.down(600)]: {
            height: '100%'
        }
    },
    InputField: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        paddingBottom: '32px'
    },
    computerImg: {
        height: '109px',
        width: '157px'
    },
    imgBox: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        marginBottom: '60px'
    },
    label: {
        marginBottom: '8px',
        color: '#1F3965'
    },
    startBtn: {
        backgroundColor: 'rgba(29, 161, 242, 1)',
        color: 'white',
        '&:hover': {
            backgroundColor: 'rgba(29, 161, 242, 1)',
            boxShadow: 'none'
        },
        '&:disabled': {
            backgroundColor: 'rgba(29, 161, 242, 1)'
        },
        padding: '13px',
        boxShadow: 'none'
    },
    copytxt: {
        color: '#6B82AB',
        fontSize: '14px'
    },
    btnBox: {
        width: '100%',
        marginTop: '30px',
        display: 'flex'
    }
}));

const CreateSessionForm = (props) => {
    const { handleCreateSession } = props;
    const classes = useStyles();
    const [userName, setUserName] = useState('');
    const [meetingName, setMeetingName] = useState('');
    const [link, setLink] = useState(null);
    const [isCopied, setIsCopied] = useState(false);
    useEffect(() => {
        if (isCopied) {
            setTimeout(() => {
                setIsCopied(false);
            }, 3000);
        }
    }, [isCopied]);
    useEffect(() => {
        if (meetingName === '') {
            setLink('');
        } else {
            setLink(`${window.location.origin}/n/${generateHash(meetingName)}`);
        }
    }, [meetingName]);

    const handleStartClassClick = () => {
        if (userName !== '' && meetingName !== '') {
            handleCreateSession({ name: userName, meetingName: meetingName });
        }
    };
    const handleCopyLink = () => {
        if (meetingName !== "") {
            window.navigator.clipboard.writeText(link);
            setIsCopied(true);
        }
    };
    return (
        <Box className={classes.form}>
            <Box className={classes.imgBox}>
                <img
                    className={classes.computerImg}
                    src={computerImg}
                    alt="Computer"
                />
                <Typography variant="p" color="#1DA1F1" component="p">
                    Start your live class in just two clicks
                </Typography>
            </Box>
            <Box className={classes.InputField}>
                <FormLabel className={classes.label}>Your Name</FormLabel>
                <TextField
                    type="text"
                    onChange={(e) => {
                        setUserName(e.target.value);
                    }}
                    value={userName}
                    id="outlined-basic"
                    placeholder="Eg. Rohit"
                    variant="outlined"
                    color="primary"
                    size="small"
                />
            </Box>
            <Box className={classes.InputField}>
                <FormLabel className={classes.label}>
                    Give a name to your classroom
                </FormLabel>
                <TextField
                    type="text"
                    onChange={(e) => {
                        setMeetingName(e.target.value);
                    }}
                    value={meetingName}
                    placeholder="Eg. English"
                    variant="outlined"
                    nowrap="false"
                    size="small"
                    color="primary"
                    className={classes.TextField}
                />
            </Box>
            <Box className={classes.InputField}>
                <FormLabel className={classes.label}>Classroom Link</FormLabel>
                <OutlinedInput
                    value={link}
                    type="text"
                    size="small"
                    style={{ height: '40px', padding: 0 }}
                    endAdornment={
                        <InputAdornment
                            position="end"
                            className={classes.endAdornment}
                        >
                            <IconButton onClick={handleCopyLink}>
                                <FileCopy
                                    style={isCopied ? { color: 'green' } : {}}
                                />
                            </IconButton>
                        </InputAdornment>
                    }
                    placeholder="fill in the details to get class link"
                />
                <Typography variant="p" className={classes.copytxt}>
                    Students can join the classroom using above link
                </Typography>
            </Box>

            <Box className={classes.btnBox}>
                <Button
                    fullWidth
                    variant="contained"
                    type="button"
                    onClick={handleStartClassClick}
                    className={classes.startBtn}
                >
                    Start Meeting
                </Button>
            </Box>
        </Box>
    );
};

export default CreateSessionForm;
