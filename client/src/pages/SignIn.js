import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import FlashOnIcon from '@material-ui/icons/FlashOn';

import { login } from '../actions/authActions';
import { clearErrors } from '../actions/errorActions';

import BootstrapInput from '../components/common/BootstrapInput';
import CustomCard from '../components/CustomCard/CustomCard';

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: '#262626',
    },
  },
  yellow: {
    color: '#FFFBA1',
  },
  typography: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#FFF',
    marginTop: '0.2rem',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    backgroundColor: '#FFFBA1',
    border: 'none',
    outline: 'none',
    borderRadius: '23px',
    margin: '1rem 0',
  },
  submit: {
    margin: theme.spacing(4, 0, 1),
    backgroundColor: '#FFFBA1',
    color: '#262626',
    borderRadius: '23px',
    padding: '0.5rem 3rem',
    textTransform: 'none',
    fontFamily: 'Anaheim, sans-serif',
    fontSize: '1.5rem',
    lineHeight: '1.5rem',
    '&:hover': {
      backgroundColor: '#fff96e',
    },
  },
  link: {
    color: '#FFFBA1',
    fontSize: '0.7rem',
    marginBottom: '1rem',
  },
  formGroup: {
    alignItems: 'center',
  },
  label: {
    color: '#FFF',
    fontSize: '1.1rem',
  },
}));

const SignIn = ({ isAuthenticated, doLogin, error }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState(null);
  const classes = useStyles();
  const history = useHistory();

  useEffect(() => {
    setMsg(error.id === 'LOGIN_FAIL' ? error.msg.msg : null);

    if (isAuthenticated) {
      history.push('/');
    }
  }, [error, history, isAuthenticated]);

  const onSubmit = e => {
    e.preventDefault();
    doLogin({
      email,
      password,
    });
  };

  return (
    <>
      <CssBaseline />
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        style={{ minHeight: '100vh' }}
      >
        <Grid item xs={3}>
          <CustomCard animation={false}>
            <Typography
              className={classes.typography}
              component="h1"
              variant="h5"
              noWrap
            >
              <FlashOnIcon className={classes.yellow} fontSize="large" />
              EEC
            </Typography>
            <form className={classes.form} onSubmit={onSubmit}>
              <Grid container spacing={4} className={classes.formGroup}>
                <Grid item xs={3} className={classes.label}>
                  Username:
                </Grid>
                <Grid item xs={9}>
                  <BootstrapInput
                    className={classes.input}
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={3} className={classes.formGroup}>
                <Grid item xs={3} className={classes.label}>
                  Password:
                </Grid>
                <Grid item xs={9}>
                  <BootstrapInput
                    required
                    id="password"
                    name="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                  />
                </Grid>
              </Grid>

              <Button
                type="submit"
                variant="contained"
                color="default"
                className={classes.submit}
              >
                Login
              </Button>

              <Link className={classes.link} href="/" variant="body2">
                Forgot your password?
              </Link>
            </form>
          </CustomCard>
        </Grid>
      </Grid>

      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        open={msg !== null}
        autoHideDuration={6000}
        onClose={() => setMsg(null)}
        ContentProps={{
          'aria-describedby': 'message-id',
        }}
        message={<span id="message-id">{msg}</span>}
        action={[
          <IconButton
            key="close"
            aria-label="close"
            color="inherit"
            className={classes.close}
            onClick={() => setMsg(null)}
          >
            <CloseIcon />
          </IconButton>,
        ]}
      />
    </>
  );
};

SignIn.defaultProps = {
  isAuthenticated: null,
};

SignIn.propTypes = {
  doLogin: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  error: PropTypes.shape({
    id: PropTypes.string,
    msg: PropTypes.objectOf(PropTypes.string),
  }).isRequired,
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error,
});

export default connect(
  mapStateToProps,
  { doLogin: login, clearErrors },
)(SignIn);
