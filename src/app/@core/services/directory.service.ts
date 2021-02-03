import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { District, Region, Ward } from '../interfaces/directory';
import { HttpService } from './http.service';

@Injectable({ providedIn: 'root' })
export class DirectoryService {

  private readonly controllerName = 'directory';

  constructor(
    private readonly http: HttpService
  ) {
  }

  getRegionsList(countryCode: string): Observable<Region[]> {
    return this.http.get(`${this.controllerName}/region/${countryCode}`);
  }

  getDistrictsList(regionId: number): Observable<District[]> {
    return this.http.get(`${this.controllerName}/district/${regionId}`);
  }

  getWardsList(districtId: number): Observable<Ward[]> {
    return this.http.get(`${this.controllerName}/ward/${districtId}`);
  }

  getRegion(regionId: number): Observable<Region> {
    return this.http.get(`${this.controllerName}/region/${regionId}`);
  }

  getDistrict(districtId: number): Observable<District> {
    return this.http.get(`${this.controllerName}/district/${districtId}`);
  }

  getWard(wardId: number): Observable<Ward> {
    return this.http.get(`${this.controllerName}/ward/${wardId}`);
  }
}
