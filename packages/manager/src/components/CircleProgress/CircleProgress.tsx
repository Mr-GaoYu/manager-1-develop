import React from 'react';
import classNames from 'classnames';
import CircularProgress, {
  CircularProgressProps
} from 'src/components/core/CircularProgress';
import {
  createStyles,
  Theme,
  withStyles,
  WithStyles
} from 'src/components/core/styles';

type ClassNames =
  | 'root'
  | 'mini'
  | 'noPadding'
  | 'tag'
  | 'sort'
  | 'top'
  | 'green'
  | 'progress'
  | 'topWrapper'
  | 'valueInside'
  | 'hasValueInside'
  | 'noTopMargin';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      width: '100%',
      margin: '0 auto 20px',
      [theme.breakpoints.up('md')]: {
        flex: 1,
        height: 300
      }
    },
    progress: {
      position: 'relative',
      [theme.breakpoints.down('xs')]: {
        width: '72px !important',
        height: '72px !important'
      }
    },
    top: {
      width: 70,
      height: 70,
      borderRadius: '50%',
      border: '1px solid #999',
      [theme.breakpoints.up('sm')]: {
        width: 120,
        height: 120
      }
    },
    mini: {
      padding: theme.spacing(1) * 1.3
    },
    noPadding: {
      padding: 0
    },
    noTopMargin: {
      [theme.breakpoints.up('md')]: {
        top: 0,
        height: 'auto'
      }
    },
    tag: {
      width: '12px !important',
      height: '12px !important',
      padding: 0,
      marginLeft: 4,
      marginRight: 4
    },
    sort: {
      width: '14px !important',
      height: '14px !important',
      padding: 0,
      position: 'relative',
      top: 4,
      marginLeft: 8,
      marginRight: 4
    },
    green: {
      '& circle': {
        stroke: theme.color.green
      },
      '& $progress': {
        width: '93px !important',
        height: '93px !important'
      },
      '& $top': {
        width: 85,
        height: 85
      }
    },
    valueInside: {
      position: 'absolute',
      marginTop: 4
    },
    hasValueInside: {}
  });

interface Props extends CircularProgressProps {
  noTopMargin?: boolean;
  mini?: boolean;
  green?: boolean;
  className?: string;
  noInner?: boolean;
  noPadding?: boolean;
  tag?: boolean;
  sort?: boolean;
  children?: JSX.Element;
}

type CombinedProps = Props & WithStyles<ClassNames>;

class CircleProgressComponent extends React.Component<CombinedProps> {
  render() {
    const variant =
      typeof this.props.value === 'number' ? 'static' : 'indeterminate';

    const value = typeof this.props.value === 'number' ? this.props.value : 0;

    const {
      mini,
      noPadding,
      classes,
      tag,
      sort,
      noTopMargin,
      className,
      green,
      noInner,
      children,
      ...rest
    } = this.props;

    return mini ? (
      <CircularProgress
        className={classNames({
          [classes.mini]: true,
          [classes.noPadding]: noPadding,
          [classes.sort]: sort,
          [classes.tag]: tag
        })}
        size={noPadding ? 22 : 40}
        data-qa-circle-progress
        aria-label="Content is loading"
        data-testid="circle-progress"
        tabIndex={0}
      />
    ) : (
      <div
        className={classNames(
          {
            [classes.root]: true,
            [classes.noTopMargin]: noTopMargin,
            [classes.noPadding]: noPadding,
            [classes.green]: green,
            [classes.hasValueInside]: children !== undefined
          },
          className
        )}
        aria-label="Content is loading">
        {children !== undefined && (
          <div className={classes.valueInside}>{children}</div>
        )}

        {noInner !== true && (
          <div className={classes.topWrapper}>
            <div className={classes.top} />
          </div>
        )}

        <CircularProgress
          {...rest}
          className={classes.progress}
          size={green ? 128 : 124}
          value={value}
          variant={variant}
          thickness={green ? 4 : 2}
          data-qa-circle-progress={value}
          data-testid="circle-progress"
        />
      </div>
    );
  }
}

const styled = withStyles(styles);

export default styled(CircleProgressComponent);
