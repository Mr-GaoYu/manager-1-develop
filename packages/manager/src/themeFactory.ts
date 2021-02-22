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

const primaryColors = {
  main: '#3683dc',
  light: '#4d99f1',
  dark: '#2466b3',
  text: '#606469',
  headline: '#32363c',
  divider: '#f4f4f4',
  offBlack: '#444',
  white: '#fff'
};

const cmrBGColors = {
  bgApp: '#f4f5f6',
  bgPrimaryNav: '#3a3f46',
  bgPrimaryNavActive: '#515861',
  bgPaper: '#ffffff',
  bgPrimaryButton: '#3683dc',
  // notification center, add a tag, breadcrumb
  bgSecondaryButton: '#e5f1ff',
  bgTableHeader: '#f9fafa',
  bgBillingSummary: '#f5f9ff',
  bgAccessRow: '#fafafa',
  bgAccessRowTransparentGradient: 'rgb(255, 255, 255, .001)'
};

type ThemeDefaults = (options: ThemeOverrides) => ThemeOptions;

const themeDefaults: ThemeDefaults = ({ spacingOverride: spacingUnit }) => {
  return {
    bg: {
      white: '#fff'
    },
    palette: {
      primary: primaryColors,
      status: {
        success: '#d7e3ef',
        successDark: '#3682dd',
        warning: '#fdf4da',
        warningDark: '#ffd002',
        error: '#f8dedf',
        errorDark: '#cd2227'
      },
      text: {
        primary: primaryColors.text
      }
    },
    cmrBGColors
  };
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
