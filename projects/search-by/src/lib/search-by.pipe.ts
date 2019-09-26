import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchBy'
})
export class SearchByPipe implements PipeTransform {

  transform(value: Array<{}>, searchWord: string, propertySearch: string, sensitive: boolean = true): Array<any> {
    const array = [];
    if (searchWord) {
      if (searchWord !== '' && searchWord !== null) {
        if (sensitive) {
          value.map(val => {
            const result = this.searchInByString(val, propertySearch);
            if (result.toLowerCase().indexOf(searchWord.toLowerCase()) > -1) {
              array.push(val);
            }
          });
          return array;
        } else {
          value.map(val => {
            const result = this.searchInByString(val, propertySearch);
            if (result.indexOf(searchWord) > -1) {
              array.push(val);
            }
          });
          return array;
        }
      }
    }
    return value;
  }

  private searchInByString(object: {} = {}, property: string): any {
    let key = property;
    let obj = object;
    key = key.replace(/\[(\w+)\]/g, '.$1'); // Convert indexes to properties
    key = key.replace(/^\./, '');           // Strip a leading dot
    const keys = key.split('.');
    for (const attribute of keys) {
      if (attribute in obj) {
        obj = obj[attribute];
      }
    }
    return obj;
  }
}
