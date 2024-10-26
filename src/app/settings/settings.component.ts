import { Component } from '@angular/core';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent {
  isCollapsed: boolean = true;

  constructor() {
  }

  toggleCollapse(): void {
    this.isCollapsed = !this.isCollapsed;
  }
}
