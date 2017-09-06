module.exports = function (grunt) {
    grunt.initConfig({
        jshint: {
            files: ['lib/**/*.js', 'models/**/*.js'],
            options: {
                esversion: 6
            }
        },
        watch: {
            files: ['lib/**/*.js', 'models/**/*.js'],
            tasks: ['jshint']
        }
    });

    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks("grunt-contrib-watch");
}