import 'zone.js/dist/zone';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { bootstrapApplication } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { Cat } from './cat-model';
import { CatService } from './cat';

@Component({
  selector: 'my-app',
  standalone: true,
  imports: [CommonModule,
    HttpClientModule, MatCardModule, InfiniteScrollModule],
  templateUrl: 'main.html',
})
export class App {
  name = 'Angular';
  page = 1;
cats: Cat[] = [];
constructor(private catService: CatService) {}
ngOnInit(): void {
  this.catService.getCats(this.page).subscribe((cats: Cat[]) => {
        this.cats = cats;
     });
 }
 onScroll(): void {
  this.catService.getCats(++this.page).subscribe((cats: Cat[]) => {
      this.cats.push(...cats);
    });
}
}

bootstrapApplication(App);
