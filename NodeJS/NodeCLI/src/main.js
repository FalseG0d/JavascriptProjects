import chalk from 'chalk';
import fs from 'fs';
import ncp from 'ncp';
import path from 'path';

import { dirname } from 'path';
import { fileURLToPath } from 'url';

import { promisify } from 'util';

import execa from 'execa';
import Listr from 'listr';
import {projectInstall} from 'pkg-install';
import { async } from 'rxjs';


const access = promisify(fs.access);
const copy = promisify(ncp);

async function copyTemplateFiles(options) {
 return copy(options.templateDirectory, options.targetDirectory, {
   clobber: false,
 });
}

async function initGit(options){
  const result=await execa('git',['init'],{
    cwd:options.targetDirectory,
  });

  if(result.failed){
    return Promise.reject(new Error('Failed to Initialize Git'));
  }
  return;
}

export async function createProject(options) {
 options = {
   ...options,
   targetDirectory: options.targetDirectory || process.cwd(),
 };

 const currentFileUrl = dirname(fileURLToPath(import.meta.url));
 const templateDir = path.resolve(
   new URL(currentFileUrl).pathname,
   '../templates',
   options.template.toLowerCase()
 );

 options.templateDirectory = templateDir;

 try {
   await access(templateDir, fs.constants.R_OK);
 } catch (err) {
   console.error('%s Invalid template name\n%s', chalk.red.bold('ERROR'),err);
   process.exit(1);
 }

 const tasks=new Listr([
   {
     title:'Copy Project Files',
     task:()=>copyTemplateFiles(options),
   },
   {
     title:'Initialize Git',
     task:()=>initGit(options),
     enabled:()=>options.git
   },
   {
     title:'Install Dependencies',
     task:()=>projectInstall({
       cwd:options.targetDirectory,
     }),
     skip:()=>!options.runInstall?'Pass --install automatically install directory':undefined,
   },
 ]);

 await tasks.run();

 console.log('%s Project ready', chalk.green.bold('DONE'));
 return true;
}