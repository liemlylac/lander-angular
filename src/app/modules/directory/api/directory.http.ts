import { Observable } from 'rxjs';
import { HttpService } from '../../core/services/http.service';
import { District, Region, Ward } from '../model/directory';
import { DirectoryApi } from './directory.api';

export class DirectoryHttp extends DirectoryApi {

  private readonly controllerName = 'directory';

  constructor(
    private readonly httpService: HttpService
  ) {
    super();
  }

  getRegions(countryCode: string): Observable<Region[]> {
    return this.httpService.get(`${this.controllerName}/region/${countryCode}`);
  }

  getDistricts(regionId: number): Observable<District[]> {
    return this.httpService.get(`${this.controllerName}/district/${regionId}`);
  }

  getWards(districtId: number): Observable<Ward[]> {
    return this.httpService.get(`${this.controllerName}/ward/${districtId}`);
  }

  getRegion(regionId: number): Observable<Region> {
    return this.httpService.get(`${this.controllerName}/region/${regionId}`);
  }

  getDistrict(districtId: number): Observable<District> {
    return this.httpService.get(`${this.controllerName}/district/${districtId}`);
  }

  getWard(wardId: number): Observable<Ward> {
    return this.httpService.get(`${this.controllerName}/ward/${wardId}`);
  }
}
