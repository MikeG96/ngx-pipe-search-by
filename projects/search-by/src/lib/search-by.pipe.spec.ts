import { SearchByPipe } from './search-by.pipe';

describe('SearchByPipe', () => {
  let values: Array<any> = [
    {
      name: 'plato',
    },
    {
      name: 'cebolla',
    },
    {
      name: 'animal',
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
  it('should all values with name animal non sensitivity', () => {
    const pipe = new SearchByPipe();
    const propertiesForSearch = [
      'name'
    ];
    const result = pipe.transform(values, 'animal', propertiesForSearch, false);
    let isPassed: boolean = false;

    if (result.length === 1) {
      isPassed = true;
    }

    expect(isPassed).toEqual(true);
  });
  it('should all values with name animal', () => {
    values = [
      {
        name: 'plato',
      },
      {
        name: 'cebolla',
      },
      {
        name: 'animal',
      },
      {
        name: 'Animal',
      },
      {
        name: 'ANIMAL',
      }
    ];
    const pipe = new SearchByPipe();
    const propertiesForSearch = [
      'name'
    ];
    const result = pipe.transform(values, 'animal', propertiesForSearch);
    let isPassed: boolean = false;

    if (result.length === 3) {
      isPassed = true;
    }

    expect(isPassed).toEqual(true);

  });
  it('should empty array', () => {
    const pipe = new SearchByPipe();
    const propertiesForSearch = [
      'name'
    ];
    const result = pipe.transform(values, 'perro', propertiesForSearch);

    expect(result).toEqual([]);
  });
  it('should all values in client.name object in array', () => {
    const pipe = new SearchByPipe();
    const array = [
      {
        name: 'name',
        client: {
          name: 'javier'
        }
      },
      {
        name: 'name'
      }
    ];
    const propertiesForSearch = [
      'client.name'
    ];
    const result = pipe.transform(array, 'javier', propertiesForSearch);

    expect(result).toEqual([
      {
        name: 'name',
        client: {
          name: 'javier'
        }
      }
    ]);
  });
  it('should empty array when search in client.name', () => {
    const pipe = new SearchByPipe();
    const array = [
      {
        name: 'name'
      },
      {
        name: 'name'
      }
    ];
    const propertiesForSearch = [
      'client.name'
    ];
    const result = pipe.transform(array, 'javier', propertiesForSearch);

    expect(result).toEqual([]);
  });
  it('should all values in client.pet.name object in array', () => {
    const pipe = new SearchByPipe();
    const array = [
      {
        name: 'name',
        client: {
          name: 'javier',
          pet: {
            name: 'perrito'
          }
        }
      },
      {
        name: 'name'
      }
    ];
    const propertiesForSearch = [
      'client.pet.name'
    ];
    const result = pipe.transform(array, 'perrito', propertiesForSearch);

    expect(result).toEqual([
      {
        name: 'name',
        client: {
          name: 'javier',
          pet: {
            name: 'perrito'
          }
        }
      }
    ]);
  });
  it('should all values in array for properties for search in array', () => {
    const pipe = new SearchByPipe();
    const array = [
      {
        name: 'name',
        client: {
          name: 'javier',
          pet: {
            name: 'perrito'
          }
        }
      },
      {
        name: 'mike',
        info: {
          email: 'luis.javier@mike.com'
        }
      },
      {
        email: 'javier.luis@mike.com'
      }
    ];
    const propertiesForSearch = [
      'client.name',
      'email',
      'info.email'
    ];
    const result = pipe.transform(array, 'javier', propertiesForSearch);

    expect(result).toEqual([
      {
        name: 'name',
        client: {
          name: 'javier',
          pet: {
            name: 'perrito'
          }
        }
      },
      {
        email: 'javier.luis@mike.com'
      },
      {
        name: 'mike',
        info: {
          email: 'luis.javier@mike.com'
        }
      }
    ]);
  });
  it('should all unique values in array for properties for search in array', () => {
    const pipe = new SearchByPipe();
    const array = [
      {
        name: 'name',
        client: {
          name: 'name',
          pet: {
            name: 'perrito'
          }
        }
      },
      {
        name: 'mike',
        client: {
          name: 'name',
          pet: {
            name: 'perrito'
          }
        },
        info: {
          email: 'luis.javier@mike.com'
        }
      },
      {
        name: 'mike',
        client: {
          name: 'mike',
          pet: {
            name: 'perrito'
          }
        },
        info: {
          email: 'luis.javier@mike.com'
        }
      },
      {
        email: 'javier.luis@mike.com'
      }
    ];
    const propertiesForSearch = [
      'client.name',
      'name'
    ];
    const result = pipe.transform(array, 'name', propertiesForSearch);

    expect(result).toEqual([
      {
        name: 'name',
        client: {
          name: 'name',
          pet: {
            name: 'perrito'
          }
        }
      },
      {
        name: 'mike',
        client: {
          name: 'name',
          pet: {
            name: 'perrito'
          }
        },
        info: {
          email: 'luis.javier@mike.com'
        }
      }
    ]);
  });
});
