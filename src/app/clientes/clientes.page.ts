import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Cliente } from 'src/model/cliente';
import { ClienteService } from 'src/service/cliente.service';
import { TemplateService } from 'src/service/template';
import { NavController } from '@ionic/angular';
@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.page.html',
  styleUrls: ['./clientes.page.scss'],
})
export class ClientesPage implements OnInit {

  clientes: Cliente[] = [];
  constructor(private firestore: AngularFirestore,
    private clienteServ: ClienteService,
    private template: TemplateService,
    private navCtrl : NavController) { }

  ngOnInit() {
  }

  ionViewWillEnter(){

    this.clientes = [];

    this.template.loading.then(load => {
      load.present();

      this.clienteServ.listar().subscribe(data => {
        
        data.map(a => {
          let cliente: Cliente = a.payload.doc.data() as Cliente;
          cliente.id = a.payload.doc.id as string;
          this.clientes.push(cliente);
        })
        load.dismiss();

      })

    })
  }

  detalhe(obj : Cliente){
    this.navCtrl.navigateForward(['/cliente-detalhe', obj.id]);
  }

  



}
