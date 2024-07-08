const {src, dest, watch} = require('gulp');
const sass = require('gulp-sass') (require('sass')); //importamos del node_modules
const plumber = require('gulp-plumber');


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
exports.dev = dev;