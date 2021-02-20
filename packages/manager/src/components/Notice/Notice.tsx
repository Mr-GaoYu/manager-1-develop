import React from 'react';
import {
  makeStyles,
  Theme,
  withTheme,
  WithTheme
} from 'src/components/core/styles';
import Typography, { TypographyProps } from 'src/components/core/Typography';
import Grid, { GridProps } from 'src/components/Grid';
import Check from 'src/assets/check.svg';
import Error from 'src/assets/error.svg';
import Warning from 'src/assets/warning.svg';
import classNames from 'classnames';
import Close from '@material-ui/icons/Close';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    marginBottom: theme.spacing(2),
    position: 'relative',
    padding: '4px 16px',
    maxWidth: '100%',
    display: 'flex',
    alignItems: 'center',
    border: '1px solid red'
  },
  icon: {
    color: 'white',
    position: 'absolute',
    left: -25
  }
}));

interface Props extends GridProps {
  success?: boolean;
  warning?: boolean;
  error?: boolean;

  text?: string;
  typeProps?: TypographyProps;

  /** Dismissible Props */
  dismissible?: boolean;
  onClose?: () => void;
}

type CombinedProps = Props & WithTheme;

const Notice: React.FC<CombinedProps> = (props) => {
  const classes = useStyles();
  const {
    success,
    warning,
    error,
    text,
    typeProps,
    dismissible,
    onClose,
    children
  } = props;

  const innerText = text ? (
    <Typography {...typeProps}>{text}</Typography>
  ) : null;

  const _children =
    typeof children === 'string' ? (
      <Typography>{children}</Typography>
    ) : (
      children
    );

  return (
    <Grid
      item
      className={classNames({
        [classes.root]: true
      })}
      role="alert">
      {(success && <Check className={classes.icon} data-qa-success-img />) ||
        (warning && <Warning className={classes.icon} data-qa-warning-img />) ||
        (error && <Error className={classes.icon} data-qa-error-img />)}

      <div>{innerText || _children}</div>

      {dismissible && (
        <Grid item>
          <Close
            style={{
              cursor: 'pointer'
            }}
            onClick={onClose}
          />
        </Grid>
      )}
    </Grid>
  );
};

export default withTheme(Notice);
