var message = 'https://osu.ppy.sh/b/705378?m=0';
var link = message.split('/');
console.log(link);
function LinkValidation(link) {
    if (link[2].toString() == 'osu.ppy.sh'){
        if (link[3].toString() == 'b' || link[3].toString() == 's'){
            var removeQuestionmark = link[4].toString().split('?');
            var mapID = removeQuestionmark[0]
            console.log(mapID);
        };
    }else if(link[0].toString() == 'osu.ppy.sh'){
        if (link[1].toString() == 'b' || link[1].toString() == 's'){
            var removeQuestionmark = link[4].toString().split('?');
            var mapID = removeQuestionmark[0]
            console.log(mapID);
        };
    };
};
LinkValidation(link);
