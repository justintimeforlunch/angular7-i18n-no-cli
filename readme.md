
# Angular without Angular-cli i18n

## setup

`npm install`

## build for dev(fast)

`npm run build`

## run

`npm run server`

## Changing locale in Chrome

`To change language locale go to the url chrome://settings/languages. Currently the only locale created is for french (fr) so move that to the top of the list.`

## Pieces to focus on 

### config/webpack.dev.js
```
new AngularCompilerPlugin({
      mainPath: 'src/main.ts',
      i18nOutFile: path.join('src', 'i18n', 'messages.xlf'),
      i18nOutFormat: 'xlf',
      locale: 'en',
      sourceMap: true,
      tsConfigPath: 'tsconfig.json',
      skipCodeGeneration: false,
      compilerOptions: {}
    })
```
`This allows webpack to run the ng-xi18n command without the cli to create the initial messages.xlf file in /src/i18n/`

### /src/main.ts
```
const translations =
  window.navigator.language !== 'en-US'
    ? require(`raw-loader!./i18n/messages.${window.navigator.language}.xlf`)
    : null

platformBrowserDynamic().bootstrapModule(AppModule, {
  providers: [
    { provide: TRANSLATIONS, useValue: translations },
    { provide: TRANSLATIONS_FORMAT, useValue: 'xlf' }
  ]
})
```
`This allows us to tell the compiler how to translate the template texts for a particular language while compiling the app`
### /src/app/app.module`
```
{ provide: LOCALE_ID, useValue: window.navigator.language }
```
`This allows us to define the LOCALE_ID provider with whatever locale we want to use`

