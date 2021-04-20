

const sendFormData = async function(data, url){

    const body = JSON.stringify(data);
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: body
    }

    const response = await fetch(url, options);
        
    return await response.json();

}

export default sendFormData;