import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { tokenNotExpired } from "angular2-jwt";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

	authUser(user: {login: String, password: String}) {
  	let headers = new HttpHeaders();
		headers.append('Content-Type', 'application/json');
		return this.http.post('login',
			user,
			{headers: headers});
	}

	storeUser(token: string, user: {login: String, password: String}) {
  	localStorage.setItem('token', token);
		localStorage.setItem('user', JSON.stringify(user));
	}

	getLogin() {
  	let user = JSON.parse(<string>localStorage.getItem('user'));
  	if (user == null) {
  		return '';
		} else {
  		return user.login;
		}
	}

	logout() {
		localStorage.clear();
	}

	isAuth() {
  	return tokenNotExpired();
	}
}
