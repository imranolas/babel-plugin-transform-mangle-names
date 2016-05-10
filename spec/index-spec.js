import {transformFileSync} from 'babel-core';
import assert from 'assert';
import fs from 'fs';
import path from 'path';
import reactPlugin from '../src/index';

function trim(str) {
  return str.replace(/^\s+|\s+$/, '');
}

describe('mangle names', () => {
  const fixturesDir = path.join(__dirname, 'fixtures');
  fs.readdirSync(fixturesDir).forEach((caseName) => {
    it(`should ${caseName.split('-').join(' ')}`, () => {
      const fixtureDir = path.join(fixturesDir, caseName);
      const actual = transformFileSync(path.join(fixtureDir, 'actual.js'), {
        babelrc: false,
        plugins: [
          reactPlugin
        ]
      }).code;
      const expected = fs.readFileSync(path.join(fixtureDir, 'expected.js')).toString();

      assert.equal(trim(actual), trim(expected));
    });
  });
});
