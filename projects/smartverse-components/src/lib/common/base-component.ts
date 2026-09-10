import {FormGroup} from '@angular/forms';
export class BaseComponent {
  showLoading = false;
  onShowLoading(): void { this.showLoading = !this.showLoading; }
  onValidator(form: FormGroup): boolean { return form.valid; }
}
