import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CommentsInterface } from '@store/interfaces/comments.interface';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CommentsService {
  http = inject(HttpClient);

  getAllComments(page = 1, limit = 12): Observable<CommentsInterface> {
    const skip = (page - 1) * limit;
    return this.http.get<CommentsInterface>(`https://dummyjson.com/comments?limit=${limit}&skip=${skip}`);
  }

  getSearchComment(id: string): Observable<CommentsInterface> {
    return this.http.get<CommentsInterface>(`'https://dummyjson.com/comments/${id}`);
  }
}
