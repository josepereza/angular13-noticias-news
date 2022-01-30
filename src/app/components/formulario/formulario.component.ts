import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NoticiasService } from 'src/app/services/noticias.service';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {
 formulario= new FormGroup({
categoria: new FormControl('1'),
pais:new FormControl('')
 })
  constructor(private ns:NoticiasService) { }
  ngOnInit(): void {
    this.formulario.get('categoria')?.valueChanges.subscribe(

      data=>{
          console.log(this.formulario.value)
        console.log(data)}
    )
    this.formulario.get('pais')?.valueChanges.
    subscribe(data=>{
      console.log('midata ',data,this.formulario.get('pais')?.value
      ,this.formulario.get('categoria')?.value
      )
      this.ns.getPaisesPorPais(data,data).subscribe(data=>console.log(data))
    })
  }

}
