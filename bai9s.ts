class Comment {
  public id: number;
  public userId: number;
  public content: string;
  public replies: Comment[] = [];

  constructor(id: number, userId: number, content: string) {
    this.id = id;
    this.userId = userId;
    this.content = content;
  }

  addReply(reply: Comment): void {
    this.replies.push(reply);
  }
}

class Post {
  public id: number;
  public likes: number[] = [];
  public comments: Comment[] = [];
  public userId: number;
  public content: string;

  constructor(id: number, userId: number, content: string) {
    this.id = id;
    this.userId = userId;
    this.content = content;
  }

  addLike(userId: number): void {
    if (!this.likes.includes(userId)) {
      this.likes.push(userId);
    }
  }

  addComment(comment: Comment): void {
    this.comments.push(comment);
  }
}

class User {
  public id: number;
  public posts: Post[] = [];
  public followers: User[] = [];

  constructor(id: number) {
    this.id = id;
  }

  createPost(content: string): Post {
    const postId = this.posts.length + 1;
    const post = new Post(postId, this.id, content);
    this.posts.push(post);
    return post;
  }

  comment(postId: number, commentContent: string): void {
    let targetPost: Post | undefined;
    targetPost = this.posts.find(p => p.id === postId);
    if (!targetPost) {
      for (const user of this.followers) {
        targetPost = user.posts.find(p => p.id === postId);
        if (targetPost) break;
      }
    }
    if (!targetPost) return;
    const commentId = targetPost.comments.length + 1;
    const comment = new Comment(commentId, this.id, commentContent);
    targetPost.addComment(comment);
  }

  follow(user: User): void {
    if (!this.followers.includes(user) && user.id !== this.id) {
      this.followers.push(user);
    }
  }

  likePost(postId: number): void {
    let targetPost: Post | undefined;
    targetPost = this.posts.find(p => p.id === postId);
    if (!targetPost) {
      for (const user of this.followers) {
        targetPost = user.posts.find(p => p.id === postId);
        if (targetPost) break;
      }
    }
    if (!targetPost) return;
    targetPost.addLike(this.id);
  }

  viewFeed(): Post[] {
    const feedPosts: Post[] = [];
    for (const user of this.followers) {
      feedPosts.push(...user.posts);
    }
    return feedPosts.sort((a, b) => b.id - a.id);
  }
}
