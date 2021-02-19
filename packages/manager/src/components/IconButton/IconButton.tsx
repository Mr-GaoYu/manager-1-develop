import React from 'react';
import classNames from 'classnames';
import IconButton, { IconButtonProps } from 'src/components/core/IconButton';
import {
  createStyles,
  Theme,
  withStyles,
  WithStyles
} from 'src/components/core/styles';

type ClassNames = 'root';

interface Props extends IconButtonProps {
  destructive?: boolean;
  style?: React.CSSProperties;
  className?: string;
  disabled?: boolean;
  onClick?: (e: React.SyntheticEvent<HTMLElement>) => void;
}

const styles = (theme: Theme) =>
  createStyles({
    root: {
      transition: theme.transitions.create(['opacity'])
    }
  });

type CombinedProps = Props & WithStyles<ClassNames>;

const IconButtonWrapper: React.FC<CombinedProps> = (props) => {
  const { classes, className, style, children, ...rest } = props;

  return (
    <IconButton
      style={style}
      className={classNames(
        {
          [classes.root]: true
        },
        className
      )}
      {...rest}>
      {children}
    </IconButton>
  );
};

const styled = withStyles(styles);

export default styled(IconButtonWrapper);
