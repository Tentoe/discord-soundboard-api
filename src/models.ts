import { join } from 'path';
import { soundFileDir } from 'src/config';

export class RawSoundfile {
  constructor(public name: string, public filename: string) {
    if (!name || !filename || typeof name !== 'string' || typeof filename !== 'string') {
      throw new TypeError(`object doesn't contain strings name and filename. name:${name} filename:${filename}`);
    }
  }
}

export class Soundfile extends RawSoundfile {
  constructor(soundfile: RawSoundfile) {
    super(soundfile.name, soundfile.filename);
  }
  getPath() {
    return join(soundFileDir, this.filename);
  }
}
