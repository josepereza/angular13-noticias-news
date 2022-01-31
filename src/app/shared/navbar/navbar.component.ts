import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter, map, tap } from 'rxjs';
import { NoticiasService } from 'src/app/services/noticias.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
@Input() titulo:string
inputSearch = new FormControl('entertainment');
  constructor(private ns:NoticiasService) { 
    this.titulo='news';
  }

  ngOnInit(): void {
    this.onChange();
    //this.inputSearch.setValue('entertainment')
  }
  onChange(): void {
    this.inputSearch.valueChanges
      .pipe(
        map((search: string) => search.trim()),
        debounceTime(350),
        distinctUntilChanged(),
        filter((search: string) => search !== ''),
        tap((search: string) => this.ns.busqueda$.next(search))
      )
      .subscribe();
}
onSubmit(entrada:string){
  console.log('mi entrada -formulario',entrada)
  console.log(this.inputSearch.value)
  this.ns.busqueda$.next(entrada)
}
vaciar(){
  this.inputSearch.setValue('')
}
}
