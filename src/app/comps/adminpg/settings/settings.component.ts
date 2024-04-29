import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../../services/settings.service';
import { Configuration } from '../../../model/config.model';
import { RowComponent } from './row/row.component';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [RowComponent, CommonModule, ButtonModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent implements OnInit {
  configs: Configuration[] | undefined;
  constructor(private ss: SettingsService) {

  }

  ngOnInit(): void {
    this.getSettings();
  }

  getSettings() {
    this.ss.getSettings()
    .subscribe({
      next: (res: any) => {
        this.configs = res.data;
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }

  saveSettings() {
    this.ss.saveSettings(this.configs ? this.configs: []).subscribe({
      next: (res: any) => {
        // Reload Settings.
        this.getSettings();
      },
      error: (err: any) => {
        console.log(err);
      }
    })
  }
}
