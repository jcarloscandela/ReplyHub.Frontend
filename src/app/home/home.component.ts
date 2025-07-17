import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PostService } from '../services/post.service';
import { PostListDto } from '../models/auth.model';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { AuthStore } from '../store/auth.store';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, CardModule, ButtonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  posts: PostListDto[] = [];
  showCreatePostDialog = false;
  newPostTitle = '';
  newPostContent = '';

  constructor(
    private postService: PostService,
    private authStore: AuthStore
  ) {}

  ngOnInit(): void {
    this.postService.getPosts().subscribe({
      next: (data) => this.posts = data,
      error: () => this.posts = []
    });
  }

  getShortContent(content: string): string {
    return content.length > 120 ? content.substring(0, 120) + '...' : content;
  }

  openCreatePostDialog(): void {
    this.showCreatePostDialog = true;
    this.newPostTitle = '';
    this.newPostContent = '';
  }

  closeCreatePostDialog(): void {
    this.showCreatePostDialog = false;
  }

  createPost(): void {
    const userId = Number(this.authStore.userId) ?? 0;
    const post = {
      userId,
      title: this.newPostTitle,
      content: this.newPostContent
    };
    this.postService.createPost(post).subscribe({
      next: () => {
        this.closeCreatePostDialog();
        this.postService.getPosts().subscribe({
          next: (data) => this.posts = data,
          error: () => {}
        });
      },
      error: () => {}
    });
  }
}
