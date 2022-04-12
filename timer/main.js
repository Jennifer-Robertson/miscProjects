let minutes = 25;
while(minutes >= 0) {
    console.log(minutes);
for (let s=59; s >= 0; s--) {
    setTimeout(function () {
    console.log(s);
    }, 1000);
}
    minutes -=1;
}