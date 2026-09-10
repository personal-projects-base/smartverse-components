import {CommonModule, isPlatformBrowser} from '@angular/common';
import {Component, EventEmitter, HostListener, Inject, Input, Output, PLATFORM_ID} from '@angular/core';
import {AvatarModule} from 'primeng/avatar';
import {ButtonModule} from 'primeng/button';
import {SidebarMenuItem, SidebarUser} from './sidebar.models';
import {SidebarSubmenuComponent} from './sidebar-submenu.component';

@Component({
  selector: 'sv-sidebar',
  imports: [CommonModule, AvatarModule, ButtonModule, SidebarSubmenuComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  @Input() brand = 'Smartverse';
  @Input() logoUrl?: string;
  @Input() items: SidebarMenuItem[] = [];
  @Input() user?: SidebarUser;
  @Input() logoutLabel = 'Sair';
  @Input() showLogout = true;
  @Input() expanded = true;
  @Output() readonly expandedChange = new EventEmitter<boolean>();
  @Output() readonly itemSelected = new EventEmitter<SidebarMenuItem>();
  @Output() readonly logout = new EventEmitter<void>();
  mobile = false;

  constructor(@Inject(PLATFORM_ID) private readonly platformId: object) {
    this.updateViewport();
  }

  @HostListener('window:resize')
  updateViewport(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    const wasMobile = this.mobile;
    this.mobile = window.innerWidth <= 600;
    if (this.mobile && !wasMobile) this.setExpanded(false);
  }

  toggle(): void { this.setExpanded(!this.expanded); }
  select(item: SidebarMenuItem): void {
    this.itemSelected.emit(item);
    if (this.mobile) this.setExpanded(false);
  }
  private setExpanded(value: boolean): void { this.expanded = value; this.expandedChange.emit(value); }
}
