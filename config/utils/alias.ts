import fs from 'fs';
import path from 'path';


export const getAlias = (tsconfig?: object) => {
  const fs = require('fs');
  const alias = JSON.parse(fs.readFileSync('./.aliasrc', 'utf-8'));

  return Object.keys(alias).reduce((acc, key) => {
    if (tsconfig) return { ...acc, [ key ]: [ alias[ key ] ] };
    return { ...acc, [ key ]: path.resolve(process.cwd(), alias[ key ]) };
  }, {});
};

export const getTsConfAlias = () => {
  const tsconfigJson = fs.readFileSync('./tsconfig.json', 'utf-8');

  const tsconf = JSON.parse(tsconfigJson);

  const tsconfig = {
    ...tsconf,
    compilerOptions: {
      ...tsconf.compilerOptions,
      paths: getAlias(tsconf),
    },
  };

  const isChange = JSON.stringify(tsconfig, null, 2) !== tsconfigJson;

  if (isChange) {
    fs.writeFileSync('./tsconfig.json', JSON.stringify(tsconfig, null, 2), 'utf-8');
  }
};

export const alias = getAlias();
