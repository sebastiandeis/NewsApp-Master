function get_timestring(timestamp) {
    var a = new Date(timestamp * 1000);
    var months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
    ];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();

    var timeText = "";
    var now = new Date();

    // consider timezone
    var diff = now - now.getTimezoneOffset() * 60 * 1000 - timestamp * 1000;
    if (diff > 24 * 3600 * 1000) {
        timeText = month + ' ' + date + ', ' + year;
    } else {
        timeText = Math.floor(diff / (3600 * 1000)) + 'h ago';
    }
    return timeText;
};

function get_today_string() {
    var today = new Date();
    var year = today.getUTCFullYear();
    var month = today.getUTCMonth() + 1;
    if (month < 10) {
        month = "0" + month;
    }
    var date = today.getUTCDate();
    if (date < 10) {
        date = "0" + date;
    }
    return year + '-' + month + '-' + date;
};

function arrayMoveMutate(array, from, to) {
	array.splice(to < 0 ? array.length + to : to, 0, array.splice(from, 1)[0]);
};

function arrayMove(array, from, to) {
	array = array.slice();
	arrayMoveMutate(array, from, to);
	return array;
};

// function test() {
//     var now = new Date();
//     console.log("timezone offset ", now.getTimezoneOffset());
//     console.log("TimeText for 1560282316 ", timeConverter(1560282316));
//     console.log("TimeText for 1560616393 ", timeConverter(1560616393));
// };

// test();

module.exports.get_timestring = get_timestring;
module.exports.get_today_string = get_today_string;
module.exports.arrayMove = arrayMove;
