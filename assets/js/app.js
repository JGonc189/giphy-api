$(document).ready(function() {
    let topics = ['skate', 'dogs', 'animals', 'music'];
    let stillImgUrl = '';
    let animateImgUrl = '';
    let gifCondition = '';
    let stillUrl = '';
    let animateUrl = '';
   
    const createBtn = function() {
        //removes all elements within the gifArr div
        $('#gifArr').empty();
        //Create buttons based on elements in array
        for (let i = 0; i < topics.length; i++) {
            //Creates new buttons
            let newBtn = $('<button>');
            //Give the button an attribute 
            newBtn.attr('data-name', topics[i]);
            //Add class to the button
            newBtn.attr('class', 'gif btn btn-primary');
            //Give button name that  array
            newBtn.text(topics[i]);
            //Add button to DOM
            $('#gifArr').append(newBtn);
        }
    }

//When submit button is clicked 
$('#submitBtn').on('click', function(event) {
    submit();
});

//When Enter is pressed
$(".search").keydown(function(event){
    if(event.keyCode == 13){
        console.log("working");
        submit();
        $('.search').val("");
        return false
    }
});
    const submit = function() {
            event.preventDefault();
            //Get input text value
            let inputVal = $('#userInput').val();
            //push user input to array
            topics.push(inputVal);
            //Create new buttons
            createBtn();           
    }
    const displayGif = function() {
        //Gets the value of the button that is clicked
        let btnVal = $(this).data('name');
        //Api URL and key 
        const apiKey = 'uUB9qNVwi8QZ83wmp19wlfUcoPJS6HtJ';
        let apiUrl = 'https://api.giphy.com/v1/gifs/search?q=' + btnVal + '&api_key=' + apiKey;
        $.ajax({
            url: apiUrl,
            method: 'GET'
        }).done(function(response) {
            //removes images when new button is clicked
            $('.gifSection').empty();
            let newH1 = $('<h1>');
                newH1.html(btnVal);
                newH1.attr('class', 'text-center');
            $('.gifSection').append(newH1);

            for (let i = 0; i < 10; i++) {
                //Still & Animated Images
                stillImgUrl = response.data[i].images.fixed_height_still.url;
                animateImgUrl = response.data[i].images.fixed_height.url;
                //rating
                let rating = response.data[i].rating;
                //Assign image element to newImg variable
                let newDiv = $('<div>'); 
                let newP = $('<p>'); 
                let newImg = $('<img>');
                //Give img element stillImgUrl, animated  & src attribute
                newImg.attr('data-still', stillImgUrl);
                newImg.attr('data-animate', animateImgUrl);
                newImg.attr('src', stillImgUrl);
                newImg.attr('data-type', 'still');
                newImg.addClass('gifImage');
                //Give p element the rating texts
                newP.html('Giphy Rating: ' + rating);
                $(newP).appendTo(newDiv)
                $(newImg).appendTo(newDiv);
                $('.gifSection').append(newDiv); 
            }
        });
    }
    const gifAnimate = function() {
        //sets gifCondition to either still or animate
        gifCondition = $(this).data('type');
        stillUrl = $(this).data('still');
        animateUrl = $(this).data('animate');
        if (gifCondition === 'still') {
            //Changes the gif to an animated image by switching the URL
            $(this).attr('src', animateUrl);
            //Switch the data-type to animate
            $(this).data('type', 'animate');            
        } else if (gifCondition === 'animate') {
            //Change src to still
            $(this).attr('src', stillUrl);
            //Switch the data-type to still
            $(this).data('type', 'still');            
        }
    }

    createBtn();
    // submit();
    $(document).on('click', '.gif', displayGif);
    $(document).on('click', '.gifImage', gifAnimate);
});