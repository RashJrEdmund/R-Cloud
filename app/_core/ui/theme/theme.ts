interface IColorPalette {
  text: string;
  text_grayed: string;
  text_invert: string;
  text_blue: string;
  text_dark: string;
  text_white: string;

  border: string;
  border_thick: string;

  bg: string;
  bg_light: string;
  bg_invert: string;

  app_bg: string;
  app_blue: string;
  overlay_gradient: string;
}

interface IDimensions {
  app_width: string;
}

interface IEffects {
  box_shadow: string;
}

const THEME_PALLETE: {
  colors: IColorPalette,
  dimensions: IDimensions,
  effects: IEffects,
} = {
  colors: {
    // Static color pallete references variables in the globals.css file
    // for now, themes as per system.

    text: 'var(--text)',
    text_grayed: 'var(--text_grayed)',
    text_invert: 'var(--text_invert)',
    text_blue: 'var(--text_blue)',
    text_dark: 'var(--text_dark)',
    text_white: 'var(--text_white)',

    border: 'var(--border)',
    border_thick: 'var(--border_thick)',

    bg: 'var(--bg)',
    bg_light: 'var(--bg_light)',
    bg_invert: 'var(--bg_invert)',

    app_bg: 'var(--app_bg)',
    app_blue: 'var(--app_blue)',
    overlay_gradient: 'var(--overlay_gradient)',
  },

  dimensions: {
    app_width: 'var(--app_width)',
  },

  effects: {
    box_shadow: 'var(---box_shadow)',
  }
};

export type {
  IColorPalette,
};

export {
  THEME_PALLETE,
};
