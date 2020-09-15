import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { DomSanitizer } from '@angular/platform-browser';
import { AngularFireStorage } from '@angular/fire/storage';
import { ActivatedRoute } from '@angular/router';
import { ClienteService } from 'src/service/cliente.service';
import { Cliente } from 'src/model/cliente';
import { NavController } from '@ionic/angular';
import { UtilService } from 'src/service/util.services';

@Component({
  selector: 'app-clientes-foto',
  templateUrl: './clientes-foto.page.html',
  styleUrls: ['./clientes-foto.page.scss'],
})
export class ClientesFotoPage implements OnInit {

  foto: any = null;
  fotoBlob : any;
  f : any;
  cliente : Cliente = new Cliente();

  constructor(private camera: Camera, 
    private sn: DomSanitizer, 
    private fireStorage : AngularFireStorage,
    private route : ActivatedRoute,
    private clienteServ : ClienteService,
    private navCtrl : NavController,
    private util : UtilService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(url=>{
      
      let id = url.get('id');

      this.clienteServ.buscaPorId(id).subscribe(data=>{
        this.cliente = data.payload.data();
        this.cliente.id = id;
        this.tirarFoto();
      },err =>{
        this.navCtrl.navigateRoot(['/clientes']);
      })

    });
  }

  tirarFoto(){
    this.clienteServ.obterFoto.subscribe(data=>{
      this.foto = data;
    })
  }
 
  enviar(){
    this.clienteServ.uploadFoto(this.foto, this.cliente.id).subscribe(data=>{
      this.navCtrl.navigateBack(['/cliente-detalhe', this.cliente.id]);
    });
  }
/*
  enviar(){
    this.fotoBlob = this.util.dataUriToBlob(this.foto.changingThisBreaksApplicationSecurity);

    let urlImage = this.fireStorage.storage.ref().child(`perfil/${this.cliente.id}.jpg`);
      urlImage.put(this.fotoBlob).then(resp => {
        this.navCtrl.navigateBack(['/cliente-detalhe', this.cliente.id]);
    });

  }
  */

}


  /*
  tirarFoto(){

    this.foto = null;

    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true
    }

    this.camera.getPicture(options).then((imageData) => {
      this.foto = this.sn.bypassSecurityTrustResourceUrl('data:image/jpeg;base64,' + imageData);
      this.f = imageData;
      console.log('----------------');
      //console.log(this.foto.changingThisBreaksApplicationSecurity);
      console.log(this.foto);
     }, (err) => {
      console.log(err);
     });
  }
*/