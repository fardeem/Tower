import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { check } from 'meteor/check';


export const Teachers = new Mongo.Collection('teachers');

const timingSchema = new SimpleSchema((() => {
  const _schema = {};
  ['sun', 'mon', 'tue', 'wed', 'thu'].forEach(day => {
    _schema[day] = {
      type: [String],
      minCount: 2,
      maxCount: 2,
      optional: true,
      regEx: /(\d){2}:(\d){2}/,
    };
  });

  return _schema;
})());

timingSchema.messages({
  minCount: 'Please specify both the start and end times for each day',
});


const schema = new SimpleSchema({
  name: { type: String },
  parttime: { type: Boolean },
  subjects: { type: [String], regEx: SimpleSchema.RegEx.Id },
  timing: { type: timingSchema, optional: true },
});

Teachers.attachSchema(schema);


/* Publications */
if (Meteor.isServer) {
  Meteor.publish('teachers', () => Teachers.find());
}


/* Methods */

function formatDoc({ name, subjects, parttime, timing }) {
  const doc = { name, subjects, parttime };
  if (parttime) {
    doc.timing = timing;
  }
  return doc;
}

export const add = new ValidatedMethod({
  name: 'teachers.add',
  validate: schema.validator(),
  run(doc) {
    return Teachers.insert(formatDoc(doc));
  },
});


export const update = new ValidatedMethod({
  name: 'teachers.update',
  validate: new SimpleSchema({
    _id: { type: String, regEx: SimpleSchema.RegEx.Id },
    transaction: { type: schema },
  }).validator(),
  run({ _id, transaction }) {
    const modifier = { $set: formatDoc(transaction) };
    if (! transaction.parttime) {
      modifier.$unset = { timing: '' };
    }

    return Teachers.update({ _id }, modifier);
  },
});


export const remove = new ValidatedMethod({
  name: 'teachers.remove',
  validate(_id) {
    return check(_id, String);
  },
  run(_id) {
    return Teachers.remove({ _id });
  },
});
