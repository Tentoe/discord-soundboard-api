import { Schema, model, Types } from 'mongoose';


const soundBoardSchema = Schema({
  name: String,
  soundfiles: [{ type: Schema.Types.ObjectId, ref: 'SoundFile' }]
});

const soundFileSchema = Schema({
  name: String,
  filename: String
});


const SoundBoard = model('SoundBoard', soundBoardSchema);
const SoundFile = model('SoundFile', soundFileSchema);

export { SoundBoard, SoundFile };
