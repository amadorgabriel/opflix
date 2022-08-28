export const parseJwt = () =>{
    var token = localStorage.getItem("usuario-opflix").split('.');
    var base64Url = token[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    // alert("Token: " + token);
    // alert("base64URL: " + base64Url);
    // alert("base64: " + base64);
    // alert("Return: " + JSON.parse(window.atob(base64)));
    return JSON.parse(window.atob(base64));
}
    