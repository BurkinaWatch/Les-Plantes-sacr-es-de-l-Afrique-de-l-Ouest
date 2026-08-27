import React from 'react';
import Svg, {
  Circle,
  Ellipse,
  G,
  Line,
  Path,
  Polygon,
  Polyline,
  Rect,
} from 'react-native-svg';

export type SacredIconName =
  | 'leaf'
  | 'tree'
  | 'sprout'
  | 'flower'
  | 'wheat'
  | 'palm'
  | 'book'
  | 'newspaper'
  | 'search'
  | 'close'
  | 'check'
  | 'arrow-left'
  | 'chevron-right'
  | 'clock'
  | 'target'
  | 'pin'
  | 'lightbulb'
  | 'alert'
  | 'history'
  | 'mortar'
  | 'root'
  | 'flame'
  | 'water'
  | 'wind'
  | 'sparkles'
  | 'star'
  | 'sun'
  | 'compass'
  | 'heart'
  | 'crown'
  | 'message'
  | 'trending'
  | 'paw'
  | 'user'
  | 'camera'
  | 'shield'
  | 'info'
  | 'plus'
  | 'trash'
  | 'archive'
  | 'circle';

interface SacredIconProps {
  name: SacredIconName;
  size?: number;
  color?: string;
  strokeWidth?: number;
  accessibilityLabel?: string;
}

const DEFAULT_COLOR = '#D4A017';

