
import { Component, Input } from '@angular/core';

@Component({
    selector: 'sv-loading',
    imports: [],
    templateUrl: './loading.component.html',
    styleUrl: './loading.component.scss'
})
export class LoadingComponent {
  @Input() showLoading = false;
}
