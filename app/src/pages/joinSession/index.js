import React, { useState, useEffect } from 'react';
import { useRouteMatch } from 'react-router-dom';
import {
    TextField,
    Button,
    FormLabel,
    Typography,
    Box,
    Grid,
    Backdrop,
    CircularProgress
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import { LOAD_BALANCER_URL, TYPE } from '../../config';
import JoinSessionForm from './joinForm';
import { joinSession } from '../../api.service';
import { makeid } from '../../utils';

const useStyles = makeStyles((theme) => ({
    formContainer: {
        display: 'flex',
        justifyContent: 'center',
        height: '100vh',
        width: '100%',
        backgroundColor: '#E8F1FE',
        [theme.breakpoints.down(600)]: {
            backgroundColor: 'white'
        }
    }
}));

function JoinMeeting(props) {
    const classes = useStyles();
    const params = useRouteMatch();
    const [sessionUrl, setSessionUrl] = useState(null);
    const [meetingId, setMeetingId] = useState(null);
    const [isApiCallInProcess, setIsApiCallInProcess] = useState(false);
    const {setHideNavbar} = props

    useEffect(() => {
        if (params.params?.meetingId) {
            setMeetingId(params.params.meetingId);
        }
    }, []);

    const handleJoinSession = (userObject) => {
        setIsApiCallInProcess(true);

        let userJoinObj = {
            fullName: userObject.name,
            userId: makeid(12),
            meetingId: meetingId,
            type: TYPE.NORMAL
        };
        joinSession(userJoinObj)
            .then(async (res) => {
                const data = await res.json();
                setIsApiCallInProcess(false);
                if (data.success) {
                    setSessionUrl(data.data);
                    setHideNavbar(true)
                    // window.open(data.data, '_self');
                }
            })
            .catch((err) => {
                setIsApiCallInProcess(false);
            });
    };

    return (
        <Box className={classes.formContainer}>
            <Backdrop open={isApiCallInProcess} style={{ zIndex: 1 }}>
                <CircularProgress color="primary" />
            </Backdrop>
            {sessionUrl ? (
                <iframe
                    title="Meeting"
                    className="iframe"
                    src={sessionUrl}
                    allow="camera; microphone; fullscreen; speaker; display-capture"
                    allowFullscreen
                    scrolling="no"
                    overflow="hidden"
                    marginwidth="0"
                    marginheight="0"
                    frameborder="0"
                    position="absolute"
                    height="100%"
                    width="100%"
                    inset="0px"
                ></iframe>
            ) : (
                <JoinSessionForm handleJoinSession={handleJoinSession} />
            )}
        </Box>
    );
}

export default JoinMeeting;