function IconPaths({
  name,
  color,
  strokeWidth,
}: {
  name: SacredIconName;
  color: string;
  strokeWidth: number;
}) {
  const common = {
    fill: 'none',
    stroke: color,
    strokeWidth,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  };

  switch (name) {
    case 'leaf':
      return (
        <>
          <Path {...common} d="M20 4C11 4 5 8.5 5 15c0 3.3 2.7 5 5.5 5C17 20 20 13 20 4Z" />
          <Path {...common} d="M4 21c3.2-4.4 7.2-7.3 12-9" />
        </>
      );
    case 'tree':
      return (
        <>
          <Path {...common} d="M12 21V10" />
          <Path {...common} d="M8 21h8" />
          <Path {...common} d="M12 3 8.5 8h2L7 13h3l-2 4h8l-2-4h3l-3.5-5h2L12 3Z" />
        </>
      );
    case 'sprout':
      return (
        <>
          <Path {...common} d="M12 21V11" />
          <Path {...common} d="M12 11C8 11 5 8.5 5 4c4.5 0 7 2.7 7 7Z" />
          <Path {...common} d="M12 14c0-4 3-6.5 7-6.5 0 4.5-3 6.5-7 6.5Z" />
        </>
      );
    case 'flower':
      return (
        <>
          <Circle {...common} cx="12" cy="12" r="2.5" />
          <Circle {...common} cx="12" cy="5.5" r="3" />
          <Circle {...common} cx="18.5" cy="12" r="3" />
          <Circle {...common} cx="12" cy="18.5" r="3" />
          <Circle {...common} cx="5.5" cy="12" r="3" />
          <Path {...common} d="M12 21v-2.5" />
        </>
      );
    case 'wheat':
      return (
        <>
          <Path {...common} d="M12 21V4" />
          <Path {...common} d="M12 8C9 8 7 6.5 7 4c3 0 5 1.5 5 4Z" />
          <Path {...common} d="M12 12c-3 0-5-1.5-5-4.5 3 0 5 1.5 5 4.5Z" />
          <Path {...common} d="M12 8c3 0 5-1.5 5-4  -3 0-5 1.5-5 4Z" />
          <Path {...common} d="M12 12c3 0 5-1.5 5-4.5-3 0-5 1.5-5 4.5Z" />
        </>
      );
    case 'palm':
      return (
        <>
          <Path {...common} d="M12 21V10" />
          <Path {...common} d="M12 10c-2-3.5-5.5-4.5-8-3 2.5 2.8 5 4 8 3Z" />
          <Path {...common} d="M12 10c2-3.5 5.5-4.5 8-3-2.5 2.8-5 4-8 3Z" />
          <Path {...common} d="M12 10c-.2-4 1.3-6.5 4-8-0.1 3.5-1.3 6-4 8Z" />
          <Path {...common} d="M9.5 21h5" />
        </>
      );
    case 'book':
      return (
        <>
          <Path {...common} d="M4 5.5A2.5 2.5 0 0 1 6.5 3H11v16H6.5A2.5 2.5 0 0 0 4 21.5v-16Z" />
          <Path {...common} d="M20 5.5A2.5 2.5 0 0 0 17.5 3H13v16h4.5a2.5 2.5 0 0 1 2.5 2.5v-16Z" />
        </>
      );
    case 'newspaper':
      return (
        <>
          <Rect {...common} x="3" y="4" width="18" height="16" rx="1.5" />
          <Path {...common} d="M7 8h5M7 12h5M7 16h5M15 8h3v4h-3zM15 16h3" />
        </>
      );
    case 'search':
      return <><Circle {...common} cx="10.5" cy="10.5" r="6.5" /><Path {...common} d="m16 16 5 5" /></>;
    case 'close':
      return <><Line {...common} x1="6" y1="6" x2="18" y2="18" /><Line {...common} x1="18" y1="6" x2="6" y2="18" /></>;
    case 'check':
      return <Polyline {...common} points="5 12 10 17 19 7" />;
    case 'arrow-left':
      return <><Line {...common} x1="19" y1="12" x2="5" y2="12" /><Polyline {...common} points="11 6 5 12 11 18" /></>;
    case 'chevron-right':
      return <Polyline {...common} points="9 5 16 12 9 19" />;
    case 'clock':
      return <><Circle {...common} cx="12" cy="12" r="8.5" /><Path {...common} d="M12 7v5l3 2" /></>;
    case 'target':
      return <><Circle {...common} cx="12" cy="12" r="8.5" /><Circle {...common} cx="12" cy="12" r="4.5" /><Circle cx="12" cy="12" r="1.5" fill={color} /></>;
    case 'pin':
      return <><Path {...common} d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z" /><Circle {...common} cx="12" cy="10" r="2.5" /></>;
    case 'lightbulb':
      return <><Path {...common} d="M9 18h6M10 21h4M8 14.5C6.8 13.4 6 11.8 6 10a6 6 0 1 1 12 0c0 1.8-.8 3.4-2 4.5-.7.6-1 1.3-1 2.5h-6c0-1.2-.3-1.9-1-2.5Z" /></>;
    case 'alert':
      return <><Path {...common} d="M12 3 2.8 20h18.4L12 3Z" /><Line {...common} x1="12" y1="9" x2="12" y2="14" /><Circle cx="12" cy="17" r="1" fill={color} /></>;
    case 'history':
      return <><Path {...common} d="M3 12a9 9 0 1 0 3-6.7" /><Polyline {...common} points="3 4 3 10 9 10" /><Path {...common} d="M12 7v5l3 2" /></>;
    case 'mortar':
      return <><Path {...common} d="M5 11h14l-1.5 8h-9L7 11Z" /><Path {...common} d="M4 11h16M9 7l7 4M8 5l3 2" /></>;
    case 'root':
      return <><Path {...common} d="M12 3v8M12 11c-3 1-4 4-4 7M12 11c3 1 4 4 4 7M8 18l-2 2M16 18l2 2M12 18v3" /><Path {...common} d="M7 7c-2-2-1-4 1-5 1 2 1 4-1 5ZM17 7c2-2 1-4-1-5-1 2-1 4 1 5Z" /></>;
    case 'flame':
      return <Path {...common} d="M12 21a6 6 0 0 0 6-6c0-4-3-6-4-10-2 2-2 4-2 6-1-1-3-2-3-5-2 2-4 5-4 9a6 6 0 0 0 6 6Z" />;
    case 'water':
      return <Path {...common} d="M12 3S6 10 6 14a6 6 0 0 0 12 0c0-4-6-11-6-11Z" />;
    case 'wind':
      return <><Path {...common} d="M3 8h11c3 0 3-4 0-4-1.3 0-2.2.7-2.6 1.6" /><Path {...common} d="M3 12h16c3 0 3 4 0 4-1.3 0-2.2-.7-2.6-1.6" /><Path {...common} d="M3 16h7" /></>;
    case 'sparkles':
      return <><Path {...common} d="m12 3 1.3 5.7L19 10l-5.7 1.3L12 17l-1.3-5.7L5 10l5.7-1.3L12 3Z" /><Path {...common} d="m19 16 .6 2.4L22 19l-2.4.6L19 22l-.6-2.4L16 19l2.4-.6L19 16Z" /></>;
    case 'star':
      return <Polygon {...common} points="12 3 14.8 8.5 21 9.4 16.5 13.7 17.6 20 12 17 6.4 20 7.5 13.7 3 9.4 9.2 8.5 12 3" />;
    case 'sun':
      return <><Circle {...common} cx="12" cy="12" r="4" /><Path {...common} d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></>;
    case 'compass':
      return <><Circle {...common} cx="12" cy="12" r="9" /><Polygon {...common} points="15.5 8.5 13.8 13.8 8.5 15.5 10.2 10.2 15.5 8.5" /></>;
    case 'heart':
      return <Path {...common} d="M20.8 8.8c0 5.2-8.8 10-8.8 10S3.2 14 3.2 8.8A4.7 4.7 0 0 1 12 6.2a4.7 4.7 0 0 1 8.8 2.6Z" />;
    case 'crown':
      return <><Path {...common} d="m3 7 4 4 5-7 5 7 4-4-2 12H5L3 7Z" /><Line {...common} x1="5" y1="16" x2="19" y2="16" /></>;
    case 'message':
      return <Path {...common} d="M20 11.5a7.5 7.5 0 0 1-8 7.5 8.5 8.5 0 0 1-4-.9L4 20l1.9-3.5A7.4 7.4 0 0 1 4 11.5 7.5 7.5 0 0 1 12 4a7.5 7.5 0 0 1 8 7.5Z" />;
    case 'trending':
      return <><Polyline {...common} points="3 17 9 11 13 15 21 7" /><Polyline {...common} points="15 7 21 7 21 13" /></>;
    case 'paw':
      return <><Ellipse {...common} cx="7" cy="8" rx="2" ry="2.5" /><Ellipse {...common} cx="17" cy="8" rx="2" ry="2.5" /><Ellipse {...common} cx="5" cy="14" rx="2" ry="2.5" /><Ellipse {...common} cx="19" cy="14" rx="2" ry="2.5" /><Path {...common} d="M12 12c-3.5 0-5 3-5 5 0 2 2.2 3 5 3s5-1 5-3c0-2-1.5-5-5-5Z" /></>;
    case 'user':
      return <><Circle {...common} cx="12" cy="8" r="3.5" /><Path {...common} d="M4.5 21a7.5 7.5 0 0 1 15 0" /></>;
    case 'camera':
      return <><Path {...common} d="M4 7h3l1.5-2h7L17 7h3v12H4V7Z" /><Circle {...common} cx="12" cy="13" r="3.5" /></>;
    case 'shield':
      return <Path {...common} d="M12 3 20 6v5c0 5-3.2 8.2-8 10-4.8-1.8-8-5-8-10V6l8-3Z" />;
    case 'info':
      return <><Circle {...common} cx="12" cy="12" r="9" /><Line {...common} x1="12" y1="11" x2="12" y2="16" /><Circle cx="12" cy="7.5" r="1" fill={color} /></>;
    case 'plus':
      return <><Line {...common} x1="12" y1="5" x2="12" y2="19" /><Line {...common} x1="5" y1="12" x2="19" y2="12" /></>;
    case 'trash':
      return <><Path {...common} d="M5 7h14M10 3h4l1 4H9l1-4ZM7 7l1 14h8l1-14M10 11v6M14 11v6" /></>;
    case 'archive':
      return <><Rect {...common} x="4" y="5" width="16" height="15" rx="1.5" /><Path {...common} d="M4 9h16M9 13h6" /></>;
    case 'circle':
      return <Circle {...common} cx="12" cy="12" r="8.5" />;
  }
}

