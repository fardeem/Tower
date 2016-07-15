import moment from 'moment';
import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';

import { Subjects } from './subjects.js';


export const Sessions = new Mongo.Collection('sessions');

const schema = new SimpleSchema({
  examId: { type: String, regEx: SimpleSchema.RegEx.Id },
  subjectId: { type: String, regEx: SimpleSchema.RegEx.Id },
  day: { type: Number },
  room: { type: [String] },
  startTime: { type: String, regEx: /^(\d){2}:(\d){2}$/ },
  endTime: { type: String, regEx: /^(\d){2}:(\d){2}$/ },
});

Sessions.attachSchema(schema);


/* Methods */

export const updateDay = new ValidatedMethod({
  name: 'sessions.updateDay',
  validate: new SimpleSchema({
    _id: { type: String, regEx: SimpleSchema.RegEx.Id },
    day: { type: Number },
    startTime: { type: String },
  }).validator(),
  run({ _id, day, startTime }) {
    const session = Sessions.findOne({ _id });
    const subject = Subjects.findOne({ _id: session.subjectId });
    const endTime = moment(startTime, 'HH:mm').add(subject.examtime, 'h').format('HH:mm');

    return Sessions.update({ _id }, { $set: { day, startTime, endTime } });
  },
});
