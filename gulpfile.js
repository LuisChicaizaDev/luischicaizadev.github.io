const {src, dest, watch, parallel} = require('gulp');
const sass = require('gulp-sass') (require('sass')); //importamos del node_modules
const plumber = require('gulp-plumber');


function css(done){

    src('src/scss/main.scss')
        .pipe(sass()) 
        .pipe(dest('assets/css')); 
    
done(); //callback avisa a gulp cuando llega al final la función
}

function dev(done){
    watch('src/scss/**/*.scss', css)
    done();
}


exports.css = css;
exports.dev = dev;