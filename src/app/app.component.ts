import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { createConnection } from 'typeorm'

import { HomePage } from '../pages/home/home';

import { Author } from '../entities/author';
import { Category } from '../entities/category';
import { Post } from '../entities/post';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(async () => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      // Depending on the machine the app is running on, configure
      // different database connections
      if(platform.is('cordova')) {
        // Running on device or emulator
        await createConnection({
          type: 'cordova',
          database: 'test',
          location: 'default',
          logging: ['error', 'query', 'schema'],
          synchronize: true,
          entities: [
            Author,
            Category,
            Post
          ]
        });
      } else {
        // Running app in browser
        await createConnection({
          type: 'sqljs',
          autoSave: true,
          location: 'browser',
          logging: ['error', 'query', 'schema'],
          synchronize: true,
          entities: [
            Author,
            Category,
            Post
          ]
        });
      }

      this.rootPage = HomePage;
    });
  }
}

