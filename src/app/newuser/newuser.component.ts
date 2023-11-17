import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { FormControl, Validators, FormsModule, ReactiveFormsModule, FormGroupDirective, NgForm } from '@angular/forms';
import { ActivatedRoute, Route } from '@angular/router';


@Component({
  selector: 'app-newuser',
  templateUrl: './newuser.component.html',
  styleUrls: ['./newuser.component.scss']
})
export class NewuserComponent {

  hide = true;
  hideconfirm = true;
  disabledRegister = false;
  disabledUpdate = true;

  form: FormGroup; // initiate form
  editphoneno: string = "";

  constructor(private activatedRoute: ActivatedRoute){
    this.form = new FormGroup({
      firstname: new FormControl('', Validators.required),
      lastname: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', [Validators.required, Validators.pattern("^((\\+63-?)|0)?[0-9]{10}$")]),
      status: new FormControl('', Validators.required),
      dateofbirth: new FormControl('', Validators.required),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/),
      ]),
      confirm_password : new FormControl('', [Validators.required]),
      address: new FormGroup({
        country: new FormControl('', Validators.required),
        state: new FormControl('', Validators.required),
        city: new FormControl('', Validators.required)
      }), 

    },{
      validators: this.passwordMatchValidator,
    })

    this.activatedRoute.params.subscribe(res=>{
      
      if(res['phone']!=null){
        this.editphoneno = res['phone'];
        const localData = localStorage.getItem('userList');

        if (localData!=null){
          const users = JSON.parse(localData);
          const currentdata = users.find((m:any)=> m.phone == this.editphoneno);

          console.log(currentdata);
          this.disabledRegister = true;
          this.disabledUpdate = false;
          if (currentdata!=undefined){
            this.form = new FormGroup({
              firstname: new FormControl(currentdata.firstname, Validators.required),
              lastname: new FormControl(currentdata.lastname, Validators.required),
              email: new FormControl(currentdata.email, [Validators.required, Validators.email]),
              phone: new FormControl(currentdata.phone, [Validators.required, Validators.pattern("^((\\+63-?)|0)?[0-9]{10}$")]),
              status: new FormControl(currentdata.status, Validators.required),
              dateofbirth: new FormControl(currentdata.dateofbirth, Validators.required),
              password: new FormControl(currentdata.password, [
                Validators.required,
                Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/),
              ]),
              confirm_password : new FormControl(currentdata.confirm_password, [Validators.required]),
              address: new FormGroup({
                country: new FormControl(currentdata.address.country, Validators.required),
                state: new FormControl(currentdata.address.state, Validators.required),
                city: new FormControl(currentdata.address.city, Validators.required)
              }), 
        
            },{
              validators: this.passwordMatchValidator,
            })
          }

        }
      }
      
    })
  }

  //Validate Email
  getEmailErrorValidator(){
    if (this.form.get('email')?.hasError('required')){
      return "Email is required";
    }
    return this.form.get('email')?.hasError('email') ? 'Not a valid email' : '';
  }

  //Validate the Confirm Password
  passwordMatchValidator(control: AbstractControl){ 
    return control.get('password')?.value === control.get('confirm_password')?.value? null: { mismatch: true }
  }

  // ngOnInit(): void {
    
  // }

  OnSubmit(){
    
    console.log(this.form.value);
    if(!this.form.invalid){

      const localData = localStorage.getItem('userList');
      if (localData!=null){
        const parserData = JSON.parse(localData);
        parserData.push ( this.form.value );
        localStorage.setItem('userList', JSON.stringify(parserData));
      }
      else {
        let arr = [];
        arr.push ( this.form.value );
        localStorage.setItem('userList', JSON.stringify(arr));
      }

    }
    else {
      this.form.markAllAsTouched;
    }
  }

  UpdateUser(){
    console.log(this.form.value);
    
  }

  

}
