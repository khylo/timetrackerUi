import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../../service/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  maxDate:Date;
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.maxDate = new Date();
  }

  onSubmit(form: NgForm){
    console.log(form);
    this.authService.registerUser(
      {email: form.value.email,
      password: form.value.password
      }
    ) 
  }

}
