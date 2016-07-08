import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { check } from 'meteor/check';


export const Teachers = new Mongo.Collection('subjects');

const timingSchema = new SimpleSchema((() => {
  const _schema = {};
  ['sun', 'mon', 'tue', 'wed', 'thu'].forEach(day => {
    _schema[day] = {
      type: [String],
      minCount: 2,
      maxCount: 2,
      regEx: /(^$)|(\d){2}:(\d){2}/,
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

export const add = new ValidatedMethod({
  name: 'teachers.add',
  validate: schema.validator(),
  run(doc) {
    return Teachers.insert(doc);
  },
});


// export const update = new ValidatedMethod({
//   name: 'subjects.update',
//   validate: new SimpleSchema({
//     _id: { type: String, regEx: SimpleSchema.RegEx.Id },
//     transaction: { type: Object },
//     'transaction.name': { type: String, optional: true },
//     'transaction.grade': { type: Number, optional: true },
//     'transaction.examtime': { type: Number, optional: true },
//   }).validator(),
//   run({ _id, transaction }) {
//     return Subjects.update({ _id }, { $set: transaction });
//   },
// });


export const remove = new ValidatedMethod({
  name: 'teachers.remove',
  validate(_id) {
    return check(_id, String);
  },
  run(_id) {
    return Teachers.remove({ _id });
  },
});
