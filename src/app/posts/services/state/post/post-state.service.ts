import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PostStateModel } from 'src/app/todos/shared/models/posts/post-state.model';
import { Post } from 'src/app/todos/shared/models/posts/post.model';

@Injectable({
  providedIn: 'root'
})
export class PostStateService {
  private state: PostStateModel = {
    posts: []
  };

  private readonly postsSubject = new BehaviorSubject<Post[]>(this.state.posts);

  // Expose the observable$ part of the _todos subject (read only stream)
  readonly posts$ = this.postsSubject.asObservable();

  constructor() { }

  set posts(posts: Post[]) {
    this.state.posts = posts;
    this.postsSubject.next(posts);
  }

  filterPostsByUserId(user: string | null): void {
    let filteredPosts = Array.from(this.state.posts);
    if (user) {
      filteredPosts = filteredPosts.filter(post => post.userId === parseInt(user, 10));
    }
    this.postsSubject.next(filteredPosts);
  }
}
