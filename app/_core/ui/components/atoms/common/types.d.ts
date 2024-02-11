/* THIS FILE KEEPS HOLD OF INTERFACES/TYPES THAT'RE COMMON BETWEEN ATOMS */

export type BgVariants = 'inherit' | 'normal' | 'light' | 'invert' | 'blued' | 'grayed' | 'black' | 'white' | 'none';

export type FlexJustifyVariants = 'space-around' | 'space-between' | 'space-evenly' | 'start' | 'center' | 'end';

export type SizeVariants =  'unset' | 'inherit' | '0.5rem' | '0.75rem' | '0.9rem' | '1rem' | '1.25rem' | '1.5rem' | '1.75rem' | '2rem' | '2.25rem' | '2.5rem' | '2.75' | '3rem';

export type WeightVaraints = '400' | '500' | '600' | '700';

export type FLexAlignVariants = 'center' | 'start' | 'end';

export type PositionVariants = 'absolute' | 'relative' | 'fixed' | 'unset';

export type FlexDirectionVariants = 'column' | 'row' | 'unset';

export type FlexWrapVariants = 'wrap' | 'nowrap' | 'unset';

export type VisibilityVariants = 'visible' | 'hidden';

export type HoverEffectVariants = 'scale' | 'translate' | 'none';

export type CursorVariants = 'default' | 'pointer' | 'text' | 'inherit' | 'not-allowed';

export type OverFlowVariants = 'auto' | 'hidden' | 'scroll' | 'visible' | 'unset' | 'inherit';

export interface CommonProps {
    sx?: string;
    padding?: string;
    margin?: string;
    shadow_effect?: boolean;
    over_flow_x?: OverFlowVariants; // !
    over_flow_y?: OverFlowVariants; // !
    border?: boolean;
    radius?: string;
    width?: string;
    min_width?: string;
    max_width?: string; // !
    height?: string; // !
    min_height?: string; // !
    max_height?: string; // !
    gap?: string;
    hover_effect?: HoverEffectVariants;
    bg?: BgVariants;
    visibility?: VisibilityVariants;

    // positioning !
    position?: PositionVariants;
    top?: string;
    right?: string;
    bottom?: string;
    left?: string;
    transform?: string;
    z_index?: string;
};
