import React from 'react';
import { withTheme, WithTheme } from 'src/components/core/styles';
import { getDisplayName } from 'src/utilities/getDisplayName.ts';
import { equals } from 'ramda';

export interface RenderGuardProps {
  updateFor?: any[];
}

const renderGuard = <P extends {}>(
  Component: React.ComponentType<P & RenderGuardProps>
) => {
  class ComponentWithRenderGuard extends React.Component<
    RenderGuardProps & WithTheme
  > {
    static displayName = `WithRenderGuard(${getDisplayName(Component)})`;

    shouldComponentUpdate(nextProps: P & RenderGuardProps & WithTheme) {
      if (Array.isArray(this.props.updateFor)) {
        return (
          !equals(this.props.updateFor, nextProps.updateFor) ||
          this.props.theme.name !== nextProps.theme.name ||
          this.props.theme.spacing(1) !== nextProps.theme.spacing(1)
        );
      }

      return true;
    }

    render() {
      const { theme, updateFor, ...rest } = this.props as any;

      return <Component {...rest} />;
    }
  }

  return withTheme(ComponentWithRenderGuard) as React.ComponentType<
    P & RenderGuardProps
  >;
};

export default renderGuard;
