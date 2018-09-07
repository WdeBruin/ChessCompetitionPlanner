import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { Credentials } from '../login';

@Injectable()
export class UserService {
    private apiEndpoint: string;

    constructor(private readonly http: HttpClient) {
        this.apiEndpoint = environment.api;
    }

    public login(credentials: Credentials): Observable<Token> {
        return this.http.post<Token>(`${this.apiEndpoint}/auth/login`, credentials);
    }

    public getToken(): string {
        return localStorage.getItem('auth_token');
    }

    public isAuthenticated(): boolean {
        // get the token
        const token = this.getToken();
        // return a boolean reflecting 
        // whether or not the token is expired
        return token != null;
    }
}

export class Token {
    auth_token: string;
}
