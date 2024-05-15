let title = document.getElementById( "title" );
let price = document.getElementById( "price" );
let taxes = document.getElementById( "taxes" );
let ads = document.getElementById( "ads" );
let discount = document.getElementById( "discount" );
let total = document.getElementById( "total" );
let count = document.getElementById( "count" );
let category = document.getElementById( "category" );
let submit = document.getElementById( "submit" );

let searchMood="title"
let mood = "create";
let tem;

// get total
function getTotal ()
{
    if ( price.value !== "" || taxes.value !== "" || ads.value !== "" || discount.value !== "" )
    {
        let result =
            +price.value + +taxes.value + +ads.value - +discount.value;
        total.innerHTML = result;
        total.style.background = "#040";
    } else
    {
        total.innerHTML = "";
        total.style.background = "#a00d02";
    }
}

// create product
let dataPro;
if ( localStorage.product )
{
    dataPro = JSON.parse( localStorage.product );
} else
{
    dataPro = [];
}

function handleFormSubmit ()
{
    let newPro = {
        title: title.value,
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        count: count.value,
        category: category.value,
        total: total.innerHTML,
    };
    if ( mood === "create" )
    {

        if ( newPro.count > 1 )
        {
            for ( let i = 0; i < newPro.count; i++ )
            {
                dataPro.push( newPro );
            }
        } else
        {
            dataPro.push( newPro );
        }
    } else
    {
        dataPro[ tmp ] = newPro;
        mood = "create";
        submit.innerHTML = "create";
        count.style.display = "block";
        clearData(dataPro)
    }

    // Save In LocalStorage
    localStorage.setItem( "product", JSON.stringify( dataPro ) );
    //clearData();
    showData();
}

submit.onclick = handleFormSubmit;
//-----------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------
// clear inputs
function clearData ()
{
    title.value = "";
    price.value = "";
    ads.value = "";
    discount.value = "";
    taxes.value = "";
    total.innerHTML = "";
    count.value = "";
    category.value = "";
}

function showData ()
{
    let table = "";
    for ( let i = 0; i < dataPro.length; i++ )
    {
        table += `
    <tr>
        <td>${ i }</td>
        <td>${ dataPro[ i ].title }</td>
        <td>${ dataPro[ i ].price }</td>
        <td>${ dataPro[ i ].taxes }</td>
        <td>${ dataPro[ i ].ads }</td>
        <td>${ dataPro[ i ].discount }</td>
        <td>${ dataPro[ i ].category }</td>
        <td>${ dataPro[ i ].total }</td>
        <td><button onclick="updateData(${ i })" id="update">update</button></td>
        <td><button onclick="deleteData(${ i })" id="delete">delete</button></td>
    </tr>
    `;
    getTotal()
    }

    document.getElementById( "tbody" ).innerHTML = table;
    let btnDelete = document.getElementById( "deleteAll" );
    if ( dataPro.length > 0 )
    {
        btnDelete.innerHTML = `
    <button onclick="deleteAll()">delete All(${ dataPro.length })</button>
    `;
    } else
    {
        btnDelete.innerHTML = "";
    }
}

showData();
//-----------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------
// delete
function deleteData ( i )
{
    dataPro.splice( i, 1 );
    localStorage.product = JSON.stringify( dataPro );
    showData();
}
function deleteAll ()
{
    localStorage.clear();
    dataPro.splice( 0 );
    showData();
}
//-----------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------
// count
//-----------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------
// update
function updateData ( i )
{
    title.value = dataPro[ i ].title;
    price.value = dataPro[ i ].price;
    ads.value = dataPro[ i ].ads;
    taxes.value = dataPro[ i ].taxes;
    discount.value = dataPro[ i ].discount;
    category.value = dataPro[ i ].category;
    getTotal();
    count.style.display = "none";
    submit.innerHTML = "update";
    mood = "update";
    tmp = i;
    scroll( {
        top: 0,
        behavior: "smooth"
    } );
}
//-----------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------
// search
function getSearchMode(){

}
//-----------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------
// clean data
