import * as mongoose from 'mongoose';

import { dbURL } from '../config';

import { SoundBoard, SoundFile } from './models';

mongoose.connect(dbURL);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('mongo connected');
});

const newSoundFile = soundFileObject => new SoundFile({ name: 'Preussen gloria', filename: 'pg.mp3' }).save();
const newSoundBoard = soundBoardObject => new SoundBoard({ name: 'first Soundboard', soundfiles: [] }); // [sf1._id, sf2._id]

const getSoundBoards = () => SoundBoard.find().populate('soundfiles');
const getSoundFiles = () => SoundFile.find();
export { getSoundBoards, getSoundFiles };
