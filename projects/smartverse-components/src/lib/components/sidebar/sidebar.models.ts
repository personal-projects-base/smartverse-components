export interface SidebarMenuItem {
  id: string;
  label: string;
  icon?: string;
  route?: string | any[];
  badge?: string | number;
  disabled?: boolean;
  visible?: boolean;
  children?: SidebarMenuItem[];
}

export interface SidebarUser {
  name: string;
  subtitle?: string;
  imageUrl?: string | null;
  initials?: string;
}
