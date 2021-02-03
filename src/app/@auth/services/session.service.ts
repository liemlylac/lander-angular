import { Injectable, PLATFORM_ID } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { DeviceInfo } from 'ngx-device-detector/lib/device-detector.service';
import { Observable } from 'rxjs';
import { HttpService } from '@core/services/http.service';

@Injectable({ providedIn: 'root' })
export class SessionService {
  protected clientIdKey = 'client_id';

  constructor(
    protected http: HttpService,
    private deviceService: DeviceDetectorService
  ) {
  }

  get(): string {
    return localStorage.getItem(this.clientIdKey);
  }

  set(clientId): void {
    localStorage.setItem(this.clientIdKey, clientId);
  }

  hasClientId(): boolean {
    return this.get() !== null;
  }

  initSession(): void {
    this.createSession().subscribe(
      (res) => {
        if (res.status === 201) {
          this.set(res.body.clientId);
        }
      }, (err) => {
        console.log(err);
      }
    );
  }

  clearSession(): void {
    this.deleteSession().subscribe(
      (res) => {
        if (res.status === 200) {
          this.set(res.body.clientId);
        }
      }, (err) => {
        console.log(err);
      });
  }

  createSession(clientInfo: DeviceInfo = null): Observable<any> {
    if (!clientInfo) {
      clientInfo = this.deviceService.getDeviceInfo();
    }
    const clientDto = {
      clientType: clientInfo.deviceType,
      clientOs: clientInfo.os,
      clientInfo: JSON.stringify(clientInfo)
    };
    return this.http.post('auth/session', clientDto, { observe: 'response' });
  }

  deleteSession(clientId: string = null): Observable<any> {
    if (!clientId) {
      clientId = this.get();
    }
    return this.http.delete('auth/session' + clientId);
  }
}
