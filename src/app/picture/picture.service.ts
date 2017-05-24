import { Injectable } from '@angular/core';
import * as data from '../lambdaReport.json';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

export class Picture {
  constructor(
    public name: string, 
    public link: string,
    public displayName: string, 
    public type: string,
    public data: string
  ) { }
}

@Injectable()
export class PictureService {

  
  urlphotos: '';
  urldata: '';

  constructor( private http: Http ) { }

  getPictures(){
      console.log('avant' + this.urlphotos);

    if (this.urlphotos === '' || this.urlphotos === undefined){
      this.urlphotos = (<any>data).allLambdas.find(myObj => myObj.name === 'photos').url;
      console.log('loaded URL: ' + this.urlphotos);
    }
    
    return this.http.post(this.urlphotos, null)
      .map((res: Response) => res.json());
  }

  getDataPicture(pic){
       if (this.urldata === '' || this.urldata === undefined){
          this.urldata = (<any>data).allLambdas.find(myObj => myObj.name === 'encodeImage').url;
          console.log('loaded URL: ' + this.urldata);
        }
      
      return this.http.post(this.urldata, {name: pic.name, type: pic.type})
        .map((res: Response) => res.json());
    }
  
  getUrl(){

    console.log('loading lambda urls')
    return this.http.get('c.json').map((res: Response) => res.json());
  }
}
