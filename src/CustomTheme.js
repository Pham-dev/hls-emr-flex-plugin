export const twilioRed = "#F22F46";
export const twilioWhite = "#FFFFFF";
export const twilioBlue = "#001489";
export const lightGray = "#e6e6e6";
export const lightGray2 = '#F2F2F5';
export const middleGray = '#8A91A8';
export const darkGray = "#666666";
export const darkGray2 = '#3C4760';
export const darkGray3 = '#4B5671';
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
          background: twilioWhite,
          color: darkGray3
        },
    },
    SideNav: {
        Container: {
          background: darkGray3
        },
        Button: {
          background: darkGray3
        },
        Icon: {
          color: twilioWhite,
        }
    },
    TaskCanvasHeader: {
      EndTaskButton: {
        background: twilioBlue,
      },
      WrapUpTaskButton: {
        background: twilioRed,
      }
    },
    TaskList: {
      Filter: {
        Menu: {
          background: lightGray2
        },
        Container: {
          background: lightGray2
        },
        EntryButton: {
          background: lightGray2
        }
      },
      Item: {
        Container: {
          background: lightGray2,
          /*marginRight: '4px',
          marginLeft: '4px',
          padding: '5px 0 4px 0'*/
        },
        SelectedContainer: {
          background: darkGray2,
          borderRadius: '8px',
          color: twilioWhite
        },
        Icon: {
          //background: lightGray2,
          borderRadius: '50%',
        },
        Buttons: {}
      }
    },
    TaskCard: {
      Container: {
        Default: {
          //height: '54px'
        }
      },
      IconArea: {
        Default: {
          display: 'none'
        }
      },
    },
  }
}
