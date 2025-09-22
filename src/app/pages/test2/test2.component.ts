import { Component, inject } from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-test2',
  standalone: true,
  imports: [HeaderComponent, CommonModule, FormsModule],
  templateUrl: './test2.component.html',
  styleUrl: './test2.component.scss'
})
export class Test2Component {
  private router = inject(Router);

  options = [
    { id: 1, text: 'Clicar em “Criar playlist” no menu lateral esquerdo', correct: true },
    { id: 2, text: 'Acessar “Sua Biblioteca” e escolher “Criar”', correct: false },
    { id: 3, text: 'Dar clique direito em uma música e selecionar “Adicionar à playlist”', correct: true },
    { id: 4, text: 'Abrir a aba de podcasts e criar por lá', correct: false }
  ];

  selectedAnswers: number[] = [];
  feedback: string = '';
  attempts: number = 0;
  maxAttempts: number = 3;
  goToTest3 = false;

  ngOnInit() {
    const savedTest2 = localStorage.getItem('test2');
    const savedTest2Attempts = localStorage.getItem('attemptsTest2');
    const savedTest2Value = localStorage.getItem('valueTest2');

    localStorage.setItem('test2', 'iniciado');

    this.attempts = savedTest2Attempts ? parseInt(savedTest2Attempts, 10) : 0;

    if (savedTest2 === 'feito' && savedTest2Value === 'passou') {
      this.goToTest3 = true;
      this.feedback = '✅ Correto! Você selecionou as opções corretas.';
    } else if (savedTest2 === 'feito' && savedTest2Value === 'reprovado') {
      this.goToTest3 = true;
      this.feedback = '❌ Você atingiu o limite de tentativas. Reveja o conteúdo.';
    } else if (savedTest2 === 'iniciado') {
      this.goToTest3 = false;
      this.feedback = this.attempts > 0 ? `❌ Resposta incorreta. Tentativa ${this.attempts}/${this.maxAttempts}.` : '';
    } else {
      this.goToTest3 = false;
    }

  }

  toggleSelection(id: number, event: Event) {
    const checked = (event.target as HTMLInputElement).checked;
    if (checked) {
      this.selectedAnswers.push(id);
    } else {
      this.selectedAnswers = this.selectedAnswers.filter(ans => ans !== id);
    }
  }

  checkTest2() {
    if (this.selectedAnswers.length === 0) {
      this.feedback = '⚠️ Selecione ao menos uma opção antes de confirmar.';
      return;
    }

    this.attempts++;
    localStorage.setItem('attemptsTest2', this.attempts.toString());

    const correctIds = this.options.filter(o => o.correct).map(o => o.id).sort();
    const selectedIds = [...this.selectedAnswers].sort();

    const isCorrect = JSON.stringify(correctIds) === JSON.stringify(selectedIds);

    if (isCorrect) {
      this.feedback = '✅ Correto! Você selecionou todas as opções certas.';
      this.goToTest3 = true;
      localStorage.setItem('test2', 'feito');
      localStorage.setItem('valueTest2', 'passou');
    } else {
      if (this.attempts >= this.maxAttempts) {
        this.feedback = '❌ Você atingiu o limite de tentativas. Reveja o conteúdo.';
        localStorage.setItem('test2', 'feito');
        localStorage.setItem('valueTest2', 'reprovado');
        this.goToTest3 = true;
      } else {
        this.feedback = `❌ Resposta incorreta. Tentativa ${this.attempts}/${this.maxAttempts}.`;
        localStorage.setItem('test2', 'iniciado');
        localStorage.setItem('valueTest2', 'reprovando');
      }
    }
  }

  isDisabled(): boolean {
    return this.attempts >= this.maxAttempts || this.feedback.startsWith('✅');
  }

  goToTheTest3() {
    const progress = JSON.parse(localStorage.getItem('testProgress') || '{}');
    progress.test2Completed = true;
    localStorage.setItem('testProgress', JSON.stringify(progress));
    this.router.navigate(['test3']);
  }
}
