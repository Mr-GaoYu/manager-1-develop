// import acreateBreakpoints from 'src/components/core/styles/createBreakpoints';
import createMuiTheme, {
  ThemeOptions
} from 'src/components/core/styles/createMuiTheme';
import { mergeDeepRight } from 'ramda';

declare module '@material-ui/core/styles/createPalette' {
  interface Palette {
    status: {
      success: string;
      successDark: string;
      warning: string;
      warningDark: string;
      error: string;
      errorDark: string;
    };
  }

  interface PaletteOptions {
    status?: {
      success?: string;
      successDark?: string;
      warning?: string;
      warningDark?: string;
      error?: string;
      errorDark?: string;
    };
  }
}

declare module '@material-ui/core/styles/createMuiTheme' {
  interface Theme {
    name: string;
    '@keyframes rotate': any;
    '@keyframes dash': any;
    bg: any;
    cmrBGColors: any;
    cmrTextColors: any;
    cmrBorderColors: any;
    cmrIconColors: any;
    color: any;
    graphs: any;
    visually: any;
    font?: any;
    animateCircleIcon?: any;
    addCircleHoverEffect?: any;
    applyLinkStyles?: any;
    applyStatusPillStyles?: any;

    notificationList: any;
    status: any;
  }

  interface ThemeOptions {
    name?: string;
    '@keyframes rotate'?: any;
    '@keyframes dash'?: any;
    bg?: any;
    color?: any;
    graphs?: any;
    visually?: any;
    font?: any;
    animateCircleIcon?: any;
    addCircleHoverEffect?: any;
    notificationList?: any;
    status?: any;
  }
}

export const COMPACT_SPACING_UNIT = 4;
export const NORMAL_SPACING_UNIT = 8;

export interface ThemeOverrides {
  spacingOverride: typeof COMPACT_SPACING_UNIT | typeof NORMAL_SPACING_UNIT;
}

type ThemeDefaults = (options: ThemeOverrides) => ThemeOptions;

const themeDefaults: ThemeDefaults = ({ spacingOverride: spacingUnit }) => {
  return {};
};

export default (options: ThemeOptions & ThemeOverrides) =>
  createMuiTheme(
    mergeDeepRight(
      themeDefaults({
        spacingOverride: options.spacingOverride
      }),
      {
        breakpoints: {
          values: {
            xs: 0,
            sm: 600,
            md: 960,
            lg: 1280,
            xl: 1920
          }
        },
        ...options
      }
    )
  );
