import {useEffect} from 'react'
import { useNavigate } from "react-router-dom";

const ErrorBoundary = () => {
    const navigate = useNavigate();
    useEffect(() => {
        navigate('/candidates')
    },[navigate])
}

export default ErrorBoundary