//breathe and break it down into pieces

//what do I need
const body = $(`body`);
//button functionality to start
const bandsButton = $(`#bands`);
bandsButton.on('click', () => {
    $.ajax({
        url: 'http://localhost:8000/api/bands',
        type: 'GET',
        dataType: 'json',
        headers: {
            'Accept': 'application/json'
        },
        success: (data) => {
            data.forEach(element => {
                console.log(element);
                let {band_name, genre} = element;
                let div = $(`<div class = "bands">${band_name} ${genre}</div>`);
                body.append(div);
            });
        },
        error: function(error) {
            console.error('Error:', error);
        }
    });
})