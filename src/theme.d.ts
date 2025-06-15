import { PaletteOptions } from '@mui/material/styles';

type Colors = {
  primary: string;
};

declare module '@mui/material/styles' {
  interface Palette {
    custom: Colors;
  }

  interface PaletteOptions {
    custom?: Colors;
  }
}
