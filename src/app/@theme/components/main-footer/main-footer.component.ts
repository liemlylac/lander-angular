import { Component } from '@angular/core';

@Component({
  selector: 'app-main-footer',
  template: `
    <span class="created-by">Made with &hearts; by <b>
      <a href="https://liemlylac.com" target="_blank">liemlylac</a></b> {{ currentYear }}
    </span>
  `,
  styleUrls: ['./main-footer.component.scss']
})
export class MainFooterComponent  {
  get currentYear(): number {
    return new Date().getFullYear();
  }
}
