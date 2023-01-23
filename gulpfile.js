const {src, dest, watch, parallel} = require('gulp');

//Css
const sass = require('gulp-sass')(require('sass'));
const plumber = require('gulp-plumber');
const sourceMaps = require('gulp-sourcemaps');
const postcss = require('gulp-postcss');
const cssnano = require('cssnano');
const autoprefixer = require('autoprefixer');

//js
const terser = require('gulp-terser-js');

//imagenes
const webp = require('gulp-webp');
const avif = require('gulp-avif');
const imageMin = require('gulp-imagemin');
const cache = require('gulp-cache');

function css(done){
    src('src/scss/**/*.scss')
        .pipe(sourceMaps.init())
        .pipe(plumber())
        .pipe(sass())
        .pipe(postcss([autoprefixer(), cssnano()]))
        .pipe(sourceMaps.write('.'))
        .pipe(dest('build/css'))
    done();
}

function versionWebp(done){
    const opciones = {
        quality:50
    }
    src('src/img/**/*.{png,jpg}')
        .pipe(webp(opciones))
        .pipe(dest('build/img'))

    done();    
}

function versionAvif(done){
    const opciones = {
        quality:50
    }
    src('src/img/**/*.{png,jpg}')
        .pipe(avif(opciones))
        .pipe(dest('build/img'))

    done();    
}

function versionImageMin(done){
    const opciones = {
        optimizationLevel:3
    }
    src('src/img/**/*.{png,jpg}')
        .pipe(cache(imageMin(opciones)))
        .pipe(dest('build/img'))

    done();
}


function javaScript(done){
    src('src/js/**/*.js')
        .pipe(sourceMaps.init())
        .pipe(terser())
        .pipe(sourceMaps.write('.'))
        .pipe(dest('build/js'))

    done();    
}

function dev(done){
    watch('src/scss/**/*.scss', css)
    watch('src/js/**/*.js', javaScript)
    done();
}


exports.css = css;
exports.javaScript = javaScript;
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;
exports.versionImageMin = versionImageMin;
exports.dev = parallel(versionWebp, versionAvif, versionImageMin , javaScript, dev);

