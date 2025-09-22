import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './test.component.html',
  styleUrl: './test.component.scss'
})
export class TestComponent {

  private router = inject(Router);

  score = "";
  btnText = "";

  ngOnInit() {
    const savedNota = localStorage.getItem('finalResult');
    const statusTest1 = localStorage.getItem('test1');
    const statusTest2 = localStorage.getItem('test2');
    const statusTest3 = localStorage.getItem('test3');

    if (savedNota) {
      this.score = "Nota " + savedNota;
      this.btnText = "Avaliação Realizada"
    } else if (statusTest1 === "iniciado" || statusTest2 === "iniciado" || statusTest3 === "iniciado") {
      this.score = 'Ainda não avaliado.';
      this.btnText = "Continuar Avaliação"
    } else {
      this.score = 'Ainda não avaliado.';
      this.btnText = "Realizar Avaliação"
    }
  }

  getConfirmation() {
    const isConfirmed = confirm(
      'Antes de iniciar o teste, verifique se dispõe de pelo menos 15 minutos contínuos, se sua conexão com a internet está estável e se o ambiente está adequado para a realização do teste sem interrupções. Selecione OK para continuar.'
    );

    if (isConfirmed) {
      this.router.navigate(['test1']);
      localStorage.setItem('test1Started', 'true');
    }
  }
}
