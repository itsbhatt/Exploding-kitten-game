import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
    maxWidth: 280,
    position: 'absolute',
    top: 0,
    left: 0,
    background: 'white',
    backgroundColor: 'transparent',
    perspective: '1000px',
  },
  flipCardInner: {
    position: 'relative',
    width: '100%',
    height: '100%',
    textAlign: 'center',
    transition: 'transform 0.4s',
    transformStyle: 'preserve-3d',
    boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
  },

  flipCardFront: {
    backgroundColor: '#bbb',
    color: 'black',
    position: '<i class="fas fa-value-absolute"></i>',
    width: '100%',
    height: '100%',
    '-webkit-backface-visibility': 'hidden',
    backfaceVisibility: 'hidden',
  },

  flipCardBack: {
    backgroundColor: '#2980b9',
    color: 'white',
    transform: 'rotateY(180deg)',
    position: '<i class="fas fa-value-absolute"></i>',
    width: '100%',
    height: '100%',
    '-webkit-backface-visibility': 'hidden',
    backfaceVisibility: 'hidden',
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
}));

export default useStyles;
