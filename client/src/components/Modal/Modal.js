import React from 'react';
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

export default function TransitionsModal({ open, handleClose }) {
  const classes = useStyles();

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
          <Typography align="center">Enter A Username</Typography>
          <Box my={5} minWidth="280px">
            <TextField
              label="Username"
              id="standard-size-small"
              defaultValue=""
              size="small"
              fullWidth
            />
          </Box>
          <Box display="flex" justifyContent="center">
            <Button al variant="outlined">
              Play
            </Button>
          </Box>
        </div>
      </Fade>
    </Modal>
  );
}
