export interface ISettings {
  group(name: string): ISettings;
  getOrSetDefault<T>(name: string, value: T): T;
}

const data = JSON.parse(localStorage.getItem('at2settings') || '{}');

class Settings implements ISettings {
  private _data: any;

  constructor(data: any) {
    this._data = data;
  }

  group(name: string): ISettings {
    if (name.indexOf('.') > -1) {
      return name.split('.').reduce<ISettings>((settings: ISettings, name: string) => settings.group(name), this);
    }

    const data = this._data;
    if (!data[name]) {
      data[name] = {};
    }

    return new Settings(data[name]);
  }

  getOrSetDefault<T>(name: string, value: T): T {
    const parts = name.split('.');
    let data = this._data;
    for (let i = 0; i < parts.length - 1; i++) {
      const part = parts[i];
      if (!data[part]) {
        data[part] = {};
      }

      data = data[part];
    }

    const settingName = parts[parts.length - 1];
    if (!data.hasOwnProperty(settingName)) {
      data[settingName] = value;
    }

    return data[settingName];
  }
}

export const settings: ISettings = new Settings(data);