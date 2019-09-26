import { SearchByPipe } from './search-by.pipe';

describe('SearchByPipe', () => {
  const values: Array<any> = [
    {
      name: 'plato',
    },
    {
      name: 'animal',
    },
    {
      name: 'cebolla',
    },
    {
      name: 'Animal',
    },
    {
      name: 'ANIMAL',
    }
  ];
  it('create an instance', () => {
    const pipe = new SearchByPipe();
    expect(pipe).toBeTruthy();
  });
  it('should all values with name animal', () => {
    const pipe = new SearchByPipe();
    const result = pipe.transform(values, 'animal', 'name');
    let isPassed: boolean = false;

    if (result.length === 3) {
      isPassed = true;
    }

    expect(isPassed).toEqual(true);

  });
  it('should all values with name animal non sensitivity', () => {
    const pipe = new SearchByPipe();
    const result = pipe.transform(values, 'animal', 'name', false);
    let isPassed: boolean = false;

    if (result.length === 1) {
      isPassed = true;
    }

    expect(isPassed).toEqual(true);
  });
  it('should empty array', () => {
    const pipe = new SearchByPipe();
    const result = pipe.transform(values, 'perro', 'name');

    expect(result).toEqual([]);
  });
});
