import { Component } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Geolocation } from '@capacitor/geolocation';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  latitude: string = 'no data';
  longitude: string = 'no data';
  selectedImage: string = null;

  constructor() {}

  async takePicture() {
    const image = await Camera.getPhoto({
      quality: 50,
      source: CameraSource.Prompt,
      correctOrientation: true,
      allowEditing: true,
      resultType: CameraResultType.DataUrl
    }).then(image => {
      this.selectedImage = image.dataUrl;
    }).catch(error => {
      return false;
    });
  
    // image.webPath will contain a path that can be set as an image src.
    // You can access the original file using image.path, which can be
    // passed to the Filesystem API to read the raw data of the image,
    // if desired (or pass resultType: CameraResultType.Base64 to getPhoto)
    //var imageUrl = image.webPath;
  };

  async getGeolocation() {
    //put in a try catch
    const coordinates = await Geolocation.getCurrentPosition();
    this.latitude = coordinates.coords.latitude.toString();
    this.longitude = coordinates.coords.longitude.toString();
    console.log('Current position:', coordinates);
  }
}
