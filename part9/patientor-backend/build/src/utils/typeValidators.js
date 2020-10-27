"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.toPublicPatient = exports.toValidPatient = void 0;
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
const uuid_1 = require("uuid");
const types_1 = require("./types");
const uuid = uuid_1.v1;
exports.toValidPatient = (obj) => ({
    id: uuid(),
    name: toValidString(obj.name),
    dateOfBirth: toValidString(obj.dateOfBirth),
    ssn: toValidString(obj.ssn),
    gender: toValidGender(obj.gender),
    occupation: toValidString(obj.occupation),
});
exports.toPublicPatient = (_a) => {
    var { ssn: _ssn } = _a, publicPatient = __rest(_a, ["ssn"]);
    return publicPatient;
};
const toValidString = (val) => {
    if (!(val && isString(val))) {
        throw new Error(`Incorrect or missing type`);
    }
    return val;
};
const isString = (val) => typeof val === 'string';
const toValidGender = (val) => {
    if (!(val && isGender(val))) {
        throw new Error(`Incorrect or missing gender type`);
    }
    return val;
};
const isGender = (val) => Object.values(types_1.Gender).includes(val);
// export type StrictPropertyCheck<T,TExpected, TError> = Exclude<T, TExpected> extends never ? Record<string, unknown> : TError;
