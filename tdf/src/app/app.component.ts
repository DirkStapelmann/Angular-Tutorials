//app.component.ts
import { Component, ViewChild, OnInit } from '@angular/core';
import { NgForm, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true, // Belangrijk om standalone te maken
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'Template driven forms';

  @ViewChild('contactForm') contactForm!: NgForm; // Haal referentie naar het formulier op

  countryList: Country[] = [
    new Country("1", "India"),
    new Country("2", "USA"),
    new Country("3", "England")
  ];

  contact: Contact = {
    firstname: '',
    lastname: '',
    email: '',
    gender: '',
    isMarried: false,
    country: '',
    address: { city: '', street: '', pincode: '' }
  };

  ngOnInit() {
    this.setDefaults(); // Roep direct `setDefaults()` aan om standaardwaarden in te stellen
  }

  onSubmit(contactForm: NgForm) {
    console.log('Formuliergegevens:', this.contactForm.value);
  }

  setDefaults() {
    this.contact = {
      firstname: "Sachin",
      lastname: "Tendulkar",
      email: "sachin@gmail.com",
      gender: "male",
      isMarried: true,
      country: "2",
      address: {
        city: "Mumbai",
        street: "Perry Cross Rd",
        pincode: "400050"
      }
    };
  
    setTimeout(() => {
      this.contactForm.resetForm(this.contact);
    });
  }
  

  changeCountry() {
    this.contactForm.controls["country"].setValue("1"); // Verandert country naar India
  }

  patchValue() {
    let obj = {
      firstname: "Rahul",
      lastname: "Dravid",
      email: "rahul@gmail.com",
    };

    this.contactForm.control.patchValue(obj); // Alleen deze velden aanpassen
  }

  changeAddress() {
    let obj = {
      city: "Bangalore",
      street: "Brigade Road",
      pincode: "600100"
    };

    let address = this.contactForm.controls["address"] as FormGroup;
    address.patchValue(obj); // Alleen het adres aanpassen
  }

  reset() {
    this.contactForm.reset();
  }

  resetForm() {
    this.contactForm.resetForm();
  }
}

export interface Contact {
  firstname: string;
  lastname: string;
  email: string;
  gender: string;
  isMarried: boolean;
  country: string;
  address: {
    city: string;
    street: string;
    pincode: string;
  };
}

export class Country {
  constructor(public id: string, public name: string) {}
}
