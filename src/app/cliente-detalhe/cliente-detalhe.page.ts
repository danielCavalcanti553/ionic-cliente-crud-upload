import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ClienteService } from 'src/service/cliente.service';
import { Cliente } from 'src/model/cliente';
import { NavController } from '@ionic/angular';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-cliente-detalhe',
  templateUrl: './cliente-detalhe.page.html',
  styleUrls: ['./cliente-detalhe.page.scss'],
})
export class ClienteDetalhePage implements OnInit {

  cliente : Cliente = new Cliente();
  imagem : any;

  constructor(private route: ActivatedRoute, 
    private clienteServ : ClienteService,
    private navCtrl : NavController,
    private fireStorage : AngularFireStorage) { }

  ngOnInit() {

    this.route.paramMap.subscribe(url=>{
      
      let id = url.get('id');

      this.clienteServ.buscaPorId(id).subscribe(data=>{
        this.cliente = data.payload.data();
        this.cliente.id = id;
        this.downloadImage();
      },err =>{
        this.navCtrl.navigateRoot(['/clientes']);
      })

    });
  }

  foto(){
    this.navCtrl.navigateForward(['/clientes-foto', this.cliente.id]);
  }

  downloadImage(){
    let ref = this.fireStorage.storage.ref().child(`perfil/${this.cliente.id}.jpg`);
    ref.getDownloadURL().then(url=> {
        this.imagem = url;
        console.log('ok');
    },err=>{
      this.imagem = 'https://barcarena.pa.gov.br/portal/img/perfil/padrao.jpg';
      console.log('err');
    });
}

}
