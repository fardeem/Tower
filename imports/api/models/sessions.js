import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';


export const Sessions = new Mongo.Collection('sessions');

const schema = new SimpleSchema({
  examId: { type: String, regEx: SimpleSchema.RegEx.Id },
  subjectId: { type: String, regEx: SimpleSchema.RegEx.Id },
  day: { type: Number },
  room: { type: [String] },
});

Sessions.attachSchema(schema);

export const updateDay = new ValidatedMethod({
  name: 'sessions.updateDay',
  validate: new SimpleSchema({
    _id: { type: String, regEx: SimpleSchema.RegEx.Id },
    day: { type: Number },
  }).validator(),
  run({ _id, day }) {
    return Sessions.update({ _id }, { $set: { day } });
  },
});
