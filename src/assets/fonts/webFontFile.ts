import Phaser from 'phaser';
import WebFontLoader from 'webfontloader';

interface Config {
  active: () => void;
  [key: string]: unknown;
}

export default class WebFontFile extends Phaser.Loader.File {
  fontNames: string[];
  service: string;

  constructor(loader: Phaser.Loader.LoaderPlugin, fontNames: string | string[], service = 'google') {
    super(loader, {
      type: 'webfont',
      key: fontNames.toString(),
    });
    this.fontNames = Array.isArray(fontNames) ? fontNames : [fontNames];
    this.service = service;
  }

  load() {
    const config: Config = {
      active: () => {
        this.loader.nextFile(this, true);
      },
    };
    switch (this.service) {
      case 'google':
        config.google = {
          families: this.fontNames,
        };
        break;

      default:
        throw new Error('Unsupported font service');
    }

    WebFontLoader.load(config);
  }
}
