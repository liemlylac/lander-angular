import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NbMenuModule, NbSelectModule } from '@nebular/theme';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { DistrictComponent } from './directory/components/district/district.component';
import { RegionComponent } from './directory/components/region/region.component';
import { WardComponent } from './directory/components/ward/ward.component';
import { HouseComponent } from './house/house.component';
import { ModulesMenuService } from './modules-menu.service';
import { ModulesRoutingModule } from './modules-routing.module';
import { ModulesComponent } from './modules.component';
import { ThemeModule } from './theme/theme.module';
import { UserComponent } from './user/user.component';

@NgModule({
  imports: [
    NbMenuModule,
    NbSelectModule,
    RouterModule,
    ThemeModule,
    DashboardModule,
    ModulesRoutingModule,
  ],
  declarations: [
    ModulesComponent,
    DashboardComponent,
    UserComponent,
    HouseComponent,
    RegionComponent,
    DistrictComponent,
    WardComponent,
  ],
  providers: [
    ModulesMenuService,
  ]
})
export class ModulesModule {
}
