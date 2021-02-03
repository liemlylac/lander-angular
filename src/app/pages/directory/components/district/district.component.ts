import { Component, OnInit } from '@angular/core';
import { DirectoryService } from '../../../../@core/services/directory.service';

@Component({
  selector: 'app-district',
  templateUrl: './district.component.html',
  styleUrls: ['./district.component.scss']
})
export class DistrictComponent implements OnInit {

  constructor(
    private readonly directoryService: DirectoryService
  ) {
  }

  ngOnInit(): void {
  }

}
