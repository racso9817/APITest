import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, timer } from 'rxjs';
import { map, takeWhile } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  flaskURL = 'http://127.0.0.1:5000/';

  constructor(private http: HttpClient) { }

  payment(validityTime: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('token')
    })
    return this.http.post<any>(this.flaskURL + 'payment', { 'validity_time': validityTime }, { headers });
  }

  checkLinkValid(validity_time: string): Observable<boolean>
  {
    //transformar validity_time a tipo number
    const time = Number(validity_time)
    const tiempoLimite = Date.now() + time * 60000

    return timer(0, 1000).pipe(
      map(()=> Date.now() < tiempoLimite),
      takeWhile(v => v, true)
    )
  }

}
