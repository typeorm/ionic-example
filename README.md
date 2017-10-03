# Using TypeORM in an Ionic project
You can use TypeORM in connection with the `cordova-sqlite-storage` plugin in your Ionic app.
This project demonstrates how that would work.

### How to run this example
1. Install the ionic and cordova cli: `npm install -g cordova ionic`
2. Install all dependencies: `npm install`
3. Add a platform: `ionic cordova platform add <ios | android>`
4. Run the app: `ionic cordova run <ios | android>`. If you need help, you can read [ionic's guide](https://ionicframework.com/docs/intro/deploying/) for running an app on your device
![screenshot](./screenshot.png)

### Using TypeORM in your own app
1. Install the plugin: `ionic cordova plugin add cordova-sqlite-storage --save`
2. Install TypeORM: `npm install typeorm --save`
3. Install node.js-Types: `npm install @types/node --save-dev`
4. Add `"typeRoots": ["node_modules/@types"]` to your `tsconfig.json` under `compilerOptions`

### Limitations to TypeORM when using production builds
Since Ionic make a lot of optimizations when building for productions, the following limitations occur
1. Entities have to be marked with the table name (eg `@Entity('table_name')`)
2. Date fields aren't supported
```ts
@Column()
birthdate: Date;
```
