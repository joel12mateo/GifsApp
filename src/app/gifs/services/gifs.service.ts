import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchResponde, Gif } from '../interfaces/gifs.interfaces';
import { compileNgModule } from '@angular/compiler';

@Injectable({providedIn: 'root'})
export class GifsService {

public gifsList: Gif[]=[];

  private _tagsHistory:string[]= [];
  private apikey:string = 'os8nFDAl89ZTFKFLerMXbiAqRtsVd1rN';
  private serviceUrl: string ='https://api.giphy.com/v1/gifs';

  constructor(private http:HttpClient) {
    this.loadLocalStorage();
    // const ultimo: string = this._tagsHistory[this._tagsHistory.length-1];
    // this.searchTag(ultimo);
  }

  get tagsHistory(){

    return [...this._tagsHistory];
  }

  private organizeHistory(tag:string){
    tag = tag.toLowerCase();

    if(this._tagsHistory.includes(tag)){
      this._tagsHistory = this._tagsHistory.filter((oldTag) => oldTag !== tag)
    }
    this._tagsHistory.unshift(tag);
    this._tagsHistory = this._tagsHistory.splice(0,10);
    this.saveLocalStorage();
  }

  private saveLocalStorage():void{
    localStorage.setItem('history', JSON.stringify( this._tagsHistory));
  }
   private loadLocalStorage():void{
    if(!localStorage.getItem('history') ) return;

     const temporal = localStorage.getItem('history')!;
     this._tagsHistory = (JSON.parse (temporal));

     if(this._tagsHistory.length === 0)return;
     this.searchTag(this._tagsHistory[0]);
  }

  searchTag (tag:string):void  {
     if(tag.length === 0) return;
        this.organizeHistory(tag);

    const params = new HttpParams()
    .set('api_key', this.apikey)
    .set('limit', '10')
    .set('q', tag)

      this.http.get<SearchResponde>(`${this.serviceUrl}/search?`, {params})
      .subscribe(resp=>{
        this.gifsList = resp.data;

      });


  }


}
