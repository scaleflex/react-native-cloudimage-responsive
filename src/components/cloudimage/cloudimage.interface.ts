import { type ReactNode, type CSSProperties } from 'react';

export interface CloudImagePropsInterface {
  src: string;
  width?: number;
  height?: number;
  func?: string;
  alt?: string;
  style?: CSSProperties;
}

export type CloudImageFunctionType =
  ({}: CloudImagePropsInterface) => ReactNode;
