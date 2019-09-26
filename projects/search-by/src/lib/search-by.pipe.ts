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
            if ((val[propertySearch]).toLowerCase().indexOf(searchWord.toLowerCase()) > -1) {
              array.push(val);
            }
          });
          return array;
        } else {
          value.map(val => {
            if ((val[propertySearch]).indexOf(searchWord) > -1) {
              array.push(val);
            }
          });
          return array;
        }
      }
    }
    return value;
  }
}
