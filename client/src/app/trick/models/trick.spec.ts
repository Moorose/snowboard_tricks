import { Trick } from './trick';

describe('Trick model', () => {
  it('shuold create an instance of Trick', () => {
    expect(new Trick()).toBeTruthy();
  });

  it('should accept value', () => {
    let trick = new Trick();
    trick = {
      id: 11,
      name: 'BackFlip',
      complexity: 100,
      description: 'description',
    };
    expect(trick.id).toEqual(11);
    expect(trick.name).toEqual('BackFlip');
    expect(trick.complexity).toEqual(100);
    expect(trick.description).toEqual('description');
  });
});
