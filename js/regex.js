function testRegex()
{
    var eTxt=document.getElementsById('searchText').value;
    //var txt=/eTxt/;
    var content=document.getElementsById('Texts').value;
   // document.write(eTxt);
   
    document.getElementById('Result').innerHTML=eTxt.search(content);;
}