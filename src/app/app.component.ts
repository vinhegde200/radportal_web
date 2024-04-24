import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TopbarComponent } from './comps/common/topbar/topbar.component';
import { LeftpaneComponent } from './comps/common/leftpane/leftpane.component';
import { AccessService } from './services/access.service';
import { AppUserData, Branding, ConsumerCompany } from './model/access.model';
import { SsoService } from './sso/sso.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TopbarComponent, LeftpaneComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: []
})
export class AppComponent {
  title = 'rportal';
  branding: Branding | undefined;
  company: ConsumerCompany | undefined;
  user: AppUserData | undefined;
  constructor(private as: AccessService, private readonly keyService: SsoService) {
    this.as.brandingSubject.subscribe(branding => {
      this.branding = branding;
    });
    this.as.companySubject.subscribe(company => {
      this.company = company;
    });
    this.as.userSubject.subscribe(user => {
      this.user = user;
    });
  }

  logoutUser() {
    this.keyService.logout('http://localhost:4200/#/home/nestle');
  }
}
