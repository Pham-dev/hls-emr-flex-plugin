export const twilioRed = "#F22F46";
export const twilioWhite = "#FFFFFF";
export const twilioBlue = "#001489";
export const lightGray = "#e6e6e6";
export const darkGray = "#666666";
export const black = "#000";
export const blue = "#0066b2";
export const teal = "#057d9e";
export const tealHover = "#02627c";
export const colorTextWeak = '#606B85';

export const CustomTheme = {
  baseName: "FlexLight",
  colors: {
      base1: twilioWhite,
      base3: lightGray,
      base0: twilioRed,
      tabSelectedColor: teal,
  },
  overrides: {
    MainHeader: {
        Container: {
          background: twilioWhite,
          color: darkGray
        },
        Button: {
          color: teal
        }
    },
    SideNav: {
        Container: {
          background: teal
        },
        Button: {
          background: teal
        },
        Icon: {
          color: twilioWhite
        }
    },
    TaskCanvasHeader: {
      EndTaskButton: {
        background: twilioRed
      },
      WrapUpTaskButton: {
        background: twilioRed
      }
    },
    TaskList: {
      Filter: {
        Menu: {
          background: twilioRed
        },
        Container: {
          background: twilioWhite
        },
        EntryButton: {
          background: twilioWhite
        }
      },
      Item: {
        Container: {
          background: twilioWhite
        },
        Icon: {
          background: teal
        },
        Buttons: {
        }
      }
    }
  }
}
