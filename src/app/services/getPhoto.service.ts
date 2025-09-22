import { HttpClient, HttpHeaders } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environment } from "../enviroments/enviroment";
import { map } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class GetPhotoService {

    private http = inject(HttpClient);
    apiKey = environment.apiKey;

    private apiUrlPhoto = `https://api.unsplash.com/search/photos?page=1&query=`;

    getPhoto(photo: string) {
        const headers = new HttpHeaders({
            accept: 'application/json',
            Authorization: `Client-ID ${this.apiKey}`
        });
        const ramdonNumber = Math.floor(Math.random() * 11)
        return this.http.get<any[]>(`${this.apiUrlPhoto}${photo}`, { headers }).pipe(map((res: any) => res.results[ramdonNumber]));
    }

}