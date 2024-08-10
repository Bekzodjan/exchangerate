let first_inp = document.getElementById("first_inp");
let first_sct = document.getElementById("first_sct");
let second_inp = document.getElementById("second_inp");
let second_sct = document.getElementById("second_sct");

let api = "https://v6.exchangerate-api.com/v6/503a9ffa70db283d87aae0e2/";

function getCodes() {
  axios.get(api + "codes").then((res) => {
    console.log(res);
    let res2 = res.data.supported_codes;
    let arr = [];
    console.log(res.data.supported_codes[100]);
    
    for (let i = 0; i < res2.length; i++) {
      arr.push(res2[i]);
      console.log(res2[i]);
      
    }
    console.log(arr);
    
    for (let i = 0; i < arr.length; i++) {
      first_sct.innerHTML +=
        "<option value='" + arr[i] + "'>" + arr[i] + "</option>";
      second_sct.innerHTML +=
        "<option value='" + arr[i] + "'>" + arr[i] + "</option>";
    }
  });
}
getCodes();
first_inp.addEventListener("keyup", function (e) {
  first_inp.value = Math.abs(e.target.value);
  convert();
});
function convert() {
    console.log(first_sct.value);
    console.log(second_sct.value);
    axios.get(api + "latest/" + first_sct.value.slice(0, 3)).then((res) => {
      console.log(res);
      let rate = res.data.conversion_rates[second_sct.value.slice(0, 3)];
      second_inp.value = first_inp.value * rate;
    });
}
function change() {
    let a = first_sct.value;
    let b = second_sct.value;
    first_sct.value = b;
    second_sct.value = a;
    convert();
}
