function makeRepoGraph(repoMetrics) {
    var repoData = {
        labels : repoMetrics.labels,
        datasets : [
            {
                fillColor : "rgba(80,100,200,0)",
                strokeColor : "rgba(80,100,200,0.5)",
                pointColor : "rgba(80,100,200,0.5)",
                pointStrokeColor : "#fff",
                data : repoMetrics.cont
            },
            {
                fillColor : "rgba(100,200,80,0)",
                strokeColor : "rgba(100,200,80,0.5)",
                pointColor : "rgba(100,200,80,0.5)",
                pointStrokeColor : "#fff",
                data : repoMetrics.watch
            },
            {
                fillColor : "rgba(200,60,60,0)",
                strokeColor : "rgba(200,60,60,.5)",
                pointColor : "rgba(200,60,60,.5)",
                pointStrokeColor : "#fff",
                data : repoMetrics.star
            }
        ]
    }
    var canvas = $("<canvas></canvas>");
    canvas.attr({
        "height": "500",
        "width": "500"
    })
    $("#" + repoMetrics.rname).append(canvas);
    var ctx = canvas[0].getContext('2d');
    var myNewGraph = new Chart(ctx).Line(repoData); 
}

selectNewGraph = function() {
    $(".repo.chart").each(function(i, el) {
        $(el).hide();
    })
    if ($(this).val() != "default") {
        $("#" + $(this).val()).show();
        $(".legend-title").text($(this).val() + " Metrics");
        $(".graph-legend").show();
        $(".graph-legend").children.show();
    }
    else {
        $(".graph-legend").hide();
    }
}

$(function(){

    $("#repo_chart_id").change(selectNewGraph);
    $(".graph-legend").hide();

    $(".repo.chart").each(function(i, el){ 
      $(el).hide();
      $.ajax({url: "/chartData", 
        type: "GET",
        data: {repo: $(el).attr("id")},
        dataType:"json",
        success: function(metrics){
            makeRepoGraph(metrics);
        }
      })
    });


});