export function SacredIcon({
  name,
  size = 22,
  color = DEFAULT_COLOR,
  strokeWidth = 1.8,
  accessibilityLabel,
}: SacredIconProps) {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      accessible={Boolean(accessibilityLabel)}
      accessibilityLabel={accessibilityLabel}
    >
      <IconPaths name={name} color={color} strokeWidth={strokeWidth} />
    </Svg>
  );
}

export function iconForGlyph(glyph: string): SacredIconName {
  if (glyph.includes('🌳')) return 'tree';
  if (glyph.includes('🌴')) return 'palm';
  if (glyph.includes('🌾')) return 'wheat';
  if (glyph.includes('🌺')) return 'flower';
  if (glyph.includes('🌱')) return 'sprout';
  if (glyph.includes('🌿') || glyph.includes('🍃')) return 'leaf';
  if (glyph.includes('📰')) return 'newspaper';
  if (glyph.includes('📖')) return 'book';
  if (glyph.includes('🔥')) return 'flame';
  if (glyph.includes('💧') || glyph.includes('🌊')) return 'water';
  if (glyph.includes('💨')) return 'wind';
  if (glyph.includes('🔍')) return 'search';
  if (glyph.includes('📍')) return 'pin';
  if (glyph.includes('⏱')) return 'clock';
  if (glyph.includes('🎯')) return 'target';
  if (glyph.includes('⚠')) return 'alert';
  if (glyph.includes('💡')) return 'lightbulb';
  if (glyph.includes('🗣')) return 'message';
  if (glyph.includes('📜')) return 'history';
  if (glyph.includes('⚗')) return 'mortar';
  if (glyph.includes('🫚')) return 'root';
  if (glyph.includes('🐾') || glyph.includes('🐺') || glyph.includes('🦁') || glyph.includes('🐊') || glyph.includes('🦅') || glyph.includes('🐍') || glyph.includes('🐟') || glyph.includes('🦜')) return 'paw';
  if (glyph.includes('🪷') || glyph.includes('🌸')) return 'flower';
  if (glyph.includes('🌍')) return 'compass';
  if (glyph.includes('🔮') || glyph.includes('✦') || glyph.includes('✧') || glyph.includes('◈') || glyph.includes('◇') || glyph.includes('◉') || glyph.includes('◆') || glyph.includes('△') || glyph.includes('◎') || glyph.includes('☯') || glyph.includes('☀')) return 'sparkles';
  if (glyph.includes('✟')) return 'shield';
  if (glyph.includes('📷')) return 'camera';
  return 'sparkles';
}

export function iconForCategory(category: string): SacredIconName {
  switch (category) {
    case 'Arbres Sacrés': return 'tree';
    case 'Plantes Médicinales': return 'leaf';
    case 'Plantes Alimentaires': return 'sprout';
    case 'Plantes Rituelles': return 'sparkles';
    case 'Herbes & Graminées': return 'wheat';
    case 'Palmiers': return 'palm';
    default: return 'leaf';
  }
}