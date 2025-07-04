import {Component, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ActivatedRoute} from '@angular/router';
import {HousingService} from '../housing.service';
import {Housinglocation} from '../housinglocation';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-details',
  imports: [CommonModule, ReactiveFormsModule],
  template: `<article>
  <img
    class="listing-photo"
    [src]="housingLocation?.photo"
    alt="Exterior photo of {{ housingLocation?.name }}"
    crossorigin
  />
  <section class="listing-description">
    <h2 class="listing-heading">{{ housingLocation?.name }}</h2>
    <p class="listing-location">{{ housingLocation?.city }}, {{ housingLocation?.state }}</p>
  </section>
  <section class="listing-features">
    <h2 class="section-heading">About this housing location</h2>
    <ul>
      <li>Units available: {{ housingLocation?.availableUnits }}</li>
      <li>Does this location have wifi: {{ housingLocation?.wifi }}</li>
      <li>Does this location have laundry: {{ housingLocation?.laundry }}</li>
    </ul>
  </section>
  <section class="listing-apply">
    <h2 class="section-heading">Apply now to live here</h2>
    <form [formGroup]="appyfyForm">
      <label for="firstName">First name</label>
      <input id="firstName" type="text" formControlName="firstName">

      <label for="lastName">Last name</label>
      <input id="lastName" type="text" formControlName="lastName">

      <label for="email">Email</label>
      <input id="email" type="email" formControlName="email">
      <button type="submit" class="primary">Apply now</button>
    </form>
  </section>
    
</article>
`,
styleUrls: ['./details.component.css'],
})
export class DetailsComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  housingService = inject(HousingService);
  housingLocation: Housinglocation | undefined;
  appyfyForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
  });
  constructor() {
    const housingLocationId = Number(this.route.snapshot.params['id']);
    this.housingLocation = this.housingService.getHousingLocationById(housingLocationId);
  }

  sumitApplication() {
    this.housingService.submitApplication(
      this.appyfyForm.value.firstName??'',
      this.appyfyForm.value.lastName??'',
      this.appyfyForm.value.email??'',
    );
  }
}
