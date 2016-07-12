import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';


export const Sessions = new Mongo.Collection('sessions');

const schema = new SimpleSchema({
  examId: { type: String, regEx: SimpleSchema.RegEx.Id },
  subjectId: { type: String, regEx: SimpleSchema.RegEx.Id },
  day: { type: Number },
  room: { type: [String] },
});

Sessions.attachSchema(schema);
