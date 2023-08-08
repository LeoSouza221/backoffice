import {PaletteMode} from "@mui/material";
import {green, grey} from "@mui/material/colors";

export const getDesignTokens = (mode: PaletteMode) => ({
  palette: {
    mode,
    ...(mode === 'light' ? {
        success: green,
        background: {
          default: '#f5f5f5',
          paper: '#fff',
          primary: grey[300],
          secondary: grey[200],
          third: grey[100]
        }
      } : {
        success: green,
        background: {
          default: '#050505',
          primary: grey[900],
          secondary: grey[800],
          third: grey[700]
        }
      }
    )
  },
})