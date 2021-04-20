import {baseRoute} from '../../api/api-routes';


export const getUserInformationById = async function(userId){
    const url = `${baseRoute}/user/${userId}`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
}