import { Component, OnInit } from '@angular/core';
import { Ward } from '../../model/directory';
import { DirectoryService } from '../../services/directory.service';

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
