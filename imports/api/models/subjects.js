import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { check } from 'meteor/check';


export const Subjects = new Mongo.Collection('subjects');

const schema = new SimpleSchema({
  name: { type: String },
  grade: { type: Number },
  examtime: { type: Number },
});

Subjects.attachSchema(schema);


/* Publications */
if (Meteor.isServer) {
  Meteor.publish('subjects', () => Subjects.find());
}


/* Methods */

export const add = new ValidatedMethod({
  name: 'subjects.add',
  validate: schema.validator(),
  run(doc) {
    return Subjects.insert(doc);
  },
});


export const update = new ValidatedMethod({
  name: 'subjects.update',
  validate: new SimpleSchema({
    _id: { type: String, regEx: SimpleSchema.RegEx.Id },
    transaction: { type: Object },
    'transaction.name': { type: String, optional: true },
    'transaction.grade': { type: Number, optional: true },
    'transaction.examtime': { type: Number, optional: true },
  }).validator(),
  run({ _id, transaction }) {
    return Subjects.update({ _id }, { $set: transaction });
  },
});


export const remove = new ValidatedMethod({
  name: 'subjects.remove',
  validate(_id) {
    return check(_id, String);
  },
  run(_id) {
    return Subjects.remove({ _id });
  },
});
