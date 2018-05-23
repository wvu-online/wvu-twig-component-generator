'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const _ = require('lodash');

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(
        `Welcome to the brilliant ${chalk.red('generator-wvu-twig-component')} generator!`
      )
    );

    const prompts = [
      {
        type: 'list',
        name: 'componentType',
        message: 'What type of component are you generating?',
        choices: ['Atom', 'Molecule', 'Organism', 'Template', 'Page'],
        required: true
      },
      {
        type: 'string',
        name: 'name',
        message: 'What should your component be called?',
        required: true
      },
      {
        type: 'list',
        name: 'js',
        message: 'Do you want some javascript with that?',
        choices: ['Yes', 'No']
      },
      {
        type: 'list',
        name: 'plType',
        message: 'Is this a Drupal project or Standalone PatternLab',
        choices: ['Drupal', 'Standalone'],
        store: true,
        default: this.config.get('plType')
      }
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  initializing() {
    this.componentName = {};
    this.componentName.raw = this.props.componentName;
    this.componentName.dashed = _.kebabCase(this.props.name);
    this.componentName.snaked = _.snakeCase(this.props.name);
    this.componentName.camel = _.camelCase(this.props.name);
    this.componentBase = {};
    switch (this.props.componentType) {
      case 'Atom':
        this.componentBase = '01-atoms';
        break;
      case 'Molecule':
        this.componentBase = '02-molecules';
        break;
      case 'Organism':
        this.componentBase = '03-organisms';
        break;
      case 'Template':
        this.componentBase = '04-templates';
        break;
      case 'Page':
        this.componentBase = '05-pages';
        break;
      default:
    }
  }

  writing() {
    if (this.props.js === 'Yes') {
      if (this.props.plType === 'Standalone') {
        this.fs.copyTpl(
          this.templatePath('name-pl.js'),
          this.destinationPath(
            'components/_patterns/' +
              this.componentBase +
              '/' +
              this.componentName.dashed +
              '.js'
          ),
          {
            name: this.componentName.raw,
            nameDashed: this.componentName.dashed,
            nameCamel: this.componentName.camel,
            nameSnake: this.componentName.snaked
          }
        );
      } else {
        this.fs.copyTpl(
          this.templatePath('name.js'),
          this.destinationPath(
            'components/_patterns/' +
              this.componentBase +
              '/' +
              this.componentName.dashed +
              '.js'
          ),
          {
            name: this.componentName.raw,
            nameDashed: this.componentName.dashed,
            nameCamel: this.componentName.camel,
            nameSnake: this.componentName.snaked
          }
        );
      }
    }

    // Add Twig File
    this.fs.copyTpl(
      this.templatePath('name.twig'),
      this.destinationPath(
        'components/_patterns/' +
          this.componentBase +
          '/' +
          this.componentName.dashed +
          '.twig'
      ),
      {
        name: this.componentName.raw,
        nameDashed: this.componentName.dashed,
        nameCamel: this.componentName.camel,
        nameSnake: this.componentName.snaked
      }
    );

    // Add SCSS File
    this.fs.copyTpl(
      this.templatePath('name.scss'),
      this.destinationPath(
        'components/_patterns/' +
          this.componentBase +
          '/' +
          this.componentName.dashed +
          '.scss'
      ),
      {
        name: this.componentName.raw,
        nameDashed: this.componentName.dashed,
        nameCamel: this.componentName.camel,
        nameSnake: this.componentName.snaked
      }
    );

    // Add yaml File
    this.fs.copyTpl(
      this.templatePath('name.yml'),
      this.destinationPath(
        'components/_patterns/' +
          this.componentBase +
          '/' +
          this.componentName.dashed +
          '.yml'
      ),
      {
        name: this.componentName.raw,
        nameDashed: this.componentName.dashed,
        nameCamel: this.componentName.camel,
        nameSnake: this.componentName.snaked
      }
    );
  }

  install() {
    this.installDependencies();
  }
};
