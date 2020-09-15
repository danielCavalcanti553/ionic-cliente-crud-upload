import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { DomSanitizer } from '@angular/platform-browser';
import { AngularFireStorage } from '@angular/fire/storage';
import { ActivatedRoute } from '@angular/router';
import { ClienteService } from 'src/service/cliente.service';
import { Cliente } from 'src/model/cliente';
import { NavController } from '@ionic/angular';
import { UtilService } from 'src/service/util.services';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { File } from '@ionic-native/file/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';

@Component({
  selector: 'app-clientes-foto',
  templateUrl: './clientes-foto.page.html',
  styleUrls: ['./clientes-foto.page.scss'],
})
export class ClientesFotoPage implements OnInit {

  foto: any = null;
  fotoBlob: any;
  f: any;
  cliente: Cliente = new Cliente();

  constructor(private camera: Camera,
    private sn: DomSanitizer,
    private route: ActivatedRoute,
    private clienteServ: ClienteService,
    private navCtrl: NavController) { }

  ngOnInit() {
    this.route.paramMap.subscribe(url => {

      let id = url.get('id');

      this.clienteServ.buscaPorId(id).subscribe(data => {
        this.cliente = data.payload.data();
        this.cliente.id = id;
        this.tirarFoto();
      }, err => {
        this.navCtrl.navigateRoot(['/clientes']);
      })

    });
  }

  tirarFoto() {
    this.clienteServ.obterFotoCamera.subscribe((data: any) => {
      this.foto = data.changingThisBreaksApplicationSecurity;
      this.fotoBlob = data.changingThisBreaksApplicationSecurity;
    })
  }

  arquivoFoto() {
    this.clienteServ.obterFotoFile.subscribe(data=>{
      this.foto = data;
    })

  }

  enviar() {
    this.clienteServ.uploadFoto(this.cliente.id).subscribe(data => {
      this.navCtrl.navigateBack(['/cliente-detalhe', this.cliente.id]);
    });
  }
}