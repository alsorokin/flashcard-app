import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CollectionEditorComponent } from './collection-editor.component';

let component: CollectionEditorComponent;
let fixture: ComponentFixture<CollectionEditorComponent>;

describe('CollectionEditorComponent', () => {

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, BrowserAnimationsModule, CollectionEditorComponent],
      declarations: []
    }).compileComponents();

    fixture = TestBed.createComponent(CollectionEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
