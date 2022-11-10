
export function changePage(pageID, subPageID, callback) {
    if (pageID == "" || pageID == "home") {
        $.get(`pages/home.html`, function (data) {
            $("#app").html(data);
            if (callback) {
            callback();
        }
        });
        } else if (subPageID != undefined) {
            $.get(`pages/subpages/${subPageID}.html`, function (data) {
              // console.log("data " + data);
                $("#app").html(data);
            });
        // } else { $.get(`pages/${pageID}/${pageID}.html`, function (data) {
            // $("#app").html(data);
        // });
        }
    }
