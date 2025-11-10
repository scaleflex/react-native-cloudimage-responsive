import { type CloudImagePropsInterface } from '../components/cloudimage/cloudimage.interface';

export interface InstallPluginPropsInterface {
  domain: string;
}
export type ConstructImageSourceFunctionType =
  ({}: CloudImagePropsInterface) => string;

export type InstallPluginFunctionType =
  ({}: InstallPluginPropsInterface) => void;
