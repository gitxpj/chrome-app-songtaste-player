var fileSystem = {
    chooseSaveFile: function(fileName, callback) {
        chrome.fileSystem.chooseEntry({
            type: "saveFile",
            suggestedName: fileName
        }, function(entry) {
            callback(entry);
        });
    },
    save: function(entry, blob) {
        entry.createWriter(function(fileWriter) {
            fileWriter.onwriteend = function(e) {
                fileWriter.onwriteend = null;
                fileWriter.truncate(blob.length);
            };
            fileWriter.onerror = function(e) {
                console.log('Write failed: ' + e.toString());
            };
            fileWriter.write(blob);
        }, this.errorHandler);
    },
    errorHandler: function(e) {
        switch (e.code) {
            case FileError.QUOTA_EXCEEDED_ERR:
                msg = 'QUOTA_EXCEEDED_ERR';
                break;
            case FileError.NOT_FOUND_ERR:
                msg = 'NOT_FOUND_ERR';
                break;
            case FileError.SECURITY_ERR:
                msg = 'SECURITY_ERR';
                break;
            case FileError.INVALID_MODIFICATION_ERR:
                msg = 'INVALID_MODIFICATION_ERR';
                break;
            case FileError.INVALID_STATE_ERR:
                msg = 'INVALID_STATE_ERR';
                break;
            default:
                msg = 'Unknown Error';
                break;
        };
        console.log('Error: ' + msg);
    }
}