import { SnackbarProvider, SnackbarProviderProps } from 'notistack';
import React from 'react';
import {
  createStyles,
  Theme,
  withStyles,
  WithStyles
} from 'src/components/core/styles';
import CloseSnackbar from './CloseSnackbar';

type ClassNames = 'root' | 'info' | 'success' | 'error' | 'warning';

const styles = (theme: Theme) =>
  createStyles({
    root: {},
    info: {
      backgroundColor: theme.bg.white,
      borderLeftColor: theme.palette.primary.main
    },
    success: {
      backgroundColor: theme.bg.white,
      borderLeftColor: theme.palette.primary.main
    },
    error: {
      backgroundColor: theme.bg.white,
      borderLeftColor: theme.palette.status.errorDark
    },
    warning: {
      backgroundColor: theme.bg.white,
      borderLeftColor: theme.palette.status.warningDark
    }
  });

type CombinedProps = SnackbarProviderProps & WithStyles<ClassNames>;

const SnackBar: React.FC<CombinedProps> = (props) => {
  const notistackRef: React.Ref<SnackbarProvider> = React.createRef();
  const onClickDismiss = (key: string | number | undefined) => () => {
    notistackRef?.current?.closeSnackbar(key);
  };

  const { children, classes, ...rest } = props;

  return (
    <SnackbarProvider
      ref={notistackRef}
      {...rest}
      classes={{
        root: classes.root,
        /** Overriding styles */
        variantInfo: classes.info,
        variantSuccess: classes.success,
        variantError: classes.error,
        variantWarning: classes.warning
      }}
      action={(key) => (
        <CloseSnackbar
          onClick={onClickDismiss(key)}
          text="Dismiss Notification"
        />
      )}>
      {children}
    </SnackbarProvider>
  );
};

const styled = withStyles(styles);

export default styled(SnackBar);
