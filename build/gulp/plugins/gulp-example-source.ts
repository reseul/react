import * as Babel from '@babel/core'
import { CLIEngine } from 'eslint'
import * as gutil from 'gulp-util'
import * as prettier from 'prettier'
import * as through from 'through2'
import * as Vinyl from 'vinyl'

const prettierConfig = require('../../../.prettierrc.json')

import { ExampleSource } from '../../../docs/src/types'
import transformStarImportPlugin from '../../babel/transform-star-import-plugin'
import { getRelativePathToSourceFile } from './util'

const ESLint = new CLIEngine({
  fix: true,
})
const pluginName = 'gulp-example-source'

const createExampleSourceCode = (file: Vinyl): ExampleSource => {
  const tsSource = file.contents.toString()

  const babelResult = Babel.transform(tsSource, {
    plugins: [transformStarImportPlugin],
    presets: [['@babel/preset-typescript', { allExtensions: true, isTSX: true }]],
    sourceType: 'module',
  })
  const prettierResult = prettier.format(babelResult.code, {
    ...prettierConfig,
    parser: 'babylon',
  })
  // https://eslint.org/docs/developer-guide/nodejs-api#cliengineexecuteontext
  // Results will contain single entry
  const eslintResult = ESLint.executeOnText(prettierResult, file.path).results[0]

  return {
    // result.output is omitted if no fix is available
    js: eslintResult.output || prettierResult,
    ts: tsSource,
  }
}

export default () =>
  through.obj((file: Vinyl, enc, cb) => {
    if (file.isNull()) {
      cb(null, file)
      return
    }

    if (file.isStream()) {
      cb(new gutil.PluginError(pluginName, 'Streaming is not supported'))
      return
    }

    try {
      const sourcePath = getRelativePathToSourceFile(file.path)
      const source = createExampleSourceCode(file)

      const sourceFile = new Vinyl({
        path: sourcePath,
        contents: Buffer.from(JSON.stringify(source, null, 2)),
      })
      // `gulp-cache` relies on this private entry
      sourceFile._cachedKey = file._cachedKey

      cb(null, sourceFile)
    } catch (e) {
      cb(e)
    }
  })
