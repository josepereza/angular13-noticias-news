import { Component, OnInit } from '@angular/core';
import { NoticiasService } from 'src/app/services/noticias.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Article, ResponseArticle } from '../../interfaces/noticias'


@Component({
  selector: 'app-listado-noticias',
  templateUrl: './listado-noticias.component.html',
  styleUrls: ['./listado-noticias.component.css']
})
export class ListadoNoticiasComponent implements OnInit {
  formulario = new FormGroup({
    categoria: new FormControl(''),
    pais: new FormControl('')

  })
  espera: boolean = false;
  listado: any[] = []
  constructor(public ns: NoticiasService) { }

  ngOnInit(): void {
     
     this.formulario.get('pais')?.setValue('us')
     this.formulario.get('categoria')?.setValue('general')

    this.ns.getPaisesPorPais('us','general')
    .subscribe(data => {
      this.listado = data
      this.espera = false

    })

    this.ns.busqueda$
      .subscribe((data: any) => {
        this.espera = true
        this.ns.getTodo(data).subscribe(datos => {
          this.listado = datos
          this.espera = false
       })
      })
      

    this.formulario.get('categoria')?.valueChanges.subscribe(
      data => {
         this.espera=true
        const pais = this.formulario.get('pais')?.value
        const categoria = this.formulario.get('categoria')?.value
        this.ns.getPaisesPorPais(pais, categoria)
          .subscribe(data => {
            this.listado = data
            this.espera = false

          })
      }
    )
    this.formulario.get('pais')?.valueChanges.
      subscribe(data => {
        this.espera=true
        const pais = this.formulario.get('pais')?.value
        const categoria = this.formulario.get('categoria')?.value

        this.ns.getPaisesPorPais(pais, categoria)
          .subscribe(data => {

            this.listado = data
            this.espera = false
          })
      })
  }
resetear(){
  this.formulario.get('pais')?.setValue('')
  this.formulario.get('categoria')?.setValue('')
  
}
buscar(pais:string,categoria:string){
  console.log(pais,categoria)
  const np=pais.length;
  const nc=categoria.length;
  pais=pais.slice(3,np)
  categoria=categoria.slice(3,nc)
  console.log(pais,categoria)
  this.ns.getPaisesPorPais(pais,categoria)
  .subscribe(data => {
    this.listado = data
    this.espera = false

  })
}
}
