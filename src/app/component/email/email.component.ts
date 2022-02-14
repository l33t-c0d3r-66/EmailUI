import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EmailService } from 'src/app/service/email.service';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}


@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.css']
})
export class EmailComponent implements OnInit {

  flag=true;
  data = {
    fromEmail:"",
    password:"",
    toEmail:"",
    subject:"",
    message:""
  }
  constructor(private emailService: EmailService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  doSubmitForm() {
    this.flag=false;
    console.log(this.data);
    if(this.data.fromEmail=='' || this.data.password=='' || this.data.toEmail=='' || this.data.subject=='' || this.data.message=='') {
      this.snackBar.open("Field can't be empty","OK");
      return;
    }

    this.emailService.sendEmail(this.data).subscribe(
      response => {
          this.flag=true;
          this.snackBar.open("Email Sent Successfully!...", "OK");
      },
      error => {
        this.flag=true;
        this.snackBar.open("Error Sending Email!...", "OK");
      }
    );
  }
}
