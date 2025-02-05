make_pc();
spatial_plots = ["spatial-1", "spatial-2", "spatial-3"]
spatial_plots = spatial_plots.map((id)=>{return document.getElementById(id)});
spatial_plots.forEach((e)=>{
    make_surf(e);
    e.clip = false;
    e.contours = false;
});

var pcUpdate = null;
var data_copy = null;
var exps_data = [];
var dim_order = null;
var $spatialContainer = $("#spatial-container");
var $dataErr = $("#data-err");
var $loadingCover = $("#loading-cover");

function make_surf(element) {
    var title = {
        text: element.id,
        font: {
            family: 'Courier New, monospace',
            size: 24,
            color: 'darkgray'
        },
    }

    var data = [{
        z: [[1,2,3,4,5,6,7,8,9],
            [1,3,3,4,5,6,7,8,9],
            [1,3,3,4,5,6,7,8,9],
            [1,2,3,4,5,6,7,8,9],
            [1,2,3,4,5,6,7,8,9],
            [1,6,3,4,5,6,7,8,9],
            [1,9,3,4,5,6,7,8,9],
            [1,2,3,4,5,6,7,8,9],
            [1,2,3,4,5,6,7,8,9]],
        y: [-9,-8,-7,-6,-5,-4,-3,-2,-1],
        x: [0, 2, 4, 6, 8, 10, 12, 14, 16],
        type: 'surface',
        colorbar: {
            thickness: 20,
            len: 0.55
        },
    }];

    var layout = {
        title: title,
        autosize: false,
        width: 600,
        height: 600,
        margin: {
            l: 50,
            r: 50,
            b: 50,
            t: 50,
        },
    };
        
    var clip_icon = {
        'width': 500,
        'height': 600,
        'path': 'M278.06 256L444.48 89.57c4.69-4.69 4.69-12.29 0-16.97-32.8-32.8-85.99-32.8-118.79 0L210.18 188.12l-24.86-24.86c4.31-10.92 6.68-22.81 6.68-35.26 0-53.02-42.98-96-96-96S0 74.98 0 128s42.98 96 96 96c4.54 0 8.99-.32 13.36-.93L142.29 256l-32.93 32.93c-4.37-.61-8.83-.93-13.36-.93-53.02 0-96 42.98-96 96s42.98 96 96 96 96-42.98 96-96c0-12.45-2.37-24.34-6.68-35.26l24.86-24.86L325.69 439.4c32.8 32.8 85.99 32.8 118.79 0 4.69-4.68 4.69-12.28 0-16.97L278.06 256zM96 160c-17.64 0-32-14.36-32-32s14.36-32 32-32 32 14.36 32 32-14.36 32-32 32zm0 256c-17.64 0-32-14.36-32-32s14.36-32 32-32 32 14.36 32 32-14.36 32-32 32z'
    }

    var contour_icon = {
        'width': 500,
        'height': 600,
        'path': 'M268.3 32.7C115.4 42.9 0 176.9 0 330.2V464c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V320C64 186.8 180.9 80.3 317.5 97.9 430.4 112.4 512 214 512 327.8V464c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V320c0-165.3-140-298.6-307.7-287.3zm-5.6 96.9C166 142 96 229.1 96 326.7V464c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V320c0-74.8 64.5-134.8 140.8-127.4 66.5 6.5 115.2 66.2 115.2 133.1V464c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V320c0-114.2-100.2-205.4-217.3-190.4zm6.2 96.3c-45.6 8.9-76.9 51.5-76.9 97.9V464c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V320c0-17.6 14.3-32 32-32s32 14.4 32 32v144c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V320c0-59.2-53.8-106-115.1-94.1z'
    }

    var config = {
        modeBarButtonsToRemove: ['toImage', 'orbitRotation', 'resetCameraLastSave3d', 'hoverClosest3d'],
        displaylogo: false,
        modeBarButtonsToAdd: [
            {
                name: 'toggle clipping',
                icon: clip_icon,
                click: function(plt) {
                    plt.clip = !plt.clip;
                    pcUpdate();
                }
            },
            {
                name: 'toggle contours',
                icon: contour_icon,
                click: function(plt) {
                    plt.contours = !plt.contours;
                    pcUpdate();
                }
            },
        ],
    }

    Plotly.newPlot(element, data, layout, config);
}

