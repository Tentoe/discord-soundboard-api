
const NEXTVAL = 'nextval';
const SOUNDFILES = 'soundfiles';
const SOUNDFILE = 'soundfile';
const GUILD = 'guild';
const PROJECT = 'sb';
const SEP = ':';

const check = (...check: (string|number)[]): void => {
  check.forEach((element) => {
    if (!element) {
      throw new RangeError(`Function doesn't take value of ${element}`);
    }
    if (element < 0) {
      throw new RangeError(`Function doesn't take negative number. Value:${element}`);
    }
    if (typeof element === 'string' && element.includes(SEP)) {
      throw new SyntaxError(`id can't contain seperator "${SEP}". Value:${element}`);
    }
    if (typeof element === 'number' && element % 1 !== 0) {
      throw new RangeError(`id can't be floating-point. Value:${element}`);
    }
    if (element === Infinity) {
      throw new RangeError(`id can't be fInfinity.`);
    }
  });
};

export const getKey = {
  guild: (guildID: string | number): string => {
    check(guildID);
    return `${PROJECT}${SEP}${GUILD}${SEP}${guildID}`;
  },
  soundfile: (guildID: string | number, soundID: string | number) => {
    check(guildID, soundID);
    return `${getKey.guild(guildID)}${SEP}${SOUNDFILE}${SEP}${soundID}`;
  },
  soundfileNextval: (guildID: string | number): string => {
    check(guildID);
    return `${getKey.guild(guildID)}${SEP}${SOUNDFILE}${SEP}${NEXTVAL}`;
  },
  soundfiles: (guildID: string | number): string => {
    check(guildID);
    return `${getKey.guild(guildID)}${SEP}${SOUNDFILES}`;
  },
};
