import { Component, OnInit } from '@angular/core';
import { Ward } from '../../../../@core/interfaces/directory';
import { DirectoryService } from '../../../../@core/services/directory.service';


@Component({
  selector: 'app-ward',
  templateUrl: './ward.component.html',
  styleUrls: ['./ward.component.scss']
})
export class WardComponent implements OnInit {

  wards: Ward[];

  constructor(
    private readonly directoryService: DirectoryService
  ) {
  }

  ngOnInit(): void {
  }

}
