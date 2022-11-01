let tbody = document.getElementById("tbody");

// tbody.append(td_fun());

// Fetch Function

fetch("http://localhost:3000/user")
    .then(res => res.json())
    .then(json => {
        json.map(data=>{
            console.log(data.name);
            tbody.append(td_fun(data));
        })
    });

// Create Table Data

function td_fun({profile, name, email, status, role, id}){
    let td = document.createElement('tr');
    td.innerHTML = `
    <td class="px-6 py-4 whitespace-nowrap">
        <div class="flex items-center">
                <div class="flex-shrink-0 h-10 w-10">
                    <img src="${profile}" class="h-10 w-10 rounded-full" alt="">
                </div>
                <div class="ml-4">
                    <div class="text-sm font-medium text-gray-900">
                        ${name}
                    </div>
                    <div class="text-sm text-gray-500">
                        ${email}
                    </div>
                </div>
            </div>
    </td>
    <td class="px-6 py-4 whitespace-nowrap">
        <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
           ${status}
        </span>
    </td>
    <td class="px-6 py-4 whitespace-nowrap">
        <span class="text-sm text-gray-500">${role}</span>
    </td>
    <td class="px-6 py-4 whitespace-nowrap">
        <span class="text-sm text-gray-500">
            <button data-method="DELETE" onclick="deleteUser("http://localhost:3000/user/${id}") data-disabled="true" rel="nofollow">Delete</button>
        </span>
    </td>
    `;
    return td;
}

function deleteUser(url){
    fetch(url, {
        method: 'DELETE',
        headers: {
            'Content-type': 'application/json'
        }
    });
}