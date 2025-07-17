import { Injectable, signal } from '@angular/core';
import { PostService } from '../services/post.service';
import { PostListDto } from '../models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class PostsStore {
  private readonly _posts = signal<PostListDto[]>([]);
  private readonly _loading = signal<boolean>(false);
  private readonly _error = signal<string | null>(null);

  readonly posts = this._posts.asReadonly();
  readonly loading = this._loading.asReadonly();
  readonly error = this._error.asReadonly();

  constructor(private postService: PostService) {}

  fetchPosts() {
    this._loading.set(true);
    this.postService.getPosts().subscribe({
      next: (data) => {
        this._posts.set(data);
        this._loading.set(false);
        this._error.set(null);
      },
      error: (err) => {
        this._posts.set([]);
        this._loading.set(false);
        this._error.set('Failed to load posts');
      }
    });
  }

  createPost(post: { userId: number; title: string; content: string }) {
    this._loading.set(true);
    this.postService.createPost(post).subscribe({
      next: () => {
        this.fetchPosts();
        this._loading.set(false);
        this._error.set(null);
      },
      error: () => {
        this._loading.set(false);
        this._error.set('Failed to create post');
      }
    });
  }
}
