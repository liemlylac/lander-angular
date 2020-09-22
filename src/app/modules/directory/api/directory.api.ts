import { Observable } from 'rxjs';
import { District, Region, Ward } from '../model/directory';

export abstract class DirectoryApi {
  abstract getRegions(countryCode: string): Observable<Region[]>;

  abstract getDistricts(regionId: number): Observable<District[]>;

  abstract getWards(districtId: number): Observable<Ward[]>;

  abstract getRegion(regionId: number): Observable<Region>;

  abstract getDistrict(districtId: number): Observable<District>;

  abstract getWard(wardId: number): Observable<Ward>;
}
