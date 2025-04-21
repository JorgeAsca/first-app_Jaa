import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  imports: [],
  template: `
    <section>
      <form>
        <input type="text" placeholder="filter by city" />
        <button type="primary" type="button">Search</button>
      </form>
    </section>
  `,
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {

}
