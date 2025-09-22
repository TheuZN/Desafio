import { Component, inject } from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component";
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-test1',
  standalone: true,
  imports: [HeaderComponent, FormsModule, CommonModule],
  templateUrl: './test1.component.html',
  styleUrls: ['./test1.component.scss']
})
export class Test1Component {

  private router = inject(Router);

  options = [
    { id: 1, text: 'No botão "+" na parte inferior da tela', correct: false },
    { id: 2, text: 'Na aba Sua Biblioteca', correct: true },
    { id: 3, text: 'Na aba de podcasts', correct: false },
    { id: 4, text: 'Somente na versão web do Spotify', correct: false }
  ];

  selectedAnswer: number | null = null;
  feedback: string = '';
  attempts: number = 0;
  maxAttempts: number = 3;
  goToTest2 = false;

  ngOnInit(): void {
    const savedTest1 = localStorage.getItem('test1');
    const savedTest1Attempts = localStorage.getItem('attemptsTest1');
    const savedTest1Value = localStorage.getItem('valueTest1');

    localStorage.setItem('test1', 'iniciado');

    this.feedback = '';

    this.attempts = savedTest1Attempts ? parseInt(savedTest1Attempts, 10) : 0;

    if (savedTest1 === 'feito' && savedTest1Value === 'passou') {
      this.goToTest2 = true;
      this.feedback = '✅ Correto! Você selecionou a opção correta.';
    } else if (savedTest1 === 'feito' && savedTest1Value === 'reprovado') {
      this.goToTest2 = true;
      this.feedback = '❌ Você atingiu o limite de tentativas. Reveja o conteúdo.';
    } else if (savedTest1 === 'iniciado') {
      this.goToTest2 = false;
      this.feedback = this.attempts > 0 ? `❌ Resposta incorreta. Tentativa ${this.attempts}/${this.maxAttempts}.` : '';
    } else {
      this.goToTest2 = false;
    }
  }

  checkTest1() {
    if (this.selectedAnswer === null) {
      this.feedback = '⚠️ Selecione uma opção antes de confirmar.';
      return;
    }

    const option = this.options.find(o => o.id === this.selectedAnswer);

    if (option?.correct) {
      this.feedback = '✅ Correto! A opção está em "Sua Biblioteca".';
      localStorage.setItem('test1', 'feito');
      localStorage.setItem('valueTest1', 'passou');
      this.goToTest2 = true;
    } else {
      this.attempts++;
      localStorage.setItem('attemptsTest1', this.attempts.toString());

      if (this.attempts >= this.maxAttempts) {
        this.feedback = '❌ Você atingiu o limite de tentativas.';
        localStorage.setItem('test1', 'feito');
        localStorage.setItem('valueTest1', 'reprovado');
        this.goToTest2 = true;
      } else {
        this.feedback = `❌ Resposta incorreta. Tentativa ${this.attempts}/${this.maxAttempts}.`;
        localStorage.setItem('test1', 'iniciado');
        localStorage.setItem('valueTest1', 'reprovando');
      }
    }
  }

  goToTheTest2() {
    const progress = JSON.parse(localStorage.getItem('testProgress') || '{}');
    progress.test1Completed = true;
    localStorage.setItem('testProgress', JSON.stringify(progress));
    this.router.navigate(['test2']);
  }

}
