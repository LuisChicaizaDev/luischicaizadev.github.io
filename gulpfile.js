const {src, dest, watch} = require('gulp');
const sass = require('gulp-sass') (require('sass')); //importamos del node_modules
const plumber = require('gulp-plumber');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const postcss = require('gulp-postcss');
const sourcemaps = require('gulp-sourcemaps');
//JS
const terser = require('gulp-terser-js');


function css(done){

    src('src/scss/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(plumber())
        .pipe(sass()) 
        .pipe(postcss( [autoprefixer(), cssnano() ] ))
        .pipe(sourcemaps.write('.'))
        .pipe(dest('assets/css')); 
    
    done(); //callback avisa a gulp cuando llega al final la función
}
function javascript(done){

    src('src/js/**/*.js')
        .pipe(sourcemaps.init()) 
        .pipe(terser())
        .pipe(sourcemaps.write('.'))
        .pipe(dest('assets/js'));
    done();
}

function dev(done){
    watch('src/scss/**/*.scss', css)
    watch('src/js/**/*.js', javascript)
    done();
}


exports.css = css;
exports.js = javascript;
exports.dev = dev;