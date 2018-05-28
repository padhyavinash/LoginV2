import { Component } from '@angular/core';
import { AuthenticationService, UserDetails } from '../authentication.service';

@Component({
  templateUrl: './candidate.component.html'
})
export class CandidateComponent {
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
