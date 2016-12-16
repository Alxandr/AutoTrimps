import * as dom from 'inferno-create-element';
import { createModule, ISettings } from './createModule';
import { Toggle } from './ui';

// Settings keys
const ENABLED = 'enabled';

const render = (settings: ISettings) => [
  <Toggle name="Enabled" description="Auto Gathering of Food,Wood,Metal(w/turkimp) & Science." value={settings.getOrSetDefault(ENABLED, true)} />
];

export const GatherModule = createModule({
  name: 'Gather',
  description: 'Auto Gathering of Food,Wood,Metal(w/turkimp) & Science.',
  settingsUi: render,
  run: (settings: ISettings) => {

  }
})