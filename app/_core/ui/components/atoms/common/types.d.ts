/* THIS FILE KEEPS HOLD OF INTERFACES/TYPES THAT'RE COMMON BETWEEN ATOMS */

export type BgVariants = 'normal' | 'light' | 'invert' | 'blued' | 'grayed' | 'none';

export type FlexJustifyVariants = 'space-around' | 'space-between' | 'space-evenly' | 'start' | 'center' | 'end';

export type SizeVariants =  '0.5rem' | '0.75rem' | '1rem' | '1.25rem' | '1.5rem' | '1.75rem' | '2rem' | '2.25rem' | '2.5rem' | '2.75' | '3rem';

export type WeightVaraints = '400' | '500' | '600' | '700';

export type FLexAlignVariants = 'center' | 'start' | 'end';

export type PositionVariants = 'absolute' | 'relative' | 'fixed' | 'unset';

export type FlexDirectionVariants = 'column' | 'row' | 'unset';

export type HoverEffectVariants = 'scale' | 'translate' | 'none';

export type CursorVariants = 'default' | 'pointer' | 'text';

export interface CommonProps {
    sx?: string;
    padding?: string;
    margin?: string;
    shadow_effect?: boolean;
    border?: boolean;
    radius?: string;
    width?: string;
    min_width?: string;
    gap?: string;
    hover_effect?: HoverEffectVariants;
    bg?: BgVariants;
};
