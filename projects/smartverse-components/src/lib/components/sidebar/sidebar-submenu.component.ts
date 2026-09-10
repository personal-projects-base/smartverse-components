import {CommonModule} from '@angular/common';
import {Component, EventEmitter, Input, Output} from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {SidebarMenuItem} from './sidebar.models';

@Component({
  selector: 'sv-sidebar-submenu',
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <ul class="sv-submenu">
      @for (item of visibleItems; track item.id) {
        <li>
          @if (item.children?.length) {
            <button type="button" class="sv-submenu__item" [disabled]="item.disabled"
                    [attr.aria-expanded]="expanded.has(item.id)" (click)="toggle(item.id)">
              @if (item.icon) { <i [class]="item.icon"></i> }
              <span>{{ item.label }}</span>
              @if (item.badge !== undefined) { <small>{{ item.badge }}</small> }
              <i class="pi" [class.pi-chevron-down]="!expanded.has(item.id)" [class.pi-chevron-up]="expanded.has(item.id)"></i>
            </button>
            @if (expanded.has(item.id)) {
              <sv-sidebar-submenu [items]="item.children ?? []" (itemSelected)="itemSelected.emit($event)" />
            }
          } @else if (item.route) {
            <a class="sv-submenu__item" [routerLink]="item.route" routerLinkActive="active"
               [class.disabled]="item.disabled" (click)="select($event, item)">
              @if (item.icon) { <i [class]="item.icon"></i> }
              <span>{{ item.label }}</span>
              @if (item.badge !== undefined) { <small>{{ item.badge }}</small> }
            </a>
          } @else {
            <button type="button" class="sv-submenu__item" [disabled]="item.disabled" (click)="itemSelected.emit(item)">
              @if (item.icon) { <i [class]="item.icon"></i> }
              <span>{{ item.label }}</span>
            </button>
          }
        </li>
      }
    </ul>
  `,
  styles: [`
    :host { display: block; }
    .sv-submenu { display: grid; gap: .25rem; margin: 0; padding: 0; list-style: none; }
    .sv-submenu .sv-submenu { margin-left: 1rem; padding-left: .5rem; border-left: 1px solid var(--p-content-border-color); }
    .sv-submenu__item { display: flex; align-items: center; width: 100%; gap: .7rem; padding: .7rem .8rem; border: 0; border-radius: .65rem; background: transparent; color: var(--p-text-color); text-align: left; text-decoration: none; cursor: pointer; }
    .sv-submenu__item span { flex: 1; }
    .sv-submenu__item:hover, .sv-submenu__item.active { background: var(--p-content-hover-background); color: var(--p-primary-color); }
    .sv-submenu__item.disabled { pointer-events: none; opacity: .5; }
    small { padding: .1rem .4rem; border-radius: 999px; background: var(--p-primary-color); color: var(--p-primary-contrast-color); }
  `],
})
export class SidebarSubmenuComponent {
  @Input() items: SidebarMenuItem[] = [];
  @Output() readonly itemSelected = new EventEmitter<SidebarMenuItem>();
  readonly expanded = new Set<string>();
  get visibleItems(): SidebarMenuItem[] { return this.items.filter(item => item.visible !== false); }
  toggle(id: string): void { this.expanded.has(id) ? this.expanded.delete(id) : this.expanded.add(id); }
  select(event: Event, item: SidebarMenuItem): void {
    if (item.disabled) { event.preventDefault(); return; }
    this.itemSelected.emit(item);
  }
}
