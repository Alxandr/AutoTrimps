import * as dom from 'inferno-create-element';
import { render as renderElement } from 'inferno';
import { ISettings } from './settings';
import { IModule } from './createModule';
declare const game: any;
declare const toggleSettingsMenu: () => void;

export type UI = (settings: ISettings) => any[];

export const Toggle = ({ name, description, value }: { name: string, description: string, value: boolean }) => {
  const className = `noselect settingsBtn settingBtn${value}`;

  return (
    <div
      style={{ 
        display: 'inline-block', 
        verticalAlign: 'top', 
        marginLeft: '1vw', 
        marginBottom: '1vw', 
        width: '13.142vw',
        fontSize: '1.1vw' }}
      className={className}
    >{name}</div>
  );
}

const settings = (() => {
  const settingsRow = document.getElementById('settingsRow');

  const settings = document.createElement('div');
  settingsRow.appendChild(settings);
  settings.id = 'autoSettings';
  settings.style.display = 'none';
  settings.style.maxHeight = '96vh';
  settings.style.overflow = 'auto';

  return settings;
})();

const isVisible = (el: string | HTMLElement) => {
  if (typeof el === 'string') el = document.getElementById(el);
  return el && el.style && el.style.display === 'block';
}

const oldToggleSettingsMenu = toggleSettingsMenu;
const closeAllSettings = () => {
  if (game.options.displayed) {
    oldToggleSettingsMenu();
    return 'game';
  }

  if (isVisible('graphParent')) {
    document.getElementById('graphParent').style.display = 'none';
    return 'graph';
  }

  if (isVisible(settings)) {
    settings.style.display = 'none';
    return 'auto';
  }

  return null;
};

const toggleSettings = () => {
  if (closeAllSettings() !== 'auto') {
    settings.style.display = 'block';
  }
};

const createSettingsButton = () => {
  const settingsButton = document.createElement('td');
  settingsButton.appendChild(document.createTextNode('AutoTrimps'));
  settingsButton.classList.add('btn', 'btn-default');
  settingsButton.addEventListener('click', toggleSettings);

  const settingbarRow = document.getElementById("settingsTable").firstElementChild.firstElementChild;
  settingbarRow.insertBefore(settingsButton, settingbarRow.childNodes[10]);

};

export const createRenderer = () => {
  createSettingsButton();

  return (modules: IModule[]) => {
    const moduleNames = modules.map(m => <li><a href="#">{m.name}</a></li>);
    const pane = (
      <div className="autotrimps-settings-tabs-pane" style={{
        width: '200px',
        height: '100%',
        minHeight: '100px',
        float: 'left'
      }}>
        <ul className="autotrimps-settings-tabs">{moduleNames}</ul>
      </div>
    );
    renderElement(pane, settings);
  };
};
