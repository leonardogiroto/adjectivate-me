import { Injectable } from '@angular/core'
import { HttpClient, HttpParams } from '@angular/common/http'
import { environment } from 'src/environments/environment'
import { Observable } from 'rxjs'

@Injectable()
export class AppService {
  constructor(private _http: HttpClient) {}

  public getUSer(userId: string): Observable<any> {
    return this._http.get(environment.apiUrl + 'user', {
      params: new HttpParams().set('id', userId.toString()),
    })
  }

  public getRandomAjectives(amount: number = 4): Observable<any> {
    return this._http.get(environment.apiUrl + 'adjectives', {
      params: new HttpParams().set('amount', amount.toString()),
    })
  }

  public generateUserPage(name: string, email: string): Observable<any> {
    return this._http.post(environment.apiUrl + 'user', {
      name,
      email,
    })
  }

  public adjectivateUser(id: string, adjective: string): Observable<any> {
    return this._http.post(environment.apiUrl + 'adjectives', {
      id,
      adjective,
    })
  }

  public getUserResults(id: string): Observable<any> {
    return this._http.get(environment.apiUrl + 'adjectives/user/id', {
      params: new HttpParams().set('id', id),
    })
  }
}
