import * as mongoose from 'mongoose';

import { dbURL } from '../config';

import { SoundBoard, SoundFile } from './models';

mongoose.connect(dbURL);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('mongo connected');
});

const newSoundFile = (name, filename) => new SoundFile({ name, filename }).save();
const newSoundBoard = soundBoardObject => new SoundBoard({ name: 'first Soundboard', soundfiles: [] }); // [sf1._id, sf2._id]

// TODO delete properties frontend doesn't need
const getSoundBoards = () => SoundBoard.find().populate('soundfiles');
const getSoundFiles = () => SoundFile.find();
export { getSoundBoards, getSoundFiles, newSoundFile };
