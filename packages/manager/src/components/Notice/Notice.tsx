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
import Error from 'src/assets/alert.svg';
import Warning from 'src/assets/warning.svg';
import classNames from 'classnames';
import Close from '@material-ui/icons/Close';

const useStyles = makeStyles((theme: Theme) => ({
  '@keyframes fadeIn': {
    from: {
      opacity: 0
    },
    to: {
      opacity: 1
    }
  },
  root: {
    marginBottom: theme.spacing(2),
    position: 'relative',
    padding: '4px 16px',
    maxWidth: '100%',
    display: 'flex',
    alignItems: 'center',
    '&.notice': {
      marginTop: `${theme.spacing(1)}px !important`
    }
  },
  important: {
    backgroundColor: theme.cmrBGColors.bgPaper,
    padding: theme.spacing(2)
  },
  icon: {
    color: 'white',
    position: 'absolute',
    left: -25
  },
  noticeText: {
    color: theme.palette.text.primary,
    fontSize: '1rem',
    lineHeight: `20px`,
    fontFamily: 'LatoWebBold',
    '& p': {
      fontSize: '1rem'
    }
  },
  closeIcon: {
    paddingLeft: theme.spacing(1)
  },
  inner: {
    width: '100%'
  },
  error: {
    borderLeft: `5px solid ${theme.palette.status.errorDark}`,
    animation: '$fadeIn 225ms linear forwards',
    '&$important': {
      borderLeftWidth: 32
    }
  },
  success: {
    borderLeft: `5px solid ${theme.palette.status.successDark}`,
    animation: '$fadeIn 225ms linear forwards',
    '&$important': {
      borderLeftWidth: 32
    }
  },
  warning: {
    borderLeft: `5px solid ${theme.palette.status.warningDark}`,
    animation: '$fadeIn 225ms linear forwards',
    '&$important': {
      borderLeftWidth: 32
    },
    '& $icon': {
      color: '#555'
    }
  },
  errorList: {
    borderLeft: `5px solid ${theme.palette.status.errorDark}`
  },
  successList: {
    borderLeft: `5px solid ${theme.palette.status.successDark}`
  },
  warningList: {
    borderLeft: `5px solid ${theme.palette.status.warningDark}`
  }
}));

interface Props extends GridProps {
  success?: boolean;
  warning?: boolean;
  error?: boolean;
  important?: boolean;

  text?: string;
  typeProps?: TypographyProps;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  notificationList?: boolean;

  /** Dismissible Props */
  dismissible?: boolean;
  onClose?: () => void;

  spacingTop?: 0 | 8 | 16 | 24;
  spacingBottom?: 0 | 8 | 16 | 24;
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
    onClick,
    dismissible,
    onClose,
    children,
    spacingTop,
    spacingBottom,
    important,
    notificationList
  } = props;

  const dataAttributes = !props.error
    ? {
        'data-qa-notice': true
      }
    : {
        'data-qa-notice': true,
        'data-qa-error': true
      };

  const innerText = text ? (
    <Typography
      {...typeProps}
      onClick={onClick}
      className={`${classes.noticeText} noticeText`}>
      {text}
    </Typography>
  ) : null;

  const _children =
    typeof children === 'string' ? (
      <Typography className={`${classes.noticeText} noticeText`}>
        {children}
      </Typography>
    ) : (
      children
    );

  return (
    <Grid
      item
      className={classNames({
        [classes.root]: true,
        [classes.important]: important,
        [classes.error]: error && !notificationList,
        [classes.success]: success && !notificationList,
        [classes.warning]: warning && !notificationList,
        [classes.errorList]: error && notificationList,
        [classes.successList]: success && notificationList,
        [classes.warningList]: warning && notificationList,
        notice: true
      })}
      style={{
        marginTop: spacingTop !== undefined ? spacingTop : 0,
        marginBottom: spacingBottom !== undefined ? spacingBottom : 24
      }}
      {...dataAttributes}
      role="alert">
      {important &&
        ((success && <Check className={classes.icon} data-qa-success-img />) ||
          (warning && (
            <Warning className={classes.icon} data-qa-warning-img />
          )) ||
          (error && <Error className={classes.icon} data-qa-error-img />))}

      <div className={classes.inner}>{innerText || _children}</div>

      {dismissible && (
        <Grid item className={classes.closeIcon}>
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
