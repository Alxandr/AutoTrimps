define(['module'], function (module) {
  requirejs.config({
    waitSeconds : 60,
    baseUrl: module.uri.replace('config.js', 'modules/'),
    paths: {
      typescript: 'https://cdnjs.cloudflare.com/ajax/libs/typescript/2.1.4/typescript.min',
      inferno: 'https://cdnjs.cloudflare.com/ajax/libs/inferno/1.0.0-beta33/inferno.min',
      'inferno-hyperscript': 'https://cdnjs.cloudflare.com/ajax/libs/inferno/1.0.0-beta33/inferno-hyperscript.min',
      'inferno-component': 'https://cdnjs.cloudflare.com/ajax/libs/inferno/1.0.0-beta33/inferno-component.min',
      'inferno-create-element': 'https://cdnjs.cloudflare.com/ajax/libs/inferno/1.0.0-beta33/inferno-create-element.min'
    },
    shim: {
      typescript: {
        exports: 'ts'
      }
    }
  });

  requirejs(['plugins/ts!main', 'plugins/css!../tabs'], function(autotrimps) { 
    autotrimps.start();
  });
});