function make_pc() {
    //csv_url = 'https://raw.githubusercontent.com/bainro/loss-landscape-viz/master/combo_plots.csv'
    csv_url = './combo_plots.csv';
    Plotly.d3.csv(csv_url, function(err, rows) {
        data_copy = rows;

        var data = [{
            type: 'parcoords',
            pad: [40,40,40,40],
            line: {
                color: unpack(rows, 'log(loss)'),
                colorscale: 'RdBu'
            },
            labelfont: {
                color: 'white',
                size: 14,
            },
            rangefont: {
                color: 'black',
                size: 2
            },
            tickfont: {
                size: 16,
            },
            domain: {
                row: 10,
                column: 10
            },
            dimensions: [
                {
                    label: 'exp_id',
                    constraintrange: [[4.5, 6.5], [0.5, 1.5]],
                    values: unpack(rows, 'exp_id')
                },
                {
                    label: 'skip connections',
                    values: unpack(rows, 'skip connections')
                },
                {
                    label: 'x',
                    constraintrange: [[-1.0, 1.0]],
                    values: unpack(rows, 'x')
                },                 
                {
                    label: 'y',
                    constraintrange: [[-1.0, 1.0]],
                    values: unpack(rows, 'y')
                },
                {
                    label: 'log(loss)',
                    values: unpack(rows, 'log(loss)')
                }
            ]
        }];

        var layout = {};
        var config = {
            displayModeBar: false,
            responsive: true,
            displaylogo: false
        }

        pc = document.getElementById("parallel-plot");
        Plotly.newPlot(pc, data, layout, config);
        var uniqueExpIds = null;
        var num_exps = null; 
        
        function calcExpSubsets() {
            dims = pc.data[0].dimensions
            uniqueExpIds = dims[0].values.filter((item, i, ar) => ar.indexOf(item) === i);
            num_exps = uniqueExpIds.length;

            for (i=0; i<num_exps; i++) {
                exp_subset = data_copy.filter((row)=>{
                    return row["exp_id"] == uniqueExpIds[i]
                })
                exp_subset.sort((a, b) => {
                    ax = parseFloat(a.x);
                    ay = parseFloat(a.y);
                    bx = parseFloat(b.x);
                    by = parseFloat(b.y);

                    if (ay < by) {
                        return -1;
                    }
                    else if (ay == by) {
                        if (ax < bx) {
                            return -1;  
                        }
                        else if (ax > bx) {
                            return 1;
                        }
                        return 0;
                    }

                    return 1;
                })
                exps_data.push(exp_subset)
            }
            console.log("Finished processing experiment data subsets")
        }
        calcExpSubsets();

        pcUpdate = () => {
            dim_order_changed = false;
            if (dim_order == null) {
                // init
                dim_order = [];
                pc.data[0].dimensions.forEach((d)=>{
                    dim_order.push(d.label)
                })
            } 
            else {
                dim_order_changed = !dim_order.every((d, i)=>{
                    return d == pc.data[0].dimensions[i].label;
                })
            }
            
            if (dim_order_changed) {
                dim_order = [];
                pc.data[0].dimensions.forEach((d)=>{
                    dim_order.push(d.label)
                })
                exps_data = [];
                calcExpSubsets();
            }

            // exclude values outside the selected range(s)
            var filteredIds = uniqueExpIds.filter((id) => {
                return checkDimRange(id, dims[0])
            });
            
            if (filteredIds.length > 3) {
                filteredIds = filteredIds.slice(0,3)
            }

            // hide spatial plots not currently in use
            if (filteredIds.length == 1) {
                $(spatial_plots[0]).show()
                $(spatial_plots[1]).fadeOut("slow")
                $(spatial_plots[2]).fadeOut("slow")
            } else if (filteredIds.length == 2) {
                $(spatial_plots[0]).show()
                $(spatial_plots[1]).show()
                $(spatial_plots[2]).fadeOut("slow")
            } else {
                $(spatial_plots).show()
            }

            try {
                filteredIds.forEach((id, idx) => {
                    surf_plot = spatial_plots[idx];
                    data_subset = exps_data[id];
                    // radius clip
                    clip = surf_plot.clip;
                    r_thresh = null;

                    // filter all dims except exp_id go thru rows for each dim with ranges set
                    for (i=1; i<dims.length; i++) {
                        data_subset = data_subset.filter((r, idx) => {
                            value = r[dims[i].label];
                            return checkDimRange(value, dims[i])
                        })
                    }

                    if (clip) {
                        max_x = max_y = Number.NEGATIVE_INFINITY;
                        min_x = min_y = Number.POSITIVE_INFINITY;

                        data_subset.forEach((r, idx) => {
                            // assuming the last 3 columns are x, y, z/loss
                            x = parseFloat(r[dims[dims.length-3].label]);
                            if (x > max_x) {max_x = x;}
                            else if (x < min_x) {min_x = x;}
                            y = parseFloat(r[dims[dims.length-2].label]);
                            if (y > max_y) {max_y = y;}
                            else if (y < min_y) {min_y = y;}                    
                        })

                        // get height and width of selected region
                        w = Math.abs(max_x - min_x);
                        h = Math.abs(max_y - min_y);
                        r_thresh = Math.max(w, h) / 2;
                    }

                    //console.log("experiment #" + id + "'s row count:", data_subset.length)
                    Plotly.update(surf_plot, createDataObject(surf_plot, data_subset, r_thresh), {title: "Experiment #" + id})
                    $dataErr.hide();
                    $spatialContainer.css({"visibility": "visible"});
                    // Would be cool, but found several bits of evidence that it's not supported.
                    // Plotly.animate(spatial_plots[idx], [{
                    //     data: createDataObject(data_subset)
                    // }])
                })
            } 
            catch (err) {
                $dataErr.css({"display": "flex"});
                $spatialContainer.css({"visibility": "hidden"});
                console.log(err)
            }

        }

        pc.on('plotly_restyle', pcUpdate)
    });
};

