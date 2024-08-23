const {src, dest, watch, parallel} = require('gulp');
const sass = require('gulp-sass') (require('sass')); //importamos del node_modules
const plumber = require('gulp-plumber');

//Imagenes
const cache = require('gulp-cache');
const imagemin = require('gulp-imagemin'); //Para crear imagenes más ligeras
const webp = require('gulp-webp');

function imagenes(done){
    const opciones = {
        optimizationLevel: 3
    }

    src('src/img/**/*.{jpg,JPG,PNG,png}') 
        .pipe(cache(imagemin(opciones))) 
        .pipe(dest('assets/img'));

    done();
}

function versionWebp(done){

    const opciones = {
        quality: 60 //define la calidad de las imagaenes
    };

    src('src/img/**/*.{jpg,JPG,PNG,png}') 
        .pipe(webp(opciones)) 
        .pipe(dest('assets/img')); 

    done(); 
}

function css(done){

    src('src/scss/**/*.scss')
        .pipe(plumber())
        .pipe(sass()) 
        .pipe(dest('assets/css')); 
    
    done(); //callback avisa a gulp cuando llega al final la función
}
function javascript(done){

    src('src/js/**/*.js')
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
exports.imagenes = imagenes;
exports.versionWebp = versionWebp;
exports.dev = parallel(imagenes,versionWebp,javascript, dev);