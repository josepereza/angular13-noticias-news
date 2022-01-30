import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, pluck, Subject } from 'rxjs';
import {Article,ResponseArticle} from '../interfaces/noticias'

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {
  busqueda$ = new Subject();
  busqueda={
     pais:'ch',
     categoria:'sport'
  }
 
  constructor(private http:HttpClient) { }
  getPaisesPorPais(pais:string,categoria:string):Observable<Article[]>{
   return  this.http.get<ResponseArticle>(`https://newsapi.org/v2/top-headlines?country=${pais}&category=${categoria}&apiKey=a218bb3ebc6c411da9c8d4aead14537d`)
   .pipe(
     pluck('articles')
   )
  }
  getTodo(consulta:string):Observable<Article[]>{
    return  this.http.get<ResponseArticle>(`https://newsapi.org/v2/everything?q=${consulta}&apiKey=a218bb3ebc6c411da9c8d4aead14537d`)
   .pipe(
     pluck('articles')
   )

  }
}
