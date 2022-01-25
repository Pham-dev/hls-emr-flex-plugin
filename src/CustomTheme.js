export const twilioRed = "#F22F46";
export const twilioWhite = "#FFFFFF";
export const twilioBlue = "#001489";
export const lightGray = "#e6e6e6";
export const darkGray = "#666666";
export const black = "#000";
export const blue = "#0066b2";

export const CustomTheme = {
  baseName: "FlexLight",
  colors: {
      base1: twilioWhite,
      base2: twilioWhite,
      base0: twilioBlue
  },
  overrides: {
      MainHeader: {
          Container: {
            background: twilioWhite,
            color: darkGray
          },
          Button: {
            color: twilioBlue
          }
      },
      SideNav: {
          Container: {
            background: twilioBlue
          },
          Button: {
            background: twilioBlue
          },
          Icon: {
            color: twilioWhite
          }
      }
  }
}