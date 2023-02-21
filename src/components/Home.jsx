import { Link, Outlet } from "react-router-dom"
import { Box } from '@mui/material';
export default function Home(){
    return(

        <Box display="flex" sx={{
            flexDirection:{xs:"column", md: "row"},
            gap:"30px",
            p:[1,2,3, 5,8]
            }}>
            <Box>
                <h1>Welcome</h1>
                <h2>To the new Experience</h2>
            </Box>
            <Box sx={{width:"3px", backgroundColor:"#aaa"}}></Box>
            <Box sx={{flex:1}}>
                <Outlet />
            </Box>
        </Box>
    )
}