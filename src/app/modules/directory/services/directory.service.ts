import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DirectoryHttp } from '../api/directory.http';
import { District, Region, Ward } from '../model/directory';

@Injectable({
  providedIn: 'root'
})
export class DirectoryService {

  constructor(
    private readonly directoryApi: DirectoryHttp
  ) {
  }

  getRegions(countryCode: string): Observable<Region[]> {
    return this.directoryApi.getRegions(countryCode);
  }

  getDistricts(regionId: number): Observable<District[]> {
    return this.directoryApi.getDistricts(regionId);
  }

  getWards(districtId: number): Observable<Ward[]> {
    return this.directoryApi.getWards(districtId);
  }

  getRegion(regionId: number): Observable<Region> {
    return this.directoryApi.getRegion(regionId);

  }

  getDistrict(districtId: number): Observable<District> {
    return this.directoryApi.getDistrict(districtId);
  }

  getWard(wardId: number): Observable<Ward> {
    return this.directoryApi.getWard(wardId);
  }
}
