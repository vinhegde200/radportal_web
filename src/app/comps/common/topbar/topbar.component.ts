import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AppUserData, Branding, ConsumerCompany } from '../../../model/access.model';
import { AvatarModule } from 'primeng/avatar';
import { MenuItem } from 'primeng/api';
import { MenuModule } from 'primeng/menu';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [AvatarModule, MenuModule],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.scss'
})
export class TopbarComponent implements OnInit, AfterViewInit {
  branding: Branding | undefined;
  company: ConsumerCompany | undefined;
  user: AppUserData | undefined;
  // View Binding Variables
  title: string | undefined;
  avatarLabel: string = 'U';
  items: MenuItem[] | undefined;

  @Input('branding') set _branding (b: Branding | undefined) {
    this.branding = b;
  }
  @Input('company') set _company (c: ConsumerCompany | undefined) {
    this.company = c;
    this.title = this.getTitleText();
  }
  @Input('user') set _user(u: AppUserData | undefined) {
    this.user = u;
    if (this.user) {
      this.avatarLabel = this.user.username.substring(0, 1).toUpperCase();
      this.initMenuItems();
    }
  }

  @Output('logout') logout = new EventEmitter<void>();

  constructor() {

  }
  ngAfterViewInit(): void {
  }

  initMenuItems() {
    this.items = [
      {
          label: this.user?.username,
          items: [
              {
                  label: 'My Profile',
                  icon: 'pi pi-user',
                  command: () => {

                  }
              },
              {
                  label: 'Logout',
                  icon: 'pi pi-sign-out',
                  command: () => {
                    this.logout.emit();
                  }
              }
          ]
      }
    ];
  }

  ngOnInit(): void {
    
  }

  getTitleText() {
    return this.company ? this.company.title || this.company.name: "My Portal"
  }
}
