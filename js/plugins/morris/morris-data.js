// Morris.js Charts sample data for SB Admin template
$(document).ready(function() {

    // Bar Chart Purchases
    var myBar = Morris.Bar({
        element: 'morris-bar-chart',
        data: [{
            day: 'Sun',
            total: 1571
        }, {
            day: 'Mon',
            total: 136
        }, {
            day: 'Tue',
            total: 137
        }, {
            day: 'Wed',
            total: 275
        }, {
            day: 'Thu',
            total: 380
        }, {
            day: 'Fri',
            total: 655
        }, {
            day: 'Sat',
            total: 1571
        }],
        xkey: 'day',
        ykeys: ['total'],
        labels: ['Total Amount In Purchases'],
        xLabelAngle: 35,
        hideHover: 'auto',
        resize: true
    });


    // Donut Chart Initialization
    var myDonut = Morris.Donut({
        element: 'morris-donut-chart',
        data: [{
            label: "Food",
            value: 1
        }, {
            label: "Rent",
            value: 3
        }, {
            label: "Uncategorized",
            value: 2
        }, {
            label: "Gas",
            value: 2
        }],
        resize: true
    });

    var categoryTotals = [{
        label: 'Food',
        value: 1
    }, {
        label: 'Rent',
        value: 1
    }, {
        label: 'Uncategorized',
        value: 1
    }, {
        label: 'Gas',
        value: 1
    }];

    var weeklyTotals = [{
        day: 'Sun',
        total: 1
    }, {
        day: 'Mon',
        total: 1
    }, {
        day: 'Tue',
        total: 1
    }, {
        day: 'Wed',
        total: 1
    }, {
        day: 'Thu',
        total: 1
    }, {
        day: 'Fri',
        total: 1
    }, {
        day: 'Sat',
        total: 1
    }];

    // Get Purchases
    $.get("http://api.reimaginebanking.com/accounts/560f0207f8d8770df0efa563/purchases?key=18cdc5d0c87e95621c50a23782e41559", function(data) {
        // Return a json object containing all the appropriate purchases
        // loop through each purchase and append amounts to the labels
        var length = data.length;
        var categoryLength = categoryTotals.length;
        var foodReg = /food|mcdonalds|delicious|pho|bojangles|fruit|snack/;
        var gasReg = /gas|chevron|bp|car|filled/;
        var rentReg = /rent|utilities|home|yard|grass/;


        // Set purchase total on the Dashboard
        $(".pcount").text(length);
        // Set list for recent purchases
        var j = 0;
        for (var i = data.length - 1; j < 8; i--) {
            var date = data[i]["purchase_date"].substring(0, 10);
            var time = data[i]["purchase_date"].substring(11, 19);
            var amount = data[i]["amount"];
            var line = "<tr><td>" + date + "</td><td>" + time + "</td><td>$ " + amount + ".00</td></tr>"
            $(".panel-purch tbody").append(line);
            j++;
        }

        for (var i = 0; i < length; i++) {
            var purchase = data[i];

            var currentDate = new Date(purchase['purchase_date'].substring(0, 19));
            var day = currentDate.getDay();
            if (weeklyTotals[day] === undefined) {continue;}

            weeklyTotals[day]["total"] += purchase["amount"];


            if (foodReg.test(purchase["description"])) {

                for (var j = 0; j < categoryLength; j++) {
                    if (categoryTotals[j].label === 'Food') {
                        categoryTotals[j].value += purchase["amount"];
                    }
                }
            } else if (rentReg.test(purchase["description"])) {

                for (var j = 0; j < categoryLength; j++) {
                    if (categoryTotals[j].label === 'Rent') {
                        categoryTotals[j].value += purchase["amount"];
                    }
                }
            } else if (gasReg.test(purchase["description"])) {

                for (var j = 0; j < categoryLength; j++) {
                    if (categoryTotals[j].label === 'Gas') {
                        categoryTotals[j].value += purchase["amount"];
                    }
                }
            } else {
                for (var j = 0; j < categoryLength; j++) {
                    if (categoryTotals[j].label === 'Uncategorized') {
                        categoryTotals[j].value += purchase["amount"];
                    }
                }
            }
        }
        console.log(weeklyTotals);
        myBar.setData([{
            day: weeklyTotals[0]["day"],
            total: weeklyTotals[0]["total"]
        }, {
            day: weeklyTotals[1]["day"],
            total: weeklyTotals[1]["total"]
        }, {
            day: weeklyTotals[2]["day"],
            total: weeklyTotals[2]["total"]
        }, {
            day: weeklyTotals[3]["day"],
            total: weeklyTotals[3]["total"]
        }, {
            day: weeklyTotals[4]["day"],
            total: weeklyTotals[4]["total"]
        }, {
            day: weeklyTotals[5]["day"],
            total: weeklyTotals[5]["total"]
        }, {
            day: weeklyTotals[6]["day"],
            total: weeklyTotals[6]["total"]
        }]);

        myDonut.setData([{
            label: '$' + categoryTotals[0]["label"],
            value: categoryTotals[0]["value"]
        }, {
            label: '$' + categoryTotals[1]["label"] + " & home",
            value: categoryTotals[1]["value"]
        }, {
            label: '$' + categoryTotals[2]["label"],
            value: categoryTotals[2]["value"]
        }, {
            label: '$' + categoryTotals[3]["label"],
            value: categoryTotals[3]["value"]
        }]);
    });


    var myWithdrawBar = Morris.Bar({
        element: 'morris-bar-chart-withdraw',
        data: [{
            day: 'Sun',
            total: 1
        }, {
            day: 'Mon',
            total: 1
        }, {
            day: 'Tue',
            total: 1
        }, {
            day: 'Wed',
            total: 1
        }, {
            day: 'Thu',
            total: 1
        }, {
            day: 'Fri',
            total: 1
        }, {
            day: 'Sat',
            total: 1
        }],
        xkey: 'day',
        ykeys: ['total'],
        labels: ['Total Amount In Purchases'],
        xLabelAngle: 35,
        hideHover: 'auto',
        barColors: ['red'],
        resize: true
    });

    var weeklyTotalsWithdrawals = [{
        day: 'Sun',
        total: 1
    }, {
        day: 'Mon',
        total: 1
    }, {
        day: 'Tue',
        total: 1
    }, {
        day: 'Wed',
        total: 1
    }, {
        day: 'Thu',
        total: 1
    }, {
        day: 'Fri',
        total: 1
    }, {
        day: 'Sat',
        total: 1
    }];

    // Get withdrawals
    $.get("http://api.reimaginebanking.com/accounts/560f0207f8d8770df0efa563/withdrawals?key=18cdc5d0c87e95621c50a23782e41559", function(dat) { 
        var length = dat.length;
        $(".wcount").text(length);

        var j = 0;
        for (var i = dat.length - 1; j < 8; i--) {
            var date = dat[i]["transaction_date"].substring(0, 10);
            var time = dat[i]["transaction_date"].substring(11, 19);
            var amount = dat[i]["amount"];
            var line = "<tr><td>" + date + "</td><td>" + time + "</td><td>" + amount + "</td></tr>"
            $(".panel-with tbody").append(line);
            j++;
        }

        for (var i = 0; i < length; i++) {
            var purchase = dat[i];

            var currentDate = new Date(purchase['transaction_date'].substring(0, 19));
            var day = currentDate.getDay();
            weeklyTotalsWithdrawals[day]["total"] += purchase["amount"];
        }

        myWithdrawBar.setData([{
            day: weeklyTotalsWithdrawals[0]["day"],
            total: weeklyTotalsWithdrawals[0]["total"]
        }, {
            day: weeklyTotalsWithdrawals[1]["day"],
            total: weeklyTotalsWithdrawals[1]["total"]
        }, {
            day: weeklyTotalsWithdrawals[2]["day"],
            total: weeklyTotalsWithdrawals[2]["total"]
        }, {
            day: weeklyTotalsWithdrawals[3]["day"],
            total: weeklyTotalsWithdrawals[3]["total"]
        }, {
            day: weeklyTotalsWithdrawals[4]["day"],
            total: weeklyTotalsWithdrawals[4]["total"]
        }, {
            day: weeklyTotalsWithdrawals[5]["day"],
            total: weeklyTotalsWithdrawals[5]["total"]
        }, {
            day: weeklyTotalsWithdrawals[6]["day"],
            total: weeklyTotalsWithdrawals[6]["total"]
        }]);
    });

    var weeklyTotalsDeposits = [{
        day: 'Sun',
        total: 1
    }, {
        day: 'Mon',
        total: 1
    }, {
        day: 'Tue',
        total: 1
    }, {
        day: 'Wed',
        total: 1
    }, {
        day: 'Thu',
        total: 1
    }, {
        day: 'Fri',
        total: 1
    }, {
        day: 'Sat',
        total: 1
    }];


    // Bar Chart Withdrawals
    var myDepositBar = Morris.Bar({
        element: 'morris-bar-chart-deposit',
        data: [{
            day: 'Sun',
            total: 1
        }, {
            day: 'Mon',
            total: 2
        }, {
            day: 'Tue',
            total: 3
        }, {
            day: 'Wed',
            total: 6
        }, {
            day: 'Thu',
            total: 2
        }, {
            day: 'Fri',
            total: 5
        }, {
            day: 'Sat',
            total: 10
        }],
        xkey: 'day',
        ykeys: ['total'],
        labels: ['Total Amount In Purchases'],
        xLabelAngle: 35,
        hideHover: 'auto',
        barColors: ['green'],
        resize: true
    });

    // Get Deposits
    $.get("http://api.reimaginebanking.com/accounts/560f0207f8d8770df0efa563/deposits?key=18cdc5d0c87e95621c50a23782e41559", function(data) { 
        var length = data.length;
        $(".dcount").text(length);

        var j = 0;
        for (var i = data.length - 1; j < 8; i--) {
            var date = data[i]["transaction_date"].substring(0, 10);
            var time = data[i]["transaction_date"].substring(11, 19);
            var amount = data[i]["amount"];
            var line = "<tr><td>" + date + "</td><td>" + time + "</td><td>" + amount + "</td></tr>"
            $(".panel-dep tbody").append(line);
            j++;
        }

        for (var i = 0; i < length; i++) {
            var purchase = data[i];

            var currentDate = new Date(purchase['transaction_date'].substring(0, 19));
            var day = currentDate.getDay();
            weeklyTotalsDeposits[day]["total"] += purchase["amount"];
        }

        myDepositBar.setData([{
            day: weeklyTotalsDeposits[0]["day"],
            total: weeklyTotalsDeposits[0]["total"]
        }, {
            day: weeklyTotalsDeposits[1]["day"],
            total: weeklyTotalsDeposits[1]["total"]
        }, {
            day: weeklyTotalsDeposits[2]["day"],
            total: weeklyTotalsDeposits[2]["total"]
        }, {
            day: weeklyTotalsDeposits[3]["day"],
            total: weeklyTotalsDeposits[3]["total"]
        }, {
            day: weeklyTotalsDeposits[4]["day"],
            total: weeklyTotalsDeposits[4]["total"]
        }, {
            day: weeklyTotalsDeposits[5]["day"],
            total: weeklyTotalsDeposits[5]["total"]
        }, {
            day: weeklyTotalsDeposits[6]["day"],
            total: weeklyTotalsDeposits[6]["total"]
        }]);
    });
});