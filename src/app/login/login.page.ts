import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { NavController, MenuController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  formGroup : FormGroup;

  message : string = null;

  constructor(private formBuilder : FormBuilder,
    private auth : AngularFireAuth,
    private navCtrl : NavController,
    private menuCtrl : MenuController) {
    this.iniciarForm();
    //this.menuCtrl.enable(false);
  }

  ngOnInit() {

  }
  autenticar() {
    let user = this.formGroup.controls['username'].value;
    let pass = this.formGroup.controls['password'].value;
    this.auth.signInWithEmailAndPassword(user,pass).then(data=>{
      this.menuCtrl.enable(true);
      this.navCtrl.navigateRoot(['clientes']);
    }).catch(data=>{
      console.log(data);
      this.message = "Usuário inválido";
    });
  }

  iniciarForm(){
    this.formGroup= this.formBuilder.group({
      username : ['admin2@admin.com',[Validators.email] ],
      password: ['123456', [Validators.required, Validators.minLength(13), Validators.maxLength(16)]]
    })
  }
}
