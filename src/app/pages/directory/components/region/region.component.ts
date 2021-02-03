import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Region } from '../../../../@core/interfaces/directory';
import { DirectoryService } from '../../../../@core/services/directory.service';

@Component({
  selector: 'app-region',
  templateUrl: './region.component.html',
  styleUrls: ['./region.component.scss']
})
export class RegionComponent implements OnInit {
  selectedItem: Region;
  items: Region[];
  defaultCountry = 'VN';

  constructor(
    private readonly directoryService: DirectoryService
  ) {
  }

  ngOnInit(): void {
    this.directoryService.getRegionsList(this.defaultCountry)
      .pipe(
        map(items => this.items = items),
      );
  }

}
