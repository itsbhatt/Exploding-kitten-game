import React, { useState } from 'react';
import {
  makeStyles,
  TextField,
  Fade,
  Backdrop,
  Modal,
  Button,
  Box,
  Typography,
} from '@material-ui/core';
import { connect } from 'react-redux';

import { getSetUser } from '../../redux/actions/user';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    outline: 'none',
    minWidth: '300px',
    padding: theme.spacing(6),
  },
}));

const TransitionsModal = ({ open, handleClose, getSetUser }) => {
  const classes = useStyles();

  const [username, setUsername] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();
    getSetUser(username);
  };

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <div className={classes.paper}>
          <form onSubmit={submitHandler}>
            <Typography align="center">Enter A Username</Typography>
            <Box my={5} minWidth="280px">
              <TextField
                label="Username"
                id="standard-size-small"
                size="small"
                value={username}
                fullWidth
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </Box>
            <Box display="flex" justifyContent="center">
              <Button type="submit" variant="outlined">
                Play
              </Button>
            </Box>
          </form>
        </div>
      </Fade>
    </Modal>
  );
};

export default connect(null, { getSetUser })(TransitionsModal);
