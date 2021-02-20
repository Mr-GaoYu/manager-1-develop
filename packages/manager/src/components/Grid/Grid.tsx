import React from 'react';
import Grid, { GridProps } from 'src/components/core/Grid';
import RenderGuard from 'src/components/RenderGuard';

export interface Props extends GridProps {}

const WrappedGrid = React.forwardRef<HTMLDivElement, GridProps>(
  (props, ref) => {
    const updatedProps: GridProps = {
      ...props,

      ...(props.container && !props.spacing && { spacing: 2 })
    };

    return (
      <Grid ref={ref} {...updatedProps}>
        {props.children}
      </Grid>
    );
  }
);

export default RenderGuard<GridProps>(WrappedGrid);
