import { assert } from 'chai';
import { markdownDiff } from '../src/index';

describe('Links', () => {
  it('with changed url', () => {
    const oldStr = '[Linktext](http://example.com)';
    const newStr = '[Linktext](http://example.com/foo)';
    const diff = markdownDiff(oldStr, newStr);
    assert.equal(diff, '<del>[Linktext](http://example.com)</del><ins>[Linktext](http://example.com/foo)</ins>');
  });
  it('with changed text', () => {
    const oldStr = '[Linktext](http://example.com)';
    const newStr = '[other link text](http://example.com)';
    const diff = markdownDiff(oldStr, newStr);
    assert.equal(diff, '[<del>L</del><ins>other l</ins>ink<ins> </ins>text](http://example.com)');
  });
});
