import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { getRepository, Repository } from 'typeorm';

import { Author } from '../../entities/author';
import { Category } from '../../entities/category';
import { Post } from '../../entities/post';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  private savedPost: boolean = false;
  private loadedPost: Post = null;

  constructor(public navCtrl: NavController) { }

  ionViewDidLoad() {
    this.runDemo();
  }

  async runDemo() {
    const category1 = new Category();
    category1.name = "TypeScript";

    const category2 = new Category();
    category2.name = "Programming";

    const author = new Author();
    author.name = "Person";

    const post = new Post();
    post.title = "Control flow based type analysis";
    post.text = `TypeScript 2.0 implements a control flow-based type analysis for local variables and parameters.`;
    post.categories = [category1, category2];
    post.author = author;

    const postRepository = getRepository('post') as Repository<Post>;
    await postRepository.save(post);

    console.log("Post has been saved");
    this.savedPost = true;

    const loadedPost = await postRepository.createQueryBuilder('post')
      .innerJoinAndSelect('post.author', 'author')
      .innerJoinAndSelect('post.categories', 'categories')
      .where('post.id = :id', {id: post.id})
      .getOne();

    console.log("Post has been loaded: ", loadedPost);
    this.loadedPost = loadedPost;
  }

  getCategories() {
    if(this.loadedPost) {
      return this.loadedPost.categories.map(cat => cat.name).join(", ");
    }

    return '';
  }

}
