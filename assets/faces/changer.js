var fs = require( 'fs' );
var path = require( 'path' );
// In newer Node.js versions where process is already global this isn't necessary.
var process = require( "process" );

var moveFrom = __dirname + '/pack-1';
var moveTo = __dirname + '/pack-1-renamed';

// Loop through all the files in the temp directory
fs.readdir( moveFrom, function( err, files ) {
        if( err ) {
            console.error( "Could not list the directory.", err );
            process.exit( 1 );
        } 

        files.forEach( function( file, index ) {
                console.log ( index + ' - ' + file );
                // Make one pass and make the file complete
                var fromPath = path.join( moveFrom, file );
                var toPath = path.join( moveTo, index + '.png' );

                fs.stat( fromPath, function( error, stat ) {
                    if( error ) {
                        console.error( "Error stating file.", error );
                        return;
                    }

                    fs.rename( fromPath, toPath, function( error ) {
                        if( error ) {
                            console.error( "File moving error.", error );
                        }
                        else {
                            console.log( "Moved file '%s' to '%s'.", fromPath, toPath );
                        }
                    } );
                } );
        } );
} );
