import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchBy'
})
export class SearchByPipe implements PipeTransform {

  private array: Array<any> = [];
  private skips: Array<number> = [];

  transform(value: Array<{}>, searchWord: string, propertiesForSearch: Array<string>, sensitive: boolean = true): Array<any> {
    if (searchWord) {
      this.initArrays();
      if (searchWord !== '' && searchWord !== null) {
        propertiesForSearch.map((property: string) => {
          value.map((val, index) => {
            if (this.skips.indexOf(index) === -1) {
              const result = this.searchInByString(val, property);
              if (result) {
                if (sensitive) {
                  if (result.toLowerCase().indexOf(searchWord.toLowerCase()) > -1) {
                    this.addItems(val, index);
                  }
                } else {
                  if (result.indexOf(searchWord.toLowerCase()) > -1) {
                    this.addItems(val, index);
                  }
                }
              }
            }
          });
        });
        return this.array;
      }
    }
    return value;
  }

  private initArrays() {
    this.array = [];
    this.skips = [];
  }

  private addItems(val: any, index: number) {
    this.array.push(val);
    this.skips.push(index);
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
