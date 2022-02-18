import React, { useState } from 'react';
import { Backdrop, Box, CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import { TYPE } from '../../config';
import CreateSessionForm from './createSessionForm';
import { createSession, joinSession } from '../../api.service';
import { generateHash } from '../../utils';
import NavBar from '../../components/navbar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const useStyles = makeStyles((theme) => ({
  formContainer: {
    display: 'flex',
    justifyContent: 'center',
    // alignItems: 'center',
    // flexDirection:'column',
    backgroundColor: '#E8F1FE',
    [theme.breakpoints.down(600)]: {
      backgroundColor: 'white',
    },
  },
}));

function CreateSession(props) {
  const { setHideNavbar } = props;
  const classes = useStyles();
  const [sessionUrl, setSessionUrl] = useState(null);
  const [isApiCallInProcess, setIsApiCallInProcess] = useState(false);

  const handleCreateSession = async (sessionFormData) => {
    setIsApiCallInProcess(true);
    const SessionObj = {
      name: sessionFormData.name,
      meetingId: sessionFormData.meetingName.replaceAll(' ', '-'),
    };
    createSession(SessionObj)
      .then(async (res) => {
        if (res.status !== 200) {
          setIsApiCallInProcess(false);
          const errorMessage = await res.text();
          toast.error(errorMessage);
        } else {
          const userJoinObj = {
            fullName: sessionFormData.name,
            userId: generateHash(sessionFormData.name).toString(),
            meetingId: sessionFormData.meetingName.replaceAll(' ', '-'),
            type: TYPE.MODERATOR,
          };
          joinSession(userJoinObj)
            .then(async (res) => {
              const data = await res.json();
              if (data.success) {
                setIsApiCallInProcess(false);
                setHideNavbar(true);
                window.open(data.data, '_blank');
                // setSessionUrl(data.data)
              }
            })
            .catch((err) => {
              setIsApiCallInProcess(false);
              toast.error(err.message);
            });
        }
      })
      .catch((err) => {
        setIsApiCallInProcess(false);
        toast.error('Server not found');
      });
  };
  return (
    <Box className={classes.formContainer}>
      <Backdrop open={isApiCallInProcess} style={{ zIndex: 1 }}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <ToastContainer
        position="top-right"
        autoClose={4000}
        closeOnClick
        pauseOnHover
      />
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
        <>
          <CreateSessionForm handleCreateSession={handleCreateSession} />
        </>
      )}
    </Box>
  );
}

export default CreateSession;
