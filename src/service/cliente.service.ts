import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertController, LoadingController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, from, observable } from 'rxjs';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { DomSanitizer } from '@angular/platform-browser';
import { UtilService } from './util.services';
import { AngularFireStorage } from '@angular/fire/storage';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { File } from '@ionic-native/file/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';

@Injectable({
    providedIn: 'root',
  })
export class ClienteService {

    fotoBlob : any;

    constructor(private http: HttpClient,
        private firestore: AngularFirestore,
        private camera: Camera,
        private sn: DomSanitizer,
        private util : UtilService,
        private fireStorage : AngularFireStorage,
        private fileChooser: FileChooser,
        private file: File,
        private webview: WebView) { }

    cadastrar(obj : any) : Observable<any>{
        const observable = from(this.firestore.collection('cliente').add(obj));
        return observable;
    }

    listar() : Observable<any>{
        return this.firestore.collection('cliente').snapshotChanges();
    }

    buscaPorId(id : string) : Observable<any>{
        return this.firestore.collection('cliente').doc(id).snapshotChanges();
    }

    obterFotoCamera = new Observable((observe)=>{
        let foto : any = null;

        const options: CameraOptions = {
            quality: 100,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE,
            correctOrientation: true
          }

          this.camera.getPicture(options).then(imageData => {
            foto = this.sn.bypassSecurityTrustResourceUrl('data:image/jpeg;base64,' + imageData);
            this.fotoBlob = foto.changingThisBreaksApplicationSecurity;
            observe.next(foto);
           }, (err) => {
            observe.error(err);
           })
    })




    uploadFoto(name) : Observable<any>{
        let fotoBlob = this.util.dataUriToBlob(this.fotoBlob);
        let uploadServer = this.fireStorage.storage.ref().child(`perfil/${name}.jpg`);
        
        let observable = from(uploadServer.put(fotoBlob))
        return observable;
    }

    obterFotoFile = new Observable((observe)=>{
        this.fileChooser.open({ "mime": "image/jpeg" }).then(uri => {
            this.file.resolveLocalFilesystemUrl(uri).then((entry:any) => {

              observe.next(this.webview.convertFileSrc(entry.nativeURL));

              entry.file(file => {
                var reader = new FileReader();

                reader.onloadend = (encodedFile: any) => {
                  var src = encodedFile.target.result;
                  this.fotoBlob = src;
                  var src = src.split("base64,");
                  var contentAsBase64EncodedString = src[1];
                };
                reader.readAsDataURL(file);;

              }).catch(e => console.log(e));
            });
          })
    })


 }