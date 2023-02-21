import axios from 'axios';
export default async function FetchUser() {
    try {
        const response=await axios.get('http://127.0.0.1:8000/api/user/profile/', {
            headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        if(response.status===200 && response.data){
            return response.data
        }
        
    } catch (error) {
        console.log(error);
    }

}
