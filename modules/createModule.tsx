import { ISettings } from './settings';
import { UI } from './ui';
export { ISettings, UI };

export interface IModule {
  readonly name: string;
  readonly description: string;
  readonly settingsUi: UI;
  readonly run: (settings: ISettings) => void;
  readonly render?: (settings: ISettings) => void;
}

export const createModule = (module: IModule) => 
  Object.freeze(module) as IModule;