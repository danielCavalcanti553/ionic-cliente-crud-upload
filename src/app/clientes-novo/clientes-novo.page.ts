import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TemplateService } from 'src/service/template';
import { ClienteService } from 'src/service/cliente.service';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-clientes-novo',
  templateUrl: './clientes-novo.page.html',
  styleUrls: ['./clientes-novo.page.scss'],
})
export class ClientesNovoPage implements OnInit {

  formGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private template : TemplateService,
    private clienteServ : ClienteService) {

      this.iniciarForm();
  }

  ngOnInit() {
  }

  cadastrar(){

    this.template.loading.then(load=>{
      load.present();

      this.clienteServ.cadastrar(this.formGroup.value).subscribe(data=>{
        
        this.template.myAlert("Cadastrado com sucesso");
        load.dismiss();
        this.formGroup.reset();

      },err=>{

        this.template.myAlert("Erro ao cadastrar");
        load.dismiss();

      })
  })
    
    /*this.firestore.collection('cliente').add(this.formGroup.value).then(() =>{
      console.log("Cadastrado com sucesso!");
      this.formGroup.reset();
    }).catch(err=>{
      console.log(err);
    }) */


  }

  iniciarForm() {
    this.formGroup = this.formBuilder.group({
      nome: ['', [Validators.required, Validators.minLength(5)]],
      endereco: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.minLength(5)]],
      telefone: ['', [Validators.required, Validators.minLength(5)]],
      cpf: ['', [Validators.required, Validators.minLength(5)]]
    })
  }
}
