import {StyleSheet} from 'react-native';

export const ENV = {
  apiUrl: 'https://api.themoviedb.org/3',
  accessToken:
    'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxNDQyYTc2OWY1NGNiZmExNTNhZDlhODI0OWJhYzU2ZSIsIm5iZiI6MTcyNTg2NTEwOS41OTI5NTksInN1YiI6IjY2ZGE4OTJiZDMwZWVhM2ZkOThjYWQ1NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.X7IUy4TjogvW9nWseZpiRwPTm4tKr90EScon8fOkX3g',
};

export const COLORS = {
  primary: '#041562',
  secondary: '#11468F',
  accent1: '#2FDD92',
  accent2: '#FFFD95',
  white: '#FFFFFF',
  red: '#EF4444',
  gray100: '#F2F4F7',
  gray200: '#E2E2E2',
  gray300: '#A7A7A7',
  gray400: '#7C7C7C',
  gray500: '#7B7A7A',
  gray600: '#696969',
  gray700: '#5B5B5B',
  gray800: '#474747',
};

export const FONTS = {
  ibm: 'IBMPlexSans-Regular',
  rubik: 'Rubik-Regular',
};

type FontType = (typeof FONTS)[keyof typeof FONTS];
type ColorType = (typeof COLORS)[keyof typeof COLORS];
type Align = 'center' | 'auto' | 'left' | 'right' | 'justify';

export const DYNAMIC = {
  h1: (font: FontType, color: ColorType, align?: Align) => {
    return {
      fontSize: 34,
      lineHeight: 40,
      fontFamily: font,
      color: color,
      textAlign: align ?? 'auto',
    };
  },
  h2: (font: FontType, color: ColorType, align?: Align) => {
    return {
      fontSize: 28,
      lineHeight: 34,
      fontFamily: font,
      color: color,
      textAlign: align ?? 'auto',
    };
  },
  h3: (font: FontType, color: ColorType, align?: Align) => {
    return {
      fontSize: 22,
      lineHeight: 26,
      fontFamily: font,
      color: color,
      textAlign: align ?? 'auto',
    };
  },
  h4: (font: FontType, color: ColorType, align?: Align) => {
    return {
      fontSize: 18,
      lineHeight: 22,
      fontFamily: font,
      color: color,
      textAlign: align ?? 'auto',
    };
  },
  bodyLarge: (font: FontType, color: ColorType, align?: Align) => {
    return {
      fontSize: 16,
      lineHeight: 24,
      fontFamily: font,
      color: color,
      textAlign: align ?? 'auto',
    };
  },
  bodyDefault: (font: FontType, color: ColorType, align?: Align) => {
    return {
      fontSize: 14,
      lineHeight: 22,
      fontFamily: font,
      color: color,
      textAlign: align ?? 'auto',
    };
  },
  bodySmall: (font: FontType, color: ColorType, align?: Align) => {
    return {
      fontSize: 12,
      lineHeight: 18,
      fontFamily: font,
      color: color,
      textAlign: align ?? 'auto',
    };
  },
};

export const STATIC = StyleSheet.create({
  link: {
    fontSize: 14,
    lineHeight: 22,
    fontFamily: FONTS.ibm,
    color: COLORS.secondary,
    textDecorationLine: 'underline',
  },
});
