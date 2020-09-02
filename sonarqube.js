const sonarqubeScanner = require('sonarqube-scanner');
 
sonarqubeScanner(
  {
    serverUrl : 'http://34.66.194.181:9000',
    token : "76f537b41af3fa8ffb953a4b2b9a3beea9db6419",
    options: {
      'sonar.login': '66e452b605fbbc7b123d6790017135a4b7185616',
      'sonar.projectName': 'Nat-Prot Node JS APIs',
      'sonar.sources': 'src',
      'sonar.host.url': 'http://34.66.194.181:9000'
    }
  },
  () => process.exit()
)