function checkDimRange(v, dim) {
    var ranges_satisfied = false;
    var limited_range = dim.hasOwnProperty("constraintrange");
    if (limited_range) {
        multiRanges = Array.isArray(dim["constraintrange"][0]);
        if (multiRanges) {
            dim["constraintrange"].some((range)=>{
                min = range[0];
                max = range[1];
                in_range = (v >= min && v <= max);
                if (in_range) {
                    ranges_satisfied = true;
                    return true;
                }
                return false;
            })
        }
        else {
            min = dim["constraintrange"][0];
            max = dim["constraintrange"][1];
            in_range = (v >= min && v <= max);
            if (in_range) {ranges_satisfied = true;}
        }
    }
    else 
        ranges_satisfied = true;
    return ranges_satisfied;
}

function unpack(rows, key) {
    return rows.map(function(row) { 
        return row[key]; 
    });
}

function createDataObject(plt, rows, r_thresh) {
    if (rows == null || rows[0] == null) {return {};}
    x = [];
    y = [];
    z = [];
    z_row = []

    last_y = rows[0].y;
    all_x = false;

    rows.forEach((r) => {
        if (r_thresh != null) {
            rad = Math.sqrt(r.x**2 + r.y**2)
            if (rad > r_thresh) {
                z_row.push(NaN);
            }
            else {
                z_row.push(r[dims[dims.length-1].label]);
            }
        }
        else {
            z_row.push(r[dims[dims.length-1].label]);
        }

        if (r.y != last_y) {
            last_y = r.y;
            all_x = true;
            y.push(r.y)
            z.push(z_row)
            z_row = []
        }

        if (!all_x) {
            x.push(r.x)
        }
    })

    contours = {};
    if (plt.contours) {
        contours = {
            z: {
                show: true,
                usecolormap: true,
                highlightcolor: "#00ff00",
                project: {z: true}
            }
        }
    }

    var data = {
        opacity: 0.7,
        z: [z],
        y: [y],
        x: [x],
        contours: contours,
    };

    //console.log(data)
    return data;
}

document.addEventListener('DOMContentLoaded', function() {
    var intervalID = window.setInterval(checkPageReady, 300);
    function checkPageReady() {
        if (pcUpdate != null) {
            pcUpdate();
            window.clearInterval(intervalID);
            setTimeout(()=>{
                $loadingCover.fadeOut(450);
            }, 150)
        }
    }
}, false);