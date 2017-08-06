function getCode(len)
{
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    for (var i = 0; i < len; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

function dateConverterByDate(d) {

    //var d = new Date(UNIX_timestamp * 1000);
    var n = new Date();
    var months = ['ม.ค', 'ก.พ', 'มี.ค', 'เม.ย', 'พ.ค', 'มิ.ย', 'ก.ค', 'ส.ค', 'ก.ย', 'ต.ค', 'พฤ.ย', 'ธ.ค'];
    var time;
    if (d.getFullYear() == n.getFullYear() &&
            d.getMonth() == n.getMonth() && d.getDate() == n.getDate()) {
        time = 'วันนี้  ';
    } else {
        time = pad2(d.getDate()) + ' ' + pad2(months[d.getMonth()]) + ' ' + pad2(d.getFullYear() + 543);
    }
   // time += '  ' + pad2(d.getHours()) + ':' + pad2(d.getMinutes()) + ':' + pad2(d.getSeconds());
    return time;
}

function timeConverterByDate(d) {

    //var d = new Date(UNIX_timestamp * 1000);
    var n = new Date();
    var months = ['ม.ค', 'ก.พ', 'มี.ค', 'เม.ย', 'พ.ค', 'มิ.ย', 'ก.ค', 'ส.ค', 'ก.ย', 'ต.ค', 'พฤ.ย', 'ธ.ค'];
    var time;
    if (d.getFullYear() == n.getFullYear() &&
            d.getMonth() == n.getMonth() && d.getDate() == n.getDate()) {
        time = 'วันนี้  ';
    } else {
        time = pad2(d.getDate()) + ' ' + pad2(months[d.getMonth()]) + ' ' + pad2(d.getFullYear() + 543);
    }
    time += '  ' + pad2(d.getHours()) + ':' + pad2(d.getMinutes()) + ':' + pad2(d.getSeconds());
    return time;
}

function timeConverter(UNIX_timestamp) {

    var d = new Date(UNIX_timestamp * 1000);
    var n = new Date();
    var months = ['ม.ค', 'ก.พ', 'มี.ค', 'เม.ย', 'พ.ค', 'มิ.ย', 'ก.ค', 'ส.ค', 'ก.ย', 'ต.ค', 'พฤ.ย', 'ธ.ค'];
    var time;
    if (d.getFullYear() == n.getFullYear() &&
            d.getMonth() == n.getMonth() && d.getDate() == n.getDate()) {
        time = 'วันนี้  ';
    } else {
        time = pad2(d.getDate()) + ' ' + pad2(months[d.getMonth()]) + ' ' + pad2(d.getFullYear() + 543);
    }
    time += '  ' + pad2(d.getHours()) + ':' + pad2(d.getMinutes()) + ':' + pad2(d.getSeconds());
    return time;
}
function pad2(number) {
    return (number < 10 ? '0' : '') + number;
}
function setTableStatusCallRecive() {

    $.ajax({
        url: '/api/getTables',
        dataType: 'json',
        success: function (data) {
            console.log(data.data.table_checkbill);
            for (i in data.data.table_checkbill) {
                $('div[data-id=' + data.data.table_checkbill[i] + ']').addClass('active-call');
            }
        }
    });

//    var data = $.cookie("_pcr");
//    try {
//        data = JSON.parse(data);
//        //console.log('_pcr:'+JSON.stringify(data));
//        //console.log(data);
//        $('.tableList').removeClass('active-call');
//        for (i in data) {
//
//            if ($('#content-view').find('div[data-id=' + data[i] + ']').attr('class') != undefined && !$('#content-view').find('div[data-id=' + data[i] + ']').hasClass('active')) {
//
//                //console.log('_pcr delete '+data[i]);
//                delete data['id' + data[i]];
//
//            } else {
//                $('div[data-id=' + data[i] + ']').addClass('active-call');
//            }
//        }
//
//        // console.log('_pcr set:'+JSON.stringify(data));
//        $.cookie("_pcr", JSON.stringify(data), {path: '/cashier'});
//    } catch (e) {
//        console.log('error:pcr');
//        console.log(e);
//    }
//    var data = $.cookie("_pcrb");
//
//    try {
//        data = JSON.parse(data);
//        $('div[data-id=0]').removeClass('active-call');
//        for (i in data) {
//            
//        }
//        //$.cookie("_pcrb", JSON.stringify(data), {path: '/cashier'});
//    } catch (e) {
//        console.log(e);
//    }
}

function setPrintCallRecive(table_id, bill_id) {
    $('div[data-id=' + table_id + ']').addClass('active-call');
}

function isArray(what) {
    return Object.prototype.toString.call(what) === '[object Array]';
}

function fomatF() {
    if (!String.prototype.format) {
        String.prototype.format = function () {
            var args = arguments;
            return this.replace(/{(\d+)}/g, function (match, number) {
                return typeof args[number] != 'undefined'
                        ? args[number]
                        : match
                        ;
            });
        };
    }
}

function CurrencyFormatted(amount) {

    try {
        return amount.toFixed(2);
    } catch (e) {
        return parseFloat(amount).toFixed(2);
    }
//    try{
//    return amount.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
//    }catch(e){
//        return parseFloat(amount).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
//    }
}

function CurrencyFormatted2(amount) {

    try {
        return amount.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    } catch (e) {
        return parseFloat(amount).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
}

function CurrencyFormattedN2(amount) {

    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function CurrencyFormattedN(amount) {

    return amount;
    //return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

//fomatF();