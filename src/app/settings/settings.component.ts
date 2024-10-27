import { Component } from '@angular/core';
import { getAllTags } from '../words';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent {
  isCollapsed: boolean = true;
  wordCollections: string[];

  constructor() {
    this.wordCollections = getAllTags();
  }

  toggleCollapse(): void {
    this.isCollapsed = !this.isCollapsed;
  }
}
