import { Component, inject } from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-test3',
  standalone: true,
  imports: [HeaderComponent, CommonModule, FormsModule],
  templateUrl: './test3.component.html',
  styleUrl: './test3.component.scss'
})
export class Test3Component {
  private router = inject(Router);

  options = [
    { id: 1, text: 'Na aba Explorar', correct: false },
    { id: 2, text: 'Na aba Sua Biblioteca', correct: true },
    { id: 3, text: 'Na tela inicial, em Destaques', correct: false },
    { id: 4, text: 'Nas configurações do app', correct: false }
  ];

  selectedAnswer: number | null = null;
  feedback: string = '';
  attempts: number = 0;
  maxAttempts: number = 3;
  goToFinish = false;

  ngOnInit() {
    const savedTest3 = localStorage.getItem('test3');
    const savedTest3Attempts = localStorage.getItem('attemptsTest3');
    const savedTest3Value = localStorage.getItem('valueTest3');

    localStorage.setItem('test3', 'iniciado');

    this.attempts = savedTest3Attempts ? parseInt(savedTest3Attempts, 10) : 0;

    if (savedTest3 === 'feito' && savedTest3Value === 'passou') {
      this.goToFinish = true;
      this.feedback = '✅ Correto! Você selecionou todas as opções certas.';
    } else if (savedTest3 === 'feito' && savedTest3Value === 'reprovado') {
      this.goToFinish = true;
      this.feedback = '❌ Você atingiu o limite de tentativas.';
    } else if (savedTest3 === 'iniciado') {
      this.goToFinish = false;
      this.feedback = this.attempts > 0 ? `❌ Resposta incorreta. Tentativa ${this.attempts}/${this.maxAttempts}.` : '';
    } else {
      this.goToFinish = false;
    }

  }

  checkTest3() {
    if (this.selectedAnswer === null) {
      this.feedback = '⚠️ Selecione uma opção antes de confirmar.';
      return;
    }

    this.attempts++;
    localStorage.setItem('attemptsTest3', this.attempts.toString());
    const option = this.options.find(o => o.id === this.selectedAnswer);

    if (option?.correct) {
      this.feedback = '✅ Correto! Você selecionou a opção correta.';
      localStorage.setItem('test3', 'feito');
      localStorage.setItem('valueTest3', 'passou');
      this.goToFinish = true;
    } else {
      if (this.attempts >= this.maxAttempts) {
        this.feedback = '❌ Você atingiu o limite de tentativas. Reveja o conteúdo.';
        localStorage.setItem('test3', 'feito');
        localStorage.setItem('valueTest3', 'reprovado');
        this.goToFinish = true;
      } else {
        this.feedback = `❌ Resposta incorreta. Tentativa ${this.attempts}/${this.maxAttempts}.`;
        localStorage.setItem('test3', 'iniciado');
        localStorage.setItem('valueTest3', 'reprovando');
      }
    }
  }

  isDisabled(): boolean {
    return this.attempts >= this.maxAttempts || this.feedback.startsWith('✅');
  }

  finishTest() {
    const progress = JSON.parse(localStorage.getItem('testProgress') || '{}');
    progress.test3Completed = true;
    localStorage.setItem('testProgress', JSON.stringify(progress));
    this.router.navigate(['finish']);
  }
}
