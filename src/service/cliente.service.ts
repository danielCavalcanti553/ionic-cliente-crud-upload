import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertController, LoadingController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, from, observable } from 'rxjs';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { DomSanitizer } from '@angular/platform-browser';
import { UtilService } from './util.services';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({
    providedIn: 'root',
  })
export class ClienteService {
    constructor(private http: HttpClient,
        private firestore: AngularFirestore,
        private camera: Camera,
        private sn: DomSanitizer,
        private util : UtilService,
        private fireStorage : AngularFireStorage) { }

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

    obterFoto = new Observable((observe)=>{
        let foto : any = null;

        const options: CameraOptions = {
            quality: 100,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE,
            correctOrientation: true
          }

          this.camera.getPicture(options).then((imageData) => {
            foto = this.sn.bypassSecurityTrustResourceUrl('data:image/jpeg;base64,' + imageData);
            observe.next(foto);
           }, (err) => {
            observe.error(err);
           })
    })

    uploadFoto(foto : any, name) : Observable<any>{
        let fotoBlob = this.util.dataUriToBlob(foto.changingThisBreaksApplicationSecurity);
        let uploadServer = this.fireStorage.storage.ref().child(`perfil/${name}.jpg`);
        
        let observable = from(uploadServer.put(fotoBlob))
        return observable;
    }
/*
    obterFoto() : Observable<any>{

        let foto : any = null;

        const options: CameraOptions = {
            quality: 100,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE,
            correctOrientation: true
          }
      
          let observable = from(this.camera.getPicture(options).then((imageData) => {
            foto = this.sn.bypassSecurityTrustResourceUrl('data:image/jpeg;base64,' + imageData);
           }, (err) => {
            console.log(err);
           }))

        return observable;
    }
*/
 }