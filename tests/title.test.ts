import { assert } from 'chai';
import { markdownDiff } from '../src/index';

describe('Title', () => {
  it('with single #', () => {
    const oldStr = '# ele one\n# ele two';
    const newStr = '# ele one\n# ele two\n# ele three';
    const diff = markdownDiff(oldStr, newStr);
    assert.equal(diff, '# ele one\n# ele two\n# <ins>ele three</ins>');
  })
  it('With multilple ##', () => {
    const oldStr = '## ele one\n## ele two';
    const newStr = '## ele one\n## ele two\n## ele three\n## ele four';
    const diff = markdownDiff(oldStr, newStr);
    assert.equal(diff, '## ele one\n## ele two\n## <ins>ele three</ins>\n## <ins>ele four</ins>');
  })
  it('With changes within the title', () => {
    const oldStr = '## ele one';
    const newStr = '## ele two';
    const diff = markdownDiff(oldStr, newStr);
    assert.equal(diff, '## ele <del>one</del><ins>two</ins>');
  })
  it('With changed size', () => {
    const oldStr = '#### ele one\n## ele two';
    const newStr = '## ele one\n#### ele two';
    const diff = markdownDiff(oldStr, newStr);
    assert.equal(diff, '#### <del>ele one</del>\n## <ins>ele one</ins>\n## <del>ele two</del>\n#### <ins>ele two</ins>');
  })
  it('With changes in size and text', () => {
    const oldStr = '#### ele one\n## ele two';
    const newStr = '## ele two\n#### ele one';
    const diff = markdownDiff(oldStr, newStr);
    assert.equal(diff, '#### <del>ele one</del>\n## <ins>ele one</ins>\n## <del>ele two</del>\n#### <ins>ele two</ins>');
  })
  it('# that are not titles', () => {
    const oldStr = 'some text ## ele\nsome text ##';
    const newStr = 'some txt ### ele\nsome txt ###';
    const diff = markdownDiff(oldStr, newStr);
    assert.equal(diff, 'some t<del>e</del>xt <del>#</del>## ele\nsome t<del>e</del>xt <ins>#</ins>##');
  })
})