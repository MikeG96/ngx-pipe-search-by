import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchBy'
})
export class SearchByPipe implements PipeTransform {

  transform(value: Array<{}>, searchWord: string, propertiesForSearch: Array<string>, sensitive: boolean = true): Array<any> {
    const array = [];
    const indexes = [];
    if (searchWord) {
      if (searchWord !== '' && searchWord !== null) {
        if (sensitive) {
          propertiesForSearch.map((property: string) => {
            value.map((val, index) => {
              if (indexes.indexOf(index) === -1) {
                const result = this.searchInByString(val, property);
                if (result) {
                  if (result.toLowerCase().indexOf(searchWord.toLowerCase()) > -1) {
                    array.push(val);
                    indexes.push(index);
                  }
                }
              }
            });
          });
          return array;
        } else {
          propertiesForSearch.map((property: string) => {
            value.forEach((val, index) => {
              if (indexes.indexOf(index) === -1) {
                const result = this.searchInByString(val, property);
                if (result) {
                  if (result.indexOf(searchWord.toLowerCase()) > -1) {
                    array.push(val);
                    indexes.push(index);
                  }
                }
              }
            });
          });
          return array;
        }
      }
    }
    return value;
  }

  private searchInByString(obj: {} = {}, properties: string, value?): any {
    const keys = properties.split('.');
    if (value) {
      return value;
    } else {
      const type = typeof obj[keys[0]];
      if (type === 'string' || type === 'number' || type === 'boolean') {
        value = obj[keys[0]];
        return this.searchInByString({}, '', value);
      }
      if (type === 'object') {
        let newObj = {};
        newObj = Object.assign(newObj, obj[keys[0]]);
        keys.splice(0, 1);
        const newProperties = keys.join('.');
        return this.searchInByString(newObj, newProperties);
      }
    }
  }
}
