import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource.js';
import { data } from './data/resource.js';
import { myFirstFunction } from './my-first-function/resource.js';

defineBackend({
  auth,
  data,
  myFirstFunction,
});
