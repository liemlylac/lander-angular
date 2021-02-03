import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NbMenuModule, NbSelectModule } from '@nebular/theme';
import { PagesComponent } from './pages.component';
import { PagesMenuService } from './pages-menu.service';
import { PagesRoutingModule } from './pages-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { DistrictComponent } from './directory/components/district/district.component';
import { RegionComponent } from './directory/components/region/region.component';
import { WardComponent } from './directory/components/ward/ward.component';
import { HouseComponent } from './house/house.component';
import { UserComponent } from './user/user.component';
import { ThemeModule } from '../@theme/theme.module';

@NgModule({
  imports: [
    NbMenuModule,
    NbSelectModule,
    RouterModule,
    ThemeModule,
    DashboardModule,
    PagesRoutingModule,
  ],
  declarations: [
    PagesComponent,
    DashboardComponent,
    UserComponent,
    HouseComponent,
    RegionComponent,
    DistrictComponent,
    WardComponent,
  ],
  providers: [
    PagesMenuService,
  ]
})
export class PagesModule {
}
