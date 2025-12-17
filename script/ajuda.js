const ajudaLabels = document.getElementsByClassName("label_checkbox");

for(let i = 0; i < ajudaLabels.length; i++)
{
    let label = ajudaLabels[i];

    label.onmousedown = () => {
        let span = label.querySelector("span");

        console.log(span.style.backgroundColor);

        if(span.style.backgroundColor != "rgb(219, 66, 68)")
            span.style.backgroundColor = "rgb(219, 66, 68)";
        else
            span.style.backgroundColor = "white";
    }
}