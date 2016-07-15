import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';

import { Subjects } from './subjects.js';
import { Sessions } from './sessions.js';
import ExamFactory from '../utils/ExamFactory.js';


export const Exams = new Mongo.Collection('exams');

const schema = new SimpleSchema({
  name: { type: String },
  date: { type: Date },
  time: { type: String, regEx: /^(\d){2}:(\d){2}$/ },
  subjects: { type: [String], regEx: SimpleSchema.RegEx.Id },
  grades: { type: [Number] },
  days: { type: Number },
});

Exams.attachSchema(schema);


/* Publication */
if (Meteor.isServer) {
  Meteor.publish('exams', (_id) => {
    check(_id, String);
    return [
      Exams.find({ _id }),
      Sessions.find({ examId: _id }),
    ];
  });
}


/* Methods */

export const add = new ValidatedMethod({
  name: 'exams.add',
  validate: schema.pick([
    'name', 'date', 'time', 'subjects', 'subjects.$',
  ]).validator(),
  run({ name, date, time, subjects }) {
    const { examId, grades, days, sessions } = ExamFactory(
      Subjects.find({ _id: { $in: subjects } }).fetch()
    );

    return Exams.insert({
      _id: examId, name, date, time, subjects, grades, days,
    }, (err, res) => {
      if (! this.isSimulation) {
        return Sessions.rawCollection().insert(sessions, () => res);
      }

      return res;
    });
  },
});


export const incrementDay = new ValidatedMethod({
  name: 'exams.incrementDay',
  validate: new SimpleSchema({
    _id: { type: String, regEx: SimpleSchema.RegEx.Id },
  }).validator(),
  run({ _id }) {
    return Exams.update({ _id }, { $inc: { days: 1 } });
  },
});
