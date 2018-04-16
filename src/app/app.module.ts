import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import {
    IonicApp, IonicErrorHandler, IonicModule, Platform
} from 'ionic-angular';

import { Connection, getConnectionManager } from 'typeorm'
import { HomePage } from '../pages/home/home';

import { MyApp } from './app.component';
import { Author } from '../entities/author';
import { Category } from '../entities/category';
import { Post } from '../entities/post';

function getOrmConnection(platform: Platform): Connection {
    if (platform.is('cordova')) {
        // Running on device or emulator
        return getConnectionManager()
            .create({
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
        return getConnectionManager()
            .create({
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
}


@NgModule({
    declarations: [
        MyApp,
        HomePage
    ],
    imports: [
        BrowserModule,
        IonicModule.forRoot(MyApp)
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        HomePage
    ],
    providers: [
        StatusBar,
        SplashScreen,
        {provide: ErrorHandler, useClass: IonicErrorHandler},
        {
            provide: 'TypeOrmConnection',
            useFactory: getOrmConnection,
            deps: [Platform]
        }
    ]
})
export class AppModule {
}
