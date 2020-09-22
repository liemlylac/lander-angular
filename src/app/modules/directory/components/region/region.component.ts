import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Region } from '../../model/directory';
import { DirectoryService } from '../../services/directory.service';

@Component({
  selector: 'app-region',
  templateUrl: './region.component.html',
  styleUrls: ['./region.component.scss']
})
export class RegionComponent implements OnInit {
  selectedItem: number;
  items: Region[];
  defaultCountry = 'VN';

  constructor(
    private readonly directoryService: DirectoryService
  ) {
  }

  ngOnInit(): void {
    this.directoryService.getRegions(this.defaultCountry)
      .pipe(map(items => this.items = items));
  }

}
