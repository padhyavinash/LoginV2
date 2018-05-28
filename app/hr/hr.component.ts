import { Component } from '@angular/core';
import { AuthenticationService, UserDetails } from '../authentication.service';

@Component({
  templateUrl: './hr.component.html'
})
export class HrComponent {
  details: UserDetails;

  constructor(private auth: AuthenticationService) {}
  
  ngOnInit() {    
    this.auth.profile().subscribe(user => {
      this.details = user;
    }, (err) => {
      console.error(err);
    });
  }
}
