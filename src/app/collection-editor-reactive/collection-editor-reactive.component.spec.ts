import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionEditorReactiveComponent } from './collection-editor-reactive.component';

describe('CollectionEditorReactiveComponent', () => {
  let component: CollectionEditorReactiveComponent;
  let fixture: ComponentFixture<CollectionEditorReactiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CollectionEditorReactiveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CollectionEditorReactiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
