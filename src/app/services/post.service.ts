import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PostListDto } from '../models/auth.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private readonly apiUrl = `${environment.backendUrl}/Posts`;

  constructor(private http: HttpClient) {}

  getPosts(): Observable<PostListDto[]> {
    return this.http.get<PostListDto[]>(this.apiUrl);
  }
}
