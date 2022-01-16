import React, { useState } from 'react';
import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import { TYPE } from '../../config';
import CreateSessionForm from './createSessionForm';
import { createSession, joinSession } from '../../api.service';
import { generateHash } from '../../utils';

const useStyles = makeStyles((theme) => ({
    formContainer: {
        display: 'flex',
        justifyContent: 'center',
        // alignItems: 'center',
        height: '100vh',
        backgroundColor: '#E8F1FE',
        [theme.breakpoints.down('xs')]: {
            backgroundColor: '#E8F1FE'
        }
    }
}));

function CreateSession() {
    const classes = useStyles();
    const [sessionUrl, setSessionUrl] = useState(null);

    const handleCreateSession = async (sessionFormData) => {
        let SessionObj = {
            name: sessionFormData.name,
            meetingId: generateHash(sessionFormData.meetingName).toString()
        };
        createSession(SessionObj).then((res) => {
            let userJoinObj = {
                fullName: sessionFormData.name,
                userId: generateHash(sessionFormData.name).toString(),
                meetingId: generateHash(sessionFormData.meetingName).toString(),
                type: TYPE.MODERATOR
            };
            joinSession(userJoinObj).then(async (res) => {
                const data = await res.json();
                if (data.success) {
                    window.open(data.data, '_self');
                    // setSessionUrl(data.data)
                }
            });
        });
    };
    return (
        <Box className={classes.formContainer}>
            {sessionUrl ? (
                <iframe
                    title="Meeting"
                    className="iframe"
                    src={sessionUrl}
                    allow="camera; microphone; fullscreen; speaker; display-capture"
                    allowFullscreen="true"
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
                <CreateSessionForm handleCreateSession={handleCreateSession} />
            )}
        </Box>
    );
}

export default CreateSession;
