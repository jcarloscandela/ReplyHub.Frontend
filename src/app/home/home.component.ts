import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PostService } from '../services/post.service';
import { PostListDto } from '../models/auth.model';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { AuthStore } from '../store/auth.store';
import { ShortContentPipe } from './short-content.pipe';
import { PostsStore } from '../store/posts.store';

@Component({
  selector: 'app-home',
  standalone: true,
imports: [CommonModule, FormsModule, CardModule, ButtonModule, ShortContentPipe],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  showCreatePostDialog = false;
  newPostTitle = '';
  newPostContent = '';

  constructor(
    public postsStore: PostsStore,
    private authStore: AuthStore
  ) {}

  ngOnInit(): void {
    this.postsStore.fetchPosts();
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
    this.postsStore.createPost(post);
    this.closeCreatePostDialog();
  }
}
