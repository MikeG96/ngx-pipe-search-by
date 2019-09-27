# ngx-pipe-search-by

Search in array of object by property

**Arguments**

| Param            |      Type       | Default | Details                                                                          |
| ---------------- | :-------------: | ------: | -------------------------------------------------------------------------------- |
| collection       |     `Array`     |       - | The collection to filter                                                         |
| searchWord       |    `string`     |       - | String to search                                                                 |
| propertiesSearch | `Array<string>` |       - | Property to look for. Examples: `[name]`, `[name, client.name, client.pet.name`] |
| sensitive        |    `boolean`    |    true | Case sensitive                                                                   |

# Install

```
npm install ngx-pipe-search-by --save
```

# Usage

Import `PipeSearchByModule` to your module

```typescript
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "./app";

import { PipeSearchByModule } from "ngx-pipe-search-by";

@NgModule({
  imports: [BrowserModule, PipeSearchByModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
```

**In HTML Template**

```html
<div
  *ngFor="let item of collection | searchBy: searchWord: propertiesSearch: sensitive"
>
  <!-- HERE HTML -->
</div>
```
