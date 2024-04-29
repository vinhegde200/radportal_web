import { Component, OnInit } from '@angular/core';
import { AccessService } from '../../../services/access.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AppUserData, Branding, ConsumerCompany } from '../../../model/access.model';
import { ButtonModule } from 'primeng/button';
import { SsoService } from '../../../sso/sso.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ButtonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  providers: []
})
export class HomeComponent implements OnInit {
  company: ConsumerCompany | undefined;
  branding: Branding | undefined;
  compname: string | undefined;

  // View Binding variables
  loggedIn: boolean = false;
  constructor(private readonly as: AccessService, 
    private readonly actRoute: ActivatedRoute,
    private readonly router: Router,
    private readonly sso: SsoService) {
    this.actRoute.params.subscribe((p: any) => {
      if (p.company) {
        this.loadCompany(p.company);
        this.loadBranding(p.company);
        this.compname = p.company;
        localStorage.setItem('_company', p.company);
      }
    });

    const logindone = this.actRoute.snapshot?.queryParamMap?.get('logindone');
    if (logindone) {
      this.router.navigate(['home', this.compname]);
    }
    this.loggedIn = this.sso.isLoggedIn();

    console.log('Logged In value is ' + this.loggedIn);

    if (!this.loggedIn && !logindone) {
      this.sso.login({
        redirectUri: `http://localhost:4200/#/home/${this.compname}?logindone=true`,
        prompt: 'none'
      });
    } else if (this.loggedIn) {
      this.validateUser();
    }
  }

  ngOnInit(): void {
    
  }

  loadCompany(compName: string) {
    this.as.getCompany(compName)
    .subscribe({
      next: (comp: any) => {
        this.company = comp.data as ConsumerCompany;
        this.as.companySubject.next(this.company);
        this.as.companySubject.complete();
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }

  loadBranding(compName: string) {
    this.as.getBranding(compName)
    .subscribe({
      next: (branding: any) => {
        this.branding = branding.data as Branding;
        this.as.brandingSubject.next(this.branding);
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }

  validateUser() {
    this.as.validateUser()
    .subscribe({
      next: (res: any) => {
        console.log("App User");
        this.as.userSubject.next(res.data as AppUserData);
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }

  async evtLogin() {
    await this.sso.login({
      redirectUri: window.location.origin + '/#/home/' + this.company?.name,
    }, this.company?.name);
  }
}
