import { Component, inject } from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component";
import { Router } from '@angular/router';
import { GetPhotoService } from '../../services/getPhoto.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-finish',
  standalone: true,
  imports: [HeaderComponent, CommonModule],
  templateUrl: './finish.component.html',
  styleUrl: './finish.component.scss'
})
export class FinishComponent {

  private router = inject(Router);
  private getPhotoService = inject(GetPhotoService);

  test1 = 0;
  test2 = 0;
  test3 = 0;
  finalResult = 0;
  textFinal = " ";
  textResult = " ";

  photoImages: any[] = [];

  ngOnInit() {
    const valueTest1 = localStorage.getItem('valueTest1');
    const valueTest2 = localStorage.getItem('valueTest2');
    const valueTest3 = localStorage.getItem('valueTest3');

    if (valueTest1 === 'passou') {
      this.test1 = 10;
    } else {
      this.test1 = 0;
    }

    if (valueTest2 === 'passou') {
      this.test2 = 10;
    } else {
      this.test2 = 0;
    }

    if (valueTest3 === 'passou') {
      this.test3 = 10;
    } else {
      this.test3 = 0;
    }

    this.finalResult = parseFloat(((this.test1 + this.test2 + this.test3) / 3).toFixed(1));
    localStorage.setItem('finalResult', `${this.finalResult}`);

    if (this.finalResult === 10) {
      this.textFinal = "Parabéns! Você atingiu a nota máxima. Volte para tela inicial para continuar seus estudos."
      this.textResult = "Happy person";
    } else if (this.finalResult >= 6 && this.finalResult < 10) {
      this.textFinal = "Parabéns! Você passou pela atividade. Volte para tela inicial para continuar seus estudos."
      this.textResult = "Happy person";
    } else if (this.finalResult >= 0 && this.finalResult < 6) {
      this.textFinal = "Uhum! Podia ser melhor, você não atingiu a nota suficiente para passar na atividade. Volte para tela inicial para continuar seus estudos."
      this.textResult = "Sad person";
    } else {
      this.textFinal = "Ocorreu algum erro, por favor entre em contato."
      this.textResult = "Error";
    }

    this.getApiPhoto(this.textResult);
  }

  backToHome() {
    this.router.navigate(['home']);
  }

  getApiPhoto(textResult: string): void {
    this.getPhotoService.getPhoto(textResult).subscribe(
      data => {
          this.photoImages = data.urls.small;
      }
    )
  }

}
