import fetch from "node-fetch";
import fs from "fs";
global.fetch = fetch;
import firebaseFunctionsTest from 'firebase-functions-test';
import { initializeTestEnvironment } from "@firebase/rules-unit-testing";
const test = firebaseFunctionsTest();
let testEnv;
let db;


export { db };
