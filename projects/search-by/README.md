# ngx-pipe-search-by

Search in array of object by property

**Arguments**

| Param          |   Type    | Default | Details                                                                      |
| -------------- | :-------: | ------: | ---------------------------------------------------------------------------- |
| collection     |  `array`  |       - | The collection to filter                                                     |
| searchWord     | `string`  |       - | String to search                                                             |
| propertySearch | `string`  |       - | Property to look for. Examples: `name`, `client.name`, `client.pets[0].name` |
| sensitive      | `boolean` |    true | Case sensitive                                                               |

# Install

```
npm install ngx-pipe-search-by --save
```

# Usage

Import `PipeSearchByModule` to your module

```typescript
import { NgModule } from '@angular/core';
import { BrowserModule  } from '@angular/platform-browser';
import { AppComponent } from './app';

import { PipeSearchByModule } from 'ngx-pipe-search-by';

@NgModule({
  imports: [BrowserModule, PipeSearchByModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
```

**In HTML Template**

```html
<div *ngFor="let item of collection | searchBy: searchWord: propertySearch: sensitive">
  <!-- HERE HTML -->
</div>

```
