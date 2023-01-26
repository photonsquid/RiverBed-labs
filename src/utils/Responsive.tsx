import { useMediaQuery } from 'react-responsive';

export interface ResponsiveProps {
  children: JSX.Element;
}

export const thresholds = {
  desktop: 992,
  tablet: 768,
  mobile: 767,
};

export function Desktop({ children }: ResponsiveProps) {
  return useMediaQuery({ minWidth: thresholds.desktop }) ? children : null;
}
export function Tablet({ children }: ResponsiveProps) {
  return useMediaQuery({ minWidth: thresholds.tablet, maxWidth: thresholds.desktop - 1 }) ? children : null;
}
export function Mobile({ children }: ResponsiveProps) {
  return useMediaQuery({ maxWidth: thresholds.mobile }) ? children : null;
}
export function Default({ children }: ResponsiveProps) {
  return useMediaQuery({ minWidth: thresholds.mobile + 1 }) ? children : null;
}
export function NonDesktop({ children }: ResponsiveProps) {
  return useMediaQuery({ maxWidth: thresholds.desktop - 1 }) ? children : null;
}