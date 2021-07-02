const { src, dest, parallel } = require('gulp');
const ts = require('gulp-typescript');

const tsModelProject = ts.createProject('../common/tsconfig.json');

function buildCommonModels () {
    return src('../common/model/**/*.ts')
        .pipe(tsModelProject())
        .pipe(dest('node_modules/design-models'));
}



exports.buildmodels = parallel(buildCommonModels);
exports.default = this.buildmodels;
