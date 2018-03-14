var gulp= require('gulp')
gulp.task('apidoc', function(done) {
    apidoc({
        src: "routes/",
        dest: "public/app/apidoc/",
        template: "public/app/apidoctemplate/"
    }, done);

});
